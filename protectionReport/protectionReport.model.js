const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const protectionSchema = new Schema(
  {
    houseID: { type: String, required: true },
    creationDate: Date,
    reportValues: {
      alarmSystem: Boolean,
      phoneline: Boolean,
      fireExercise: Boolean,
      visibleAddress: Boolean,
      snowExit: Boolean,
      extinguisherExit: Boolean,
    },
  },
  {
    collection: "ProtectionReports",
  }
);

const protectionReport = mongoose.model("protectionReport", protectionSchema);

module.exports = protectionReport;
