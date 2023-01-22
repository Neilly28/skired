console.log("hello from sketch!");

let players = [];
let obstacles = [];

function preload() {
  playerImage = loadImage("/skier.png");
  obstacleImage = loadImage("/tree.png");
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
        this.x += 1;
      },
      moveLeft() {
        this.x -= 1;
      },
      moveDown() {
        this.y += 2;
      },
    };
    players.push(player);
  }

  //   spawn obstalce
  for (let i = 0; i < 10; i++) {
    let obstacle = {
      x: random(0, 600),
      y: random(300, 600),
    };
    obstacles.push(obstacle);
  }
}

function draw() {
  background("#fff");

  //   draw the player
  //   image(playerImage, 300, 0, 40, 50);
  for (let player of players) {
    player.y += 0.5;
    image(playerImage, player.x, player.y);
    if (keyIsDown(RIGHT_ARROW)) {
      player.moveRight();
    } else if (keyIsDown(LEFT_ARROW)) {
      player.moveLeft();
    } else if (keyIsDown(DOWN_ARROW)) {
      player.moveDown();
    }
  }

  //   draw the obstacle
  for (let obstacle of obstacles) {
    obstacle.y -= 0.2;
    image(obstacleImage, obstacle.x, obstacle.y);
  }

  //   check for collision
  for (let player of players) {
    for (let obstacle of obstacles) {
      if (dist(player.x, player.y, obstacle.x, obstacle.y) < 15) {
        player.y -= 1;
      }
    }
  }
}
