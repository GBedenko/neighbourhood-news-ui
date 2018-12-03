'use strict'

const request = require('request')

const commentsAPI = 'http://localhost:8082/api/v1.0/comments/'

exports.addComment = (newCommentObject) => new Promise((resolve, reject) => {

	// Send POST request to add new comment in Comments API
  	request.post({headers: {'content-type': 'application/json'}, url: commentsAPI, body: JSON.stringify(newCommentObject)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getAllComments = (query) => new Promise((resolve, reject) => {

	request.get({headers: {'content-type': 'application/json'}, url: commentsAPI, body: JSON.stringify(query)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getCommentByID = (commentID) => new Promise((resolve, reject) => {

	request.get({headers: {'content-type': 'application/json'}, url: commentsAPI + commentID}, (err, resp, body) => {

		resolve(body)
	})
})

exports.updateComment = (commentID, updatedCommentObject) => new Promise((resolve, reject) => {

	// Delete id field before performing PUT request (otherwise will fail as this is the URI as well as a field)
	delete updatedCommentObject._id

	request.put({headers: {'content-type': 'application/json'}, url: commentsAPI + commentID, body: JSON.stringify(updatedCommentObject)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.deleteComment = (commentID) => new Promise((resolve, reject) => {

	request.delete({headers: {'content-type': 'application/json'}, url: commentsAPI + commentID}, (err, resp, body) => {

		resolve(body)
	})
})
