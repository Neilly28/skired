console.log("hello from sketch!");

// Speed of movement
let speed = 2;

let mode;
// let isAlive = true;
let isMoving = true;
let wordPosY = 100;
let signPosY = 400;
let dudePosX = 0;
let dudePosY = 0;
let gondolaPosY = 700;
let startPosY = 800;
let yetiPosY = 200;
let distance = 0;
let message = "Distance travelled:";
let meters = "meters";
let obstacles = [];
let rocks = [];
let fires = [];
let rainbows = [];
let yetiX = 200;
let yetiY = 0;

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
  rainbowImage = loadImage("/images/rainbow.png");
  fireImage = loadImage("/images/fire.gif");
  yetiImage = loadImage("/images/yeti.png");
}

function setup() {
  mode = 0;

  let canvas = createCanvas(600, 600);
  canvas.parent("canvasForHTML");

  imageMode(CENTER);

  //   spawn player
  player = new Player(playerImage);

  //   spawn yeti
  yeti = new Yeti(playerImage);

  //   spawn obstalce
  for (let i = 0; i < 20; i++) {
    obstacles[i] = new Obstacle(
      obstacleImage,
      random(100, 500),
      random(600, 2400)
    );
    isMoving = true;
  }

  // spawn rocks
  for (let i = 0; i < 20; i++) {
    rocks[i] = new Rock(rockImage, random(100, 500), random(600, 2400));
    isMoving = true;
  }

  // spawn fires
  for (let i = 0; i < 25; i++) {
    fires[i] = new Fire(fireImage, random(100, 500), random(600, 2400));
    isMoving = true;
  }

  //   spawn rainbows
  for (let i = 0; i < 2; i++) {
    rainbows[i] = new Rainbow(
      rainbowImage,
      random(300, 500),
      random(600, 2400)
    );
    isMoving = true;
  }
}

function draw() {
  //starting screen
  clear();
  if (mode == 0) {
    background("#fff");
    rect(0, 0, 600, 600);
    strokeWeight(4);
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
    // draw background
    background("#fff");
    rect(0, 0, 600, 600);
    strokeWeight(4);

    // draw ui
    text(message, 400, 30);
    text(distance, 500, 30);
    text(meters, 520, 30);
    if (frameCount % 90 === 0 && isMoving == true) {
      distance += 10;
    }
    console.log(distance);

    // draw environments
    image(wordImage, 200, wordPosY, 308, 157);
    image(leftImage, 150, signPosY, 40, 36);
    image(centerImage, 300, signPosY, 40, 35);
    image(rightImage, 450, signPosY, 44, 36);
    image(dudeImage, dudePosX, dudePosY, 20, 29);
    image(startLeftImage, 150, startPosY, 42, 27);
    image(startRightImage, 450, startPosY, 42, 27);
    image(gondolaImage, 400, gondolaPosY, 26, 32);
    image(yetiImage, yetiX, yetiY, 20, 20);

    wordPosY -= 3;
    signPosY -= 3;
    dudePosX += 2;
    dudePosY += 2;
    startPosY -= 3;
    gondolaPosY -= 5;

    // Calculate the distance between the moving element and the target position
    let distanceY = player.y - yetiY;
    console.log(distanceY);
    let distanceX = player.x - yetiX;
    console.log(distanceX);

    // Normalize the  sdistance vector
    let d = sqrt(distanceX * distanceX + distanceY * distanceY);
    distanceX = distanceX / d;
    distanceY = distanceY / d;
    console.log(d, distanceX, distanceY);

    // Update the position of the moving element
    yetiX += distanceX * speed;
    yetiY += distanceY * speed;

    // draw player
    player.show();

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      player.moveRight();
    } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      player.moveLeft();
    }
    console.log(player);

    //   draw the obstacles
    if (distance > 40) {
      for (let obstacle of obstacles) {
        obstacle.show();

        // remove obstacles that are out of the screen
        if (obstacle.y < -2000) {
          obstacles.splice(0, 1);

          // generate new obstacles
          let newObstacle = new Obstacle(
            obstacleImage,
            random(100, 500),
            random(600, 2400)
          );
          obstacles.push(newObstacle);
          isMoving = true;
        }
      }
    }

    //   draw the rocks
    if (distance > 200) {
      for (let rock of rocks) {
        rock.show();

        // remove rocks that are out of the screen
        if (rock.y < -2000) {
          rocks.splice(0, 1);
          let newRock = new Rock(
            rockImage,
            random(100, 500),
            random(600, 2400)
          );
          rocks.push(newRock);
          isMoving = true;
        }
      }
    }

    // draw the fires
    if (distance > 400) {
      for (let fire of fires) {
        fire.show();

        // remove fires that are out of the screen
        if (fire.y < -2000) {
          fires.splice(0, 1);
          let newFire = new Fire(
            fireImage,
            random(100, 500),
            random(600, 2400)
          );
          fires.push(newFire);
          isMoving = true;
        }
      }
    }

    //   draw the rainbows
    if (distance > 50) {
      for (let rainbow of rainbows) {
        rainbow.show();

        // remove obstacles that are out of the screen
        if (rainbow.y < -2000) {
          rainbows.splice(0, 1);
          let newRainbow = new Rainbow(
            rainbowImage,
            random(100, 500),
            random(600, 2400)
          );
          rainbows.push(newRainbow);
          isMoving = true;
        }
      }
    }

    //   check for obstacle collision
    for (let obstacle of obstacles) {
      for (let rock of rocks) {
        for (let fire of fires) {
          for (let rainbow of rainbows) {
            if (
              dist(player.x, player.y, obstacle.x, obstacle.y) < 15 ||
              dist(player.x, player.y, rock.x, rock.y) < 25 ||
              dist(player.x, player.y, fire.x, fire.y) < 25
            ) {
              // stop obstacle velocity
              obstacles.forEach((obstacle) => (obstacle.y += 7));
              rocks.forEach((rock) => (rock.y += 7));
              fires.forEach((fire) => (fire.y += 7));
              rainbows.forEach((rainbow) => (rainbow.y += 7));
              // show ouch image
              image(ouchImage, player.x, player.y);
              isMoving = false;
            }
            if (dist(player.x, player.y, rainbow.x, rainbow.y) < 15) {
              // increase obstacle velocity
              obstacles.forEach((obstacle) => (obstacle.y -= 20));
              rainbows.forEach((rainbow) => (rainbow.y -= 20));
              image(skiJumpImage, player.x, player.y);
            }
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    mode = 1;
  }
}
