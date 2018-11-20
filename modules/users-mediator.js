'use strict'

const request = require('request');

const usersAPI = "http://localhost:8083/api/v1.0/users/"

exports.addUser = (newUserObject) => new Promise((resolve, reject) => {
	
  	request.post({headers: {'content-type': 'application/json'}, url: usersAPI, body: JSON.stringify(newUserObject)}, (err, resp, body) => {
		
		resolve(body)
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
	
	request.put({headers: {'content-type': 'application/json'}, url: usersAPI + userID, body: JSON.stringify(updatedUserObject)}, (err, resp, body) => {

		resolve(body)										
	})							
})

exports.deleteUser = (userID) => new Promise((resolve, reject) => {
		
	request.delete({headers: {'content-type': 'application/json'}, url: usersAPI + userID}, (err, resp, body) => {

		resolve(body)												
	})							
})
