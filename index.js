#!/usr/bin/env node

'use strict'

console.log("Booting Up UI Server...")

// Express and Handlebars setup
const express = require('express')
const app = express()
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// UI microservice uses port 8080
const port = 8080

// Import other required libraries
const bcrypt = require('bcrypt')
const request = require('request')

// Import mediators to link with other microservices
const articlesMediator = require('./modules/articles-mediator')
const commentsMediator = require('./modules/comments-mediator')
const eventsMediator = require('./modules/events-mediator')
const usersMediator = require('./modules/users-mediator')

// TODO BELOW
app.get('/like_article/:article_id', (req, res) => {

	res.redirect('/')
})

app.get('/dislike_article/:article_id', (req, res) => {

	res.redirect('/')
})

app.get('/like_event/:event_id', (req, res) => {

	res.redirect('/')
})

app.get('/dislike_event/:event_id', (req, res) => {

	res.redirect('/')
})

app.get('/like_user/:user_id', (req, res) => {

	res.redirect('/')
})

app.get('/dislike_user/:user_id', (req, res) => {

	res.redirect('/')
})
// TODO ABOVE


// Request for the root page renders the welcome/login/register page (every user must have an account)
app.get('/', async(req, res) => {
	res.render('welcome', {layout: false})
})

// POST request for a new account being registered
app.post('/register', async(req, res) => {
	
	// Hash the password using bcrypt
	const passwordHash = await bcrypt.hashSync(req.body.password, 10)
	delete req.body.password

	const newUser = {
		emailAddress: req.body.email,
		userName: req.body.username,
		password: passwordHash
	}
	
	// if(newUser.emailAddress == '') res.status(401).render('401', {layout: false})
	// if(newUser.userName == '') res.status(401).render('401', {layout: false})
	// if(newUser.passwordHash == '') res.status(401).render('401', {layout: false})

	const addUser = usersMediator.addUser(newUser).then((resp) => resp).catch((error) => console.log(error))
	const addUserResponse = await addUser
	
	if(addUserResponse) {
		res.redirect('/all_posts')
	} else {
		res.status(401).render('401', {layout: false})
	}
})

// POST request for a user logging in
app.post('/login', async(req, res) => {

	// // Hash the password using bcrypt
	// const passwordHash = await bcrypt.hashSync(req.body.password, 10)
	// delete req.body.password

	const existingUser = {
		userName: req.body.username
	}
	
	const getUser = usersMediator.getAllUsers(existingUser).then((resp) => resp).catch((error) => console.log(error))
	const user = await getUser
	const userJSON = JSON.parse(user)
	
	if((userJSON[0].userName == existingUser.userName)) {
		res.redirect('/all_posts')
	} else {
		res.status(401).render('401', {layout: false})
	}
})

// Request to show all posts in UI (shown on homepage)
app.get('/all_posts', async(req, res) => {
	
	// GET all Articles
	const getArticles = articlesMediator.getAllArticles().then((resp) => resp).catch((error) => console.log(error))
	const articles = await getArticles
	const articlesJSON = JSON.parse(articles)

	// GET all Events
	const getEvents = eventsMediator.getAllEvents().then((resp) => resp).catch((error) => console.log(error))
	const events = await getEvents
	const eventsJSON = JSON.parse(events)

	// Articles and Events joined together in one list
	const postsJSON = articlesJSON.concat(eventsJSON)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	// Show all posts and pinned content to the UI
	res.render('all_posts', {user: {name: 'GBedenko', isAdmin: true},
							 posts: postsJSON,
							 pinnedArticles: pinnedArticlesJSON,
							 pinnedEvents: pinnedEventsJSON })
})

// Request to show all articles in UI
app.get('/articles', async(req, res) => {

	const getArticles = articlesMediator.getAllArticles().then((resp) => resp).catch((error) => console.log(error))

	const articles = await getArticles

	const articlesJSON = JSON.parse(articles)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('articles', {user: {name: 'GBedenko', isAdmin: true},
							articles: articlesJSON,
							pinnedArticles: pinnedArticlesJSON,
							pinnedEvents: pinnedEventsJSON })
})

// Request to show one article in UI
app.get('/articles/:article_id', async(req, res) => {

	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))

	const article = await getArticleByID

	const articleJSON = JSON.parse(article)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('article', {user: {name: 'GBedenko', isAdmin: true},
							article: articleJSON,
							pinnedArticles: pinnedArticlesJSON,
							pinnedEvents: pinnedEventsJSON })
})

// POST request for a new article being created
app.post('/articles', async(req, res) => {
		
	const addArticle = articlesMediator.addArticle(req.body).then((resp) => resp).catch((error) => console.log(error))

	const addArticleResponse = await addArticle

	if(addArticleResponse) res.redirect('/articles')
})

// Request to show all articles in UI
app.get('/events', async(req, res) => {

	const getEvents = eventsMediator.getAllEvents().then((resp) => resp).catch((error) => console.log(error))

	const events = await getEvents

	const eventsJSON = JSON.parse(events)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('events', {user: {name: 'GBedenko', isAdmin: true},
						  events: eventsJSON,
						  pinnedArticles: pinnedArticlesJSON,
						  pinnedEvents: pinnedEventsJSON })
})

// Request to show one event in UI
app.get('/events/:event_id', async(req, res) => {

	const getEventByID = eventsMediator.getEventByID(req.params.event_id).then((resp) => resp).catch((error) => console.log(error))

	const event = await getEventByID

	const eventJSON = JSON.parse(event)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('event', {user: {name: 'GBedenko', isAdmin: true},
						  event: eventJSON,
						  pinnedArticles: pinnedArticlesJSON,
						  pinnedEvents: pinnedEventsJSON })
})

