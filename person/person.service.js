const Person = require("./person.model");

require("../mongo").connect();

function getPersons(req, res) {
  const docquery = Person.find({});
  docquery
    .exec()
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function verifyPerson(req, res) {
  const id = req.params.id;
  const docquery = Person.findOne({ accesKey: id });
  docquery
    .exec()
    .then((person) => {
      res.status(200).json(person);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function postPerson(req, res) {
  const originalPerson = {
    accesKey: req.body.accesKey,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    houseIDList: req.body.houseIDList,
    creationDate: req.body.creationDate,
  };
  const person = new Person(originalPerson);
  person.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(person);
    console.log("person has been created");
  });
}

function putPerson(req, res) {
  const id = req.params.id;
  const updatedPerson = {
    accesKey: req.body.accesKey,
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    houseIDList: req.body.houseIDList,
    creationDate: req.body.creationDate,
  };
  Person.findOne({ _id: id }, (error, person) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, person)) return;
    person.name = checkPut(updatedPerson.name, person.name);
    person.phoneNumber = checkPut(
      updatedPerson.phoneNumber,
      person.phoneNumber
    );
    person.houseIDList = checkPut(
      updatedPerson.houseIDList,
      person.houseIDList
    );
    person.creationDate = checkPut(
      updatedPerson.creationDate,
      person.creationDate
    );
    person.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(person);
      console.log("person has been updated");
    });
  });
}

function addHouse(req, res) {
  const id = req.params.id;
  const updatedPerson = {
    houseID: req.body.houseID,
  };
  Person.findOne({ _id: id }, (error, person) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, person)) return;
    person.houseIDList.push(updatedPerson.houseID);
    person.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(person);
      console.log("person has been updated");
    });
  });
}

function removeHouse(req, res) {
  const id = req.params.id;
  const updatedPerson = {
    houseID: req.body.houseID,
  };
  Person.findOne({ _id: id }, (error, person) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, person)) return;
    person.houseIDList = person.houseIDList.filter(function (value) {
      return value != updatedPerson.houseID;
    });
    person.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(person);
      console.log("person has been updated");
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

function deletePerson(req, res) {
  const id = req.params.id;
  Person.findOneAndRemove({ _id: id })
    .then((person) => {
      if (!checkFound(res, person)) return;
      res.status(200).json(person);
      console.log("person has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, person) {
  if (!person) {
    res.status(404).send("Person not found");
    return;
  }
  return person;
}

function checkServerError(res, error) {
  console.log(error);
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getPersons,
  postPerson,
  putPerson,
  deletePerson,
  addHouse,
  removeHouse,
  verifyPerson,
};
