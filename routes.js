const express = require("express");
const router = express.Router();
const detectorService = require("./detector/detector.service");
const personService = require("./person/person.service");
const houseService = require("./house/house.service");
const occupantService = require("./occupant/occupant.service");

const locationReportService = require("./locationReport/locationReport.service");
const riskReportService = require("./riskReport/riskReport.service");
const protectionReportService = require("./protectionReport/protectionReport.service");
const roomService = require("./room/room.service");

router.get("/Detectors", (req, res) => {
  detectorService.getDetectors(req, res);
});

// PERSON
router.get("/get/persons", (req, res) => {
  personService.getPersons(req, res);
});

router.get("/get/verifyPerson/:id", (req, res) => {
  personService.verifyPerson(req, res);
});

router.post("/post/person", (req, res) => {
  personService.postPerson(req, res);
});

router.put("/put/person/:id", (req, res) => {
  personService.putPerson(req, res);
});

router.delete("/delete/person/:id", (req, res) => {
  personService.deletePerson(req, res);
});

router.put("/put/addHouse/:id", (req, res) => {
  personService.addHouse(req, res);
});

router.put("/put/removeHouse/:id", (req, res) => {
  personService.removeHouse(req, res);
});

// HOUSE
router.get("/get/houses", (req, res) => {
  houseService.getHouses(req, res);
});

router.get("/get/house/:id", (req, res) => {
  houseService.getHouse(req, res);
});

router.post("/post/house", (req, res) => {
  houseService.postHouse(req, res);
});

router.put("/get/housesPerson", (req, res) => {
  houseService.getHousesPerson(req, res);
});

router.put("/put/house/:id", (req, res) => {
  houseService.putHouse(req, res);
});

router.delete("/delete/house/:id", (req, res) => {
  houseService.deleteHouse(req, res);
});

router.put("/put/addRoom/:id", (req, res) => {
  houseService.addRoom(req, res);
});

router.put("/put/removeRoom/:id", (req, res) => {
  houseService.removeRoom(req, res);
});

// OCCUPANT
router.get("/get/occupants", (req, res) => {
  occupantService.getOccupants(req, res);
});

router.post("/post/occupant", (req, res) => {
  occupantService.postOccupant(req, res);
});

router.put("/put/house/:id", (req, res) => {
  occupantService.putOccupant(req, res);
});

router.delete("/delete/house/:id", (req, res) => {
  occupantService.deleteOccupant(req, res);
});

// LOCATIONREPORT
router.get("/get/locationReports", (req, res) => {
  locationReportService.getReports(req, res);
});
router.get("/get/getReportLocation/:id", (req, res) => {
  locationReportService.getReportHouseID(req, res);
});

router.post("/post/locationReport", (req, res) => {
  locationReportService.postReport(req, res);
});

router.put("/put/locationReport/:id", (req, res) => {
  locationReportService.putReport(req, res);
});

router.put("/put/changeReportValues/:id", (req, res) => {
  locationReportService.changeReportValues(req, res);
});

router.delete("/delete/locationReport/:id", (req, res) => {
  locationReportService.deleteReport(req, res);
});

// ROOM
router.get("/get/rooms", (req, res) => {
  roomService.getRooms(req, res);
});

router.post("/post/room", (req, res) => {
  roomService.postRoom(req, res);
});

router.put("/put/room/:id", (req, res) => {
  roomService.putRoom(req, res);
});

router.delete("/delete/room/:id", (req, res) => {
  roomService.deleteRoom(req, res);
});

// RISKREPORT
router.get("/get/RiskReports", (req, res) => {
  riskReportService.getRiskReports(req, res);
});

router.get("/get/getReportRisk/:id", (req, res) => {
  riskReportService.getReportHouseID(req, res);
});

router.post("/post/RiskReport", (req, res) => {
  riskReportService.postRiskReport(req, res);
});

router.put("/put/RiskReport/:id", (req, res) => {
  riskReportService.putRiskReport(req, res);
});

router.put("/put/changeRiskReportValues/:id", (req, res) => {
  riskReportService.changeReportValues(req, res);
});

router.delete("/delete/RiskReport/:id", (req, res) => {
  riskReportService.deleteRiskReport(req, res);
});

// PROTECTIONREPORT
router.get("/get/ProtectionReports", (req, res) => {
  protectionReportService.getReports(req, res);
});

router.get("/get/getReportProt/:id", (req, res) => {
  protectionReportService.getReportHouseID(req, res);
});

router.post("/post/ProtectionReport", (req, res) => {
  protectionReportService.postReport(req, res);
});

router.put("/put/ProtectionReport/:id", (req, res) => {
  protectionReportService.putReport(req, res);
});

router.put("/put/changeProtectionReports/:id", (req, res) => {
  protectionReportService.changeReportValues(req, res);
});

router.delete("/delete/ProtectionReport/:id", (req, res) => {
  protectionReportService.deleteReport(req, res);
});

module.exports = router;
