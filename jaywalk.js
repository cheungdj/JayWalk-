//       _           __        __    _ _    
//      | | __ _ _   \ \      / /_ _| | | __
//   _  | |/ _` | | | \ \ /\ / / _` | | |/ /
//  | |_| | (_| | |_| |\ V  V / (_| | |   < 
//   \___/ \__,_|\__, | \_/\_/ \__,_|_|_|\_\
//       By Daniel Cheung & Kevin Wu
    
//-INSTRUCTIONS-//
//Use arrow keys to move-
//Avoid cars and trains and do not fall into the water-
//Reach 100 points to win-

//-ENJOY-//

//-VARIABLES-//
var startGame = false;
var score = 0;
var logSpeed = 2;
var deathSpeed = 2;
var carSpeed = 4;
var trainSpeed = 9;
var logMovement = 0;
var positionX = 200;
var positionY = 300;
var gameOver = Program.Restart;
var waterX = 0;
var waterY = [250 , 200, -50, -100, -175, -475, -300, -900, -1000, - 1075, -1125, -1300, -1450, -1500, -1550, -1650, -1700, - 1775, -1900];

var logX = [0, -10, -30, -50, -90, -40, -20, -30, -10, 0, -10, -30, -50, -90, -20, -70, -80, 0, -20]; 

var logY = [240 , 190, - 60, - 110, - 185, - 485, - 310, - 910, -1085, -1100, -1135, -1310, -1460, -1510, -1560, -1660, -1710, -1785, -1910];

var roadX = 0;

var roadY = [125, 100, -150, -200, -375, -325, -450, -500, -600, -775, -800, -975, -1025, -1175, -1200, -1350, -1475, -1600, -1750, -1825, -1975, -2050, -2075, -3000, -3050, -3075];

var carX = [400, 500, 600, 700, 450, 550, 650, 750, 425, 400, 500, 600, 700, 450, 650, 750, 400, 600, 500, 700, 450, 650, 750];

var carY = [125, 100, -150, -200, -375, -325, -450, -500, -600, -775, -800, -975, -1025, -1175, -1200, -1350, -1475, -1600, -1750, -1825, -1975, -2050, -2075, -3000, -3050, -3075];

var carX2 = [750, 650, 550, 450, 700, 600, 500, 400, 750, 550, 650, 450, 600, 700, 500];

var carY2 = [125, 100, -150, -200, -375, -325, -450, -500, -600, -775, -800, -975, -1025, -1175, -1200, -1350, -1475, -1600, -1750, -1825, -1975, -2050, -2075, -3000, -3050, -3075];

var tracksX = 0;

var tracksY = [25, -25, - 250, - 400, - 550, - 850, -875, -1250, -1400, -1675, -1800, -2000, -3000];

var trainX = [900, 800, 1000, 1200, 1300, 1400, 1500, 1600, 1700, 900, 800, 1000, 1200, 1300];

var trainY = [25, -25, - 250, - 400, - 550, - 850, -875, -1250, -1400, -1675, -1800, -2000, -3000];

var light1 = 94;

var light2 = 86;

var light3 = 86;

var logWidth = 0;

var slowLog = 2;

var fastLog = 3;

var collisionDetect = false;

var gameWin = false;

//-GAME FUNCTIONS-//
var createBackground = function() { //Generates background of game (grass & lines)
    background(0, 255, 68);
    fill(76, 135, 184);
    for (var i = 0; i < 16; i++) {
     var lineY = 25 + (i * 25);
     line (0, lineY , 400, lineY);
    }
};
var startMenu = function() {
    if (startGame === false) {
        fill(255, 211, 79);
        rect(0, 0, 400,400);
        fill(5, 115, 130);
        textSize(70);
        text("JAYWALK", 42, 212);
        textSize(30);
        text("Press any button to start", 40, 247);
    }
    if(keyIsPressed) {
        startGame = true;
}
};
var scoreBoard = function() { //Displays Score on Screen
    fill(0, 0, 0);
    rect(180, 0, 55, 25);
    fill(255, 211, 79);
    textSize(30);
    text(score, 180, 25);
}; 
var logAndWater = function() { //Drawing of Water & Logs
    fill(31, 153, 166);
    for (var i = 0; i < waterY.length; i++) {
        rect(waterX,waterY[i],400,25);
 
    if (positionX <= logX + 100 && positionX >= logX && positionY === waterY[i]) {
        positionX = positionX + logSpeed;
    }
    }
    for (var j = 0; j < logY.length; j++) {
    image(getImage("cute/WoodBlock"), logX [j], logY[j], 100, 35);
        if (logX[j] > 450) {
        logX[j] = Math.random() * -300; 
        logSpeed = Math.random() * (2 - 0.5) + 2;
    }
    logX[j] = logX[j] + logSpeed;
        if (positionY === waterY[j]  &&  positionX > logX[j] + 100 || positionY ===                 waterY[j] && positionX < logX[j] - 25 ) { //collision detecttion
                collisionDetect = true;
    }
         if (positionX <= logX[j] + 100 && positionX >= logX[j] && positionY === waterY[j])     {
        positionX = positionX + logSpeed;
    }
    }
};
var carAndRoad = function () {
    for (var k = 0; k < roadY.length; k++) {
    fill(184, 173, 173);
    rect(roadX, roadY[k], 400, 25);
   
    if ((positionX < carX + 75 && positionX > carX && positionY === roadY[k]) || (positionX     < carX2 + 75 && positionY === roadY[k] && positionX > carX2)) {
    collisionDetect = true;   
  }
     
    }
    for ( var i = 0; i < carY.length; i++) {
    fill(171, 81, 179);
    rect(carX[i], carY[i], 70, 25);
    fill(0, 0, 0);
    rect(carX[i], carY[i], 5, 25);
    fill(159, 241, 252);
    rect(carX[i] + 15, carY[i], 15 , 25);
       if (carX[i] < -100) {
            carX[i] = Math.floor((Math.random() * 500) + 400);
        }
            carX[i] = carX[i] - carSpeed;
    }
    for (var i = 0; i < carY2.length; i++) {
    fill(207, 64, 64);
    rect(carX2[i], carY[i], 70, 25);
    fill(43, 39, 39);
    rect(carX2[i], carY[i], 5, 25);
    fill(134, 202, 219);
    rect(carX2[i] + 15 , carY[i], 15, 25);
    if (carX2[i] < - 400) {
        carX2 = Math.floor((Math.random() * 700) + 600);
    }
    carX2[i] = carX2[i] - carSpeed;
    if ((positionX < carX[i] + 75 && positionX > carX[i] && positionY === roadY[i]) ||          (positionX < carX2[i] + 75 && positionY === roadY[i] && positionX > carX2[i])) {
    collisionDetect = true;   
  }
    }
    };
