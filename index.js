#!/usr/bin/env node

'use strict'

const express = require('express')
const app = express()

const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const port = 8080

const request = require('request');

app.get('/', async(req, res) => {
	res.render('home')
})

app.get('/search', async(req, res) => {
	res.render('search')
})

app.get('/articles', (req, res) => {

	request('http://localhost:8081/api/v1.0/articles', (error, response, body) => {

		const articlesJSON = JSON.parse(body)

		res.render('articles', {articles: articlesJSON})
	})
})

app.get('/articles/:id', (req, res) => {

	res.redirect('/articles')
})

app.get('/form', async(req, res) => res.render('form'))

app.post('/add', async(req, res) => {
	console.log(req.body)
	const sql = `INSERT INTO books(title, isbn, description, publication_year, author)
								VALUES("${req.body.title}", "${req.body.isbn}", "${req.body.description}", "${req.body.publication_year}", "${req.body.author}");`
	console.log(sql)
	db.run(sql, err => {
		if(err) console.error(err.message)
		res.redirect('/')
	})
})

app.listen(port, () => console.log(`app listening on port ${port}`))
