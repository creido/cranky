// initial playback rate set to 1 RPM 
const duration = 60000;
const iterations = Infinity;

const drive = document.querySelector('.drive');
const pedals = document.querySelectorAll('.pedal');
const creidometer = document.querySelector('.creidometer');

const btnPlay = document.querySelector('.btn--play');
const btnPause = document.querySelector('.btn--pause');
const btnStop = document.querySelector('.btn--stop');
const rangeSpeed = document.querySelector('.range-speed');
const timeline = document.timeline;

const effects = [
    {transform: 'rotate(0)'},
    {transform: 'rotate(360deg)'},
];

const options = {
    iterations: iterations,
    duration: duration,
};

// const options2 = {
//     iterations: iterations,
//     duration: duration,
//     direction: 'reverse',
// };

// TODO: Add polyfills
//  - KeyframeEffect
//
// const keyframes = new KeyframeEffect(drive, effects, options);
// const spin = new Animation(keyframes, timeline);
const animations = [];

const spin = drive.animate(effects, options);

animations.push(spin);

pedals.forEach(pedal => {
    const pedalOptions = Object.assign({}, options, {
        direction: 'reverse'
    });
    animations.push(pedal.animate(effects, pedalOptions));
});

// animations.forEach(anim => {
// });

const play = () => {
    animations.forEach(anim => {
        anim.play();
    });
};

const pause = () => {
    animations.forEach(anim => {
        anim.pause();
    });
};

const stop = () => {
    animations.forEach(anim => {
        anim.cancel();
    });
};

const setSpeed = (range) => {
    console.log('setSpeed', range.target.value);

    const speed = range.target.value;

    animations.forEach(anim => {
        anim.playbackRate = speed;
    });

    creidometer.innerHTML = speed;
};


const initListeners = () => {
    btnPlay.addEventListener('click', play, false);
    btnPause.addEventListener('click', pause, false);
    btnStop.addEventListener('click', stop, false);
    rangeSpeed.addEventListener('change', setSpeed.bind(this), false);
};


document.addEventListener('DOMContentLoaded', initListeners);
