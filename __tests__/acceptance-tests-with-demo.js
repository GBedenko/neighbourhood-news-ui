'use strict'

const puppeteer = require('puppeteer')

let page
let browser

describe('Demo of Navigating through Web Application', () => {

    beforeAll( async() => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 40,        
            args: [`--window-size=${2220},${1080}`, '--disable-http2']
        })
        let pages = await browser.pages()
        page = pages[0]
        await page.setViewport({ width: 1850, height: 1080});
    })
    
    afterAll( async() => {
        await page.close()
        await browser.close()
    })

	test('Opening the webpage directs user to the login/register page', async done => {
        
        // Go to welcome page
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' })

        expect(page.url()).toBe('http://localhost:8080/')

        done()

    }, 5000)

	test('Logging in directs user to the all posts page', async done => {

        // Enter login details and log in
        await page.waitForSelector('input[name=email]')
        await page.click('input[name=username]')
        await page.type('input[name=username]', 'Test1')
        await page.waitFor(1000)
        await page.type('input[name=password]', 'test')
        await page.waitFor(1000)
        await page.keyboard.press('Enter');

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/all_posts')

        done()

    }, 6000)

	test('Navigating to view articles only page', async done => {

        // Go to articles only        
        await page.waitForSelector('a[id=articles]')
        await page.click('a[id=articles]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/articles')

        done()

    }, 6000)

	test('Navigating to view events only page', async done => {

        // Go to events only
        await page.waitForSelector('a[id=events]')
        await page.click('a[id=events]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/events')

        done()

    }, 6000)

	test('Navigating to view articles sorted by highest page', async done => {

        // Go to articles highest rated
        await page.waitForSelector('a[id=articles_highest_rated]')
        await page.click('a[id=articles_highest_rated]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/articles?sort=highest_rated')

        done()

    }, 6000)

	test('Navigating to view articles sorted by lowest page', async done => {

        // Go to articles lowest rated        
        await page.waitForSelector('a[id=articles_lowest_rated]')
        await page.click('a[id=articles_lowest_rated]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/articles?sort=lowest_rated')

        done()

    }, 6000)

	test('Navigating to view events sorted by highest page', async done => {

        // Go to events highest rated
        await page.waitForSelector('a[id=events_highest_rated]')
        await page.click('a[id=events_highest_rated]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/events?sort=highest_rated')

        done()

    }, 6000)

	test('Navigating to view events sorted by lowest page', async done => {

        // Go to events lowest rated
        await page.waitForSelector('a[id=events_lowest_rated]')
        await page.click('a[id=events_lowest_rated]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/events?sort=lowest_rated')

        done()

    }, 6000)

	test('Navigating to admin dashboard page', async done => {

        // Go to admin dashboard
        await page.waitForSelector('a[id=admin_dashboard]')
        await page.click('a[id=admin_dashboard]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/admin_dashboard')

        done()

    }, 6000)

	test('Navigating to create an article page', async done => {

        // Go to create article
        await page.waitForSelector('a[id=create_article]')
        await page.click('a[id=create_article]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/create_article')

        done()

    }, 6000)

	test('Navigating to create an event page', async done => {

        // Go to create event
        await page.waitForSelector('a[id=create_event]')
        await page.click('a[id=create_event]')

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/create_event')

        done()

    }, 6000)

	test('Navigating to view an article page', async done => {

        // View an article
        await page.goto('http://localhost:8080/articles/5bf45d17a86fb42417eb7792', { waitUntil: 'domcontentloaded' })

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/articles/5bf45d17a86fb42417eb7792')

        done()

    }, 6000)

	test('Navigating to view an event page', async done => {

        // View an event
        await page.goto('http://localhost:8080/events/5bf27fe84212f00c80d5011a', { waitUntil: 'domcontentloaded' })

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/events/5bf27fe84212f00c80d5011a')

        done()

    }, 6000)

	test('Navigating to a user account page', async done => {

        // View a user
        await page.goto('http://localhost:8080/users/Test2', { waitUntil: 'domcontentloaded' })
        await page.screenshot({ path: 'screenshots/user.png', fullPage: true })

        await page.waitFor(1000)
        expect(page.url()).toBe('http://localhost:8080/users/Test2')

        done()

    }, 6000)
})
