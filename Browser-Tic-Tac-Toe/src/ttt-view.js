import MoveError from '../ttt_node/moveError';
import Game from '../ttt_node/game';

class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.handleClick = this.handleClick.bind(this);
    // this.el.mark = this.game.currentPlayer;
    this.setupBoard();
    this.bindEvents();
  }

  setupBoard() {
    let ul = document.createElement('ul');
    this.el.append(ul);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let newLi = document.createElement('li');
        // newLi.dataset.pos = JSON.stringify([i, j]);
        newLi.dataset.pos = [i, j];
        newLi.classList.add('tile');
        ul.append(newLi);
      }
    }
  }

  bindEvents() {
    this.el.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    // console.log(this.mark);
    if (e.target.className === 'tile') {
      this.game.playMove(e.target.dataset.pos.split(',')); //how can we read the JSON string as an array, not a string
      this.makeMove(e);
      // e.target.textContent = this.game.currentPlayer;
      // e.target.classList.add(`${this.game.currentPlayer}`);
    }
  }

  makeMove(square) {
    square.target.textContent = this.game.currentPlayer;
    square.target.classList.add(`${this.game.currentPlayer}`);

    if (this.game.winner()) {
      let tiles = document.querySelectorAll(
        `.${this.game.currentPlayer}`
      );
      // console.log(tiles);
      tiles.forEach((tile) => {
        tile.classList.add(`winner-${this.game.currentPlayer}`);
      });
      let winnerMessage = document.querySelector('.winner');
      winnerMessage.textContent = `${this.game.currentPlayer.toUpperCase()} wins`;
      this.el.removeEventListener('click', this.handleClick);
      // let allTiles = document.getElementsByClassName('.tile');
      // allTiles.classList.remove('.tile:hover');
      console.log(this.el);
      this.el.addEventListener('mouseover', () => {
        this.el.style.backgroundColor = 'transparent';
      });
    }
  }
}

export default View;
