'use strict'

const usersMediator = jest.genMockFromModule('../users-mediator');

// Mock calling Users API to add an user
usersMediator.addUser = (newUserObject) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock calling Users API to get all users
usersMediator.getAllUsers = (query) => new Promise((resolve, reject) => {

    resolve('[{"_id": 1234, "username": "test1234"}]')
})

// Mock calling Users API to authenticate a user
usersMediator.authenticateUser = (userObject) => new Promise((resolve, reject) => {

    if(userObject.password == "wrong_password") {
        resolve(false)
    } else {
        resolve(true)
    }
})

// Mock calling Users API to get one user by id
usersMediator.getUserByID = (userID) => new Promise((resolve, reject) => {

    resolve('{"_id": 1234, "username": "test1234"}')
})

// Mock calling Users API to update an user
usersMediator.updateUser = (userID, updatedUserObject) => new Promise((resolve, reject) => {
	
    resolve(true)						
})

// Mock calling Users API to delete one user
usersMediator.deleteUser = (userID) => new Promise((resolve, reject) => {
	
    resolve(true)					
})

module.exports = usersMediator