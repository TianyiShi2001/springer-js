const { SpringerBook } = require("./index.js");

(async () => {
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
})();
