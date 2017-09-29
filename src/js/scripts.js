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
// const keyframes = new KeyframeEffect(chainring, effects, options);
// const spin = new Animation(keyframes, timeline);
const animations = [];

const spin = chainring.animate(effects, options);

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

const goFaster = () => {
    if (spin.playState === 'paused') {
        play();
    } else {
        animations.forEach(anim => {
            anim.playbackRate += 0.1;
        });
    }
};

const goSlower = () => {
    if (spin.playbackRate >= 0.2) {
        animations.forEach(anim => {
            anim.playbackRate -= 0.1;
        });
    } else {
        pause();
    }
};


const initListeners = () => {
    btnPlay.addEventListener('click', play, false);
    btnPause.addEventListener('click', pause, false);
    btnSpeedUp.addEventListener('click', goFaster, false);
    btnSpeedDown.addEventListener('click', goSlower, false);
    btnStop.addEventListener('click', stop, false);
};


document.addEventListener('DOMContentLoaded', initListeners);
