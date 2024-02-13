import { Game } from './Game.js';

const LEVELS = [
  {
    enemies: {
      lines: 3,
      maxInLine: 5,
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
    step: 10,
  },
  bullet: {
    color: 'white',
    width: 5,
    height: 10,
    velocity: 2,
  },
  enemy: {
    enemiesOffsetY: 100,
    width: 20,
    height: 20,
    offsetBetween: 10,
    color: 'red',
  },
};

new Game(OPTIONS, LEVELS).init();
