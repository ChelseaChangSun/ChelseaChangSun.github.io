document.addEventListener('DOMContentLoaded', () => {
    console.log('Set listener for changes in device orientation...');
    window.addEventListener('deviceorientation', (e) => {
        var alpha = e.alpha
        var beta = e.beta
        var gamma = e.gamma

        this.opts = {
            onChange: function () {}
        }
        if (typeof options === 'function') {
            this.opts.onChange = options
        } else {
            this.opts = assign(this.opts, options)
        }

        this.data = {
            initLeftRotate: undefined,
            initForwardSlant: this.opts.initForwardSlant,
            lon: undefined,
            lat: undefined,
            orientation: window.orientation || 0
        }

        this.data.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

        if (this.data.initLeftRotate === undefined) {
                this.data.initLeftRotate = this.data.isIOS ? e.webkitCompassHeading : alpha
            }
            // iOS 的 alpha 的已经是相对的了，不做处理
            if (!this.data.isIOS) {
                if (alpha > 0 || alpha < this.data.initLeftRotate) {
                    alpha += 360
                }
                alpha -= this.data.initLeftRotate
            }

            this.data.leftRotate = alpha < 180 ? alpha : alpha - 360
            this.data.rightRotate = -this.data.leftRotate

            switch (this.data.orientation) {
                case 0:
                    this.data.forwardSlant = beta
                    break
                case 90:
                    this.data.forwardSlant = gamma < 0 ? -gamma : 180 - gamma
                    break
                case -90:
                    this.data.forwardSlant = gamma < 0 ? 180 + gamma : gamma
                    break
            }
            this.data.backwardSlant = -this.data.forwardSlant
            this.data.isForward = this.data.forwardSlant > 0
            this.data.isBackward = !this.data.isForward

            if (this.data.initForwardSlant === undefined) {
                this.data.initForwardSlant = this.data.forwardSlant  // 记录初始的 向前倾斜度
            }
            switch (this.data.orientation) {
                case 0:
                    this.data.forwardThreshold = this.data.initForwardSlant > 0 ? -180 + this.data.initForwardSlant : 180 + this.data.initForwardSlant
                    if (this.data.initForwardSlant > 0 && beta < this.data.forwardThreshold) {
                        this.data.relativeForwardSlant = beta + 360 - this.data.initForwardSlant
                    } else if (this.data.initForwardSlant < 0 && beta > this.data.forwardThreshold) {
                        this.data.relativeForwardSlant = beta - 180 - this.data.initForwardSlant
                    } else {
                        this.data.relativeForwardSlant = beta - this.data.initForwardSlant
                    }
                    break
                case 90:
                case -90:
                    // this.data.forwardThreshold
                    // 横屏时，只考虑向前倾斜度在 [0, 180] 的情况
                    this.data.relativeForwardSlant = this.data.forwardSlant - this.data.initForwardSlant
                    break
            }
            this.data.relativeBackwardSlant = -this.data.relativeForwardSlant
            this.data.isRelativeForward = this.data.relativeForwardSlant > 0
            this.data.isRelativeBackward = !this.data.isRelativeForward

            // 计算 左右倾斜度
            switch (this.data.orientation) {
                case 0:
                    this.data.leftSlant = -gamma
                    break
                case 90:
                    this.data.leftSlant = -beta
                    break
                case -90:
                    this.data.leftSlant = beta
                    break
            }
            this.data.rightSlant = -this.data.leftSlant
            this.data.isLeft = this.data.leftSlant > 0
            this.data.isRight = !this.data.isLeft

            // 计算 经纬度
            var lon = this.data.leftRotate + this.data.rightSlant
            lon = lon < 0 ? lon + 360 : lon
            var lat = this.data.forwardSlant - 90

            this.data.offsetLon = this.data.lon === undefined ? 0 : lon - this.data.lon
            this.data.offsetLat = this.data.lat === undefined ? 0 : lat - this.data.lat
            this.data.lon = lon
            this.data.lat = lat

            this.opts.onChange(assign(e, this.data))


        console.log('New Orientation:');
        //console.log('    Absolute: ' + e.absolute);
        console.log('    Alpha   : ' + e.alpha);
        console.log('    Beta    : ' + e.beta);
        console.log('    Gamma   : ' + e.gamma);
        //document.getElementById('absolute').innerText = "" + event.absolute;
        document.getElementById('alpha').innerText = "" + e.alpha;
        document.getElementById('beta').innerText = "" + e.beta;
        document.getElementById('gamma').innerText = "" + e.gamma;
    }, false);
});
