const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const houseSchema = new Schema(
  {
    familyID: { type: String, required: true },
    address: {
      street: String,
      app: String,
      city: String,
      province: String,
      postalCode: String,
      country: String,
    },
    inhabitantNumber: Number,
    buildingYear: Number,
    roomIDList: [{ type: String }],
    garage: Boolean,
    nbFloor: Number,
  },
  {
    collection: "Houses",
  }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
