'use strict'

const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({ toMatchImageSnapshot })

let page
let browser

beforeAll( async() => {
	browser = await puppeteer.launch({
		headless: true,
        slowMo: 40,        
		args: [`--window-size=${1920},${1080}`, '--disable-http2']
	})
	page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080})
})

afterAll( async() => {
	await page.close()
	await browser.close()
})

describe('Webpages appear correctly', () => {

	test('View all posts displays correctly', async done => {

		await page.goto('http://localhost:8080/all_posts', { waitUntil: 'domcontentloaded' })

        const title = await page.title()
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View articles list displays correctly', async done => {

		await page.goto('http://localhost:8080/articles', { waitUntil: 'domcontentloaded' })

        const title = await page.title()        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View articles list sorted by highest rated displays correctly', async done => {

		await page.goto('http://localhost:8080/articles?sort=highest_rated', { waitUntil: 'domcontentloaded' })


        const title = await page.title()        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View articles list sorted by lowest rated displays correctly', async done => {

		await page.goto('http://localhost:8080/articles?sort=lowest_rated', { waitUntil: 'domcontentloaded' })

        const title = await page.title()        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View events list displays correctly', async done => {
		
		await page.goto('http://localhost:8080/events', { waitUntil: 'domcontentloaded' })

        const title = await page.title()        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View events list sorted by highest rated displays correctly', async done => {

		await page.goto('http://localhost:8080/events?sort=highest_rated', { waitUntil: 'domcontentloaded' })

        const title = await page.title()        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View events list sorted by lowest rated displays correctly', async done => {

		await page.goto('http://localhost:8080/events?sort=lowest_rated', { waitUntil: 'domcontentloaded' })

        const title = await page.title()        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View an article displays correctly', async done => {
		
		await page.goto('http://localhost:8080/articles/5bf45d17a86fb42417eb7792', { waitUntil: 'domcontentloaded' })

		const title = await page.title()
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View an event displays correctly', async done => {
		
		await page.goto('http://localhost:8080/events/5bf27fe84212f00c80d5011a', { waitUntil: 'domcontentloaded' })

		const title = await page.title()		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View create article form displays correctly', async done => {
		
		await page.goto('http://localhost:8080/create_article', { waitUntil: 'domcontentloaded' })

		const title = await page.title()		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View create event form displays correctly', async done => {
		
		await page.goto('http://localhost:8080/create_event', { waitUntil: 'domcontentloaded' })

		const title = await page.title()		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View admin dashboard displays correctly', async done => {
		
		await page.goto('http://localhost:8080/admin_dashboard', { waitUntil: 'domcontentloaded' })

		const title = await page.title()		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View user page displays correctly', async done => {
		
		await page.goto('http://localhost:8080/users/5bf49a2c9cf07a6751732c49', { waitUntil: 'domcontentloaded' })

		const title = await page.title()		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})

	test('View welcome page displays correctly', async done => {
		
		await page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' })

		const title = await page.title()		
		expect(title).toBe('Local News Application - Genaro Bedenko')
		
		done()
	})
})

describe('Logging in to the application', () => {

	test('Logging in with correct credentials redirects to all_posts page', async done => {

		// Go to welcome page
		await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' })

		// Enter login details and log in
		await page.waitFor(1000)
		await page.waitForSelector('input[name=email]')
		await page.click('input[name=username]')
		await page.type('input[name=username]', 'Test1')
		await page.waitFor(1000)
		await page.type('input[name=password]', 'test')
		await page.waitFor(1000)
		await page.keyboard.press('Enter')

		await page.waitFor(1000)
		const url = await page.url()
		
		expect(url).toBe('http://localhost:8080/all_posts')

		done()

	}, 10000)

	test('Logging in with incorrect credentials redirects to 404 page', async done => {

		// Go to welcome page
		await page.waitFor(1000)
		await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' })

		// Enter login details and log in
		await page.waitFor(1000)
		await page.waitForSelector('input[name=email]')
		await page.click('input[name=username]')
		await page.type('input[name=username]', 'NotAUser')
		await page.waitFor(1000)
		await page.type('input[name=password]', 'notapassword')
		await page.waitFor(1000)
		await page.keyboard.press('Enter')

		await page.waitFor(1000)
		const url = await page.url()
		
		expect(url).toBe('http://localhost:8080/login')

		done()

	}, 10000)
})


describe('Pinned posts shown on every page', () => {

	test('View all posts page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/all_posts', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View articles page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/articles', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View articles sorted by highest page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/articles?sort=highest_rated', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View articles sorted by lowest page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/articles?sort=lowest_rated', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View events page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/events', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View events sorted by highest page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/events?sort=highest_rated', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View events sorted by lowest page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/events?sort=lowest_rated', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View article page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/articles/5bf45d17a86fb42417eb7792', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View event page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/events/5bf27fe84212f00c80d5011a', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View create article page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/create_article', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View create event page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/create_event', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View admin dashboard page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/admin_dashboard', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})

	test('View user page displays pinned content sidebar', async done => {
	
		await page.goto('http://localhost:8080/users/5bf49a2c9cf07a6751732c49', { waitUntil: 'domcontentloaded' })

		const pinned_content = await page.$('.pinned_content')
		expect(pinned_content).toBeTruthy()
		
		done()
	})
})
