const audio = document.getElementById('audio');
const source = document.getElementById('source');
let buttonPressed = false;

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