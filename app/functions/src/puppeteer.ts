import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
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

    // use only when testing locally
    const isEmulated = process.env.FUNCTIONS_EMULATOR;
    if (!isEmulated) return;
    
    await bookToday();
    console.log('done')
    response.send('done')
  });

export const scheduledBooking = functions
  .runWith({ memory: '512MB', timeoutSeconds: 90 })
  .pubsub
  .schedule('* * * * *')
  .timeZone('Europe/Belgrade')
  .onRun(async () => {
    await bookToday();
    console.log('cron job working')
    return null;
  })


async function bookToday() {
  const today = new Date().toLocaleString('en-us', { timeZone: 'Europe/Belgrade', weekday: 'long' })
  const bookingSchedulesSnapshot = await admin
    .firestore()
    .collection('bookingSchedules')
    .where('day', '==', today)
    .get()

  const bookingSchedules = bookingSchedulesSnapshot.docs.map(
    bookingSchedule => bookingSchedule.data() as BookingSchedule)

  for (const schedule of bookingSchedules) {
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
}