const audio = document.getElementById('audio');
const source = document.getElementById('source');
let buttonPressed = false;

function playAudio() {
    if(buttonPressed) {
        audio.removeEventListener('ended', listener);
    } else {
        buttonPressed = true;
    }
    fetch('http://192.168.1.66/getCurrent', {method: "POST"})
    .then(response => response.json())
    .then(randomMusic => {
        source.src = `http://192.168.1.66/music/${randomMusic}`;
        audio.load();
        audio.addEventListener('ended', listener = () => {
            playAudio();
        });
    });
}