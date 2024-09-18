const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, putText, getText } = require("../../lib/commands.js");
const {setDefaultTimeout} = require("cucumber");

setDefaultTimeout(50000);

Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  });
  
  After(async function () {
    if (this.browser) {
      await this.browser.close();
    }
  });

  Given("user is on page {string}", async function (string) {
    return await this.page.goto(`${string}`, {
    });
  });

  When("user choose date", async function () {
    return await clickElement(this.page, "a:nth-child(2)");
  });

  When("user choose movie time", async function () {
    return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='199']");
  });

  When("user choose a seat", async function () {
    return await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(2) span:nth-child(1)");
  });

  When("user choose a seat 2", async function () {
    return await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(2) span:nth-child(2)");
  });

  When("user click on the reserve button", async function () {
    return await clickElement(this.page, ".acceptin-button");
  });

  Then("user get the text {string}", async function (string) {
    const actualPayment = await getText(this.page, "h2.ticket__check-title");
    const expectedPayment = await string;
    expect(actualPayment).contains(expectedPayment);
  });

  When("user click on the get code button", async function () {
    return await clickElement(this.page, ".acceptin-button");
  });

  Then("user get the code and text {string}", async function (string) {
    const actualTicket = await getText(this.page, "h2.ticket__check-title");
    const expectedTicket = await string;
    expect(actualTicket).contains(expectedTicket);
  });

  When("user choose an occupied place", async function () {
    await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(2) span:nth-child(1)");
  });

  Then("button for reserving is inactive {string}", async function (string) {
    const actual = String(
      await this.page.$eval("button", (button) => {
        return button.disabled;
      })
    );
    const expected = "true";
    expect(actual).contains(expected);
  });