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

const port = 8080

const request = require('request')

app.get('/', async(req, res) => {
	res.redirect('/articles')
})

app.get('/create_article', (req, res) => {
	res.render('create_article')
})

app.get('/articles', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles', (error, response, body) => {

		const articlesJSON = JSON.parse(body)

		res.render('articles', {articles: articlesJSON})
	})
})

app.get('/articles/:article_id', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles/' + req.params.article_id, (err, resp, body) => {

		const articleJSON = JSON.parse(body)

		res.render('article', {article: articleJSON})
	})
})

app.get('/rate_article/:article_id', (req, res) => {

	
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

app.get('/create_event', async(req, res) => {
	res.render('create_event')
})

app.get('/login', async(req, res) => {
	res.render('login')
})

app.get('/register', async(req, res) => {
	res.render('register')
})


app.get('/articles/:id', (req, res) => {
	console.log(req.params.id)
	res.render('article')
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));
