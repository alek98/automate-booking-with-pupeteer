const puppeteer = require('puppeteer');
const config = require('./config.js');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto(config.env.WEBSITE)
  
  await page.setViewport({ width: 919, height: 1319 })
  
  await page.waitForSelector('.table-responsive:nth-child(2) > .card:nth-child(3) > .card-body > .row > .col-4 > .btn')
  await page.click('.table-responsive:nth-child(2) > .card:nth-child(3) > .card-body > .row > .col-4 > .btn')
  
  await page.waitForXPath('//html/body/div[2]/div[3]/div[2]/div[3]/div/div/div[1]/a[contains(text(), "IC 60")')
  await navigationPromise
  
  await browser.close()
})()

// https://stackoverflow.com/questions/62320494/wait-for-an-xpath-in-puppeteer
