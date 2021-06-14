const mongoose = require("mongoose");
/**
 * Set to Node.js native promises
 * Per https://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require("./environment/environment");

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.mongo.cosmos.azure.com:${env.port}/${env.databaseName}?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@inspectia-db@`;

function connect() {
  // console.log(mongoUri);
  mongoose.set("debug", true);
  mongoose.set('useCreateIndex', true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set('useUnifiedTopology', true);
  return mongoose.connect(mongoUri);
}

module.exports = {
  connect,
  mongoose,
};
