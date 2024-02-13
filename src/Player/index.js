import { Container, Graphics } from 'pixi.js';

export class Player {
  constructor({ game }) {
    this.game = game;
    this.options = this.game.options.player;

    this.container = new Container();
    this.container.name = 'Player';
  }

  init() {
    const obj = new Graphics();

    obj.beginFill(this.options.color);
    obj.drawRect(0, 0, this.options.width, this.options.height);

    this.coords = {
      x: this.game.options.width / 2 - this.options.width / 2,
      y: this.game.options.height - this.options.height - this.options.offsetY,
    };

    this.container.position.x = this.coords.x;
    this.container.position.y = this.coords.y;
    this.container.addChild(obj);

    this.game.addChild(this.container);

    this.bindEvents();
  }

  bindEvents() {
    // document.addEventListener('keydown', (event) => {
    //   console.log(event);
    //   const { key } = event;
    //
    //   if (key === 'ArrowRight') {
    //     this.right();
    //   }
    //
    //   if (key === 'ArrowLeft') {
    //     this.left();
    //   }
    // });
  }

  right() {
    const x = this.coords.x + this.options.step;

    const isCollision = x + this.options.width + this.options.offsetX >= this.game.options.width;

    if (!isCollision) {
      this.coords.x = x;
      this.container.x = this.coords.x;
    }
  }

  left() {
    const x = this.coords.x - this.options.step;

    const isCollision = x - this.options.offsetX <= 0;

    if (!isCollision) {
      this.coords.x = x;
      this.container.x = this.coords.x;
    }
  }

  update() {}

  getCoords() {
    return this.coords;
  }
}
