const request = require('supertest');
const app = require('../index')

jest.mock('../modules/articles-mediator')
jest.mock('../modules/comments-mediator')
jest.mock('../modules/events-mediator')
jest.mock('../modules/users-mediator')

describe('GET /', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('POST /register', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).post('/register').send({emailAddress: "test@email", username: "test_username", password: "test_password"})
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('POST /login', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).post('/login').send({emailAddress: "test@email", username: "test_username", password: "test_password"})
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /all_posts', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/all_posts')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('GET /articles', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/articles')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('GET /articles/:article_id', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/articles/1234')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('POST /articles', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).post('/articles').send({heading: "Test Heading"})
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /events', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/events')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('GET /events/:event_id', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/events/1234')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('POST /events', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).post('/events').send({title: "Test Title"})
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /create_article', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/create_article')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('GET /create_event', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/create_event')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('GET /admin_dashboard', () => {
    
    // Test that a request recieves the correct status code
    test('Requesting endpoint returns a 200 status code', async done => {
    
        const response = await request(app).get('/admin_dashboard')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('GET /articles/pin/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/articles/pin/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /articles/unpin/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/articles/unpin/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /events/pin/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/events/pin/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /events/unpin/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/events/unpin/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /articles/make_public/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/articles/make_public/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /articles/make_private/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/articles/make_private/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /events/make_public/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/events/make_public/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /events/make_private/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/events/make_private/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /like_article/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/like_article/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /dislike_article/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/dislike_article/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /like_event/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/like_event/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /dislike_event/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/dislike_event/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /like_user/:user_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/like_user/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /dislike_user/:user_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/dislike_user/1234')
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('GET /users/:user_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).get('/users/1234')
    
        expect(response.status).toEqual(200)
    
        done()
    })
})

describe('POST /article/add_comment/:article_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).post('/article/add_comment/1234').send({comment: "Test Comment"})
    
        expect(response.status).toEqual(302)
    
        done()
    })
})

describe('POST /event/add_comment/:event_id', () => {
    
    // Test that this request redirects correctly
    test('Requesting endpoint returns a 302 redirect status code', async done => {
    
        const response = await request(app).post('/event/add_comment/1234').send({comment: "Test Comment"})
    
        expect(response.status).toEqual(302)
    
        done()
    })
})
