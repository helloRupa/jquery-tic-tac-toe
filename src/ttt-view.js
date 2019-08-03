class View {
  constructor(game, $el) {
    this.game = game;
    this.display = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.display.on('click', 'li', (event) => {
      this.makeMove($(event.currentTarget));

      if(this.game.isOver()) {
        const winner = this.game.winner();

        if(winner != null) {
          $('body').append(`<h1>${winner} wins the round!</h1>`);
        } else {
          $('body').append('<h1>Tie! Nobody wins!</h1>');
        }

        this.showEnd(winner);
        this.display.off('click');
      }
    });
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
    } catch(err) {
      alert('That space is taken!');
    }
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
