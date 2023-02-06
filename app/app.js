const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

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

app.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute(
        'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
        [name, surname, email, hashedPassword],
        (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }
            res.send(result);
        }
    )
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    res.send(result[0]);
                } else {
                    res.sendStatus(401);
                }
            }
        }
    )
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Express server is running on PORT: ${PORT}`));