'use strict'

const request = require('request')

const articlesAndEventsAPI = "http://localhost:8081/api/v1.0/"
const commentsAPI = "http://localhost:8082/api/v1.0/"
const usersAPI = "http://localhost:8083/api/v1.0/"

exports.addArticle = async(newArticleObject) => {
    
    const addArticleResponse = await request.post({
                                url: articlesAndEventsAPI + "articles",
                                body: newArticleObject,
                                json: true
                            })
    return addArticleResponse
}

exports.addEvent = async(newEventObject) => {
    
    request.post({
		url: articlesAndEventsAPI + "events",
		body: newEventObject,
		json: true
	  }, (error, response, body) => {
	  console.log(body);
	});
}

exports.addComment = async(newCommentObject) => {
    
    request.post({
		url: commentsAPI + "comments",
		body: newCommentObject,
		json: true
	  }, (error, response, body) => {
	  console.log(body);
	});
}

exports.addUser = async(newUserObject) => {
    
  const addUserResponse = await request.post({ url: usersAPI + "users",
																						body: newUserObject,
																						json: true
																						})
	
	return addUserResponse
}

exports.queryUser = async(existingUserObject) => {

	const queryUserResponse = await request(usersAPI + existingUserObject)
	
	return queryUserResponse
}
