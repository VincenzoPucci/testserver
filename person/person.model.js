const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    accesKey: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,
    phoneNumber: Number,
    houseIDList: [{ type: String }],
    creationDate: Date,
  },
  {
    collection: "Persons",
  }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
