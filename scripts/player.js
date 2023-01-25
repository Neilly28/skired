class Player {
  constructor(img) {
    this.x = 300;
    this.y = 250;
    this.img = skiDownImage;
    this.width = 17;
    this.height = 34;
    this.xdir = 0;
  }

  show() {
    image(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.xdir * 10;
  }

  setDir(dir) {
    this.xdir = dir;
  }
}
