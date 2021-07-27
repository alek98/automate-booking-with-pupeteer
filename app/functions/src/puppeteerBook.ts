import { Browser, Page, HTTPResponse, launch } from 'puppeteer'
import { BookingSchedule } from './models/BookingSchedule';
import { Service } from './models/Service';

let browser: Browser;
let page: Page;
let navigationPromise: Promise<HTTPResponse | null>;
let service: Service;
let bookingSchedule: BookingSchedule;

export async function createBooking(myService: Service, myBookingSchedule: BookingSchedule) {
  service = myService;
  bookingSchedule = myBookingSchedule;
  const bookFunction = book;
  await tryToBook(bookFunction, 20);
}

/**
 * 
 * @param myFunction function to execute
 * @param endTimeInSeconds how much time should function run until it's terminated
 * 
 * This function will try to make a booking depending on schedule from firestore db.
 * If function fails, it will try again for a specified amout of time in seconds.
 */
async function tryToBook(myFunction: () => Promise<void>, endTimeInSeconds: number) {
  const endTime = new Date().getTime() + endTimeInSeconds * 1000
  await _tryToBook(myFunction, endTime);
}

async function _tryToBook(myFunction: () => Promise<void>, endTime: number) {
  try {
    await myFunction();
    // console.log('done successfully')
  } catch (error) {
    console.log('failed. Trying again.')
    console.log(error);

    let currentTime = new Date().getTime();

    let timeout = setTimeout(async () => {

      // check if time is up
      if (currentTime >= endTime) clearTimeout(timeout)

      // if time is not up & function failed, call recursive function
      else await _tryToBook(myFunction, endTime)
    }, 2000);
  }
  finally {
    // console.log('closing browser');
    await browser.close()
  }
}

async function book() {
  browser = await launch({ headless: false, slowMo: 30 })
  // browser = await puppeteer.launch({ headless: true })
  page = await browser.newPage()
  navigationPromise = page.waitForNavigation()
  await init()
  await login()
  await chooseLocation()
  await chooseDate()
  await chooseProgram()
  await confirmBooking()
}

async function init() {
  await page.goto(service.website)
  await page.setViewport({ width: 1280, height: 1276 })
  await navigationPromise
}

async function login() {
  await page.waitForSelector('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link')
  await page.click('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link')

  await navigationPromise

  await page.waitForSelector('.col-md-6 #loginpers')
  await page.waitForSelector('.col-md-6 #loginpass')
  await page.type('.col-md-6 #loginpers', service.person)
  await page.type('.col-md-6 #loginpass', service.password)

  await page.waitForSelector('.row > .col-md-6 > .jumbotron > form > .btn')
  await page.click('.row > .col-md-6 > .jumbotron > form > .btn')

  await navigationPromise
}

async function chooseLocation() {
  await page.waitForSelector('select[name="PLATSID"]')
  await page.click('select[name="PLATSID"]')
  const select = await page.$('select[name="PLATSID"]')
  const locations = await select?.$$('option')

  if (!locations) throw new Error('not found: location html select element.')

  for (let i = 0; i < locations.length; i++) {
    const optionName: string | undefined = await (await locations[i].getProperty('innerText'))?.jsonValue()
    const optionValue: string | undefined = await (await locations[i].getProperty('value'))?.jsonValue()
    if (!optionValue) continue;
    if (optionName?.toLowerCase() === bookingSchedule.location.toLowerCase()) {
      await page.select('select[name="PLATSID"]', optionValue)
      break
    }
  }
  await navigationPromise
}

async function chooseDate() {
  await page.waitForSelector('.container > form > .row > .form-group:nth-child(1) > .form-control')
  await page.click('.container > form > .row > .form-group:nth-child(1) > .form-control')

  await page.evaluate(() => {
    const example: any = document.querySelector('select[name="datum"]');
    const example_options: any = example.querySelectorAll('option');

    const selected_option = example_options[8]
    selected_option.selected = true;

    const event = new Event('change');
    example.dispatchEvent(event);
    return;
  });
  await navigationPromise
}

async function chooseProgram() {
  await page.waitForSelector('.table-responsive .card-body .row')
  let programs = await page.$$('.table-responsive .card-body .row')

  for (const program of programs) {

    const time: string | undefined = await (await (await program.$('.nobr'))?.getProperty('innerHTML'))?.jsonValue()
    // first, check if time is right
    if (time === `${bookingSchedule.startTime} - ${bookingSchedule.endTime}`) {
      // second, if time is right, check is program name is right
      const name: string | undefined = await (await (await program.$('.booking-info-link.bold'))?.getProperty('innerText'))?.jsonValue();
      if (name?.toLowerCase().includes(bookingSchedule.name.toLowerCase())) {
        console.log(`found ${name}`)
        const button = await program.$('.col-4 .btn')
        await button?.click()
        break
      }
    }
  }
  await navigationPromise
}

  async function confirmBooking() {
    await page.waitForSelector('body > .container > form > p > .btn-success')
    // TODO: UNCOMMENT FOR PRODUCTION
    // await page.click('body > .container > form > p > .btn-success')
    await navigationPromise
  }
