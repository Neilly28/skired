console.log("hello from sketch!");

let players = [];
let obstacles = [];
let rocks = [];
let rainbows = [];
// let message = "yeti imminent...";

function preload() {
  playerImage = loadImage("/skier.png");
  obstacleImage = loadImage("/tree.png");
  rockImage = loadImage("/rock.png");
  ouchImage = loadImage("/ouch.png");
  rainbowImage = loadImage("/rainbow.png");
}

function setup() {
  createCanvas(600, 600);

  //   spawn player
  for (let i = 0; i < 1; i++) {
    let player = {
      x: 300,
      y: 100,
      size: 50,
      moveRight() {
        this.x += 2;
      },
      moveLeft() {
        this.x -= 2;
      },
    };
    players.push(player);
  }

  //   spawn obstalce
  for (let i = 0; i < 10; i++) {
    let obstacle = {
      x: random(0, 600),
      y: random(700, 1000),
    };
    obstacles.push(obstacle);
  }

  // spawn rainbow
  //   for (let i = 0; i < 1; i++) {
  //     let rainbow = {
  //       x: random(0, 600),
  //       y: random(400, 600),
  //     };
  //   }
}

function draw() {
  background("#fff");
  rect(0, 0, 600, 600);
  strokeWeight(4);
  stroke("#444");

  //   draw the player
  //   image(playerImage, 300, 0, 40, 50);
  for (let player of players) {
    // player.y += 0.5;
    image(playerImage, player.x, player.y);
    if (keyIsDown(RIGHT_ARROW)) {
      player.moveRight();
    } else if (keyIsDown(LEFT_ARROW)) {
      player.moveLeft();
    }
  }

  //   draw the obstacle
  for (let obstacle of obstacles) {
    obstacle.y -= 5;
    image(obstacleImage, obstacle.x, obstacle.y);

    // remove obstacles that are out of the screen
    if (obstacle.y < -1000) {
      obstacles.splice(0, 1);

      //   generate new obstalces
      obstacles.push({
        x: random(0, 600),
        y: random(600, 1500),
      });
    }
  }

  //   check for collision
  for (let player of players) {
    for (let obstacle of obstacles) {
      if (dist(player.x, player.y, obstacle.x, obstacle.y) < 15) {
        // stop obstacle velocity
        obstacles.forEach((obstacle) => (obstacle.y += 5));

        // show ouch image
        image(ouchImage, player.x, player.y);
        // text(message, 300, 30);
      }
    }
  }
}