var trainAndTracks = function () { //Drawing of Car and Road
    for (var j = 0; j < tracksY.length; j++) {
    fill(light1, light2, light2);
    rect(tracksX, tracksY[j], 400,25);
    fill(255, 255, 255);
    rect(tracksX,tracksY[j] + 2,400,2);
    rect(tracksX,tracksY[j] + 20,400,2);
    for (var i = 0; i < 30; i++) {
    rect(tracksX + 14 * i ,tracksY[j] + 5, 4, 14);
    }
   
    }
    
    for (var i = 0; i < trainY.length; i++) {
    fill(163, 89, 89);
    rect(trainX[i], trainY[i], 200, 25);
    fill(97, 92, 92);
    rect(trainX[i] + 200, trainY[i] + 8, 15, 8);
    fill(163, 89, 89);
    rect(trainX[i] + 215, trainY[i], 200, 25);
      trainX[i] = trainX[i] - trainSpeed;
        if (trainX[i] < 400) {
         light1 = 94;
         light2 = 86;
        }
        if (trainX[i] < - 400) {
            trainX[i] = Math.floor((Math.random() * 1500) + 1400);  
     }
        if (trainX[i] <= 700 && trainX[i] >= 400) {
         light1 = 255;
         light2 = 0;
       }
        if (positionX > trainX[i] && positionX < trainX[i] + 415 && positionY === tracksY[i]) {
   collisionDetect = true;   
  }
    }
};
var characterMove = function() {    //For Character Sprite
    fill(0, 0, 0);
    rect(positionX, positionY, 25, 25);
    if (collisionDetect === false) {
    if (keyIsPressed && keyCode === 39) { //Move right
        keyReleased = function () {
            if (keyCode === 39) {
                positionX = positionX + 25;  
            }
        };
            
    } 
    if (keyIsPressed && keyCode === 37) { //Move left
            keyReleased = function () {
                if (keyCode === 37) {
                 positionX = positionX - 25;
                }
            };
    } 
    if (keyIsPressed && keyCode === 38) { //Move up
            keyReleased = function () {
                if (keyCode === 38) {
                    score = score + 1;
                    
                    for (var i = 0; i < roadY.length; i++) {
                     roadY[i] += 25;
                     carY[i] += 25;
                    }
                    
                    for (var i = 0; i < waterY.length; i++) {
                     waterY[i] += 25;
                     logY[i] += 25;
                    }
                    
                    for (var i = 0; i < tracksY.length; i++) {
                     tracksY[i] += 25;
                     trainY[i] += 25;
                    }
         
                }
            };
    }
    if (keyIsPressed && keyCode === 40) { //Move down
            keyReleased = function () {
                if (keyCode === 40) {
                    score = score - 1;
                    for (var i = 0; i < roadY.length; i++) {
                    roadY[i] -= 25;
                    carY[i] -= 25;
                    }
                    
                    for (var i = 0; i < waterY.length; i++) {
                    waterY[i] -= 25;
                    logY[i] -= 25;
                    }
                    
                    for (var i = 0; i < tracksY.length; i++) {
                    tracksY[i] -= 25;
                    trainY[i] -= 25;
                    }
                }
            };
    }
    }
};
var gameOver = function () {
    if(positionX < -25 || positionX > 425) { //Death when moving too far right or left
        collisionDetect = true;
    }
    if(collisionDetect === true && gameWin === false) { //Gameover Notif
        fill(255, 211, 79);
        rect(0, 64, 436, 185);
        trainSpeed = 0;
        logSpeed = 0;
        carSpeed = 0;
        fill(5, 115, 130);
        textSize(50);
        text("GAMEOVER",57,141);
        positionX = positionX + deathSpeed - 0.5;
        textSize(20);
        text("Press any key to try again", 91, 212);
        textSize(30);
        text("Score: " + score, 149, 181);
    }
    if (score >= 100) { //Game Win Notif
        gameWin = true;
        collisionDetect = false;
        fill(255, 211, 79);
        rect(0, 150, 400, 100);
        textSize(60);
        fill(5, 115, 130);
        text("You Win!", 82, 216);
        textSize(20);
        text("Press any key to play again!", 78, 239);
        trainSpeed = 0;
        logSpeed = 0;
        carSpeed = 0;
        positionX = positionX + deathSpeed - 0.5;
    }
};
var keyPressed = function() {
    if (collisionDetect === true || gameWin ===true) {
        Program.restart();
    }
};
draw = function() { //main function that calls all other functions
    createBackground();
    noFill();
    carAndRoad();
    logAndWater();
    trainAndTracks();
    characterMove();
    gameOver();
    scoreBoard();
    startMenu();
    };
