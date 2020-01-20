const board = new Board();

function setup() {
  // p5
  createCanvas(600, 600);

  // while (!board.isTerminalState()) {
  //   if (board.currentPlayer === 'X') {
  //     const result = prompt('Enter Cell Coordinates');
  //     const [x, y] = result.split(' ');
  //     console.log(`Player Moved - (${x}, ${y})`);
  //     board.placeAndProceed(x, y);
  //   } else {
  //     const [x, y] = Minimax.getBestCell(board, 'O').move;
  //     console.log(`AI Moved - (${x}, ${y})`);
  //     board.placeAndProceed(x, y);
  //   }
  //   console.log('\n');
  //   board.display();
  // }

  // const { status, winner } = board.isTerminalState();
  // console.log({ status, winner });
}

function draw() {
  background(0);
  board.display();
}

function _getCellFromCoordinate(x, y) {
  if (y < 200) {
    if (x < 200) return { x: 0, y: 0 };
    if (x < 400) return { x: 0, y: 1 };
    if (x < 600) return { x: 0, y: 2 };
  } else if (y < 400) {
    if (x < 200) return { x: 1, y: 0 };
    if (x < 400) return { x: 1, y: 1 };
    if (x < 600) return { x: 1, y: 2 };
  } else if (y < 600) {
    if (x < 200) return { x: 2, y: 0 };
    if (x < 400) return { x: 2, y: 1 };
    if (x < 600) return { x: 2, y: 2 };
  }
}

function mouseClicked() {
  const cell = _getCellFromCoordinate(mouseX, mouseY);
  board.placeAndProceed(cell.x, cell.y);

  if (board.isTerminalState()) {
    const { status, winner } = board.isTerminalState();
    setTimeout(() => {
      alert(JSON.stringify({ status, winner }));
    }, 100);
  } else {
    // AI's turn
    const [x, y] = Minimax.getBestCell(board, 'O').move;
    board.placeAndProceed(x, y);
  }
}
