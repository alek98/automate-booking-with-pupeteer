import { Browser, Page, HTTPResponse, launch } from 'puppeteer';
import { BookingSchedule } from './models/BookingSchedule';
import { Service } from './models/Service';

let browser: Browser;
let page: Page;
let navigationPromise: Promise<HTTPResponse | null>;
let service: Service;
let bookingSchedule: BookingSchedule;

export async function createBooking(myService: Service, myBookingSchedule: BookingSchedule): Promise<void> {
  service = myService;
  bookingSchedule = myBookingSchedule;
  try {
    await book();
    return Promise.resolve();
  } catch (error) {
    console.log('failed');
    console.log(error);
    return Promise.reject();
  } finally {
    await browser.close();
  }
}

async function book() {
  browser = await launch({ headless: false, slowMo: 30 })
  // browser = await launch({ headless: true });
  page = await browser.newPage();
  navigationPromise = page.waitForNavigation();
  await init();
  await login();
  await chooseLocation();
  await chooseDate();
  await chooseProgram();
  await confirmBooking();
}

async function init() {
  await page.goto(service.website);
  await page.setViewport({ width: 1280, height: 1276 });
  await navigationPromise;
}

async function login() {
  await page.waitForSelector('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link');
  await page.click('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link');

  await navigationPromise;

  await page.waitForSelector('.col-md-6 #loginpers');
  await page.waitForSelector('.col-md-6 #loginpass');
  await page.type('.col-md-6 #loginpers', service.person);
  await page.type('.col-md-6 #loginpass', service.password);

  await page.waitForSelector('.row > .col-md-6 > .jumbotron > form > .btn');
  await page.click('.row > .col-md-6 > .jumbotron > form > .btn');

  await navigationPromise;
}

async function chooseLocation() {
  await page.waitForSelector('select[name="PLATSID"]');
  await page.click('select[name="PLATSID"]');
  const select = await page.$('select[name="PLATSID"]');
  const locations = await select?.$$('option');

  if (!locations) throw new Error('not found: location html select element.');

  for (const location of locations) {
    const optionName: string | undefined = await (await location.getProperty('innerText'))?.jsonValue();
    const optionValue: string | undefined = await (await location.getProperty('value'))?.jsonValue();
    if (!optionValue) continue;
    if (optionName?.toLowerCase() === bookingSchedule.location.toLowerCase()) {
      await page.select('select[name="PLATSID"]', optionValue);
      break;
    }
  }
  await navigationPromise;
}

async function chooseDate() {
  await page.waitForSelector('select[name="datum"]');
  await page.click('select[name="datum"]');

  const select = await page.$('select[name="datum"]')
  const dates = await select?.$$('option')
  const lastDate = dates?.pop()
  const optionValue: string | undefined = await (await lastDate?.getProperty('value'))?.jsonValue();
  
  if (!optionValue) throw new Error('not found option value for date.');
  
  await page.select('select[name="datum"]', optionValue)
  await navigationPromise;
}

async function chooseProgram() {
  await page.waitForSelector('.table-responsive .card-body .row');
  const programs = await page.$$('.table-responsive .card-body .row');

  for (const program of programs) {
    const time: string | undefined = await (await (await program.$('.nobr'))?.getProperty('innerHTML'))?.jsonValue();
    // first, check if time is right
    if (time === `${bookingSchedule.startTime} - ${bookingSchedule.endTime}`) {
      // second, if time is right, check is program name is right
      const name: string | undefined = await (await (await program.$('.booking-info-link.bold'))?.getProperty('innerText'))?.jsonValue();
      if (name?.toLowerCase().includes(bookingSchedule.name.toLowerCase())) {
        const button = await program.$('.col-4 .btn');
        await button?.click();
        break;
      }
    }
  }
  await navigationPromise;
}

async function confirmBooking() {
  await page.waitForSelector('body > .container > form > p > .btn-success');
  // TODO: UNCOMMENT FOR PRODUCTION
  // await page.click('body > .container > form > p > .btn-success')
  await navigationPromise;
}
