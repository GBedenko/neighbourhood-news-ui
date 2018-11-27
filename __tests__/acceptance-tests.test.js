'use strict'

const puppeteer = require('puppeteer')

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

describe('View Articles', () => {

	test('Can view list of articles', async done => {
		await page.waitFor(1000)
		await page.goto('http://localhost:8080/articles', { waitUntil: 'domcontentloaded' })
		await page.waitFor(1000)
		await page.screenshot({ path: 'screenshots/articles.png', fullPage: true })
        const title = await page.title()
        
		expect(title).toBe('Local News Application - Genaro Bedenko')
		await browser.close()
		done()
	}, 16000)
})
