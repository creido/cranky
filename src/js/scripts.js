// initial playback rate set to 1 RPM 
const duration = 60000;
const iterations = Infinity;

const cranks = document.querySelector('.cranks');
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

const gears = {
    front: [36, 52],
    rear: [28, 25, 23, 21, 19, 17, 15, 14, 13, 12, 11]
};

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
// const keyframes = new KeyframeEffect(cranks, effects, options);
// const crankMotion = new Animation(keyframes, timeline);
const animations = [];
const driveAnimations = [];

const crankMotion = cranks.animate(effects, options);

driveAnimations.push(crankMotion);
animations.push(crankMotion);

pedals.forEach(pedal => {
    const pedalOptions = Object.assign({}, options, {
        direction: 'reverse'
    });
    const pedalMotion = pedal.animate(effects, pedalOptions);

    animations.push(pedalMotion);
    driveAnimations.push(pedalMotion);
});

const getGearSize = (location) => {
    const derailleur = document.querySelector(`.derailleur-${location}`);
    const index = parseInt(derailleur.value, 10) - 1;

    return gears[location][index];
};

const getCadence = () => {
    return rangeSpeed.value;
};

const getOutputPlaybackRate = () => {
    const gearFront = getGearSize('front');
    const gearRear = getGearSize('rear');
    const currentCadence = getCadence();

    console.log('getOutputPlaybackRate', gearFront, gearRear, currentCadence);

    wheelMotion.playbackRate = (gearFront / gearRear) * currentCadence;
};

const initWheel = () => {
    const pbr = getCadence(1);

    wheelMotion.playbackRate = pbr;
    animations.push(wheelMotion);
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

const setRPM = (range) => {
    console.log('setRPM', range.target.value);

    const rpm = range.target.value;

    driveAnimations.forEach(anim => {
        anim.playbackRate = rpm;
    });

    getOutputPlaybackRate();

    creidometer.innerHTML = rpm;
};

const wheelMotion = wheel.animate(effects, options);

initWheel();

const initListeners = () => {
    btnPlay.addEventListener('click', play, false);
    btnPause.addEventListener('click', pause, false);
    btnStop.addEventListener('click', stop, false);
    derailleurFront.addEventListener('change', getOutputPlaybackRate, false);
    derailleurRear.addEventListener('change', getOutputPlaybackRate, false);
    rangeSpeed.addEventListener('change', setRPM.bind(this), false);
};

document.addEventListener('DOMContentLoaded', initListeners);
