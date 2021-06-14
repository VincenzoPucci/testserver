const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detectorSchema = new Schema(
  {
    detectorID: { type: Number, required: true, unique: true },
    serialNumber: String,
    detectorType:  {
      type: String,
      enum: ["Smoke", "CO", "Pentagone"],
      default: "Aucun",
    },
    brand: String,
    model: String,
    expirationDate: Date,
    wiredElectricity: {
      type: String,
      enum: ["oui", "non", "inconnu"],
      default: "Aucun",
    },
    interconnected:{
      type: String,
      enum: ["oui", "non", "inconnu"],
      default: "Aucun",
    },
    alarmSystem: {
      type: String,
      enum: ["oui", "non", "inconnu"],
      default: "Aucun",
    },
    detectionType: {
      type: String,
      enum: ["Ionisation", "Photo-electrique", "Co- Monoxide de carbone"],
      default: "Aucun",
    },
    batteryType:  {
      type: String,
      enum: ["None", "AA", "AAA", "C"],
      default: "Aucun",
    },
    amountBatteries: Number,
    falseAlarm:Number,
    position :  {
      type: String,
      enum: ["front", "middle", "back"],
      default: "Aucun",
    },
    pictureFront: String,
    pictureBack: String
  },

  {
    collection: 'Detectors'
  }
);

const Detector = mongoose.model('Detector', detectorSchema);

module.exports = Detector;
