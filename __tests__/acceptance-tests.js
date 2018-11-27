'use strict'

const puppeteer = require('puppeteer')

let page
let browser

beforeEach( async() => {
	browser = await puppeteer.launch({
		headless: true,
        slowMo: 40,        
		args: [`--window-size=${1920},${1080}`, '--disable-http2']
	})
	page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080});
})

describe('View Webpages', () => {

	test('Can view all posts', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/all_posts', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/all_posts.png', fullPage: true })
        const title = await page.title()
        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view articles list', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/articles', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/articles.png', fullPage: true })
        const title = await page.title()
        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view events list', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/events', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/events.png', fullPage: true })
        const title = await page.title()
        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view an article', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/articles/5bf45d17a86fb42417eb7792', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/article.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view an event', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/events/5bf27fe84212f00c80d5011a', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/event.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view create article form', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/create_article', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/create_article.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view create event form', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/create_event', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/create_event.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view admin dashboard', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/admin_dashboard', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/admin_dashboard.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view user page', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/users/5bf49a2c9cf07a6751732c49', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/user.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})

	test('Can view welcome page', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/welcome.png', fullPage: true })
		const title = await page.title()
		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	})
})
