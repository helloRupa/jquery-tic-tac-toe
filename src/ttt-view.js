const ComputerPlayer = require('./computerPlayer');

class View {
  constructor(game, $el) {
    this.game = game;
    this.display = $el;
    this.computerPlayer = new ComputerPlayer('O');
    this.setupBoard();
    this.bindEvents();
  }

  clearBoard() {
    this.display.off('click');
    this.display.html('');
    $('#game-end-text').remove();
  }

  bindEvents() {
    this.display.on('click', 'li', (event) => {
      if (this.game.currentPlayer === 'X') {
        const didMove = this.makeMove($(event.currentTarget));

        if (this.gameOver()) {
          return;
        }

        if (didMove) {
          this.moveComputer();
        }
      }
    });
  }

  gameOver() {
    if(this.game.isOver()) {
      const winner = this.game.winner();

      if(winner != null) {
        $('body').append(`<h1 id="game-end-text">${winner} wins!</h1>`);
      } else {
        $('body').append('<h1 id="game-end-text">Tie! Nobody wins!</h1>');
      }

      this.showEnd(winner);
      this.display.off('click');
      return true;
    }

    return false;
  }

  showEnd(winner) {
    $('li').each(function (idx, el) {
      const $el = $(el);

      if ($el.text() === winner) {
        $el.addClass('winner');
      } else {
        $el.addClass('loser');
      }
    });
  }

  makeMove($square) {
    let pos = $square.data('pos').split(' ').map(char => parseInt(char, 10));

    try {
      this.game.playMove(pos);
      $square.text(this.game.currentPlayer);
      $square.addClass('occupied');
      this.game.swapTurn();
      return true;
    } catch(err) {
      alert('That space is taken!');
      return false;
    }
  }

  moveComputer() {
    const pos = this.computerPlayer.makeMove(this.game.board);

    this.makeMove($(`li[data-pos="${pos[0]} ${pos[1]}"]`));
    this.gameOver();
  }

  setupBoard() {
    const board = $('<ul></ul>');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let li = $(`<li data-pos="${i} ${j}"></li>`);
        board.append(li);
      }
    }

    this.display.append(board);
  }
}

module.exports = View;
