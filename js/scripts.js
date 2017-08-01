const duration = 3000;
const iterations = Infinity;

const crank = document.querySelector('.crank');
const chainring = document.querySelector('.chainring');
const pedals = document.querySelectorAll('.pedal');

const btnPlay = document.querySelector('.btn--play');
const btnPause = document.querySelector('.btn--pause');
const btnSpeedUp = document.querySelector('.btn--speed-up');
const btnSpeedDown = document.querySelector('.btn--speed-down');

const spin = chainring.animate([
    {transform: 'rotate(0)'},
    {transform: 'rotate(360deg)'}
],
{
    // delay: 500,
    // endDelay: 0,
    // fill: 'both',
    // iterationStart: 0,
    iterations: iterations,
    duration: duration,
    // direction: 'normal',
    // easing: 'cubic-bezier(.6, 0, 1, .6)'
    // easing: 'linear'
});

pedals.forEach(pedal => {
    pedal.animate([
        {transform: 'translate(50%, -50%) rotate(0)'},
        {transform: 'translate(50%, -50%) rotate(-360deg)'}
    ],
    {
        // delay: 500,
        // endDelay: 0,
        // fill: 'both',
        // iterationStart: 0,
        iterations: iterations,
        duration: duration,
        // direction: 'normal',
        // easing: 'cubic-bezier(.6, 0, 1, .6)'
        // easing: 'linear'
    }); 
});

const play = () => {
    spin.play();
};

const pause = () => {
    spin.pause();
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

    // element.animate(effect, options);

    btnPlay.addEventListener('click', play, false);
    btnPause.addEventListener('click', pause, false);
    btnSpeedUp.addEventListener('click', goFaster, false);
    btnSpeedDown.addEventListener('click', goSlower, false);
};


document.addEventListener('DOMContentLoaded', init);
