const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless:false})
  const page = await browser.newPage()
  
  await page.goto('https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event')
  
  await page.setViewport({ width: 1278, height: 619 })
  
  await page.waitForSelector('#root > .page-wrapper > #content > .main-page-content > div:nth-child(2)')
  await page.click('#root > .page-wrapper > #content > .main-page-content > div:nth-child(2)')
  
  let frames = await page.frames()
  const frame_281 = frames.find(f => f.url() === 'https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/HTMLElement/change_event/_samples_/select-example')
  await frame_281.waitForSelector('html')
  await frame_281.click('html')
  
  await frame_281.waitForSelector('body > label > .ice-cream')
  await frame_281.click('body > label > .ice-cream')
  
  await frame_281.select('body > label > .ice-cream', 'chocolate')
  
  await frame_281.waitForSelector('body > label > .ice-cream')
  await frame_281.click('body > label > .ice-cream')
  
  await page.screenshot({ path: 'select.png' });
  await browser.close()
})()