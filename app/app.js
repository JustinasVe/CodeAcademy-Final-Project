const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/attendees', (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM attendees WHERE userId=?', [userId], (err, attendees) => {
        res.send(attendees)
    });
});

app.post('/attendees', (req, res) => {
    const { name, surname, email, phoneNumber, userId } = req.body;
    connection.execute(
        'INSERT INTO attendees (name, surname, email, phoneNumber, userId) VALUES (?, ?, ?, ?, ?)',
        [name, surname, email, phoneNumber, userId],
        () => {
            connection.execute(
                'SELECT * FROM attendees WHERE userId=?', 
                [userId],
                (err, attendees) => {
                    res.send(attendees);
                }
            )
        }
    )
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Express server is running on PORT: ${PORT}`));