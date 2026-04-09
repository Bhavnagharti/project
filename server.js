const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   host: 'localhost',
  user: 'school_user',
  password: 'secure_password', // <-- this is the password you set
  database: 'school'
});

db.connect(err => {
    if (err) return console.error('DB connection error:', err);
    console.log('Connected to MySQL');
});

app.post('/submit', (req, res) => {
    const { first_name, last_name, dob, gender,  mobile } = req.body;

    const sql = 'INSERT INTO admissions (first_name, last_name, dob, gender,  mobile) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, dob, gender, mobile], (err, result) => {
        if (err) 
           {
            console.error('Insert error:', err.sqlMessage);
            return res.status(500).send('Database insert failed',err);
           } 
        res.send('Admission submitted successfully!',err);
        
    });
    console.log('scuess');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
