class Player {
  constructor(img) {
    this.x = width / 2;
    this.y = height / 6;
    this.img = img;
  }

  show() {
    image(this.img, this.x, this.y);
  }

  moveRight() {
    this.x += 8;
    this.img = skiRightImage;
  }

  moveLeft() {
    this.x -= 8;
    this.img = skiLeftImage;
  }

  moveDown() {
    this.img = playerImage;
  }

  jump() {
    this.img = skiJumpImage;
  }
}
