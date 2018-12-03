'use strict'

const eventsMediator = jest.genMockFromModule('../events-mediator')

// Mock calling Events API to add an event
eventsMediator.addEvent = (newEventObject) => new Promise((resolve, reject) => {

	resolve(true)
})

// Mock calling Events API to get all events
eventsMediator.getAllEvents = (query) => new Promise((resolve, reject) => {

	resolve('[{"_id": 1234, "title": "Test Title"}]')
})

// Mock calling Events API to get one event by id
eventsMediator.getEventByID = (eventID) => new Promise((resolve, reject) => {

	resolve('{"_id": 1234, "title": "Test Title"}')
})

// Mock calling Events API to update an event
eventsMediator.updateEvent = (eventID, updatedEventObject) => new Promise((resolve, reject) => {

	resolve(true)
})

// Mock calling Events API to delete one event
eventsMediator.deleteEvent = (eventID) => new Promise((resolve, reject) => {

	resolve(true)
})

module.exports = eventsMediator
