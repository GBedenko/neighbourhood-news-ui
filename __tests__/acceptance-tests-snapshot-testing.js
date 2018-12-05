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
    await page.setViewport({ width: 1920, height: 1080});
})

afterAll( async() => {
	await page.close()
	await browser.close()
})

describe('Snapshots of interfaces have not changed', () => {

	test('All posts page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/all_posts', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'all_posts'})
		
		done()
	})

	test('Articles page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/articles', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'articles'})
		
		done()
	})

	test('Articles sorted by highest page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/articles_highest_rated', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'articles_highest_rated'})
		
		done()
	})

	test('Articles sorted by lowest page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/articles_lowest_rated', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'articles_lowest_rated'})
		
		done()
	})

	test('Events page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/events', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'events'})
		
		done()
	})

	test('Events sorted by highest page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/events_highest_rated', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'events_highest_rated'})
		
		done()
	})

	test('Events sorted by lowest page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/events_lowest_rated', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'events_lowest_rated'})
		
		done()
	})

	test('View article page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/articles/5bf45d17a86fb42417eb7792', { waitUntil: 'domcontentloaded' })

        await page.waitFor(1000)
		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'article'})
		
		done()
	})

	test('View event page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/events/5bf27fe84212f00c80d5011a', { waitUntil: 'domcontentloaded' })

        await page.waitFor(1000)
		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'event'})
		
		done()
	})

	test('Create article page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/create_article', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'create_article'})
		
		done()
	})

	test('Create event page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/create_event', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'create_event'})
		
		done()
	})

	test('Admin Dashboard page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/admin_dashboard', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'admin_dashboard'})
		
		done()
	})

	test('View user page screenshot is the same', async done => {

		await page.goto('http://localhost:8080/users/5bf49a2c9cf07a6751732c49', { waitUntil: 'domcontentloaded' })

		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'user'})
		
		done()
	})

	test('Welcome page screenshot is the same', async done => {

		await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' })

        await page.waitFor(1000)
		const screenshot = await page.screenshot()

		expect(screenshot).toMatchImageSnapshot({customSnapshotIdentifier: 'welcome'})
		
		done()
	})
})