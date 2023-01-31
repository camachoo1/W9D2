import Game from './game.js';
import { createInterface } from 'readline';
const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let g = new Game();
g.run(reader, completion);

function completion() {
  reader.question('Play again? y or n: ', (restartGame) => {
    if (restartGame === 'y') {
      g = new Game();
      g.run(reader, completion);
    } else {
      reader.close();
    }
  });
}
