console.log("hello from sketch!");

let distance = 0;
let message = "Distance travelled:";
let meters = "meters";
let obstacles = [];
let rocks = [];
let fires = [];
let rainbows = [];

console.log(distance);

function preload() {
  playerImage = loadImage("/images/skier.png");
  skiRightImage = loadImage("/images/skiright.png");
  skiLeftImage = loadImage("/images/skileft.png");
  skiJumpImage = loadImage("/images/skijump.png");
  obstacleImage = loadImage("/images/tree.png");
  rockImage = loadImage("/images/rock.png");
  ouchImage = loadImage("/images/ouch.png");
  rainbowImage = loadImage("/images/rainbow.png");
  fireImage = loadImage("/images/fire.gif");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasForHTML");

  if (frameCount % 90 === 0) {
    distance += 100;
  }

  //   spawn player
  player = new Player(playerImage);

  //   spawn obstalce
  for (let i = 0; i < 10; i++) {
    obstacles[i] = new Obstacle(
      obstacleImage,
      random(100, 500),
      random(600, 1200)
    );
  }

  // spawn rocks
  for (let i = 0; i < 10; i++) {
    rocks[i] = new Rock(rockImage, random(100, 500), random(600, 1200));
  }

  // spawn fires
  for (let i = 0; i < 25; i++) {
    fires[i] = new Fire(fireImage, random(100, 500), random(600, 1200));
  }

  //   spawn rainbows
  for (let i = 0; i < 2; i++) {
    rainbows[i] = new Rainbow(rainbowImage, random(300, 500), random(400, 600));
  }
}

function draw() {
  // draw background
  // frameRate(60);
  background("#fff");
  rect(0, 0, 600, 600);
  strokeWeight(4);
  stroke("#444");

  // draw ui
  text(message, 15, 25);
  text(distance, 120, 25);
  text(meters, 150, 25);
  fill("white");

  if (frameCount % 90 === 0) {
    distance += 100;
  }

  // draw player
  player.show();

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.moveRight();
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.moveLeft();
  }

  if (player.x < -50 || player.x > 650) {
    text("you went off the screen and died", 300, 300);
    noLoop();
  }

  //   draw the obstacle
  if (distance > 300) {
    for (let obstacle of obstacles) {
      obstacle.show();

      // remove obstacles that are out of the screen
      if (obstacle.y < -1000) {
        obstacles.splice(0, 1);

        // generate new obstacles
        let newObstacle = new Obstacle(
          obstacleImage,
          random(100, 500),
          random(1200, 1500)
        );
        obstacles.push(newObstacle);
      }
    }
  }

  //   draw the rocks
  if (distance > 2000) {
    for (let rock of rocks) {
      rock.show();

      // remove rocks that are out of the screen
      if (rock.y < -1000) {
        rocks.splice(0, 1);
        let newRock = new Rock(rockImage, random(100, 500), random(1200, 1500));
        rocks.push(newRock);
      }
    }
  }

  // draw the fires
  if (distance > 5000) {
    for (let fire of fires) {
      fire.show();

      // remove rocks that are out of the screen
      if (fire.y < -1000) {
        fires.splice(0, 1);
        let newFire = new Fire(fireImage, random(100, 500), random(1200, 1500));
        fires.push(newFire);
      }
    }
  }

  //   draw the rainbow
  for (let rainbow of rainbows) {
    rainbow.show();

    // remove obstacles that are out of the screen
    if (rainbow.y < -1000) {
      rainbows.splice(0, 1);
      let newRainbow = new Rainbow(
        rainbowImage,
        random(100, 500),
        random(600, 1500)
      );
      rainbows.push(newRainbow);
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
