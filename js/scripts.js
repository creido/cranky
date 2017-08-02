const duration = 3000;
const iterations = Infinity;

const crank = document.querySelector('.crank');
const chainring = document.querySelector('.drive-train');
const pedals = document.querySelectorAll('.pedal');

const btnPlay = document.querySelector('.btn--play');
const btnPause = document.querySelector('.btn--pause');
const btnSpeedUp = document.querySelector('.btn--speed-up');
const btnSpeedDown = document.querySelector('.btn--speed-down');
const btnStop = document.querySelector('.btn--stop');
const timeline = document.timeline;

const effect = [
    {
        transform: 'rotate(0)'
    },
    {
        transform: 'rotate(360deg)'
    }
];
const options = {
    iterations: iterations,
    duration: duration,
};

// KeyframeEffect not native currently
// const keyframes = new KeyframeEffect(chainring, effect, options);
// const spin = new Animation(keyframes, timeline);

const spin = chainring.animate(effect, options);

pedals.forEach(pedal => {
    pedal.animate([
        {transform: 'rotate(0)'},
        {transform: 'rotate(-360deg)'}
    ], options);
});

const play = () => {
    spin.play();
};

const pause = () => {
    spin.pause();
};

const stop = () => {
    spin.cancel();
};

const goFaster = () => {
    if (spin.playState === 'paused') {
        play();
    } else {
        spin.playbackRate += 0.1;
    }
};

const goSlower = () => {
    if (spin.playbackRate >= 0.2) {
        spin.playbackRate -= 0.1;
    } else {
        pause();
    }
};


const init = () => {
    btnPlay.addEventListener('click', play, false);
    btnPause.addEventListener('click', pause, false);
    btnSpeedUp.addEventListener('click', goFaster, false);
    btnSpeedDown.addEventListener('click', goSlower, false);
    btnStop.addEventListener('click', stop, false);
};


document.addEventListener('DOMContentLoaded', init);
