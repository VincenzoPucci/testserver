const Detector = require('./detector.model');

require('../mongo').connect();

function getDetectors(req, res) {
  const docquery = Detector.find({});
  docquery
    .exec()
    .then(detectors => {
      res.status(200).json(detectors);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}


function postDetector(req, res) {
  const originalDetector = {
    detectorID: req.body.detectorID,
    serialNumber: req.body.serialNumber,
    detectorType: req.body.detectorType,
    brand: req.body.brand,
    model: req.body.model,
    expirationDate: req.body.expirationDate,
    wiredElectricity: req.body.wiredElectricity,
    interconnected: req.body.interconnected,

    alarmSystem: req.body.alarmSystem,
    detectionType: req.body.detectionType,
    batteryType: req.body.batteryType,

    amountBatteries: req.body.amountBatteries,
    falseAlarm: req.body.falseAlarm,
    position: req.body.position,

    pictureFront: req.body.pictureFront,
    pictureBack: req.body.pictureBack,


  };
  const detector = new detector(originalDetector);
  detector.save((error) => {
    if (checkServerError(res, error)) return;
    res.status(201).json(detector);
    console.log("detector has been created");
  });
}

function putDetector(req, res) {
  const id = req.params.id;
  constupdDetector= {
    detectorID: id,
    serialNumber: req.body.serialNumber,
    detectorType: req.body.detectorType,
    brand: req.body.brand,
    model: req.body.model,
    expirationDate: req.body.expirationDate,
    wiredElectricity: req.body.wiredElectricity,
    interconnected: req.body.interconnected,

    alarmSystem: req.body.alarmSystem,
    detectionType: req.body.detectionType,
    batteryType: req.body.batteryType,

    amountBatteries: req.body.amountBatteries,
    falseAlarm: req.body.falseAlarm,
    position: req.body.position,

    pictureFront: req.body.pictureFront,
    pictureBack: req.body.pictureBack,
  };
  detector.findOne({ detectorID: id }, (error, detector) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, detector)) return;
    detector.serialNumber = checkPut(upddetector.serialNumber, detector.serialNumber);
    detector.detectorType = checkPut(
      upddetector.detectorType,
      detector.detectorType
    );
    detector.brand = checkPut(upddetector.brand, detector.brand);
    detector.model = checkPut(upddetector.model, detector.model);
    detector.expirationDate = checkPut(upddetector.expirationDate, detector.expirationDate);
    detector.wiredElectricity = checkPut(upddetector.wiredElectricity, detector.wiredElectricity);

    detector.interconnected = checkPut(upddetector.interconnected, detector.interconnected);
    detector.alarmSystem = checkPut(upddetector.alarmSystem, detector.alarmSystem);


    detector.detectionType = checkPut(upddetector.detectionType, detector.detectionType);
    detector.batteryType = checkPut(upddetector.batteryType, detector.batteryType);


    detector.amountBatteries = checkPut(upddetector.amountBatteries, detector.amountBatteries);
    detector.falseAlarm = checkPut(upddetector.falseAlarm, detector.falseAlarm);

    detector.position = checkPut(upddetector.position, detector.position);
    detector.pictureFront = checkPut(upddetector.pictureFront, detector.pictureFront);

    detector.pictureBack = checkPut(upddetector.pictureBack, detector.pictureBack);


    detector.save((error) => {
      if (checkServerError(res, error)) return;
      res.status(200).json(detector);
      console.log("detector has been updated");
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

function deletedetector(req, res) {
  const id = req.params.id;
  detector.findOneAndRemove({ detectorID: id })
    .then((detector) => {
      if (!checkFound(res, detector)) return;
      res.status(200).json(detector);
      console.log("detector has been removed");
    })
    .catch((error) => {
      if (checkServerError(res, error)) return;
    });
}

function checkFound(res, detector) {
  if (!detector) {
    res.status(404).send("detector not found");
    return;
  }
  return detector;
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

module.exports = {
  getDetectors,
  postDetector,
  putDetector,
  deletedetector
};

module.exports = {
  getDetectors
};
