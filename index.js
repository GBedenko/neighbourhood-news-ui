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

// Import mediator to link with other microservices
const uiMediator = require('./modules/ui-mediator')

// Root page is welcome page, every user has to have an account
app.get('/', async(req, res) => {
	res.render('welcome', {layout: false})
})

// POST request for a new account being registered
app.post('/register', async(req, res) => {

	// Hash the password using bcrypt
	const passwordHash = await bcrypt.hashSync(req.body.password, 10)
	delete req.body.password

	const newUser = {
		emailAddress: req.body.emailAddress,
		userName: req.body.username,
		password: passwordHash
	}
	
	const addUserResponse = await uiMediator.addUser(newUser)
	
	if(addUserResponse) {
		res.redirect('/all_posts')
	} else {
		res.render('welcome')
	}
})

app.post('/login', async(req, res) => {

	// Hash the password using bcrypt
	const passwordHash = await bcrypt.hashSync(req.body.password, 10)
	delete req.body.password

	const existingUser = {
		userName: req.body.username,
		password: passwordHash
	}

	const checkUserCredientialsResponse = await uiMediator.queryUser(existingUser)

	if(checkUserCredientialsResponse) {
		res.redirect('/all_posts')
	} else {
		res.render('welcome')
	}
})

app.get('/all_posts', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles', (error, response, body) => {

		const articlesJSON = JSON.parse(body)

		res.render('articles', {user: {name: 'GBedenko', isAdmin: true}, articles: articlesJSON})
	})
})

app.get('/articles', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles', (error, response, body) => {

		const articlesJSON = JSON.parse(body)

		res.render('articles', {user: {name: 'GBedenko', isAdmin: true}, articles: articlesJSON})
	})
})

app.get('/events', (req, res) => {

	request('http://localhost:8081/api/v1.0/events', (error, response, body) => {

		const eventsJSON = JSON.parse(body)

		res.render('articles', {user: {name: 'GBedenko', isAdmin: true}, events: eventsJSON})
	})
})

app.get('/articles/:article_id', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles/' + req.params.article_id, (err, resp, body) => {

		const articleJSON = JSON.parse(body)

		res.render('article', {article: articleJSON})
	})
})

app.post('/articles', async(req, res) => {
	console.log(req.body)

	const newArticle = JSON.stringify(req.body)

	request.post({
		headers: {'content-type': 'application/json'},
		url: 'http://localhost:8081/api/v1.0/articles',
		body: newArticle}, () => {
			console.log("POST request sent to API")
		})

	res.redirect('/')
})

app.get('/create_article', (req, res) => {
	res.render('create_article')
})

app.get('/create_event', async(req, res) => {
	res.render('create_event')
})

app.get('/admin_dashboard', async(req, res) => {
	res.render('admin_dashboard')
})

app.get('/rate_article/:article_id', (req, res) => {

	res.redirect('/')
})

app.get('/user/:user_id', (req, res) => {

	res.render('user', {username: 'GBedenko'})
})






// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
