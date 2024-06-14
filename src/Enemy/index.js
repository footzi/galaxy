import { Container, Graphics, Point } from 'pixi.js';
import bezier from 'bezier';
import { calculateBezierCurve } from '../utils/animateBezier.js';

class Enemy {
  constructor({ game, x, y }) {
    this.game = game;
    this.options = this.game.options.enemy;

    this.container = new Container();
    this.obj = new Graphics();
    this.container.name = 'Enemy';

    this.falling = false;

    this.init({ x, y });
  }

  init({ x, y }) {
    this.obj.beginFill(this.options.color);
    this.obj.drawRect(0, 0, this.options.width, this.options.height);

    this.coords = {
      x,
      y,
    };

    // console.log(this.coords);

    // this.container.position.x = this.coords.x;
    // this.container.position.y = this.coords.y;
    this.container.addChild(this.obj);

    this.game.addChild(this.container);

    const graphics = new Graphics();
    const graphics2 = new Graphics();

    const startPoint = new Point(0, 0); // start
    const controlPoint1 = new Point(200, 300);
    const controlPoint2 = new Point(600, 300);
    const endPoint = new Point(200, 500);

    const bezierPoints = calculateBezierCurve([controlPoint1, controlPoint2, endPoint], 100);
    console.log(bezierPoints);
    // console.log(bezier([0, 1, 2], 0.5));

    // Рисуем кривую Безье
    graphics.lineStyle(2, 0xff0000);
    graphics2.lineStyle(2, 0xff0000);

    graphics.moveTo(startPoint.x, startPoint.y);
    graphics2.moveTo(startPoint.x, startPoint.y);

    graphics.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endPoint.x, endPoint.y);

    // this.paintExample();
    this.game.addChild(graphics);
    // this.game.addChild(graphics2);
  }

  paintExample() {
    // Создаем объект графики для отображения пути
    const graphics = new Graphics();

    // Задаем точки кривой Безье
    const points = [
      new Point(0, 0),
      new Point(100, 300),
      new Point(200, 200),
      new Point(300, 300),
      new Point(400, 500),
    ];

    // Рисуем кривую Безье, используя отрезки между контрольными точками
    graphics.lineStyle(2, 0xff0000);
    graphics.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i += 3) {
      if (i + 2 < points.length) {
        graphics.bezierCurveTo(
          points[i].x,
          points[i].y,
          points[i + 1].x,
          points[i + 1].y,
          points[i + 2].x,
          points[i + 2].y
        );
      }
    }

    // Добавляем точки для наглядности
    points.forEach((point) => {
      const circle = new Graphics();
      circle.beginFill(0x00ff00);
      circle.drawCircle(point.x, point.y, 5);
      circle.endFill();
      this.container.addChild(circle);
    });

    this.container.addChild(graphics);
  }

  update() {
    if (this.falling) {
      this.fall();
    }
  }

  destroy() {
    this.container.destroy();
  }

  fall() {
    const y = this.coords.y + this.options.velocity;
    //
    // this.coords.y = y;
    // this.container.y = this.coords.y;

    const t = this.obj.bezierCurveTo(10, 10, 20, 20, 40, 40);
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

  update() {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }

  get() {
    return this.enemies;
  }

  destroy(index) {
    this.enemies[index].destroy();
    this.enemies.splice(index, 1);
  }

  startMoving() {
    setTimeout(() => {
      const last = this.enemies[this.enemies.length - 1];

      last.falling = true;
    }, 1000);
  }
}
