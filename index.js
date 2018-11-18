#!/usr/bin/env node

'use strict'

console.log("Server Booting Up...")

const express = require('express')
const app = express()

const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const request = require('request')
const bcrypt = require('bcrypt')

const port = 8080

app.get('/', async(req, res) => {
	res.redirect('/articles')
})

app.get('/articles', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles', (error, response, body) => {

		const articlesJSON = JSON.parse(body)

		res.render('articles', {articles: articlesJSON})
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

app.get('/articles/:article_id', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles/' + req.params.article_id, (err, resp, body) => {

		const articleJSON = JSON.parse(body)

		res.render('article', {article: articleJSON})
	})
})

app.get('/create_article', (req, res) => {
	res.render('create_article')
})

app.get('/rate_article/:article_id', (req, res) => {

	res.redirect('/')
})



app.get('/create_event', async(req, res) => {
	res.render('create_event')
})

// GET request to show form for registering new account
app.get('/register', async(req, res) => {
	res.render('register')
})

// POST request for a new account being registered
app.post('/register', async(req, res) => {

	// Hash the password using bcrypt
	const passwordHash = await bcrypt.hashSync(req.body.password, 10)
	delete req.body.password
	req.body.passwordHash = passwordHash

	request.post({
		url: 'http://localhost:8082/api/v1.0/users',
		body: req.body,
		json: true
	  }, function(error, response, body){
	  console.log(body);
	});

	res.redirect('/')
})

app.get('/login', async(req, res) => {
	res.render('login')
})

app.post('/login', async(req, res) => {

	request('http://localhost:8082/api/v1.0/users/' + req.body.username, (err, resp, body) => {
	
		const userJSON = JSON.parse(body)

		console.log(userJSON)
		res.render.redirect('/')
	})
})

app.get('/articles/:id', (req, res) => {
	console.log(req.params.id)
	res.render('article')
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
