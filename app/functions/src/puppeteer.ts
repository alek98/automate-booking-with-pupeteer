import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as puppeteer from 'puppeteer'
import { localConfig } from './config'
import { BookingSchedule } from './models/BookingSchedule';
import { createBooking } from './puppeteerBook';

let config: any;
if (Object.keys(functions.config()).length) config = functions.config()
else config = localConfig
let service = config.service

export const createBookingWithPuppeteer = functions
  .runWith({ memory: '512MB', timeoutSeconds: 90 })
  .https.onRequest(async (request, response) => {

    const today = new Date().toLocaleString('en-us', { timeZone: 'Europe/Belgrade', weekday: 'long' })
    const bookingSchedulesSnapshot = await admin
      .firestore()
      .collection('bookingSchedules')
      .where('day', '==', today)
      .get()

    const bookingSchedules = bookingSchedulesSnapshot.docs.map(
      bookingSchedule => bookingSchedule.data() as BookingSchedule)

    for(const schedule of bookingSchedules) {
      try {
      await createBooking(service, schedule)
      await admin.firestore().collection('bookingHistory').add({
        ...schedule,
        bookedAt: admin.firestore.FieldValue.serverTimestamp()
      })     
      } catch (error) {
        console.log('error cought')
      }
    }
    // TODO: LOAD ACTUAL BOOKING SCHEDULE
    // TODO: ADD CRON JOB
    console.log('done')
    response.send('done')
  });

export const scheduledBooking = functions.pubsub
  .schedule('* * * * *')
  .timeZone('Europe/Belgrade')
  .onRun((context) => {
    console.log('cron job working')
    return null;
  })



export const temp = functions.runWith({ memory: '1GB', timeoutSeconds: 60 })
  .https.onRequest(async (request, response) => {
    // let browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    let browser = await puppeteer.launch({ headless: false, slowMo: 50 })
    // let browser = await puppeteer.launch({headless: true})
    let page = await browser.newPage()
    await page.goto(service.website)
    await page.setViewport({ width: 1280, height: 1276 })

    console.log(service.website)
    response.send('done')
  });