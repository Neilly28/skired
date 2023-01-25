class Ghost {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
  }

  show() {
    image(this.img, (this.x -= 3), (this.y -= 6), 75, 75);
  }
}
