#!/usr/bin/env node

'use strict'

console.log('Booting Up UI Server...')

// Express and Handlebars setup
const express = require('express')
const app = express()
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Import package used for storing cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Import package for hashing password input
const bcrypt = require('bcrypt')

// UI microservice uses port 8080
const port = 8080

// Import mediators to link with other microservices
const articlesMediator = require('./modules/articles-mediator')
const commentsMediator = require('./modules/comments-mediator')
const eventsMediator = require('./modules/events-mediator')
const usersMediator = require('./modules/users-mediator')

// Request for the root page renders the welcome/login/register page (every user must have an account)
app.get('/', async(req, res) => {
	res.render('welcome', {layout: false})
})

// POST request for a new account being registered
app.post('/register', async(req, res) => {

	// Define salt to pass no magic numbers linter setting
	const salt = 10

	// Hash the password using bcrypt
	const passwordHash = await bcrypt.hash(req.body.password, salt)
	delete req.body.password

	// Create a new object for the user including the password hashed
	const newUser = {
		emailAddress: req.body.email,
		username: req.body.username,
		password: passwordHash
	}

	// Call the usersMediator to send a post request for the new user
	const addUser = await usersMediator.addUser(newUser).then((resp) => resp)

	// Set session cookies for the username and if they are an admin
	res.cookie('username', newUser.username)
	res.cookie('isAdmin', false)

	// Direct the user to the main page within the application
	res.redirect('/all_posts')
})

// POST request for a user logging in
app.post('/login', async(req, res) => {

	// Using the login form, send client's input to be authenticated
	const authenticateUser = await usersMediator.authenticateUser(req.body)

	if(authenticateUser) {

		//If authenticated, retrieve all details of the user who just logged in
		const loggedInUser = await usersMediator.getAllUsers({username: req.body.username})
		const loggedInUserJSON = JSON.parse(loggedInUser)

		// Retrieve their username and if they are an admin and store as cookies
		res.cookie('username', loggedInUserJSON.username)
		res.cookie('isAdmin', loggedInUserJSON.admin)

		// If user is authenticated, direct user to the website
		res.redirect('/all_posts')

	} else {

		// Unauthorised status code (defined to pass magic numbers linter setting)
		const unauthorisedStatusCode = 401

		// Otherwise, display 401 error page
		res.status(unauthorisedStatusCode).render('401', {layout: false})
	}
})

// Request to show all posts in UI (shown on homepage)
app.get('/all_posts', async(req, res) => {

	// GET all Articles
	const getArticles = articlesMediator.getAllArticles({public: true}).then((resp) => resp)
	const articles = await getArticles
	const articlesJSON = JSON.parse(articles)

	// GET all Events
	const getEvents = eventsMediator.getAllEvents({public: true}).then((resp) => resp)
	const events = await getEvents
	const eventsJSON = JSON.parse(events)

	// Articles and Events joined together in one list
	const postsJSON = articlesJSON.concat(eventsJSON)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	// Show all posts and pinned content to the UI
	res.render('all_posts', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
							 posts: postsJSON,
							 pinnedArticles: pinnedArticlesJSON,
							 pinnedEvents: pinnedEventsJSON })
})

// Request to show all articles in UI
app.get('/articles', async(req, res) => {

	const getArticles = articlesMediator.getAllArticles({public: true}, req.query.sort).then((resp) => resp)

	const articles = await getArticles

	const articlesJSON = JSON.parse(articles)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('articles', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
		articles: articlesJSON,
		pinnedArticles: pinnedArticlesJSON,
		pinnedEvents: pinnedEventsJSON })
})

// Request to show one article in UI
app.get('/articles/:article_id', async(req, res) => {

	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)

	const article = await getArticleByID

	const articleJSON = JSON.parse(article)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('article', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
		article: articleJSON,
		pinnedArticles: pinnedArticlesJSON,
		pinnedEvents: pinnedEventsJSON })
})

// POST request for a new article being created
app.post('/articles', async(req, res) => {

	const addArticle = articlesMediator.addArticle(req.body).then((resp) => resp)

	const addArticleResponse = await addArticle

	res.redirect('/articles')
})

