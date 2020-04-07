const { SpringerBook } = require("./index.js");
const auth = require("./auth");
const { Builder, By, Key, until } = require("selenium-webdriver");

let testNewSpringerBookFromUrl = async () => {
  let urls = {
    openUrl: "http://link.springer.com/openurl?genre=book&isbn=978-3-319-72000-5",
    finalUrl: "https://link.springer.com/book/10.1007%2F978-3-319-72000-5",
    doiUrl: "http://doi.org/10.1007/978-3-319-72000-5",
    badUrl: "https://google.com",
  };
  for (k of Object.keys(urls)) {
    const url = urls[k];
    try {
      let b = await new SpringerBook().fromUrl(url);
      console.log({ [k]: b });
    } catch (error) {
      console.error(error.name, ": ", error.message);
    }
  }
};

let testReadCookies = () => {
  let cookies = auth.readCookiesSync();
  for (cookie of cookies) {
    console.log(cookie);
  }
};

let validateCookies = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    cookies = auth.readCookiesSync();
    await driver.get("https://link.springer.com/referenceworkentry/10.1007/978-3-319-77093-2_14-1");
    for (cookie of cookies) {
      await driver.manage().addCookie(cookie);
    }
    driver.navigate().refresh();
    await driver.wait(() => false, 10000000);
  } finally {
    console.log("exit");
    await driver.quit();
  }
};

testReadCookies();
validateCookies().then(console.log).catch(console.error);
