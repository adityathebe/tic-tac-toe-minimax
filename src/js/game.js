function setup() {
  const board = new Board();
  while (!board.isTerminalState()) {
    if (board.currentPlayer === 'X') {
      const result = prompt('Enter Cell Coordinates');
      const [x, y] = result.split(' ');
      console.log(`Player Moved - (${x}, ${y})`);
      board.placeAndProceed(x, y);
    } else {
      const [x, y] = Minimax.getBestCell(board, 'O').move;
      console.log(`AI Moved - (${x}, ${y})`);
      board.placeAndProceed(x, y);
    }
    console.log('\n');
    board.display();
  }

  const { status, winner } = board.isTerminalState();
  console.log({ status, winner });
}
