const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { query } = require("express");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Shiv@123",
  database: "contact_crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const getSql = "SELECT * from contacts_db";
  db.query(getSql, (err, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const postSql =
    "INSERT INTO contact_crud.contacts_db (name, email, contact) VALUES (?, ? ,?)";
  db.query(postSql, [name, email, contact], (err, result) => {
    console.log("Error", err);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const delSql = "DELETE FROM contacts_db WHERE id=?";
  db.query(delSql, id, (err, result) => {
    console.log("Error", err);
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const getSql = "SELECT * from contacts_db WHERE id=?";
  db.query(getSql, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.put("/api/put/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const updateSql =
    "UPDATE contacts_db SET name=?, email=?, contact=? WHERE id=?";
  db.query(updateSql, [name, email, contact, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(port, (err, data) => {
  console.log(`Listening at port ${port}`);
});
