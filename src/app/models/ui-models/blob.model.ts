export class Blob {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  constructor(el: any) {
    this.el = el;
    this.size = el.getBoundingClientRect().width;
    this.x = this.randomCoordinates(
      0,
      97 - (this.size / window.innerWidth) * 100
    );
    this.y = this.randomCoordinates(
      0,
      100 - (this.size / window.innerHeight) * 100
    );
    this.vx = this.randomCoordinates(0.5, 1) * Math.random() > 0.5 ? -0.5 : 0.5;
    this.vy = this.randomCoordinates(0.5, 1) * Math.random() > 0.5 ? -0.5 : 0.5;
  }
  update() {
    console.log();
    window.innerHeight - this.size;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= 97 - (this.size / window.innerWidth) * 100 || this.x < 0) {
      this.vx *= -1;
    }
    if (this.y >= 100 - (this.size / window.innerHeight) * 100 || this.y < 0) {
      this.vy *= -1;
    }
  }
  move() {
    this.el.style.transform = ` translate(${this.x}vw, ${this.y}vh)`;
  }
  private randomCoordinates(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
