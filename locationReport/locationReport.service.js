const Report = require("./locationReport.model");

require("../mongo").connect();

function getReports(req, res) {
  const docquery = Report.find({});
  docquery
    .exec()
    .then((reports) => {
      res.status(200).json(reports);
    })
    .catch((error) => {
      res.status(500).send(error);
      return;
    });
}

function getReportHouseID(req, res) {
  const id = req.params.id;
  const docquery = Report.find({ houseID: id });
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

function postReport(req, res) {
  const originalReport = {
    houseID: req.body.houseID,
    creationDate: req.body.creationDate,
    reportValues: req.body.reportValues,
  };
  const report = new Report(originalReport);
  report.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(report);
    console.log("report has been created");
  });
}

function putReport(req, res) {
  const id = req.params.id;
  const updReport = {
    houseID: req.body.houseID,
    creationDate: req.body.creationDate,
    reportValues: req.body.reportValues,
  };
  Report.findOne({ _id: id }, (error, report) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, report)) return;
    report.houseID = checkPut(updReport.houseID, report.houseID);
    report.creationDate = checkPut(updReport.creationDate, report.creationDate);
    report.reportValues = checkPut(updReport.reportValues, report.reportValues);
    report.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(report);
      console.log("report has been updated");
    });
  });
}

function changeReportValues(req, res) {
  const id = req.params.id;
  const updReport = {
    reportValues: req.body.reportValues,
  };
  console.log(updReport);
  Report.findOne({ _id: id }, (error, report) => {
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
      console.log("report has been updated");
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

function deleteReport(req, res) {
  const id = req.params.id;
  Report.findOneAndRemove({ _id: id })
    .then((report) => {
      if (!checkFound(res, report)) return;
      res.status(200).json(report);
      console.log("report has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, report) {
  if (!report) {
    res.status(404).send("report not found");
    return;
  }
  return report;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getReports,
  postReport,
  putReport,
  deleteReport,
  changeReportValues,
  getReportHouseID,
};
