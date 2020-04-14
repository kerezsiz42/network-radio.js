const fs = require('fs');
const express = require('express');
const cors = require('cors');
const mp3Duration = require('mp3-duration');
const MusicList = require('./MusicList');
require('dotenv').config();

const radio = express();

radio.use(express.json());
radio.use(express.static('public'));
radio.use(cors());

let list = new MusicList();

/*const playingCycle = () => {
    if(list.hasEnded()) {
        list.setArray(fs.readdirSync(__dirname + '/public/music'));
        console.log(list.getArray());
    }
    mp3Duration(`public/music/${list.getCurrent()}`, (err, duration) => {
        console.log('Music: ' + list.getCurrent() + '\tDuration: ' + duration + ' seconds');
        setTimeout(() => list.step(), duration * 1000);
    });
}*/

radio.post('/getCurrent', (req, res) => {
    res.json(list.getCurrent());
    console.log("Current music: " + list.getCurrent());
});

radio.get('/', (req, res) => {
    res.sendFile('index.html');
});

radio.get('/music/:fileName', (req, res) => {
    res.sendFile(`/public/music/${req.params.fileName}`, {root: __dirname});
});

radio.listen(80, () => {
    console.log(`Server is running on port 80.`);
});