canv = document.getElementById("theGame");
ctx = canv.getContext("2d");
var widthCenter = $(window).width() / 2; 
var heightCenter = $(window).height() / 2;
var speed = 7;
var paused = false;
var gameOn = true;
var p1win = 0;
var p2win = 0;
var gameSpeed = setInterval(game, 1000/speed);
var blueLoose = false;
var redLoose = false;

if(Math.random()*10 > 5){
    myAudio = new Audio('../music/wimpsonssaveChromecastVersionMST.mp3'); 
}else{
    myAudio = new Audio('../music/80s_crap_mix.mp3'); 
}
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();

//gamesize
gs = 12.5;
tc = 50;

// Player 1
px = 5;
py = 25;
xv = 1;
yv = 0;

trail = [];
tail = 0;

//Player 2
p2x = 45;
p2y = 25;
x2v = -1;
y2v = 0;

trail2 = [];
tail2 = 0;

function game(){

    //Paint game board
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canv.width,canv.height);

    px += xv;
    py += yv;

    if(px < 0){
        px = tc - 1;
    }
    if(px > tc - 1){
        px = 0;
    }
    if(py < 0){
        py = tc - 1;
    }
    if(py > tc - 1){
        py = 0;
    }

    ctx.fillStyle = "blue";
    for(var i = 0; i < trail.length; i++){
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
        if(trail2[i].x === px && trail2[i].y === py || trail[i].x === px && trail[i].y === py ){
            blueLoose = true;
        }
    }

    trail.push({x:px, y:py});
    while(trail.length > tail){
        trail.shift();
    }

    //Player 2
    p2x += x2v;
    p2y += y2v;

    if(p2x < 0){
        p2x = tc - 1;
    }
    if(p2x > tc - 1){
        p2x = 0;
    }
    if(p2y < 0){
        p2y = tc - 1;
    }
    if(p2y > tc - 1){
        p2y = 0;
    }

    ctx.fillStyle = "red";
    for(var i = 0; i < trail2.length; i++){
        ctx.fillRect(trail2[i].x*gs, trail2[i].y*gs, gs-2, gs-2);
        if(trail[i].x == p2x && trail[i].y == p2y || trail2[i].x === p2x && trail2[i].y === p2y ){
            redLoose = true;
        }
    }

    trail2.push({x:p2x, y:p2y});
    while(trail2.length > tail2){
        trail2.shift();
    }

    tail++;
    tail2++; 

    if (blueLoose === true && redLoose === false){
        drawBlueLoose();
    }
    else if(redLoose === true && blueLoose === false){
        drawRedLoose();
    }
    else if(redLoose === true && blueLoose === true){
        drawDraw();
    }
    else if(p2x == px && p2y == py){
        drawDraw();
    }

    function drawBlueLoose(){
        ctx.fillStyle = "blue";
        clearInterval(gameSpeed);
        ctx.font = "40px Arial";
        ctx.fillText("Blue Loose",canv.width/3.5,canv.height/4);
        ctx.fillText("Press any button",canv.width/5,canv.height/2);
        gameOn = false;
        p2win++;
    }
    
    function drawRedLoose(){
        ctx.fillStyle = "red";
        clearInterval(gameSpeed);
        ctx.font = "40px Arial";
        ctx.fillText("Red Loose",canv.width/3.5,canv.height/4);
        ctx.fillText("Press any button",canv.width/5,canv.height/2);
        gameOn = false;
        p1win++;
    }
    
    function drawDraw(){
        ctx.fillStyle = "yellow";
        clearInterval(gameSpeed);
        ctx.font = "40px Arial";
        ctx.fillText("Draw",canv.width/2.5,canv.height/4);
        ctx.fillText("Press any button",canv.width/5,canv.height/2);
        gameOn = false;
    }
    
}

//Controller player 1 and 2
function player1turnUp(){
    if(!gameOn)
        newGame();
    else{
        if((xv === 0 && yv === -1)||(xv === 0 && yv === 1)){
            
        }
        else{
            xv = 0;
            yv = -1;
        }
    }
}

function player1turnDown(){
    if(!gameOn)
        newGame();
    else{
        if((xv === 0 && yv === -1)||(xv === 0 && yv === 1)){
            
        }
        else{
            xv = 0;
            yv = 1;
        }
    }
}

function player1turnLeft(){
    if(!gameOn)
        newGame();
    else{
        if((xv === 1 && yv === 0)||(xv === -1 && yv === 0)){
            
        }
        else{
            xv = -1;
            yv = 0;
        }
    }
}

function player1turnRight(){
    if(!gameOn)
        newGame();
    else{
        if((xv === 1 && yv === 0)||(xv === -1 && yv === 0)){
            
        }
        else{
            xv = 1;
            yv = 0;
        }
    }
}

function player2turnUp(){
    if(!gameOn)
        newGame();
    else{
        if((x2v === 0 && y2v === 1)||(x2v === 0 && y2v === -1)){
        
        }
        else{
            x2v = 0;
            y2v = -1;
        }
    }
}

function player2turnDown(){
    if(!gameOn)
        newGame();
    else{
        if((x2v === 0 && y2v === 1)||(x2v === 0 && y2v === -1)){
            
        }
        else{
            x2v = 0;
            y2v = 1;
        }
    }
}

function player2turnLeft(){
    if(!gameOn)
        newGame();
    else{
        if((x2v === 1 && y2v === 0)||(x2v === -1 && y2v === 0)){
        
        }
        else{
            x2v = -1;
            y2v = 0;
        }
    }
}

function player2turnRight(){
    if(!gameOn)
        newGame();
    else{
        if((x2v === 1 && y2v === 0)||(x2v === -1 && y2v === 0)){
            
        }
        else{
            x2v = 1;
            y2v = 0;
        }
    }
}


function newGame(){
    if(!gameOn){
        ctx.clearRect(0, 0, canv.width, canv.height);
        gameSpeed = setInterval(game,1000/speed);
        gameOn = true;
        draw = false;
        redLoose = false;
        blueLoose = false; 
        trail = [];
        trail2 = [];
        px = 5;
        py = 25;
        xv = 1;
        yv = 0;

        p2x = 45;
        p2y = 25;
        x2v = -1;
        y2v = 0;
        document.getElementById("p1win").innerHTML = p1win + " win";
        document.getElementById("p2win").innerHTML = p2win + " win";
    }

}

function togglePause() {
    if (!paused){
        clearInterval(gameSpeed);
        paused = true;
        ctx.fillStyle = "yellow";        
        ctx.font = "40px Arial";
        ctx.fillText("Pause",canv.width/3,canv.height/4);
    } 
    else {
        gameSpeed = setInterval(game, 1000/speed);
        paused = false;
    }
}
