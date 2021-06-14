const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationReportSchema = new Schema(
  {
    houseID: { type: String, required: true },
    creationDate: Date,
    reportValues: {
      constructionYear: Number,
      renovation: Number,
      basementType: {
        type: String,
        enum: ["Habitable", "Vide sanitaire", "Aucun"],
        default: "Aucun",
      },
      nbFloors: Number,
      garage: Boolean,
      liveFlame: Boolean,
    },
  },
  {
    collection: "locationReports",
  }
);

const locationReport = mongoose.model("locationReport", locationReportSchema);

module.exports = locationReport;
