const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const moment = require("moment-timezone");

const app = express();
const port = process.env.PORT;


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});
  
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Database connection successful");
    }
  });
  
  app.use(cors());
  app.use(bodyParser.json());

    app.post("/booking", async (req, res) => {
        let table = process.env.TABLE_NAME;
        let { name, email, phone, date } = req.body;
        let query =
            `INSERT INTO ${table} (name, email, phone, date) VALUES (?, ?, ?, ?)`;
        db.query(query, [name, email, phone, date], async (error) => {
            if (error) throw error;
            res.json("Datos del formulario almacenados");
        });
    }
    );
 
  app.get("/bookedHours", async (req, res) => {
    let table = process.env.TABLE_NAME;
    let query = `SELECT date FROM ${table}`;
    db.query(query, async (error, results) => {
      if (error) throw error;
      const bookedHours = results.map(result => ({
        date: moment(result.date).format('YYYY-MM-DD'),
        hour: moment(result.date).format('HH:mm:ss')
      }));
      res.json(bookedHours);
    });
  });  

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });