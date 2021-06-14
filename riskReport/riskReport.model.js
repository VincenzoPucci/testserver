const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const riskSchema = new Schema(
  {
    houseID: { type: String, required: true },
    riskValue: Number,
    creationDate: Date,
    reportValues: {
      children: Number,
      sleepHelp: Number,
      smoker: Number,
      fireMaterials: Boolean,
      bachelor: Boolean,
      smokeNonFunction: Boolean,
      falseAlarm: {
        type: String,
        enum: ["1-2/mois", "+2/mois", "Jamais"],
        default: "Jamais",
      },
      handicap: Number,
    },
  },
  {
    collection: "RiskReports",
  }
);

const riskReport = mongoose.model("RiskReport", riskSchema);

module.exports = riskReport;
