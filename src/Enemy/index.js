import { Container, Graphics } from 'pixi.js';

class Enemy {
  constructor({ game, x, y }) {
    this.game = game;
    this.options = this.game.options.enemy;

    this.container = new Container();
    this.container.name = 'Enemy';

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

    this.game.addChild(this.container);
  }

  update() {}

  destroy() {
    this.container.destroy();
  }
}

export class Enemies {
  constructor({ game }) {
    this.game = game;
    this.enemies = [];
  }

  init({ maxInLine, lines }) {
    const { options } = this.game;
    const { enemy } = options;

    const gameCenter = options.width / 2;

    const enemyWidth = enemy.width + enemy.offsetBetween;
    const enemyHeight = enemy.height + enemy.offsetBetween;

    const calcStartX = (countEnemies) => {
      const countEnemiesInCenter = countEnemies / 2;
      const startOffset = countEnemiesInCenter * enemyWidth - enemy.offsetBetween / 2;

      return gameCenter - startOffset;
    };

    new Array(lines).fill('').forEach((_, index) => {
      const y = enemy.enemiesOffsetY + enemyHeight * index;

      const countEnemies = maxInLine - index * 2;

      new Array(countEnemies).fill('').forEach((_, index) => {
        const x = calcStartX(countEnemies) + (enemyWidth * index + 1);

        const enemy = new Enemy({ game: this.game, x, y });
        this.enemies.push(enemy);
      });
    });
  }

  get() {
    return this.enemies;
  }

  destroy(index) {
    this.enemies[index].destroy();
    this.enemies.splice(index, 1);
  }
}
