function videoClickFullScreen(elem) {
    var myVideo = document.getElementById(elem);
    myVideo.addEventListener('click', funky, false);
}

function funky() {
    if (this.paused) {
        if (this.requestFullscreen) {
            this.requestFullscreen();
        }
        else if (this.msRequestFullscreen) {
            this.msRequestFullscreen();
        }
        else if (this.mozRequestFullScreen) {
            this.mozRequestFullScreen();
        }
        else if (this.webkitRequestFullScreen) {
            this.webkitRequestFullScreen();
        }
        this.play();
    }
    else {
        this.pause();
    }
}