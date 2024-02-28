const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const moment = require("moment-timezone");

const app = express();
const port = 3001;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bitescreadores_booking_information",
    port: 3306, // Puerto de MySQL en tu configuración de XAMPP
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
        let { name, email, phone, date } = req.body;
        let query =
            "INSERT INTO information (name, email, phone, date) VALUES (?, ?, ?, ?)";
        db.query(query, [name, email, phone, date], async (error) => {
            if (error) throw error;
            res.json("Datos del formulario almacenados");
        });
    }
    );
 
  app.get("/bookedHours", async (req, res) => {
    let query = "SELECT date FROM information";
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