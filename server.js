
// (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//         typeof define === 'function' && define.amd ? define(factory) :
//             (global.Orienter = factory());
// }(this, (function () {
//     'use strict';

//     var Orienter = function () {
//         this.initialize.apply(this, arguments);
//     };

//     Orienter.prototype = {
//         lon: 0,
//         lat: 0,
//         direction: 0,
//         fix: 0,
//         os: '',
//         initialize: function (config) {
//             var _config = config || {};

//             this.onOrient = _config.onOrient || null;
//             this.onChange = _config.onChange || null;

//             this._orient = this._orient.bind(this);
//             this._change = this._change.bind(this);

//             this.lon = 0;
//             this.lat = 0;
//             this.direction = window.orientation || 0;

//             switch (this.direction) {
//                 case 0:
//                     this.fix = 0;
//                     break;
//                 case 90:
//                     this.fix = -270;
//                     break;
//                 case -90:
//                     this.fix = -90;
//                     break;
//             }

//             if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//                 this.os = 'ios';
//             } else {
//                 this.os = (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux')) ? 'android' : '';
//             }
//         },

//         init: function () {
//             window.addEventListener('deviceorientation', this._orient, false);
//             window.addEventListener('orientationchange', this._change, false);
//         },

//         destroy: function () {
//             window.removeEventListener('deviceorientation', this._orient, false);
//             window.removeEventListener('orientationchange', this._change, false);
//         },

//         _change: function (event) {
//             this.direction = window.orientation;

//             if (this.onChange) this.onChange(this.direction);
//         },

//         changeDirectionTo: function (n) {
//             this.direction = n;
//         },

//         _orient: function (event) {
            
//             if (this.onOrient) this.onOrient({
//                 a: Math.round(event.alpha),
//                 b: Math.round(event.beta),
//                 g: Math.round(event.gamma),
//                 dir: this.direction,
//                 abs: null
//             });
//         }

//     };

//     return Orienter;

// })));

document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    window.addEventListener('deviceorientationabsolute', (event) => {
//         console.log('New Orientation:');
//         console.log('    Absolute: ' + event.absolute);
//         console.log('    Alpha   : ' + event.alpha);
//         console.log('    Beta    : ' + event.beta);
//         console.log('    Gamma   : ' + event.gamma);
//         document.getElementById('absolute').innerText = "" + event.absolute;
//         document.getElementById('alpha').innerText = "" + Math.round(event.alpha);
//         document.getElementById('beta').innerText = "" + Math.round(event.beta);
//         document.getElementById('gamma').innerText = "" + Math.round(event.gamma);
            var alpha;
        //     判斷是否為 iOS 裝置
        if(event.webkitCompassHeading) {
          alpha = event.webkitCompassHeading; // iOS 裝置必須使用 event.webkitCompassHeading
          //compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
          //show.innerHTML = alpha;
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


// if(window.DeviceOrientationEvent) {

//   window.addEventListener('deviceorientation', function(event) {
//         var alpha;
//         //     判斷是否為 iOS 裝置
//         if(event.webkitCompassHeading) {
//           alpha = event.webkitCompassHeading; // iOS 裝置必須使用 event.webkitCompassHeading
//           //compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
//           //show.innerHTML = alpha;
//         }
//         else {
//           alpha = event.alpha;
//           webkitAlpha = alpha;
//           if(!window.chrome) {
//             webkitAlpha = alpha-270;
//           }
//         }

//         compass.style.Transform = 'rotate(' + alpha + 'deg)';
//         compass.style.WebkitTransform = 'rotate('+ webkitAlpha + 'deg)';
//         compass.style.MozTransform = 'rotate(-' + alpha + 'deg)'; 
//       }, false);
// }else{
//   document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
// }
