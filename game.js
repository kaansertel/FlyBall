var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Resim yukleme
var tahtalar = new Image();
tahtalar.src = "resimler/tahta.png";
var ball = new Image();
ball.src = "resimler/top.png";
var arkaplan = new Image();
arkaplan.src = "resimler/arkaplan.jpg";
var bulutlar = new Image();
bulutlar.src = "resimler/bulut.png";

// Ses yukleme
var gameover = new Audio();
gameover.src = "sesler/GameOver.mp3"

// Degiskenler
var bX = 275;
var bY = 200;
var speed = 0.5;
var hizlandirma = 0.5;
var gravity = 1;
var saniye = 0;
var maxHiz = 6.99;

var tahta = [];
var bulut = [];

// Ilk tahta konumu
tahta[0] = {
    x: (Math.floor(Math.random() * 500)),
    y: 610
}

// Bulutlarin konumlari

bulut[0] = {
    x: (Math.floor(Math.random() * 500)),
    y: (Math.floor(Math.random() * 200)),
}

bulut[1] = {
    x: (Math.floor(Math.random() * 500)),
    y: 450 - Math.floor((Math.random() * 200)),
}

bulut[2] = {
    x: (Math.floor(Math.random() * 500)),
    y: 700 - Math.floor((Math.random() * 150)),
}

// Klavye etkilesimi
document.addEventListener("keydown", moveUp, true);

function moveUp(event) {
    switch (event.keyCode) {
        case 65:        // Sol ( A ) tusu
            bX -= 20;
            break;
        case 68:        // Sag ( D ) tusu
            bX += 20;
            break;
        case 37:        // Sol ( <-- ) tusu 
            bX -= 20;
            break;
        case 39:        // Sag ( --> ) tusu 
            bX += 20;
            break;
    }
}

// Her 5 saniyede 0.5 hizlandirma
setInterval(function () {
    if (speed <= maxHiz) {
        speed += hizlandirma;
    }
}, 5000);

// Hiza gore tahtalarin olusturulmasi
setInterval(function () {
    if (speed <= 1.5) {
        tahta.push({
            x: (Math.floor(Math.random() * 500)),
            y: 800
        });
    }
}, 1300);

setInterval(function () {
    if (speed > 1.5 && speed <= 3) {
        tahta.push({
            x: (Math.floor(Math.random() * 500)),
            y: 800
        });
    }
}, 500);

setInterval(function () {
    if (speed > 3) {
        tahta.push({
            x: (Math.floor(Math.random() * 500)),
            y: 800
        });
    }
}, 300);

// Her saniyede bir skor arttirma
setInterval(function () {
    saniye += 1;
}, 1000);



function draw() {

    ctx.drawImage(arkaplan, 0, 0, 600, 800);
    ctx.save();

    ctx.globalAlpha = 0.7; // Seffaflik

    ctx.drawImage(bulutlar, bulut[0].x, bulut[0].y, 100, 100);
    ctx.drawImage(bulutlar, bulut[1].x, bulut[1].y, 100, 100);
    ctx.drawImage(bulutlar, bulut[2].x, bulut[2].y, 100, 100);

    ctx.restore();

    ctx.drawImage(ball, bX, bY);

    for (var i = 0; i < tahta.length; i++) {
        ctx.drawImage(tahtalar, tahta[i].x, tahta[i].y);

        tahta[i].y -= speed; // tahtaya hiz verme 

        // Tahtaya carpma
        if (bY + ball.height >= tahta[i].y && bX <= tahta[i].x + tahtalar.width && !(bY + ball.height >= (tahta[i].y + 10)) && bX > tahta[i].x - 40) {
             bY -= 3 * speed; // Tahtayla beraber topun hareketi 
        }
    }

    
    ctx.font = "20px Arial";
    ctx.textalign = "center";
    ctx.fillStyle = "black";
    ctx.textBaseline = "hanging";
    ctx.fillText("Hiziniz: " + speed, 2, 10);
    ctx.fillStyle = "red";
    ctx.fillText("Skor: " + saniye, 2, 40);

    // Oyun bitisi
    if (bY + ball.height >= canvas.height || bY <= 0) {

        ctx.font = "50px Comic Sans MS";
        ctx.textalign = "center";
        ctx.fillStyle = "red";
        ctx.textBaseline = "hanging";
        ctx.fillText("GAME OVER", 150, 400);
        gameover.play();
        ball.js.stop();
    }

    // Sag duvara carpma
    if (bX + ball.width >= canvas.width) {
        bX = canvas.width - ball.width;
    }

    // Sol duvara carpma
    if (bX < 0) {
        bX = 0;
    }

    bY += gravity;

    requestAnimationFrame(draw);
}
draw();
