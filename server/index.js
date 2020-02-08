const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
var multer = require("multer");
var cors = require("cors");
const pino = require("express-pino-logger")();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(pino);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

app.post("/uploadfile", (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    fs.readFile(req.file.path, { encoding: "utf-8" }, function(err, data) {
      if (!err) {
        console.log("received data: " + data);
        res.send(data);
      } else {
        console.log(err);
      }
    });
})

});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
