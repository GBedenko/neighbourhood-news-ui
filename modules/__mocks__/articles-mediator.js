'use strict'

const articlesMediator = jest.genMockFromModule('../articles-mediator');

// Mock calling Articles API to add an article
articlesMediator.addArticle = (newArticleObject) => new Promise((resolve, reject) => {
    
    resolve(true)
})

// Mock calling Articles API to get all articles
articlesMediator.getAllArticles = (query) => new Promise((resolve, reject) => {

    resolve('[{"_id": 1234, "heading": "Test Heading"}]')
})

// Mock calling Articles API to get one article by id
articlesMediator.getArticleByID = (articleID) => new Promise((resolve, reject) => {

    resolve('{"_id": 1234, "heading": "Test Heading"}')
})

// Mock calling Articles API to update an article
articlesMediator.updateArticle = (articleID, updatedArticleObject) => new Promise((resolve, reject) => {
	
    resolve(true)						
})

// Mock calling Articles API to delete one article
articlesMediator.deleteArticle = (articleID) => new Promise((resolve, reject) => {
	
    resolve(true)					
})

module.exports = articlesMediator