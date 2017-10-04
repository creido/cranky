// initial playback rate set to 1 RPM 
const duration = 60000;
const iterations = Infinity;
const timeline = document.timeline;

const cranks = document.querySelector('.cranks');
const pedals = document.querySelectorAll('.pedal');
const wheel = document.querySelector('.wheel');
const creidometer = document.querySelector('.creidometer');

const btns = document.querySelectorAll('.btn');
const derailleurFront = document.querySelector('.derailleur-front');
const derailleurRear = document.querySelector('.derailleur-rear');
const rangeSpeed = document.querySelector('.range-speed');

const gears = {
    front: [36, 52],
    rear: [28, 25, 23, 21, 19, 17, 15, 14, 13, 12, 11]
};

const wheelCircumference = 2.096;

const keyframes = [
    {transform: 'rotate(0)'},
    {transform: 'rotate(360deg)'},
];

// const keyframesCycle = new KeyframeEffect(element, effect, options);

const options = {
    iterations: iterations,
    duration: duration,
};

const options2 = {
    iterations: iterations,
    duration: duration,
    direction: 'reverse',
};

const groupDrive = new GroupEffect([
    new KeyframeEffect(cranks, keyframes, options)
]);
console.log(groupDrive);
// const driveAnimations = [];
// const crankMotion = cranks.animate(keyframes, options);

// driveAnimations.push(crankMotion);

pedals.forEach(pedal => {
    // const pedalOptions = Object.assign({}, options, {
    //     direction: 'reverse'
    // });
    // const pedalMotion = pedal.animate(keyframes, pedalOptions);
    const pedalMotion = new KeyframeEffect(pedal, keyframes, options2);

    groupDrive.children.push(pedalMotion);
});

const driveAnimations = new Animation(groupDrive, timeline);

const getAnimations = () => {
    return document.getAnimations ? document.getAnimations() : timeline.getAnimations();
};

const getGearSize = location => {
    const derailleur = document.querySelector(`.derailleur-${location}`);
    const gear = document.querySelector(`.gear-${location}`);
    const index = parseInt(derailleur.value, 10) - 1;
    const size = gears[location][index];

    gear.innerHTML = `(${size} teeth)`;

    return size;
};

const getCadence = () => {
    return rangeSpeed.value;
};

const getOutputPlaybackRate = () => {
    const gearFront = getGearSize('front');
    const gearRear = getGearSize('rear');
    const currentCadence = getCadence();

    console.log('getOutputPlaybackRate', gearFront, gearRear, currentCadence);

    return (gearFront / gearRear) * currentCadence;
};

const initWheel = () => {
    const pbr = getCadence(1);

    wheelMotion.playbackRate = pbr;
};

const buttonHandler = event => {
    const anims = getAnimations();

    if (!anims || !anims.length) {
        return;
    }

    anims.forEach(anim => {
        switch (event.target.innerHTML.toLowerCase()) {
            case 'play':
                anim.play();
                break;
            case 'pause':
                anim.pause();
                break;
            case 'stop':
                anim.cancel();
                break;
        };
    });
};

const getSpeed = rate => {
    const kmph = ((rate * wheelCircumference) / 1000) * 60;

    return kmph.toFixed(2);
};

const setRPM = (originalEvent, input) => {
    console.log('setRPM', input);
    const rpmIn = input || getCadence();
    const rpmOut = getOutputPlaybackRate();
    const outputSpeed = getSpeed(rpmOut);
    
    wheelMotion.playbackRate = rpmOut;

    creidometer.innerHTML = `Input: ${rpmIn} RPM,
        Output: ${rpmOut.toFixed(2)} RPM,
        Speed: ${outputSpeed} kmh`;
};

const setCadence = range => {
    console.log('setRPM', range.target.value);

    const rpmIn = range.target.value;

    driveAnimations.effect.children.forEach(anim => {
        anim.playbackRate = rpmIn;
    });

    setRPM(null, rpmIn);
};

const wheelKeyframes = new KeyframeEffect(wheel, keyframes, options);
const wheelMotion = new Animation(wheelKeyframes, timeline);

const initListeners = () => {
    btns.forEach(btn => {
        btn.addEventListener('click', buttonHandler.bind(this), false);
    });
    derailleurFront.addEventListener('change', setRPM, false);
    derailleurRear.addEventListener('change', setRPM, false);
    rangeSpeed.addEventListener('change', setCadence.bind(this), false);
};

const init = () => {
    initListeners();

    initWheel();

    setRPM();
};

document.addEventListener('DOMContentLoaded', init);
