
document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    window.addEventListener('deviceorientation', (event) => {
            var alpha;
        //    if the device is ISO
        if(event.webkitCompassHeading) {
          alpha = event.webkitCompassHeading; 
        }
        else {
          alpha = event.alpha;
          webkitAlpha = alpha;
          if(!window.chrome) {
            webkitAlpha = alpha-270;
          }
        }
        document.getElementById('alpha').innerText = "" + Math.round(alpha);
        document.getElementById('beta').innerText = "" + Math.round(webkitAlpha);       
                
    }, true);
});
