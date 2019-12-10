const View = require('./ttt-view.js'); 
const Game = require('./game.js')

  $(() => {
    const $el = $('.ttt'); 
    const game = new Game()
    const view = new View(game, $el)

    view.setupBoard(); 
    view.bindEvents();
  });