// Request to show all articles in UI
app.get('/events', async(req, res) => {

	const getEvents = eventsMediator.getAllEvents({public: true}, req.query.sort).then((resp) => resp)

	const events = await getEvents

	const eventsJSON = JSON.parse(events)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('events', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
						  events: eventsJSON,
						  pinnedArticles: pinnedArticlesJSON,
						  pinnedEvents: pinnedEventsJSON })
})

// Request to show one event in UI
app.get('/events/:event_id', async(req, res) => {

	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)

	const event = await getEventByID

	const eventJSON = JSON.parse(event)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('event', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
						  event: eventJSON,
						  pinnedArticles: pinnedArticlesJSON,
						  pinnedEvents: pinnedEventsJSON })
})

// POST request for a new event being created
app.post('/events', async(req, res) => {

	const addEvent = eventsMediator.addEvent(req.body).then((resp) => resp)

	const addEventResponse = await addEvent

	res.redirect('/events')
})

// Request for form to create a new article
app.get('/create_article', async(req, res) => {

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('create_article', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
								  pinnedArticles: pinnedArticlesJSON,
								  pinnedEvents: pinnedEventsJSON })
})

// Request for form to create a new event
app.get('/create_event', async(req, res) => {

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('create_event', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
								  pinnedArticles: pinnedArticlesJSON,
								  pinnedEvents: pinnedEventsJSON })
})

// Request the Admin Dashboard showing all articles and events
app.get('/admin_dashboard', async(req, res) => {

	// Retrieve all articles from other microservice
	const getArticles = articlesMediator.getAllArticles().then((resp) => resp)
	const articles = await getArticles
	const articlesJSON = JSON.parse(articles)

	// Retrieve all events from other microservice
	const getEvents = eventsMediator.getAllEvents().then((resp) => resp)
	const events = await getEvents
	const eventsJSON = JSON.parse(events)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	// Render both lists to the required UI template
	res.render('admin_dashboard', {user: {username: req.cookies.username, isAdmin: req.cookies.isAdmin},
								   articles: articlesJSON,
								   events: eventsJSON,
								   pinnedArticles: pinnedArticlesJSON,
								   pinnedEvents: pinnedEventsJSON })
})

// Request to pin an article (show it on every page)
app.get('/articles/pin/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be pinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change pinned status to true in the object
	articleJSON.pinned = true

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp)

	const updateArticleResponse = await updateArticle

	res.redirect('/admin_dashboard')
})

// Request to unpin an article (not shown on every page)
app.get('/articles/unpin/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be unpinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change pinned status to false in the object
	articleJSON.pinned = false

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp)

	const updateArticleResponse = await updateArticle

	res.redirect('/admin_dashboard')
})

// Request to pin an event (show it on every page)
app.get('/events/pin/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change pinned status to true in the object
	eventJSON.pinned = true

	const updateEvent = eventsMediator.updateEvent(req.params.event_id, eventJSON).then((resp) => resp)

	const updateEventResponse = await updateEvent

	res.redirect('/admin_dashboard')
})

// Request to unpin an event (not shown on every page)
app.get('/events/unpin/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change pinned status to false in the object
	eventJSON.pinned = false

	const updateEvent = eventsMediator.updateEvent(req.params.event_id, eventJSON).then((resp) => resp)

	const updateEventResponse = await updateEvent

	res.redirect('/admin_dashboard')
})

// Request to make an article public (shown to users)
app.get('/articles/make_public/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be pinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change public status to true in the object
	articleJSON.public = true

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp)

	const updateArticleResponse = await updateArticle

	res.redirect('/admin_dashboard')
})

// Request to make an article private (not shown to users)
app.get('/articles/make_private/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be pinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change public status to false
	articleJSON.public = false

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp)

	const updateArticleResponse = await updateArticle

	res.redirect('/admin_dashboard')
})

// Request to make an event public (shown to users)
app.get('/events/make_public/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change public status to true
	eventJSON.public = true

	const updateEvent = eventsMediator.updateEvent(req.params.event_id, eventJSON).then((resp) => resp)

	const updateEventResponse = await updateEvent

	res.redirect('/admin_dashboard')
})

