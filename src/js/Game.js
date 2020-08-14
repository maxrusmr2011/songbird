import data from './data'

export default class Game {
  constructor() {
    this.data = data;
    this.levels = [
      'Популярные',
      'Воробьиные',
      'Лесные птицы',
      'Певчие птицы',
      'Хищные птицы',
      'Морские птицы',
    ];
  }

  init() {
    this.startGame();
    this.selectLevel();
  }

  startGame() {
    this.currentLevel = 0;
    this.lastLevel = false;
  }

  selectLevel() {
    this.currentCases = data[this.currentLevel];
    this.randomCase = Math.floor(Math.random() * this.currentCases.length);
  }

  nextLevel() {
    if (!this.lastLevel) {
      this.currentLevel += 1;
      this.selectLevel();
      this.lastLevel = (this.currentLevel + 1 === data.length);
    }
  }
}
