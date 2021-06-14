const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomType: String,
    roomName: String,
    equipmentList: [{ type: String }],
    floor: Number,
  },
  {
    collection: "Rooms",
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
