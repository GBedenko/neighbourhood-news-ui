#!/usr/bin/env node

'use strict'

console.log("Server Booting Up...")

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

app.get('/create_article', async(req, res) => {
	res.render('create_article')
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

app.get('/articles/', (req, res) => {
	res.render('articles')
})

app.get('/articles/:id', (req, res) => {
	console.log(req.params.id)
	res.render('article')
})

// Runs the server on provided port
app.listen(port, () => console.log(`Server listening on port ${port}`));