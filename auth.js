const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
const { COOKIES_PATH } = require("./config");

function readCookiesSync() {
  return JSON.parse(fs.readFileSync(COOKIES_PATH, { encoding: "utf8" }));
}

function writeCookiesSync(cookies) {
  fs.writeFileSync(COOKIES_PATH, JSON.stringify(cookies));
}

async function updateCookies() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://link.springer.com/signup-login");
    await driver.wait(until.urlIs("https://link.springer.com/"), 10000000);
    let cookies = await driver.manage().getCookies();
    writeCookiesSync(cookies);
    return cookies;
  } finally {
    await driver.quit();
    console.log("exit");
  }
}

module.exports = {
  readCookiesSync,
  writeCookiesSync,
  updateCookies,
};
