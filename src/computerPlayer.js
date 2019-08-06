const Board = require('./board');

class ComputerPlayer {
  constructor(marker) {
    this.marker = marker;
    this.oppMarker = (marker === 'X') ? 'O' : 'X';
    this.board = null;
  }

  makeMove(board) {
    this.board = board;
    return this.choose();
  }

  emptySpaces(board = this.board) {
    let spaces = [];

    board.grid.forEach((row, y) => {
      row.forEach((space, x) => {
        if (space == null) spaces.push([y, x]);
      });
    });

    return spaces;
  }

  choose() {
    let bestSpace;
    let bestScore = null;

    const empties = this.emptySpaces();

    if (empties.length >= 8) {
      if (this.board.isEmptyPos([1, 1])) {
        return [1, 1];
      }

      return this.randomSpace([[0, 0], [0, 2], [2, 0], [2, 2]]);
    }

    empties.forEach((coords => {
      let score = this.scoreSpace(coords);
      
      if (bestScore === null || (score > bestScore)) {
        bestScore = score;
        bestSpace = coords;
      }
    }));

    return bestSpace;
  }

  scoreSpace(pos, board = this.board, marker = this.marker, weight = 100) {
    const bcopy = new Board();
    bcopy.grid = this.deepDup(board.grid);
    bcopy.placeMark(pos, marker);
    
    if (bcopy.winner()) {
      return (bcopy.winner() === this.marker) ? 1 * weight : -10 * weight;
    }

    let score = 0;
    marker = (marker === this.marker) ? this.oppMarker : this.marker;

    this.emptySpaces(bcopy).forEach((coords) => {
      score += this.scoreSpace(coords, bcopy, marker, weight / 2);
    });

    return score;
  }

  deepDup(arr) {
    if (!(arr instanceof Array)) return arr;
    return arr.map((el) => this.deepDup(el));
  }

  randomSpace(empties) {
    const choice = Math.floor(Math.random() * empties.length);
    return empties[choice];
  }
}

module.exports = ComputerPlayer;
