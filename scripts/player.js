class Player {
  constructor(img) {
    this.x = width / 2;
    this.y = height / 4;
    this.img = img;
  }

  show() {
    image(this.img, this.x, this.y);
  }

  moveRight() {
    this.x += 10;
    this.img = skiRightImage;
  }

  moveLeft() {
    this.x -= 10;
    this.img = skiLeftImage;
  }

  moveDown() {
    this.img = playerImage;
  }

  jump() {
    this.img = skiJumpImage;
  }
}