// Request to make an event private (not shown to users)
app.get('/events/make_private/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change public status to false
	eventJSON.public = false

	const updateEvent = eventsMediator.updateEvent(req.params.event_id, eventJSON).then((resp) => resp)

	const updateEventResponse = await updateEvent

	res.redirect('/admin_dashboard')
})

// Request to increase an articles likes by 1
app.get('/like_article/:article_id', async(req, res) => {

	// Retrieve the article object required
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Increase number of likes
	articleJSON.likes++

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp)

	const updateArticleResponse = await updateArticle

	res.redirect('/articles/' + req.params.article_id)
})

// Request to increase an articles dislikes by 1
app.get('/dislike_article/:article_id', async(req, res) => {

	// Retrieve the article object required
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp)
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Increase number of dislikes
	articleJSON.dislikes++

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp)

	const updateArticleResponse = await updateArticle

	res.redirect('/articles/' + req.params.article_id)
})

// Request to increase an events likes by 1
app.get('/like_event/:event_id', async(req, res) => {

	// Retrieve the event object that needs its rating incrementing
	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Increase number of likes the event has
	eventJSON.likes++

	const updateEvent = eventsMediator.updateEvent(req.params.event_id, eventJSON).then((resp) => resp)

	const updateEventResponse = await updateEvent

	res.redirect('/events/' + req.params.event_id)
})

// Request to increase an events dislikes by 1
app.get('/dislike_event/:event_id', async(req, res) => {

	// Retrieve the event object that needs its rating decrementing
	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp)
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Decrease number of likes the event has
	eventJSON.dislikes++

	const updateEvent = eventsMediator.updateEvent(req.params.event_id, eventJSON).then((resp) => resp)

	const updateEventResponse = await updateEvent

	res.redirect('/events/' + req.params.event_id)
})

app.get('/like_user/:user_id', async(req, res) => {

	const getUserByID = usersMediator.getUserByID(req.params.user_id).then((resp) => resp)
	const user = await getUserByID
	const userJSON = JSON.parse(user)

	// Increase number of likes this user has
	userJSON.likes++

	const updateUser = usersMediator.updateUser(req.params.user_id, userJSON).then((resp) => resp)

	const updateUserResponse = await updateUser

	res.redirect('/users/' + userJSON.username)
})

app.get('/dislike_user/:user_id', async(req, res) => {

	const getUserByID = usersMediator.getUserByID(req.params.user_id).then((resp) => resp)
	const user = await getUserByID
	const userJSON = JSON.parse(user)

	// Increase number of dislikes this user has
	userJSON.dislikes++

	const updateUser = usersMediator.updateUser(req.params.user_id, userJSON).then((resp) => resp)

	const updateUserResponse = await updateUser

	res.redirect('/users/' + userJSON.username)
})

// Request to show the user's own account page
app.get('/users/:username', async(req, res) => {

	const getUser = usersMediator.getAllUsers({username: req.params.username}).then((resp) => resp)
	const user = await getUser
	const userJSON = JSON.parse(user)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true, public: true}).then((resp) => resp)
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true, public: true}).then((resp) => resp)
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('user', {user: userJSON[0],
		pinnedArticles: pinnedArticlesJSON,
		pinnedEvents: pinnedEventsJSON })
})

// Request to create a new comment for the provided article
app.post('/article/add_comment/:article_id', async(req, res) => {

	const commentObject = {postType: 'article', postID: req.params.article_id, comment: req.body.comment}

	const addComment = commentsMediator.addComment(commentObject).then((resp) => resp)

	const addCommentResponse = await addComment

	res.redirect('/articles/' + req.params.article_id)
})

// Request to create a new comment for the provided event
app.post('/event/add_comment/:event_id', async(req, res) => {

	const commentObject = {postType: 'event', postID: req.params.event_id, comment: req.body.comment}

	const addComment = commentsMediator.addComment(commentObject).then((resp) => resp)

	const addCommentResponse = await addComment

	res.redirect('/events/' + req.params.event_id)
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`))

module.exports = app
