import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'
import * as puppeteer from 'puppeteer'
import {localConfig} from './config'

let config: any;
if(functions.config()?.length) {
  config = functions.config()
} else {
  config = localConfig
}

export const createBookingWithPuppeteer = functions
  .runWith({ memory: '1GB', timeoutSeconds: 120 })
  .https.onRequest(async (request, response) => {
    // let browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    // let browser = await puppeteer.launch({ headless: false, slowMo: 50 })
    let browser = await puppeteer.launch({headless: true})
    let page = await browser.newPage()
    await page.goto('https://github.com')
    await page.setViewport({ width: 1280, height: 1276 })

    let service = config.service
    console.log(service)
    response.send('done')
  });