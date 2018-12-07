'use strict'

const request = require('request')

const articlesAPI = 'http://localhost:8081/api/v1.0/articles/'

exports.addArticle = (newArticleObject) => new Promise((resolve, reject) => {

	if(Object.keys(newArticleObject).length == 0) {
		reject(new Error('Trying to add an empty object'))
	}

	// Set default extra values for a new article object
	newArticleObject.public = false
	newArticleObject.pinned = false
	newArticleObject.likes = 0
	newArticleObject.dislikes = 0

	// Send POST request to add new article in Articles and Events API
	request.post({headers: {'content-type': 'application/json'}, url: articlesAPI, body: JSON.stringify(newArticleObject)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getAllArticles = (query, sortQuery) => new Promise((resolve, reject) => {

	// Append sort value to the request's body, if a sort value exists
	if(sortQuery) query.sort = sortQuery

	request.get({headers: {'content-type': 'application/json'}, url: articlesAPI, body: JSON.stringify(query)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getArticleByID = (articleID) => new Promise((resolve, reject) => {

	request.get({headers: {'content-type': 'application/json'}, url: articlesAPI + articleID}, (err, resp, body) => {

		resolve(body)
	})
})

exports.updateArticle = (articleID, updatedArticleObject) => new Promise((resolve, reject) => {

	if(Object.keys(updatedArticleObject).length == 0) {
		reject(new Error('Trying to update an empty object'))
	}

	// Delete id field before performing PUT request (otherwise will fail as this is the URI as well as a field)
	delete updatedArticleObject._id

	request.put({headers: {'content-type': 'application/json'}, url: articlesAPI + articleID, body: JSON.stringify(updatedArticleObject)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.deleteArticle = (articleID) => new Promise((resolve, reject) => {

	request.delete({headers: {'content-type': 'application/json'}, url: articlesAPI + articleID}, (err, resp, body) => {

		resolve(body)
	})
})
