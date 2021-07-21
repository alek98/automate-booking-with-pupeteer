const puppeteer = require('puppeteer')
const config = require('./config.js')

let browser, page, navigationPromise;
main();

async function main() {
  // browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  browser = await puppeteer.launch({ headless: true})
  page = await browser.newPage()
  navigationPromise = page.waitForNavigation()
  await init()
  // TODO: uncomment login function for production
  // login()
  await chooseLocation()
  await chooseDate()
  // await chooseProgram()

  // TODO: uncomment close function for production
  await browser.close()
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

async function chooseProgram() {
  const PROGRAM = 'bodypump';
  await page.waitForSelector('.table-responsive > .card:nth-child(2) > .card-body > .row > .col-8')

  // https://github.com/puppeteer/puppeteer/blob/v10.1.0/docs/api.md#pageselector-1
  const programs = await page.$$('.table-responsive .card-body');
  // programs.forEach(async program => {
  //   const dataElem = await page.$('col-8');

  // })

  // https://stackoverflow.com/questions/49236981/want-to-scrape-table-using-puppeteer-how-can-i-get-all-rows-iterate-through-ro
  const data = await page.evaluate(() => {
    const programs = document.querySelectorAll('.table-responsive .card-body')
    return programs;
    // programs.forEach(program => {
    //   const dataElem = program.querySelector('col-8');
    //   const data = {
    //     'time': undefined, 
    //     'name': undefined, 
    //     'description': undefined
    //   }
    //   data.time = dataElem.childNodes[0];
    //   data.name = ataElem.childNodes[1];
    // })
  })
  await navigationPromise

}
