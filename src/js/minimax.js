const AI_PLAYER = 'O';
const HUMAN_PLAYER = 'X';

class Minimax {
  static togglePlayer(player) {
    return player == 'X' ? 'O' : 'X';
  }

  static max(a, b) {
    return a > b ? a : b;
  }

  static min(a, b) {
    return a < b ? a : b;
  }

  static getBestMove(board) {
    let bestMove;
    let bestScore = -Infinity;
    for (const vacantCell of board.getVacantCells()) {
      const newBoard = new Board({
        grid: board.getGrid(),
        vacantCells: board.getVacantCells().length,
        currentPlayer: board.currentPlayer,
      });
      newBoard.placeAndProceed(vacantCell[0], vacantCell[1]);
      const score = Minimax.getScore(newBoard, false, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMove = vacantCell;
      }
    }
    return bestMove;
  }

  static getScore(board, isMaximizingPlayer = true, level = 0) {
    const vacantCells = board.getVacantCells();

    // Terminal Node
    if (vacantCells.length === 0 || board.isTerminalState()) {
      // Calulate heuristic value
      const { status, winner } = board.isTerminalState();
      if (status === 'win') {
        if (winner == AI_PLAYER) return 1;
        else if (winner == HUMAN_PLAYER) return -1;
        else throw new Error('Unknown player');
      } else if (status === 'draw') {
        return 0;
      } else {
        throw new Error('Unknown game status');
      }
    }

    if (isMaximizingPlayer) {
      let value = -Infinity;
      for (const vacantCell of vacantCells) {
        const newBoard = new Board({
          grid: board.getGrid(),
          vacantCells: board.getVacantCells().length,
          currentPlayer: board.currentPlayer,
        });
        newBoard.placeOnCell(vacantCell[0], vacantCell[1]);
        newBoard.togglePlayer();
        value = Minimax.max(
          value,
          Minimax.getScore(newBoard, false, level + 1)
        );
      }
      return value;
    } else {
      let value = Infinity;
      for (const vacantCell of vacantCells) {
        const newBoard = new Board({
          grid: board.getGrid(),
          vacantCells: board.getVacantCells().length,
          currentPlayer: board.currentPlayer,
        });
        newBoard.placeOnCell(vacantCell[0], vacantCell[1]);
        newBoard.togglePlayer();
        value = Minimax.min(value, Minimax.getScore(newBoard, true, level + 1));
      }
      return value;
    }
  }
}
