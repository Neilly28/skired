console.log("hello from sketch!");

// global variables
let button;
let mode;
mode = 0;
let isMoving = true;
let isFinish = false;
let wordPosY = 100;
let signPosY = 400;
let dudePosX = 0;
let dudePosY = 0;
let gondolaPosY = 700;
let startPosY = 800;
let distance = 0;
let currentTime = 0;
let best = 0;
let message = "Distance:";
let meters = "m";
let obstacles = [];
let rocks = [];
let fires = [];
let ghosts = [];
let yetiPosX = 200;
let yetiPosY = -200;
let yetiSpeed = 2;
let finishPosY = 800;
let speedPosY = 0;

// preload p5
function preload() {
  wordImage = loadImage("/images/wordart.png");
  centerImage = loadImage("/images/freestyle.png");
  leftImage = loadImage("/images/slalom.png");
  rightImage = loadImage("/images/treeslalom.png");
  dudeImage = loadImage("/images/dude.png");
  gondolaImage = loadImage("/images/gondola.png");
  startLeftImage = loadImage("/images/startleft.png");
  startRightImage = loadImage("/images/startright.png");
  playerStandImage = loadImage("/images/skititle.png");
  playerImage = loadImage("/images/skier.png");
  skiRightImage = loadImage("/images/skiright.png");
  skiLeftImage = loadImage("/images/skileft.png");
  skiJumpImage = loadImage("/images/skijump.png");
  obstacleImage = loadImage("/images/tree.png");
  rockImage = loadImage("/images/rock.png");
  ouchImage = loadImage("/images/ouch.png");
  fireImage = loadImage("/images/fire.gif");
  fireBallImage = loadImage("/images/fireball.gif");
  yetiImage = loadImage("/images/yeti.png");
  finishLeftImage = loadImage("/images/finishleft.png");
  finishRightImage = loadImage("/images/finishright.png");
  hugImage = loadImage("/images/hug.png");
  skiDownImage = loadImage("/images/skidown.png");
  ghostImage = loadImage("/images/ghost.gif");
}

// setup p5
function setup() {
  // create canvas and link to html
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasForHTML");
  imageMode(CENTER);

  //   spawn player
  player = new Player(playerImage);

  //   spawn yeti
  yeti = new Yeti(yetiImage);

  //   spawn obstalce
  for (let i = 0; i < 25; i++) {
    obstacles[i] = new Obstacle(
      obstacleImage,
      random(0, 600),
      random(600, 2400)
    );
    isMoving = true;
  }

  // spawn rocks
  for (let i = 0; i < 25; i++) {
    rocks[i] = new Rock(rockImage, random(0, 600), random(600, 2400));
    isMoving = true;
  }

  // spawn fires
  for (let i = 0; i < 25; i++) {
    fires[i] = new Fire(fireImage, random(0, 600), random(600, 2400));
    isMoving = true;
  }

  // spawn ghosts
  for (let i = 0; i < 25; i++) {
    ghosts[i] = new Ghost(ghostImage, random(0, 600), random(600, 2400));
    isMoving = true;
  }
}

