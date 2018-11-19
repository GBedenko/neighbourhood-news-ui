'use strict'

const request = require('request');

const usersAPI = "http://localhost:8083/api/v1.0"

exports.addUser = async(newUserObject) => {
    
	const addUserResponse = await request.post({ url: usersAPI + "/users",
												 body: newUserObject,
												 json: true })
	
	return addUserResponse
}
