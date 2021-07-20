const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: false, slowMo:250})
  const page = await browser.newPage()
  await page.goto('file:///C:/Users/aleka/Desktop/pici/proba/proba.html')

  await page.waitForSelector('body > #mySelect')
  await page.click('body > #mySelect')
  
  await page.select('body > #mySelect', 'BMW')
  
  await page.waitForSelector('body > #mySelect')
  await page.click('body > #mySelect')
  
  await browser.close()
})()

