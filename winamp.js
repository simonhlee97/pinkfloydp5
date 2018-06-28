
var x1, x2, x3, y1, y2, y3;

var count = 0;
var height, width;

var colormode, contact, aboutme, myprojects, playbutton, stopbutton, song;

var fft, button;
var w, amp;
var spectrum;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

var s = function (p) {
    

    // p.windowResized = function () {
    //     p.resizeCanvas(p.windowWidth, p.windowHeight);
    // }

    p.setup = function () {
        var width = p.windowWidth;
        var height = p.windowHeight;
        p.createCanvas(width, height);

        x1 = width / 2;
        x2 = x1 - 310;
        x3 = x1 + 310;
        y1 = height / 2.5;
        y2 = height * (4 / 5);
        y3 = height * (4 / 5);
    };

    p.draw = function () {
        p.background('black');

        p.triangle(x1, y1, x2, y2, x3, y3);

        if (p.frameCount < 280) {
            x3 = x3 - 0.6;
            x2 = x2 + 0.6;
            y2 = y2 - 0.6;
            y3 = y3 - 0.6;

            p.stroke(255);
            p.strokeWeight(2);
            p.fill(139, 184, 192);
            p.triangle(x1, y1, x2, y2, x3, y3);
        }
    };
};

var myp51 = new p5(s, 'c1');

// Sketch Two (FFT)
var t = function (p) {

    // p.windowResized = function () {
    //     p.resizeCanvas(p.windowWidth, p.windowHeight);
    // }

    p.preload = function () {
        song = p.loadSound('Breathe.mp3');
    };

    p.setup = function () {

        var height = p.windowHeight;

        var canv2 = p.createCanvas(280, 90);
        canv2.position(x1 - 136, height / 3);
        song.play();

        // colormode = p.colorMode(HSB);

        fft = new p5.FFT(0.9, 64);
        w = p.width / 64;

    };
    p.draw = function () {
        p.background('black');

        spectrum = fft.analyze();
        p.noStroke();
        for (var i = 0; i < spectrum.length; i++) {
            var amp = spectrum[i];
            var y = p.map(amp, 0, 256, p.height, 0);
            p.fill(i, 175, 225);
            p.rect(i * w, y, w - 2, p.height - y);
        }
    };
};

var myp52 = new p5(t, 'c2');

//////////////////////////////////////////////

var header = function (t) {
    t.setup = function () {
        var width = t.windowWidth / 7;
        
        // The DOM
        var headline = t.createDiv('<h1>a P5.js Project</h1>').position(width, 44).class('headline').addClass('animated fadeInDown');
        var subtitle = t.createDiv('<h3>created by Simon Lee</h3>').position(width, 124).class('headline').addClass('animated fadeInDown');

        var songinfo = t.createDiv('<p>Song: <i>"Breathe"</i></p><p>Album: <i>Dark Side of the Moon</i></p><p>Label: <i>Pink Floyd Records</i></p><p>Original Release: 1973</p>').position(width, 400).id('info').addClass('animated fadeInUp');

        // play button
        var playbutton = t.createButton('play_arrow').id('playbutton').addClass('material-icons').addClass('animated rotateIn');
        playbutton.position(width, 303);
        playbutton.mousePressed(playsound);

        // stop button
        var stopbutton = t.createButton('pause').id('stopbutton').addClass('material-icons').addClass('animated rotateIn');
        stopbutton.position(width + 63, 303);
        stopbutton.mousePressed(stopsound);
    }
}
var myp53 = new p5(header, 'header');
///////////////////////////////////////////


var footer = function (f) {

    var width = f.windowWidth * (0.64);
    
    f.setup = function () {
        var footer1 = f.createDiv('<h4>GitHub repo</h4>').position(width, 350).id('footer').addClass('animated fadeInUp');
        var footer2 = f.createDiv('<a href="https://simonhlee97.github.io/">Simon Lee - home</a>').position(width, 250).id('portfolio').addClass('animated fadeInDown');
        var about1 = f.createDiv('About this project: After playing around with the P5.js library\'s examples and reading through the docs, I built a little Pink Floyd & P5.js project. For more info about this project and P5js, see GitHub repo.').position(width, 100).id('about').addClass('animated fadeInDown');
    }
}
var myp54 = new p5(footer, 'footer');



///////////////////////////////////////////
function playsound() {
    if (song.isPlaying() == false) {
        song.play();
    }
}

function stopsound() {
    if (song.isPlaying() == true) {
        song.pause();
    }
}



