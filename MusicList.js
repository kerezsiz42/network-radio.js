class MusicList {
    constructor() {
        this.array = [];
        this.current = 0;
        this.ended = true;
    }

    getArray() {
        return this.array;
    }

    setArray(array) {
        this.array = array;
        this.current = 0;
        this.ended = false;
        this.shuffle();
    }

    //Durstenfeld shuffle
    shuffle() {
        for(let i = this.array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
    }

    hasEnded() {
        return this.ended;
    }

    getCurrent() {
        return this.array[this.current];
    }

    step() {
        if(this.current != this.array.length - 1) {
            this.current++;
        } else {
            this.ended = true;
        }
    }
}

module.exports = MusicList;