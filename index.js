#!/usr/bin/env node

'use strict'

const express = require('express')
const app = express()

const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

const port = 8080

app.get('/', async(req, res) => {
	res.render('home')
})

app.get('/search', async(req, res) => {
	res.render('search')
})

app.get('/articles/:id', (req, res) => {
	console.log(req.params.id)
	res.render('article')
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
