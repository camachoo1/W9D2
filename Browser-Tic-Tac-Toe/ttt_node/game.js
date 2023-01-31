import Board from './board';
import MoveError from './moveError';

class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = Board.MARKS[0];
    // this.mark = this.currentPlayer.bind(this)
  }

  isOver() {
    return this.board.isOver();
  }

  playMove(pos) {
    this.board.placeMark(pos, this.currentPlayer);
    this.swapTurn();
  }

  promptMove(reader, callback) {
    const game = this;

    this.board.print();
    console.log(`Current Turn: ${this.currentPlayer}`);

    reader.question('Enter rowIdx: ', (rowIdxStr) => {
      const rowIdx = parseInt(rowIdxStr);
      reader.question('Enter colIdx: ', (colIdxStr) => {
        const colIdx = parseInt(colIdxStr);
        callback([rowIdx, colIdx]);
      });
    });
  }

  run(reader, gameCompletionCallback) {
    this.promptMove(reader, (move) => {
      try {
        this.playMove(move);
      } catch (e) {
        if (e instanceof MoveError) {
          console.log(e.msg);
        } else {
          throw e;
        }
      }

      if (this.isOver()) {
        this.board.print();
        if (this.winner()) {
          console.log(`${this.winner()} has won!`);
        } else {
          console.log('NO ONE WINS!');
        }
        gameCompletionCallback();
      } else {
        // continue loop
        this.run(reader, gameCompletionCallback);
      }
    });
  }

  swapTurn() {
    if (this.currentPlayer === Board.MARKS[0]) {
      this.currentPlayer = Board.MARKS[1];
    } else {
      this.currentPlayer = Board.MARKS[0];
    }
  }

  winner() {
    return this.board.winner();
  }
}

export default Game;
