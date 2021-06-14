const Occupant = require("./occupant.model");

require("../mongo").connect();

function getOccupants(req, res) {
  const docquery = Occupant.find({});
  docquery
    .exec()
    .then((occupants) => {
      res.status(200).json(occupants);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function postOccupant(req, res) {
  const originalOccupant = {
    occupantAge: req.body.occupantAge,
    limitation: req.body.limitation,
  };
  const occupant = new Occupant(originalOccupant);
  occupant.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(occupant);
    console.log("occupant has been created");
  });
}

function putOccupant(req, res) {
  const id = req.params.id;
  const updOccupant = {
    occupantAge: req.body.occupantAge,
    limitation: req.body.limitation,
  };
  Occupant.findOne({ _id: id }, (error, occupant) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, occupant)) return;
    occupant.occupantAge = checkPut(
      updOccupant.occupantAge,
      occupant.occupantAge
    );
    occupant.limitation = checkPut(updOccupant.limitation, occupant.limitation);

    occupant.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(occupant);
      console.log("occupant has been updated");
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

function deleteOccupant(req, res) {
  const id = req.params.id;
  Occupant.findOneAndRemove({ _id: id })
    .then((occupant) => {
      if (!checkFound(res, occupant)) return;
      res.status(200).json(occupant);
      console.log("occupant has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, occupant) {
  if (!occupant) {
    res.status(404).send("occupant not found");
    return;
  }
  return occupant;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getOccupants,
  postOccupant,
  putOccupant,
  deleteOccupant,
};
