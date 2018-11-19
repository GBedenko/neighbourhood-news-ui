'use strict'

const request = require('request');

const commentsAPI = "http://localhost:8082/api/v1.0"

exports.addComment = async(newCommentObject) => {
    
    const addCommentResponse = await request.post({ url: commentsAPI + "/comments",
													body: newCommentObject,
													json: true })

	return addCommentResponse
}