function draw() {
  // show start screen
  clear();
  if (mode == 0) {
    background("#fff");
    image(wordImage, 200, 100, 308, 157);
    image(leftImage, 150, 400, 40, 36);
    image(centerImage, 300, 400, 40, 35);
    image(rightImage, 450, 400, 44, 36);
    image(dudeImage, dudePosX, dudePosY, 20, 29);
    image(playerStandImage, player.x, player.y);
    image(gondolaImage, 400, gondolaPosY, 26, 32);
    dudePosX += 3;
    dudePosY += 5;
    gondolaPosY -= 1;
  }

  // start game
  if (mode == 1) {
    // start time counter
    currentTime++;

    // start distance counter
    if (frameCount % 90 === 0 && isMoving == true) {
      distance += 10;
    }

    // draw background and environment
    background("#fff");
    image(wordImage, 200, wordPosY, 308, 157);
    image(leftImage, 150, signPosY, 40, 36);
    image(centerImage, 300, signPosY, 40, 35);
    image(rightImage, 450, signPosY, 44, 36);
    image(dudeImage, dudePosX, dudePosY, 20, 29);
    image(startLeftImage, 150, startPosY, 42, 27);
    image(startRightImage, 450, startPosY, 42, 27);
    image(gondolaImage, 400, gondolaPosY, 26, 32);
    image(yetiImage, yetiPosX, yetiPosY, 30, 39);

    // make environment move
    wordPosY -= 3;
    signPosY -= 3;
    dudePosX += 2;
    dudePosY += 2;
    startPosY -= 3;
    gondolaPosY -= 5;
    speedPosY += 0.1;

    // draw player
    player.show();
    player.move();

    //   draw the obstacles
    if (distance > 30 && distance < 550) {
      for (let obstacle of obstacles) {
        obstacle.show();

        // remove obstacles that are out of the screen
        if (obstacle.y < -2000 && distance < 1000) {
          obstacles.splice(0, 1);

          // generate new obstacles
          let newObstacle = new Obstacle(
            obstacleImage,
            random(0, 600),
            random(600, 2400)
          );

          // generate new obstacles
          obstacles.push(newObstacle);
          isMoving = true;
        }
      }
    }

    //   draw the rocks
    if (distance > 150 && distance < 500) {
      for (let rock of rocks) {
        rock.show();

        // remove rocks that are out of the screen
        if (rock.y < -2000 && distance < 1000) {
          rocks.splice(0, 1);

          // generate new rocks
          let newRock = new Rock(rockImage, random(0, 600), random(600, 2400));
          rocks.push(newRock);
          isMoving = true;
        }
      }
    }

    // draw the fires
    if (distance > 300 && distance < 520) {
      for (let fire of fires) {
        fire.show();

        // remove fires that are out of the screen
        if (fire.y < -2000 && distance < 1000) {
          fires.splice(0, 1);
          let newFire = new Fire(fireImage, random(0, 600), random(600, 2400));

          // generate new fires
          fires.push(newFire);
          isMoving = true;
        }
      }
    }

    // draw the ghosts
    if (distance > 375 && distance < 490) {
      for (let ghost of ghosts) {
        ghost.show();

        // remove ghosts that are out of the screen
        if (ghost.y < -2000 && distance < 1000) {
          ghosts.splice(0, 1);
          let newGhost = new Ghost(
            ghostImage,
            random(300, 600),
            random(600, 2400)
          );

          // generate new ghosts
          ghosts.push(newGhost);
          isMoving = true;
        }
      }
    }

    //   check for obstacle collision
    for (let obstacle of obstacles) {
      for (let rock of rocks) {
        for (let fire of fires) {
          if (
            dist(player.x, player.y, obstacle.x, obstacle.y) < 15 ||
            dist(player.x, player.y, rock.x, rock.y) < 25 ||
            dist(player.x, player.y, fire.x, fire.y) < 25
          ) {
            // stop obstacle velocity
            obstacles.forEach((obstacle) => (obstacle.y += 7));
            rocks.forEach((rock) => (rock.y += 7));
            fires.forEach((fire) => (fire.y += 7));
            speedPosY = 0;

            // show ouch image
            image(ouchImage, player.x, player.y);
            isMoving = false;
          }
        }
      }
    }

    // draw yeti
    if (isFinish == true) {
      // Calculate the distance between the moving element and the target position
      let distanceY = player.y - yetiPosY;
      // console.log(distanceY);
      let distanceX = player.x - yetiPosX;
      // console.log(distanceX);

      // Normalize the distance vector
      let d = sqrt(distanceX * distanceX + distanceY * distanceY);
      distanceX = distanceX / d;
      distanceY = distanceY / d;
      // console.log(d, distanceX, distanceY);

      // Update the position of the moving element
      yetiPosX += distanceX * yetiSpeed;
      yetiPosY += distanceY * yetiSpeed;
    }
  }

  // draw player ui
  fill(255, 255, 255);
  strokeWeight(1);
  stroke(0);
  rect(450, 0, 150, 90);
  fill(0);
  textSize(14);
  text("Distance:", 455, 20);
  text(distance + "m", 525, 20);
  text("Speed:", 455, 40);
  text(Math.trunc(speedPosY) + "m/s", 525, 40);
  text("Time:", 455, 60);
  text((currentTime / 100).toFixed(1) + " sec", 525, 60);
  text("Best:", 455, 80);
  text((storedTime / 100).toFixed(1) + " sec", 525, 80);

  // console.log("current time:", currentTime, "stored time:", storedTime);

  // draw finish line
  if (distance >= 50) {
    image(finishLeftImage, 150, finishPosY, 50, 29);
    image(finishRightImage, 450, finishPosY, 50, 29);
    isFinish = true;

    // assign the current time as best time
    if (storedTime == 0 || currentTime < storedTime) {
      best = currentTime;

      // store the best score into document.cookie
      document.cookie = best;
    }

    // make finish line move until it is in positionY 100
    if (finishPosY > 100) {
      finishPosY -= 3;
    } else {
      // display game over
      text("GAME OVER", 250, 300);
      text("Hugged by Yeti ❤️", 250, 320);
      text("It's complicated..", 250, 340);
      text("Hit Enter or R to play again :)", 215, 400);
      noLoop();
    }
  }
}

// create function getCookie to return document.cookie
function getCookie() {
  return document.cookie;
}
let storedTime = getCookie();

// key event handlers
let gamePaused = false;

function keyPressed() {
  if (
    keyCode === DOWN_ARROW ||
    keyCode === RIGHT_ARROW ||
    keyCode === LEFT_ARROW ||
    keyCode === ENTER
  ) {
    mode = 1;
  }
  if (keyCode === RIGHT_ARROW) {
    player.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    player.setDir(-1);
  }
  if (key === "p") {
    if (gamePaused) {
      loop();
      gamePaused = false;
    } else {
      noLoop();
      gamePaused = true;
    }
  }
}

function keyReleased() {
  player.setDir(0);
}
