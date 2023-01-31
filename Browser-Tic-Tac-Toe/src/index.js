import View from './ttt-view.js'; // require appropriate file
import Game from '../ttt_node/game.js'; // require appropriate file

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  let game = new Game();
  let ttt = document.querySelector('.ttt');
  console.log(ttt);
  let view = new View(game, ttt);
});
