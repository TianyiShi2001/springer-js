const axios = require("axios").default;
const fs = require("fs");

const { readCookiesToStringSync } = require("./auth");

//stackoverflow.com/questions/55374755/node-js-axios-download-file-and-writefile
https: async function downloadBinary(url, path, cookies = true) {
  let res;
  if (cookies) {
    res = await axios.get(url, {
      withCredentials: true,
      responseType: "stream",
      headers: {
        Cookie: readCookiesToStringSync(),
      },
    });
  } else {
    res = await axios.get(url, {
      withCredentials: true,
      responseType: "stream",
      headers: {
        Cookie: readCookiesToStringSync(),
      },
    });
  }
  res.data.pipe(fs.createWriteStream(path));
}

let u = "https://link.springer.com/content/pdf/10.1007%2F978-3-319-77093-2_14-1.pdf";

module.exports = {
  downloadWithCookies,
};
