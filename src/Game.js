import { Application } from 'pixi.js';
import { Player } from './Player';
import { Bullets } from './Bullet';
import { Enemies } from './Enemy';
import { getIsCollision } from './utils/getIsCollision.js';

// хранить массив буллетов
// в update проверять чек коллижен как для своих так и для енеми

export class Game {
  constructor(options, levels) {
    this.options = options;
    this.levels = levels;
    this.app = new Application({ width: this.options.width, height: this.options.height });

    this.player = new Player({ game: this });
    this.bullets = new Bullets({ game: this });
    this.enemies = new Enemies({ game: this });

    this.keyPressCtrl = new KeyPressCtrl();

    this.currentLevel = 1;
    this.level = this.levels[this.currentLevel - 1];

    globalThis.__PIXI_APP__ = this.app;
  }

  init() {
    document.body.appendChild(this.app.view);

    this.player.init();
    this.enemies.init(this.level.enemies);

    this.app.ticker.add(this.update, this);

    this.playerMoveEvent();
    this.playerFireEvent();
  }

  update() {
    this.bullets.update();

    this.checkEnemyKill();
    this.keyPressCtrl.update();
  }

  getApp() {
    return this.app;
  }

  addChild(el) {
    this.app.stage.addChild(el);
  }

  playerMoveEvent() {
    this.keyPressCtrl.add('onLeft', () => this.player.left());
    this.keyPressCtrl.add('onRight', () => this.player.right());
    this.keyPressCtrl.add('onUp', () => this.player.up());
    this.keyPressCtrl.add('onDown', () => this.player.down());
  }

  playerFireEvent() {
    const bulletOffsetX = this.options.player.width / 2;

    const fire = () => {
      const x = this.player.getCoords().x + bulletOffsetX;
      const y = this.player.getCoords().y;

      this.bullets.fire({ x, y });
    };

    this.keyPressCtrl.add('onSpace', fire, true);
  }

  checkEnemyKill() {
    this.enemies.get().forEach((enemy, enemyIndex) => {
      this.bullets.get().forEach((bullet, bulletIndex) => {
        const isCollision = getIsCollision(bullet, enemy);

        if (isCollision) {
          this.enemies.destroy(enemyIndex);
          this.bullets.destroy(bulletIndex);
        }
      });
    });
  }
}

class KeyPressCtrl {
  constructor() {
    this.keys = {};
    this.callbacks = {};

    this.init();
  }

  init() {
    document.addEventListener('keydown', (event) => {
      const { code } = event;

      this.keys[code] = {
        ...this.keys[code],
        pressed: true,
      };

      this.callImmediately();
    });

    document.addEventListener('keyup', (event) => {
      const { code } = event;

      this.keys[code] = {
        ...this.keys[code],
        pressed: false,
      };
    });
  }

  update() {
    const call = (key, cb) => {
      if (this.keys[key]?.pressed) {
        if (!this.callbacks[cb]?.isImmediately) {
          this.callbacks[cb].fn();
        }
      }
    };

    call('ArrowLeft', 'onLeft');
    call('ArrowRight', 'onRight');
    call('ArrowUp', 'onUp');
    call('ArrowDown', 'onDown');
  }

  callImmediately() {
    const call = (key, cb) => {
      if (this.keys[key]?.pressed) {
        if (this.callbacks[cb]?.isImmediately) {
          this.callbacks[cb].fn();
        }
      }
    };

    call('Space', 'onSpace');
  }

  add(name, fn, isImmediately = false) {
    this.callbacks[name] = { fn, isImmediately };
  }
}
