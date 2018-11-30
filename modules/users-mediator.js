'use strict'

// Import required libraries
const request = require('request')
const bcrypt = require('bcrypt')

const usersAPI = "http://localhost:8083/api/v1.0/users/"

exports.addUser = (newUserObject) => new Promise((resolve, reject) => {
	
  	request.post({headers: {'content-type': 'application/json'}, url: usersAPI, body: JSON.stringify(newUserObject)}, (err, resp, body) => {
		
		resolve(body)
	})
})

exports.authenticateUser = (userObject) => new Promise((resolve, reject) => {

	// Using Basic Authorizations standards for authentication requests between user and backend APIs

	// Join the username and password with a colon seperator
	let authorizationHeader = userObject.username + ":" + userObject.password
	
	// Encode the username and password using base 64
	authorizationHeader = Buffer.from(authorizationHeader).toString('base64')
	
	// Append Basic to the front to show server that this is a Basic Auth request
	authorizationHeader = "Basic " + authorizationHeader
	
	// HEAD request to the Users API, which will return appropiate status code for whether the user is authorised or not
	request.head(usersAPI + userObject.username, {headers: {'Authorization': authorizationHeader}}, (err, resp, body) => {

		if(resp.statusCode == 200) {			
			resolve(true)
		
		} else {
			resolve(false)
		}
		
	})
})

exports.getAllUsers = (query) => new Promise((resolve, reject) => {
	request.get({headers: {'content-type': 'application/json'}, url: usersAPI, body: JSON.stringify(query)}, (err, resp, body) => {
		
		resolve(body)
	})
})

exports.getUserByID = (userID) => new Promise((resolve, reject) => {
	
	request.get({headers: {'content-type': 'application/json'}, url: usersAPI + userID}, (err, resp, body) => {

		resolve(body)
	})
})

exports.updateUser = (userID, updatedUserObject) => new Promise((resolve, reject) => {
	
	// Delete id field before performing PUT request (otherwise will fail as this is the URI as well as a field)
	delete updatedUserObject._id

	request.put({headers: {'content-type': 'application/json'}, url: usersAPI + userID, body: JSON.stringify(updatedUserObject)}, (err, resp, body) => {

		resolve(body)										
	})							
})

exports.deleteUser = (userID) => new Promise((resolve, reject) => {
		
	request.delete({headers: {'content-type': 'application/json'}, url: usersAPI + userID}, (err, resp, body) => {

		resolve(body)												
	})							
})
