const board = new Board();

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  board.display();
}

function _getCellFromCoordinate(x, y) {
  if (x < 0 || y < 0) throw new Error('Out of coordinate');
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
  try {
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
  } catch (err) {
    console.error(err);
  }
}
