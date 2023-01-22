console.log("hello from sketch!");

let obstacles = [];

function preload() {
  playerImage = loadImage("/images/skier.png");
  skiRightImage = loadImage("/images/skiright.png");
  skiLeftImage = loadImage("/images/skileft.png");
  obstacleImage = loadImage("/images/tree.png");
  rockImage = loadImage("/images/rock.png");
  ouchImage = loadImage("/images/ouch.png");
  rainbowImage = loadImage("/images/rainbow.png");
}

function setup() {
  createCanvas(600, 600);

  //   spawn player
  player = new Player(playerImage);

  //   spawn obstalce
  for (let i = 0; i < 10; i++) {
    obstacles[i] = new Obstacle(
      obstacleImage,
      random(0, 600),
      random(400, 600)
    );
  }
  console.log(obstacles);
}

function draw() {
  background("#fff");
  rect(0, 0, 600, 600);
  strokeWeight(4);
  stroke("#444");

  //   draw the player
  player.show();
  if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  } else if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  }

  //   draw the obstacle
  for (let obstacle of obstacles) {
    obstacle.show();

    // remove obstacles that are out of the screen
    if (obstacle.y < -1000) {
      obstacles.splice(0, 1);
      let newObstacle = new Obstacle(
        obstacleImage,
        random(0, 600),
        random(600, 1500)
      );
      obstacles.push(newObstacle);
    }
  }

  //   check for obstacle collision
  for (let obstacle of obstacles) {
    if (dist(player.x, player.y, obstacle.x, obstacle.y) < 15) {
      // stop obstacle velocity
      obstacles.forEach((obstacle) => (obstacle.y += 5));

      // show ouch image
      image(ouchImage, player.x, player.y);
    }
  }
}
