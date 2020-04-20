# Network Radio using Express.js

### Minimalistic non-broadcasting network radio using Node.js Express.

This program uses the built-in audio features of HTML5. Since 2018 no browser lets you automatically play sound on a website without user interaction, we need to implement a start button that actually begins the radio.

```html
<!--index.html-->
<div id="container">
	<button id="button" onclick="playAudio()">Load music</button>
    <audio id="audio" controls autoplay>
        <source id="source" type="audio/mpeg">
    </audio>
</div>
<script src="script.js"></script>
```

The __/getCurrent__ endpoint retrieves the name of the music that is currently being played on the Server, after which the Client changes src attribute of the source tag inside audio, reloads the whole thing and adds an event listener which will call the _playAudio()_ function recursively once the music has ended.

```js
//script.js
function playAudio() {
    if(buttonPressed) {
        audio.removeEventListener('ended', listener);
    } else {
        buttonPressed = true;
    }
    fetch('http://wirebirds.club/getCurrent', {method: "POST"})
    .then(response => response.json())
    .then(randomMusic => {
        source.src = `http://wirebirds.club/music/${randomMusic}`;
        audio.load();
        audio.addEventListener('ended', listener = () => {
            playAudio();
        });
    });
}
```
There is a function with similar structure on the Server-side:

```js
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
```
Once it gets to the end of the list reads the whole directory and creates an array with of filenames and [shuffles](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) the order, then plays the next song. Playing means that it measures the length of each song using mp3-duration package and sets a timeout of that length in seconds.
```js
//Durstenfeld shuffle
shuffle() {
  for(let i = this.array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
  }
}
```
The Server will always send the one that is currently playing as a reply to getCurrent but every song can be accessed at any time.