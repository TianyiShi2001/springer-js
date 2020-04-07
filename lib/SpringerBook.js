const axios = require("axios").default;

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class BadUrlError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = "BadUrlError";
  }
}

class SpringerBadUrlError extends BadUrlError {
  constructor(responseUrl, expectedUrl) {
    super(`Unable to redirect to a Springer site! Response URL: ${responseUrl}\n    Expecting something like: ${expectedUrl}`);
  }
}

class SpringerBookBadUrlError extends SpringerBadUrlError {
  constructor(responseUrl) {
    super(responseUrl, "https://link.springer.com/book/10.1007%2F978-981-10-8321-1");
  }
}

class Springer {
  baseUrl = "https://link.springer.com";
}

class SpringerBook extends Springer {
  constructor(id) {
    super();
    this.id = id;
    this.url = `${this.baseUrl}/book/${id}`;
  }
  async fromUrl(url) {
    try {
      const res = await axios.get(url);
      const responseUrl = res.request.res.responseUrl;
      if (responseUrl.includes("link.springer.com/book")) {
        const id = responseUrl.split("/").pop();
        return new SpringerBook(id);
      } else {
        throw new SpringerBookBadUrlError(responseUrl);
      }
    } catch (e) {
      throw e;
    }
  }
  getPdfUrl() {
    return `${this.baseUrl}/content/pdf/${this.id}.pdf`;
  }
}

module.exports = SpringerBook;
