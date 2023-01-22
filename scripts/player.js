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
    this.x += 2;
    image(skiRightImage, this.x, this.y);
  }

  moveLeft() {
    this.x -= 2;
    image(skiLeftImage, this.x, this.y);
  }
}
