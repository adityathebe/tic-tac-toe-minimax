class Minimax {
  static getBestCell(board, aiPlayer, level = 0) {
    const vacantCells = board.getVacantCells();

    // Terminal Node
    if (vacantCells.length === 0 || board.isTerminalState()) {
      const { status, winner } = board.isTerminalState();
      let score = 0; // Draw
      if (status === 'win') {
        if (winner == aiPlayer) score = 1;
        else score = -1;
      }
      return { score };
    }

    const scores = [];
    for (const vacantCell of vacantCells) {
      const newBoard = new Board({
        grid: board.getGrid(),
        vacantCells: board.getVacantCells().length,
        currentPlayer: board.currentPlayer,
      });
      newBoard.placeOnCell(vacantCell[0], vacantCell[1]);
      newBoard.togglePlayer();
      const score = Minimax.getBestCell(newBoard, aiPlayer, level + 1);
      scores.push({ score: score.score, move: vacantCell });
    }

    // Select & return best score
    if (level == 0) {
      let bestScore = 0;
      let bestMove = scores[0].move;
      for (const score of scores) {
        if (score.score > bestScore) {
          bestScore = score.score;
          bestMove = score.move;
        }
      }
      return { score: bestScore, move: bestMove };
    } else {
      let aggregatedScore = 0;
      for (const score of scores) {
        aggregatedScore += score.score;
      }
      return { score: aggregatedScore };
    }
  }
}
