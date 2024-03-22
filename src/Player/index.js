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
  }

  right() {
    const x = this.coords.x + this.options.velocity;
    const isCollision = x + this.options.width + this.options.offsetX >= this.game.options.width;

    if (!isCollision) {
      this.coords.x = x;
      this.container.x = this.coords.x;
    }
  }

  left() {
    const x = this.coords.x - this.options.velocity;
    const isCollision = x - this.options.offsetX <= 0;

    if (!isCollision) {
      this.coords.x = x;
      this.container.x = this.coords.x;
    }
  }

  up() {
    const y = this.coords.y - this.options.velocity;
    const isCollision = y <= this.options.offsetY;

    if (!isCollision) {
      this.coords.y = y;
      this.container.y = this.coords.y;
    }
  }

  down() {
    const y = this.coords.y + this.options.velocity;
    const isCollision = y + this.options.height + this.options.offsetY >= this.game.options.height;

    if (!isCollision) {
      this.coords.y = y;
      this.container.y = this.coords.y;
    }
  }

  update() {}

  getCoords() {
    return this.coords;
  }
}
