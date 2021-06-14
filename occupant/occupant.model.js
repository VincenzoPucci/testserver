const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const occupantSchema = new Schema(
  {
    occupantAge: { type: Number, required: true},
    limitation:{
      type: String,
      enum: ["non", "oui", "Handicap lourd"],
      default: "Aucun",
    }

  },
  {
    collection: 'Occupants'
  }
);

const Occupant = mongoose.model('Occupants', occupantSchema);

module.exports = Occupant;
