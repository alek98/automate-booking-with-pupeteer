# Automate Booking with Pupeteer

![](https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white)
![](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![](https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB)

In this project headless Chrome is used for automation. The goal of the project is to automate booking & reservation for a specific website. 
Frontend is built using React. Backend is built using Firebase, Firestore, Firebase Cloud Functions & Puppeteer.

User can log in and create multiple booking schedule configurations for each day. 
Firebase schedule function will run each day at midnight (cron job) and it will book a specific program based on user's configuration. User can view bookings created by Firebase functions.  

## Initialization
- Position into app folder with `cd app`. Initialize firebase with `firebase init` command
- Create react app with `npx create-react-app react-app --template typescript`
- Install packages for react&firebase with `npm install firebase react-firebase-hooks`.
