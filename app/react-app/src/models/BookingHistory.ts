import firebase from 'firebase/app';

export interface BookingHistory {
  id?: string,
  day: string,
  name: string,
  location: string,
  startTime: string,
  endTime: string,
  bookedAt: firebase.firestore.Timestamp
}