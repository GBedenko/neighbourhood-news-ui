'use strict'

const puppeteer = require('puppeteer')

let page
let browser

const runDemo = async() => {

    // Setup chromium with one tab set to full screen
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 40,        
        args: [`--window-size=${2220},${1080}`, '--disable-http2']
    })

    // Assign page to be the default tab that opens
    let pages = await browser.pages()
    page = pages[0]
    
    await page.setViewport({ width: 1850, height: 1200});
    
    // Go to welcome page
    await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' })

    // Enter login details and log in
    await page.waitFor(2000)
    await page.waitForSelector('input[name=email]')
    await page.click('input[name=username]')
    await page.type('input[name=username]', 'Test1')
    await page.waitFor(1000)
    await page.type('input[name=password]', 'test')
    await page.waitFor(1000)
    await page.keyboard.press('Enter');

    // Scroll through all posts
    page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);
    });

    // Go to articles only
    await page.waitFor(3000)
    await page.waitForSelector('a[id=articles]')
    await page.click('a[id=articles]')

    // Go to events only
    await page.waitFor(3000)
    await page.waitForSelector('a[id=events]')
    await page.click('a[id=events]')

    // Go to articles highest rated
    await page.waitFor(3000)
    await page.waitForSelector('a[id=articles_highest_rated]')
    await page.click('a[id=articles_highest_rated]')

    // Go to articles lowest rated
    await page.waitFor(3000)
    await page.waitForSelector('a[id=articles_lowest_rated]')
    await page.click('a[id=articles_lowest_rated]')

    // Go to events highest rated
    await page.waitFor(3000)
    await page.waitForSelector('a[id=events_highest_rated]')
    await page.click('a[id=events_highest_rated]')

    // Go to events lowest rated
    await page.waitFor(3000)
    await page.waitForSelector('a[id=events_lowest_rated]')
    await page.click('a[id=events_lowest_rated]')

    // Go to admin dashboard
    await page.waitFor(3000)
    await page.waitForSelector('a[id=admin_dashboard]')
    await page.click('a[id=admin_dashboard]')

    // Go to create article
    await page.waitFor(3000)
    await page.waitForSelector('a[id=create_article]')
    await page.click('a[id=create_article]')

    // Go to create event
    await page.waitFor(3000)
    await page.waitForSelector('a[id=create_event]')
    await page.click('a[id=create_event]')

    // View an article
    await page.waitFor(3000)
    await page.goto('http://localhost:8080/articles/5bf45d17a86fb42417eb7792', { waitUntil: 'domcontentloaded' })

    // View an event
    await page.waitFor(3000)
    await page.goto('http://localhost:8080/events/5bf27fe84212f00c80d5011a', { waitUntil: 'domcontentloaded' })

    // Close browser
    await page.waitFor(3000)
    browser.close()
}

runDemo()