var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

var ballr = 10;
var rowcol =
        ["rgba(214, 142, 0, 0.5)",
         "rgba(114, 042, 0, 0.5)",
         "rgba(000, 239, 0, 0.5)"];
var paddlecol = "rgba(105, 201, 0, 1)";
var ballcol = "rgba(225, 225, 0, 1)";
var backcol = "rgba (255, 255, 0, 1)"; 
var x = 129;
var y = 200;
var spdx = 2;
var spdy = 4.6;
var paddlex = canvas.width / 3;
var paddleh = 20;
var paddlew = 250;
var intervalId = 0;
var canvasMinX = 0;
var canvasMaxX = canvas.width;
var numrow = 5;
var numcol = 5;
var brickw = (canvas.width/numcol) - 1;
var brickh = 15;
var pad = 1;
var paddlesp = 20;
var bricks = new Array(numrow);

for (i=0; i < numrow; i++) {
    bricks[i] = new Array(numcol);
    for (j=0; j < numcol; j++){
        bricks [i][j] = 1;
    }
}

function init_mouse() {
}

function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = evt.pageX - canvasMinX - (paddlew / 2);
    }
}

$(document).mousemove(onMouseMove);

function init(){
    document.body.appendChild(canvas);
    intervalId = setInterval(draw, 20);
    return intervalId;
}

function rectangle(x, y, w, h){
    //ctx.fillStyle = "rgba(198, 097, 0, 0.5)";
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function circle(x, y, radius) {
    //ctx.fillStyle = "rgba(255, 255, 0, 1)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function clear(){
    ctx.clearRect (0, 0, canvas.width, canvas.height);
}

rightDown = false;
leftDown = false;

function onKeyDown(evt) {
    if (evt.keyCode == 39) {rightDown = true;}
    else if (evt.keyCode == 37) {leftDown = true;}
}

function onKeyUp(evt) {
    if (evt.keyCode == 39) {rightDown = false;}
    else if (evt.keyCode == 37) {leftDown = false;}
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function draw() {
    ctx.fillStyle = backcol;
    clear();
    ctx.fillStyle = ballcol;
    circle(x, y, ballr);
    
    if (rightDown == true) {paddlex += paddlesp;}
    else if (leftDown == true) {paddlex -= paddlesp;}
    ctx.fillStyle = paddlecol;
    rectangle(paddlex, canvas.height - paddleh, paddlew, paddleh);   

    //draw bricks
    for (i=0; i < numrow; i++) {
        ctx.fillStyle = rowcol[i]; 
        for (j=0; j < numcol; j++){
            if (bricks[i][j] == 1){
                rectangle((j * (brickw + pad)) + pad,
                          (i * (brickh+pad)) + pad,
                          brickw, brickh);
            }
        }
    } 
    
    //break bricks
    rh = brickh + pad;
    cw = brickw + pad;
    r = Math.floor(y/rh);
    c = Math.floor(x/cw);
    if (y < numrow * rh && r >= 0 && c >= 0 && bricks[r][c] == 1) {
        spdy = -1 * spdy;
        bricks[r][c] = 0;
    }
 
    if (x + spdx > canvas.width || x + spdx < 0) {
        spdx = -1 * spdx;
    }
    if (y + spdy < 0) {
        spdy = -1 * spdy;
    } else if (y + spdy > canvas.height) {
        if (x > paddlex && x < paddlex + paddlew) {
            spdy = -spdy;
        } else {
            clearInterval(intervalId);
        }
    }
    x += spdx;
    y += spdy;
}

init ();
init_mouse();