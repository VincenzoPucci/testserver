const Room = require("./room.model");

require("../mongo").connect();

function getRooms(req, res) {
  const docquery = Room.find({});
  docquery
    .exec()
    .then((rooms) => {
      res.status(200).json(rooms);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function postRoom(req, res) {
  const originalRoom = {
    roomType: req.body.roomType,
    roomName: req.body.roomName,
    equipmentList: req.body.equipmentList,
    floor: req.body.floor,
  };
  const room = new Room(originalRoom);
  room.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(room);
    console.log("room has been created");
  });
}

function putRoom(req, res) {
  const id = req.params.id;
  const updRoom = {
    roomType: req.body.roomType,
    roomName: req.body.roomName,
    equipmentList: req.body.equipmentList,
    floor: req.body.floor,
  };
  Room.findOne({ _id: id }, (error, room) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, room)) return;
    room.roomType = checkPut(updRoom.roomType, room.roomType);
    room.roomName = checkPut(updRoom.roomName, room.roomName);
    room.equipmentList = checkPut(updRoom.equipmentList, room.equipmentList);
    room.floor = checkPut(updRoom.floor, room.floor);
    room.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(room);
      console.log("room has been updated");
    });
  });
}

function checkPut(valueToCheck, originalValue) {
  if (valueToCheck) {
    return valueToCheck;
  } else {
    return originalValue;
  }
}

function deleteRoom(req, res) {
  const id = req.params.id;
  Room.findOneAndRemove({ _id: id })
    .then((room) => {
      if (!checkFound(res, room)) return;
      res.status(200).json(room);
      console.log("room has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, room) {
  if (!room) {
    res.status(404).send("room not found");
    return;
  }
  return room;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getRooms,
  postRoom,
  putRoom,
  deleteRoom,
};
