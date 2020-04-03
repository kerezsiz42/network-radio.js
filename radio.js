const fs = require('fs');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const radio = express();

radio.use(express.json());
radio.use(express.static('public'));
radio.use(cors());

radio.get('/', (req, res) => {
    res.sendFile('index.html');
});

radio.get('/music/:fileName', (req, res) => {
    res.sendFile(`/public/music/${req.params.fileName}`, {root: __dirname});
});

radio.post('/getNext', (req, res) => {
    const list = fs.readdirSync(__dirname + '/public/music');
    const currentMusic = list[Math.floor(Math.random() * list.length)];
    res.json(currentMusic);
});

radio.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});