const MoveError = require('./moveError.js')


class View {
  constructor(game, $el) {
    this.game = game
    this.$el = $el; 
  }

  bindEvents() { 
    
    $('li').on('click', (e) => { 
      var $square = $(e.target); 
      this.makeMove($square);
     
    }); 
      
  }

  makeMove($square) { 
    var pos = $square.attr('pos').split(",");
    var mark = this.game.currentPlayer;
    $square.addClass('white'); 

    try { 
      this.game.playMove(pos);
    } catch(e) { 
      if (e instanceof MoveError) { 
        alert(`${pos} ${e.msg}`)
      } 
    } finally { 
     if ($square.html().length === 0) { 
       $square.attr('mark', mark);
       $square.html($square.attr('mark')); 
     }
    }

    this.isOver(); 
  }

  setupBoard() {
    var $list = $('<ul>').appendTo(this.$el)

    for (var i = 0; i < 3; i++) { 
      for (var j = 0; j < 3; j++) { 
        var $li = $('<li>').attr('pos', [i, j]); 
        $list.append($li); 
      }
    }

    this.changeSquare(); 
  }

  changeSquare() { 
    $('li').on('mouseenter', (e) => {
      $(e.target).addClass('yellow');
    }).on('mouseleave', (e) => {
      $(e.target).removeClass('yellow');
    })
  }

  isOver() { 
    if (this.game.isOver()) { 
      this.game.swapTurn(); 

      var $subScript = $('<h3>').appendTo(this.$el); 
      var winner = this.game.currentPlayer; 
      $subScript.html(`You are the winner, ${winner}!`)

      this.endScript(winner) 
    }
  }

  endScript(winner) { 
    $('li').off()

    $('li').each( (index, listItem) => { 
      var $listItem = $(listItem); 
      if ($listItem.attr('mark') === winner) { 
        $listItem.addClass('winner');
     } else { 
        $listItem.addClass('loser');
     }

    })
  }

}

module.exports = View;
