'use strict'

const commentsMediator = jest.genMockFromModule('../comments-mediator');

// Mock calling Comments API to add an comment
commentsMediator.addComment = (newCommentObject) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock calling Comments API to get all comments
commentsMediator.getAllComments = (query) => new Promise((resolve, reject) => {

    resolve([{"_id": 1234, "comment": "Test Comment"}])
})

// Mock calling Comments API to get one comment by id
commentsMediator.getCommentByID = (commentID) => new Promise((resolve, reject) => {

    resolve({"_id": 1234, "comment": "Test Comment"})
})

// Mock calling Comments API to update an comment
commentsMediator.updateComment = (commentID, updatedCommentObject) => new Promise((resolve, reject) => {
	
    resolve(true)						
})

// Mock calling Comments API to delete one comment
commentsMediator.deleteComment = (commentID) => new Promise((resolve, reject) => {
	
    resolve(true)					
})

module.exports = commentsMediator