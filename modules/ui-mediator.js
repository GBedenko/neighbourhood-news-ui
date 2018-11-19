'use strict'

const request = require('request');

const articlesAndEventsAPI = "http://localhost:8081/api/v1.0/"
const commentsAPI = "http://localhost:8082/api/v1.0/"
const usersAPI = "http://localhost:8083/api/v1.0/"

exports.addArticle = async(newArticleObject) => {
    
    const addArticleResponse = await request.post({ url: articlesAndEventsAPI + "articles",
                               						body: newArticleObject,
                                					json: true })
							
    return addArticleResponse
}

exports.getAllArticles = () => new Promise((resolve, reject) => {

	request(articlesAndEventsAPI + "articles", (error, response, body) => {

		resolve(JSON.parse(body))
	})
})

exports.addEvent = async(newEventObject) => {
    
  	const addEventResponse = await request.post({ url: articlesAndEventsAPI + "events",
												  body: newEventObject,
												  json: true })
									
	return addEventResponse
}

exports.getAllEvents = () => new Promise((resolve, reject) => {

	request(articlesAndEventsAPI + "events", (error, response, body) => {

		resolve(JSON.parse(body))
	})
})

exports.addComment = async(newCommentObject) => {
    
    const addCommentResponse = await request.post({ url: commentsAPI + "comments",
													body: newCommentObject,
													json: true })

	return addCommentResponse
}

exports.addUser = async(newUserObject) => {
    
	const addUserResponse = await request.post({ url: usersAPI + "users",
												 body: newUserObject,
												 json: true })
	
	return addUserResponse
}
