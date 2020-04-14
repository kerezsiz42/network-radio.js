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

let duration;

const playingCycle = async () => {
    if(list.hasEnded()) {
        list.setArray(fs.readdirSync(__dirname + '/public/music'));
        console.log(list.getArray());
    }
    duration = await mp3Duration(`public/music/${list.getCurrent()}`);
    console.log('Music: ' + list.getCurrent() + ' Duration: ' + duration + ' seconds');
    setTimeout(() => {
        list.step();
        playingCycle(true);
    }, duration * 1000);
}

playingCycle(false)

radio.post('/getCurrent', (req, res) => {
    res.json(list.getCurrent());
    //console.log("Current music: " + list.getCurrent());
});

radio.get('/', (req, res) => {
    res.sendFile('index.html');
});

radio.get('/music/:fileName', (req, res) => {
    res.sendFile(`/public/music/${req.params.fileName}`, {root: __dirname});
});

radio.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});