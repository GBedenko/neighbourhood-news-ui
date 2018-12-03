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
    
    await page.setViewport({ width: 1850, height: 1080});
    
    await page.waitFor(2000)
    await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' })

    await page.waitFor(2000)
    await page.waitForSelector('input[name=username]')
    await page.click('input[name=username]')
    await page.type('input[name=username]', 'Test1')
    await page.waitFor(1000)
    await page.type('input[name=password]', 'test')
    await page.waitFor(1000)
    await page.keyboard.press('Enter');
}

runDemo()