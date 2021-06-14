const House = require("./house.model");

require("../mongo").connect();

function getHouses(req, res) {
  const docquery = House.find({});
  docquery
    .exec()
    .then((houses) => {
      res.status(200).json(houses);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function getHouse(req, res) {
  const id = req.params.id;
  const docquery = House.findOne({ _id: id });
  docquery
    .exec()
    .then((House) => {
      res.status(200).json(House);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function getHousesPerson(req, res) {
  const houseList = {
    houseIDList: req.body.houseIDList,
  };
  console.log(req.body);
  console.log(houseList.houseIDList);
  const docquery = House.find({ _id: { $in: houseList.houseIDList } });
  docquery
    .exec()
    .then((Houses) => {
      res.status(200).json(Houses);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function postHouse(req, res) {
  const originalHouse = {
    familyID: req.body.familyID,
    address: req.body.address,
    inhabitantNumber: req.body.inhabitantNumber,
    buildingYear: req.body.buildingYear,
    roomIDList: req.body.roomIDList,
    garage: req.body.garage,
    nbFloor: req.body.nbFloor,
  };
  const house = new House(originalHouse);
  house.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(house);
    console.log("house has been created");
  });
}

function putHouse(req, res) {
  const id = req.params.id;
  const updHouse = {
    familyID: req.body.familyID,
    address: req.body.address,
    inhabitantNumber: req.body.inhabitantNumber,
    buildingYear: req.body.buildingYear,
    roomIDList: req.body.roomIDList,
    garage: req.body.garage,
    nbFloor: req.body.nbFloor,
  };
  House.findOne({ _id: id }, (error, house) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, house)) return;
    house.address = checkPut(updHouse.address, house.address);
    house.inhabitantNumber = checkPut(
      updHouse.inhabitantNumber,
      house.inhabitantNumber
    );
    house.buildingYear = checkPut(updHouse.buildingYear, house.buildingYear);
    house.roomIDList = checkPut(updHouse.roomIDList, house.roomIDList);
    house.garage = checkPut(updHouse.garage, house.garage);
    house.nbFloor = checkPut(updHouse.nbFloor, house.nbFloor);
    house.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(house);
      console.log("house has been updated");
    });
  });
}

function addRoom(req, res) {
  const id = req.params.id;
  const updHouse = {
    roomID: req.body.roomID,
  };
  House.findOne({ _id: id }, (error, house) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, house)) return;
    house.roomIDList.push(updHouse.roomID);
    house.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(house);
      console.log("house has been updated");
    });
  });
}

function removeRoom(req, res) {
  const id = req.params.id;
  const updHouse = {
    roomID: req.body.roomID,
  };
  House.findOne({ _id: id }, (error, house) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, house)) return;
    house.roomIDList = house.roomIDList.filter(function (value) {
      return value != updHouse.roomID;
    });
    house.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(house);
      console.log("house has been updated");
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

function deleteHouse(req, res) {
  const id = req.params.id;
  House.findOneAndRemove({ _id: id })
    .then((house) => {
      if (!checkFound(res, house)) return;
      res.status(200).json(house);
      console.log("house has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, house) {
  if (!house) {
    res.status(404).send("house not found");
    return;
  }
  return house;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getHouses,
  postHouse,
  putHouse,
  deleteHouse,
  addRoom,
  removeRoom,
  getHouse,
  getHousesPerson,
};
