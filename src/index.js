import { Game } from './Game.js';

const LEVELS = [
  {
    enemies: {
      // lines: 3,
      lines: 1,
      maxInLine: 1,
      // maxInLine: 5,
    },
  },
];

const OPTIONS = {
  width: 400,
  height: 500,
  player: {
    width: 30,
    height: 35,
    color: 'yellow',
    offsetX: 5,
    offsetY: 10,
    velocity: 1.5,
  },
  bullet: {
    color: 'white',
    width: 5,
    height: 10,
    velocity: 1.7,
  },
  enemy: {
    enemiesOffsetY: 100,
    width: 20,
    height: 20,
    offsetBetween: 10,
    color: 'red',
    velocity: 1,
  },
};

new Game(OPTIONS, LEVELS).init();

const l = '|a|a|a|a|a' + '|0|a|a|a|0' + '|0|0|b|0|0';

// linear -
// circle
const enemiesMovingDirection = [];
