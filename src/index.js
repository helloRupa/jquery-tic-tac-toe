const View = require('./ttt-view');
const Game = require('./game');

  $(() => {
    let view = new View(new Game(), $('.ttt'));

    $('#new-game').on('click', () => {
      view.clearBoard();
      view = new View(new Game(), $('.ttt'));
    });
  });
