var express = require("express");
var router = express.Router();
var fs = require("fs");
var mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "photography",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  sql = `Select * from photo`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { data: result });
    }
  });
});

router.get("/add", function (req, res, next) {
  res.render("add");
});

router.post("/add", function (req, res, next) {
  fs.copyFile(
    "../../Pictures/Screenshots/" + `${req.body.image}`,
    "./public/images/" + req.body.image,
    (err) => {
      if (err) return console.log(err);
      else {
        sql = `Insert into photo(name,email,category,photo) VALUES('${req.body.name}','${req.body.email}','${req.body.category}','${req.body.image}')`;
        con.query(sql, (err) => {
          if (err) {
            console.log(err);
            res.render("add", { message: "Failed to Save" });
          } else {
            res.render("add", { message: "Your photo has been saved" });
          }
        });
      }
    }
  );
});

module.exports = router;
