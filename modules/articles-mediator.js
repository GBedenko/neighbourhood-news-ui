'use strict'

const request = require('request');

const articlesAPI = "http://localhost:8081/api/v1.0/articles/"

exports.addArticle = (newArticleObject) => new Promise((resolve, reject) => {
	
	// New articles are private and not pinned by default
	newArticleObject.public = false
	newArticleObject.pinned = false

	// Send POST request to add new article in Articles and Events API
    request.post({headers: {'content-type': 'application/json'}, url: articlesAPI, body: JSON.stringify(newArticleObject)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getAllArticles = (query) => new Promise((resolve, reject) => {

	request.get({headers: {'content-type': 'application/json'}, url: articlesAPI, body: JSON.stringify(query)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getArticleByID = (articleID) => new Promise((resolve, reject) => {

	request.get({headers: {'content-type': 'application/json'}, url: articlesAPI + articleID}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getEventByID = (eventID) => new Promise((resolve, reject) => {

	request.get({headers: {'content-type': 'application/json'}, url: eventsAPI + eventID}, (err, resp, body) => {

		resolve(body)
	})
})


exports.updateArticle = (articleID, updatedArticleObject) => new Promise((resolve, reject) => {
		
	request.put({headers: {'content-type': 'application/json'}, url: articlesAPI + articleID, body: JSON.stringify(updatedArticleObject)}, (err, resp, body) => {

		resolve(body)										
	})							
})

exports.deleteArticle = (articleID) => new Promise((resolve, reject) => {
		
	request.delete({headers: {'content-type': 'application/json'}, url: articlesAPI + articleID}, (err, resp, body) => {

		resolve(body)												
	})							
})
