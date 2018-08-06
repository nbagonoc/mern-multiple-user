if (process.env.NODE_ENV === "production") {
  module.exports = require("./dbSecretKeysProd");
} else {
  module.exports = require("./dbSecretKeysDev");
}
