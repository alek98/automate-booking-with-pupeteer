const puppeteer = require('puppeteer')
const config = require('./config.js')

let browser, page, navigationPromise;
main();

async function main() {
  browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  // browser = await puppeteer.launch({ headless: true})
  page = await browser.newPage()
  navigationPromise = page.waitForNavigation()
  await init()
  await login()
  await chooseLocation()
  await chooseDate()
  await chooseProgram('bodypump')
  await confirmBooking()

  // TODO: uncomment close function for production
  // await browser.close()
}

async function init() {
  await page.goto(config.env.WEBSITE)
  await page.setViewport({ width: 1280, height: 1276 })
  await navigationPromise
}

async function login() {
  await page.waitForSelector('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link')
  await page.click('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link')

  await navigationPromise

  await page.type('.col-md-6 #loginpers', config.env.PERSON)
  await page.type('.col-md-6 #loginpass', config.env.PASSWORD)

  await page.waitForSelector('.row > .col-md-6 > .jumbotron > form > .btn')
  await page.click('.row > .col-md-6 > .jumbotron > form > .btn')

  await navigationPromise
}

async function chooseLocation() {
  await page.waitForSelector('.container > form > .row > .form-group:nth-child(3) > .form-control')
  await page.click('.container > form > .row > .form-group:nth-child(3) > .form-control')
  //Höllviken value 1
  //SKanör value 2
  await page.select('.container > form > .row > .form-group:nth-child(3) > .form-control', '2')

  await navigationPromise
}

async function chooseDate() {
  await page.waitForSelector('.container > form > .row > .form-group:nth-child(1) > .form-control')
  await page.click('.container > form > .row > .form-group:nth-child(1) > .form-control')

  await page.evaluate(() => {
    const example = document.querySelector('select[name="datum"]');
    const example_options = example.querySelectorAll('option');

    const selected_option = example_options[8]
    selected_option.selected = true;

    const event = new Event('change');
    example.dispatchEvent(event);
    return;
  });
  await navigationPromise
}

async function chooseProgram(programName) {
  await page.waitForSelector('.table-responsive .card-body .row')
  let programs = await page.$$('.table-responsive .card-body .row')
  console.log(programs.length)

  for(let i = 0; i < programs.length; i++ ) {

    let time = await programs[i].$('.nobr')
    time = await time.getProperty('innerHTML')
    time = await time.jsonValue()

    // shorthand writing
    let name = await (await (await programs[i].$('.booking-info-link.bold')).getProperty('innerText')).jsonValue();

    let description1 = await (await (await programs[i].$$('.booking-info-link'))[1].getProperty('innerText')).jsonValue();
    let description2 = await (await (await programs[i].$$('.booking-info-link'))[2].getProperty('innerText')).jsonValue();
    let description = `${description1} - ${description2}`

    let data = { time, name, description}

    if (data.name.toLowerCase().includes(programName)) {
      const button = await programs[i].$('.col-4 .btn')
      await button.click()
      break
    }
  }
  await navigationPromise
}

async function confirmBooking() {
  await page.waitForSelector('body > .container > form > p > .btn-success')
  await page.click('body > .container > form > p > .btn-success')
  await navigationPromise
}
