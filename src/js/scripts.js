// initial playback rate set to 1 RPM 
const duration = 60000;
const iterations = Infinity;

const drive = document.querySelector('.drive');
const pedals = document.querySelectorAll('.pedal');
const wheel = document.querySelector('.wheel');
const creidometer = document.querySelector('.creidometer');

const btnPlay = document.querySelector('.btn--play');
const btnPause = document.querySelector('.btn--pause');
const btnStop = document.querySelector('.btn--stop');
const derailleurFront = document.querySelector('.derailleur-front');
const derailleurRear = document.querySelector('.derailleur-rear');
const rangeSpeed = document.querySelector('.range-speed');
const timeline = document.timeline;

const front = [36, 52];
const rear = [28, 25, 23, 21, 19, 17, 15, 14, 13, 12, 11];

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

const getFrontGear = () => {
    const a = parseInt(derailleurFront.value, 10) - 1;

    return front[a];
};

const getRearGear = () => {
    const a = parseInt(derailleurRear.value, 10) - 1;

    return rear[a];
};

const getCadence = () => {
    return rangeSpeed.value;
};

const getPlaybackRatio = () => {
    const gearFront = getFrontGear();
    const gearRear = getRearGear();
    const currentCadence = getCadence();

    console.log('getPlaybackRatio', gearFront, gearRear, currentCadence);

    wheelSpeed.playbackRate = (gearFront / gearRear) * currentCadence;
};

const initWheel = () => {
    const pbr = getCadence(1);

    wheelSpeed.playbackRate = pbr;
    animations.push(wheelSpeed);
};

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

const wheelSpeed = wheel.animate(effects, options);

initWheel();

const initListeners = () => {
    btnPlay.addEventListener('click', play, false);
    btnPause.addEventListener('click', pause, false);
    btnStop.addEventListener('click', stop, false);
    derailleurFront.addEventListener('change', getPlaybackRatio, false);
    derailleurRear.addEventListener('change', getPlaybackRatio, false);
    rangeSpeed.addEventListener('change', setSpeed.bind(this), false);
};

document.addEventListener('DOMContentLoaded', initListeners);
