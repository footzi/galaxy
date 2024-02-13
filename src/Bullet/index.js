import { Container, Graphics } from 'pixi.js';

export class Bullet {
  constructor({ game, x, y, container }) {
    this.game = game;
    this.options = this.game.options.bullet;
    this.parentContainer = container;

    this.container = new Container();
    this.container.name = 'Bullet';

    this.init({ x, y });
  }

  init({ x, y }) {
    const obj = new Graphics();

    obj.beginFill(this.options.color);
    obj.drawRect(0, 0, this.options.width, this.options.height);

    this.coords = {
      x,
      y,
    };

    this.container.position.x = this.coords.x;
    this.container.position.y = this.coords.y;
    this.container.addChild(obj);

    this.parentContainer.addChild(this.container);
  }

  flying() {
    this.coords.y -= this.options.velocity;

    if (this.coords.y > 0) {
      this.container.position.y = this.coords.y;
    } else {
      this.container.destroy();
    }
  }

  update() {
    this.flying();
  }

  destroy() {
    this.container.destroy();
  }
}

export class Bullets {
  constructor({ game }) {
    this.game = game;
    this.bullets = [];

    this.container = new Container();
    this.container.name = 'Bullets';

    this.game.addChild(this.container);
  }

  fire({ x, y }) {
    const bullet = new Bullet({ game: this.game, x, y, container: this.container });

    this.bullets.push(bullet);
  }

  update() {
    this.bullets.forEach((bullet) => bullet.update());
  }

  get() {
    return this.bullets;
  }

  destroy(index) {
    this.bullets[index].destroy();
    this.bullets.splice(index, 1);
  }
}
