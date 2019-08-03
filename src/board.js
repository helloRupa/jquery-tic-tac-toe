const MoveError = require("./moveError");

class Board {
  constructor() {
    this.grid = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      // safety in case someone makes a grid w/ too many squares
      throw new MoveError('Is not valid position!');
    }

    return (this.grid[pos[0]][pos[1]] === null);
  }

  isOver() {
    if (Boolean(this.winner()) || this.isFull()) {
      return true;
    }

    return false;
  }

  isFull() {
    return !this.grid.flat().some(el => el == null);
  }

  placeMark(pos, mark) {
    if (!this.isEmptyPos(pos)) {
      throw new MoveError('Is not an empty position!');
    }

    this.grid[pos[0]][pos[1]] = mark;
  }

  buildDiagonals() {
    return [
      [this.grid[0][0], this.grid[1][1], this.grid[2][2]],
      [this.grid[0][2], this.grid[1][1], this.grid[2][0]]
    ];
  }

  buildColumns() {
    return [
      [this.grid[0][0], this.grid[1][0], this.grid[2][0]],
      [this.grid[0][1], this.grid[1][1], this.grid[2][1]],
      [this.grid[0][2], this.grid[1][2], this.grid[2][2]]
    ]
  }

  allLines() {
    return this.grid.concat(this.buildColumns()).concat(this.buildDiagonals());
  }

  winner() {
    let winner = null;

    this.allLines().some(row => {
      const str = row.join('');

      if (str === 'XXX' || str === 'OOO') {
        winner = (str === 'XXX') ? 'X' : 'O';
      }

      return Boolean(winner);
    });

    return winner;
  }

  static isValidPos(pos) {
    const range = [0, 1, 2];
    return range.includes(pos[0]) && range.includes(pos[1]);
  }
}

Board.marks = ['X', 'O'];

module.exports = Board;
