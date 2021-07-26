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
    // console.log('failed. Trying again.')
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
  browser = await launch({ headless: false, slowMo: 100 })
  // browser = await puppeteer.launch({ headless: true })
  page = await browser.newPage()
  navigationPromise = page.waitForNavigation()
  await init()
  await login()
  await chooseLocation()
  await chooseDate()
  await chooseProgram()
  // TODO: uncomment function for production
  // await confirmBooking()
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

  for (let i = 0; i < programs.length; i++) {

    const time: string | undefined = await (await (await programs[i].$('.nobr'))?.getProperty('innerHTML'))?.jsonValue()

    const name: string | undefined = await (await (await programs[i].$('.booking-info-link.bold'))?.getProperty('innerText'))?.jsonValue();

    const today = new Date()
    const data = { time, name, today }

    // find program by name, time & day of the week
    if (
      data.name?.toLowerCase().includes(bookingSchedule.name) &&
      data.time === `${bookingSchedule.startTime} - ${bookingSchedule.endTime}` &&
      data.today.toLocaleString('us', { weekday: 'long' }) === bookingSchedule.day
    ) {
      const button = await programs[i].$('.col-4 .btn')
      await button?.click()
      break
    }
  }
  await navigationPromise
}

// async function confirmBooking() {
//   await page.waitForSelector('body > .container > form > p > .btn-success')
//   await page.click('body > .container > form > p > .btn-success')
//   await navigationPromise
// }
