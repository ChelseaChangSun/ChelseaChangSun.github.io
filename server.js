document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    window.addEventListener('deviceorientation', (event) => {
        console.log('New Orientation:');
        console.log('    Absolute: ' + event.absolute);
        console.log('    Alpha   : ' + event.alpha);
        console.log('    Beta    : ' + event.beta);
        console.log('    Gamma   : ' + event.gamma);
        document.getElementById('absolute').innerText = "" + event.absolute;
        document.getElementById('alpha').innerText = "" + event.alpha;
        document.getElementById('beta').innerText = "" + event.beta;
        document.getElementById('gamma').innerText = "" + event.gamma;
    }, true);
});
