class Fire {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
  }

  show() {
    image(this.img, this.x, (this.y -= 7), 64, 64);
  }
}
