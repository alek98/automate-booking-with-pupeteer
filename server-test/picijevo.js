const puppeteer = require('puppeteer');
const config = require('./config.js');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo:50})
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto(config.env.WEBSITE);
    
  await page.setViewport({ width: 2560, height: 1297 })

  await page.waitForSelector('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link')
  await page.click('.navbar > #webboknav > .navbar-nav > .nav-item:nth-child(3) > .nav-link')
  
  await navigationPromise
    
  await page.type('.col-md-6 #loginpers', config.env.PERSON)
  await page.type('.col-md-6 #loginpass', config.env.PASSWORD)
  
  await page.waitForSelector('.row > .col-md-6 > .jumbotron > form > .btn')
  await page.click('.row > .col-md-6 > .jumbotron > form > .btn')
  
  await navigationPromise
  // proveri vreme, ako je vece od 00.00 a manje od 00.05 onda neka nastavi
  
  // kada nastavi uraditi refresh stranice i odabrati datum+7 dana 
  await page.waitForSelector('.container > form > .row > .form-group:nth-child(3) > .form-control')
  await page.click('.container > form > .row > .form-group:nth-child(3) > .form-control')
  //Höllviken value 1
  //SKanör value 2
  await page.select('.container > form > .row > .form-group:nth-child(3) > .form-control', '2')
  
  await page.waitForSelector('.container > form > .row > .form-group:nth-child(3) > .form-control')
  await page.click('.container > form > .row > .form-group:nth-child(3) > .form-control')
  
  await navigationPromise
  
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
  
  const element = await page.$x("body > div:nth-child(5) > div:nth-child(4) > div > div:nth-child(6) > div > div > div.col-4 > .btn");
  const textObject = await element[0].getProperty('textContent');
  const text = textObject._remoteObject.value;
  console.log(text);

  //const element = await page.$x('div > div > div.col-8 > a.booking-info-link.bold');
  //                             /html/body/div[2]/div[3]/div/div[6]/div/div/div[1]/a[1]
  //const element1 = document.querySelector("body > div:nth-child(5) > div:nth-child(4) > div > div:nth-child(6) > div > div > div.col-8 > a.booking-info-link.bold")
  
  //await page.waitForSelector('.card:nth-child(6) > .card-body > .row > .col-4 > .btn')
  //await page.click(element2)
  
  await navigationPromise

  // const textObject = await element[0].getProperty('BODYPUMP® 30');
  
  // const href = textObject._remoteObject.value;
  // console.log(href);

//div[text()[contains(.,'BODYCOMBAT®')]]

//  await page.waitForSelector('.card:nth-child(7) > .card-body > .row > .col-4 > .btn')
//  await page.click('.card:nth-child(7) > .card-body > .row > .col-4 > .btn')
//  await navigationPromise


// const [button] = await page.$x("//div[@class='elements']/button[contains(., 'Button text')]");

 // await page.$x('div[text()[contains(., 'BODYPUMP®')]]')
 // const elements = await page.$x('div[text()[contains(., 'BODYPUMP®')]]')
// await elements[0].click() 
 
//  await browser.close()



// za startovanje kucas: node formtoppen1.js
//alek : node .\formtoppen1.js

// za stop kucas: ctrl+c
})()