// POST request for a new event being created
app.post('/events', async(req, res) => {

	const addEvent = eventsMediator.addEvent(req.body).then((resp) => resp).catch((error) => console.log(error))

	const addEventResponse = await addEvent

	if(addEventResponse) res.redirect('/events')
})

// Request for form to create a new article
app.get('/create_article', async(req, res) => {

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('create_article', {user: {name: 'GBedenko', isAdmin: true},
								  pinnedArticles: pinnedArticlesJSON,
								  pinnedEvents: pinnedEventsJSON })
})

// Request for form to create a new event
app.get('/create_event', async(req, res) => {

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)

	res.render('create_event', {user: {name: 'GBedenko', isAdmin: true},
								  pinnedArticles: pinnedArticlesJSON,
								  pinnedEvents: pinnedEventsJSON })
})

// Request the Admin Dashboard showing all articles and events
app.get('/admin_dashboard', async(req, res) => {
	
	// Retrieve all articles from other microservice
	const getArticles = articlesMediator.getAllArticles().then((resp) => resp).catch((error) => console.log(error))
	const articles = await getArticles
	const articlesJSON = JSON.parse(articles)						 

	// Retrieve all events from other microservice
	const getEvents = eventsMediator.getAllEvents().then((resp) => resp).catch((error) => console.log(error))
	const events = await getEvents
	const eventsJSON = JSON.parse(events)

	// GET all pinned articles
	const getPinnedArticles = articlesMediator.getAllArticles({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedArticles = await getPinnedArticles
	const pinnedArticlesJSON = JSON.parse(pinnedArticles)

	// GET all pinned events
	const getPinnedEvents = eventsMediator.getAllEvents({pinned: true}).then((resp) => resp).catch((error) => console.log(error))
	const pinnedEvents = await getPinnedEvents
	const pinnedEventsJSON = JSON.parse(pinnedEvents)
	
	// Render both lists to the required UI template
	res.render('admin_dashboard', {user: {name: 'GBedenko', isAdmin: true},
								   articles: articlesJSON,
								   events: eventsJSON,
								   pinnedArticles: pinnedArticlesJSON,
								   pinnedEvents: pinnedEventsJSON })
})

// Request to pin an article (show it on every page)
app.get('/articles/pin/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be pinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change pinned status to true in the object
	articleJSON.pinned = true

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateArticleResponse = await updateArticle

	if(updateArticleResponse) res.redirect('/admin_dashboard')
})

// Request to unpin an article (not shown on every page)
app.get('/articles/unpin/:article_id', async(req, res) => {
	
	// Retrieve the article object that needs to be unpinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change pinned status to false in the object
	articleJSON.pinned = false

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateArticleResponse = await updateArticle

	if(updateArticleResponse) res.redirect('/admin_dashboard')
})

// Request to pin an event (show it on every page)
app.get('/events/pin/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change pinned status to true in the object
	eventJSON.pinned = true

	const updateEvent = eventsMediator.updateEvent(req.params.article_id, eventJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateEventResponse = await updateEvent

	if(updateEventResponse) res.redirect('/admin_dashboard')
})

// Request to unpin an event (not shown on every page)
app.get('/events/unpin/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change pinned status to false in the object
	eventJSON.pinned = false

	const updateEvent = eventsMediator.updateEvent(req.params.article_id, eventJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateEventResponse = await updateEvent

	if(updateEventResponse) res.redirect('/admin_dashboard')
})

// Request to make an article public (shown to users)
app.get('/articles/make_public/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be pinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change public status to true in the object
	articleJSON.public = true

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateArticleResponse = await updateArticle

	if(updateArticleResponse) res.redirect('/admin_dashboard')
})

// Request to make an article private (not shown to users)
app.get('/articles/make_private/:article_id', async(req, res) => {

	// Retrieve the article object that needs to be pinned
	const getArticleByID = articlesMediator.getArticleByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const article = await getArticleByID
	const articleJSON = JSON.parse(article)

	// Change public status to false
	articleJSON.public = false

	const updateArticle = articlesMediator.updateArticle(req.params.article_id, articleJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateArticleResponse = await updateArticle

	if(updateArticleResponse) res.redirect('/admin_dashboard')
})

// Request to make an event public (shown to users)
app.get('/events/make_public/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change public status to true
	eventJSON.public = true

	const updateEvent = eventsMediator.updateEvent(req.params.article_id, eventJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateEventResponse = await updateEvent

	if(updateEventResponse) res.redirect('/admin_dashboard')
})

// Request to make an event private (not shown to users)
app.get('/events/make_private/:event_id', async(req, res) => {

	// Retrieve the event object that needs to be pinned
	const getEventByID = eventsMediator.getEventByID(req.params.article_id).then((resp) => resp).catch((error) => console.log(error))
	const event = await getEventByID
	const eventJSON = JSON.parse(event)

	// Change public status to false
	eventJSON.public = false

	const updateEvent = eventsMediator.updateEvent(req.params.article_id, eventJSON).then((resp) => resp).catch((error) => console.log(error))

	const updateEventResponse = await updateEvent

	if(updateEventResponse) res.redirect('/admin_dashboard')
})

// Request to show the user's own account page
app.get('/user/:user_id', (req, res) => {

	res.render('user', {user: {name: 'GBedenko', isAdmin: true}})
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
