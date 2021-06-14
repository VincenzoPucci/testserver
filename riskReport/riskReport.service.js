const RiskReport = require("./riskReport.model");

require("../mongo").connect();

function getRiskReports(req, res) {
  const docquery = RiskReport.find({});
  docquery
    .exec()
    .then((RiskReports) => {
      res.status(200).json(RiskReports);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function getReportHouseID(req, res) {
  const id = req.params.id;
  const docquery = RiskReport.find({ houseID: id });
  docquery
    .exec()
    .then((Reports) => {
      res.status(200).json(Reports);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function postRiskReport(req, res) {
  const originalRiskReport = {
    houseID: req.body.houseID,
    riskValue: req.body.riskValue,
    creationDate: req.body.creationDate,
    reportValues: req.body.reportValues,
  };
  const riskReport = new RiskReport(originalRiskReport);
  riskReport.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(riskReport);
    console.log("risk report has been created");
  });
}

function putRiskReport(req, res) {
  const id = req.params.riskReportID;
  const updReport = {
    houseID: req.body.houseID,
    riskValue: req.body.riskValue,
    creationDate: req.body.creationDate,
    reportValues: req.body.reportValues,
  };
  RiskReport.findOne({ _id: id }, (error, report) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, report)) return;
    report.houseID = checkPut(updReport.houseID, report.houseID);
    report.creationDate = checkPut(updReport.creationDate, report.creationDate);
    report.reportValues = checkPut(updReport.reportValues, report.reportValues);
    report.riskValue = checkPut(updReport.riskValue, report.riskValue);
    report.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(report);
      console.log("riskReport has been updated");
    });
  });
}

function changeReportValues(req, res) {
  const id = req.params.id;
  const updReport = {
    reportValues: req.body.reportValues,
  };
  console.log(updReport);
  RiskReport.findOne({ _id: id }, (error, report) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, report)) return;

    Object.keys(updReport.reportValues).forEach(function (keyUpd) {
      Object.keys(report.reportValues).forEach(function (key) {
        if (keyUpd == key) {
          report.reportValues[key] = updReport.reportValues[keyUpd];
        }
      });
    });
    report.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(report);
      console.log("RiskReport has been updated");
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

function deleteRiskReport(req, res) {
  const id = req.params.riskReportid;
  riskReport
    .findOneAndRemove({ _id: id })
    .then((riskReport) => {
      if (!checkFound(res, riskReport)) return;
      res.status(200).json(riskReport);
      console.log("riskReport has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, riskReport) {
  if (!riskReport) {
    res.status(404).send("riskReport not found");
    return;
  }
  return riskReport;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getRiskReports,
  postRiskReport,
  putRiskReport,
  deleteRiskReport,
  changeReportValues,
  getReportHouseID
};
