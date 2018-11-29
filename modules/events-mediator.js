'use strict'

const request = require('request');

const eventsAPI = "http://localhost:8081/api/v1.0/events/"

exports.addEvent = (newEventObject) => new Promise((resolve, reject) => {
	
	// Set default extra values for a new article object
	newEventObject.public = false
	newEventObject.pinned = false
	newEventObject.likes = 0
	newEventObject.dislikes = 0

	// Send POST request to add new event in Articles and Events API
  	request.post({headers: {'content-type': 'application/json'}, url: eventsAPI, body: JSON.stringify(newEventObject)}, (err, resp, body) => {
		
		resolve(body)
	})
})

exports.getAllEvents = (query, sortQuery) => new Promise((resolve, reject) => {

	// Append sort value to the request's body, if a sort value exists
	if(sortQuery) query.sort = sortQuery
	
	request.get({headers: {'content-type': 'application/json'}, url: eventsAPI, body: JSON.stringify(query)}, (err, resp, body) => {

		resolve(body)
	})
})

exports.getEventByID = (eventID) => new Promise((resolve, reject) => {
	
	request.get({headers: {'content-type': 'application/json'}, url: eventsAPI + eventID}, (err, resp, body) => {

		resolve(body)
	})
})

exports.updateEvent = (eventID, updatedEventObject) => new Promise((resolve, reject) => {
	
	// Delete id field before performing PUT request (otherwise will fail as this is the URI as well as a field)
	delete updatedEventObject._id

	request.put({headers: {'content-type': 'application/json'}, url: eventsAPI + eventID, body: JSON.stringify(updatedEventObject)}, (err, resp, body) => {

		resolve(body)										
	})							
})

exports.deleteEvent = (eventID) => new Promise((resolve, reject) => {
		
	request.delete({headers: {'content-type': 'application/json'}, url: eventsAPI + eventID}, (err, resp, body) => {

		resolve(body)												
	})							
})
