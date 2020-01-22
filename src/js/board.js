const CELL_WIDTH = 200;
const CELL_HEIGHT = 200;
const GRID = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

class Board {
  constructor(boardConfig) {
    this.playerA = 'X';
    this.playerB = 'O';
    this.vacantCells = 9;
    this.currentPlayer = this.playerA;
    this.grid = JSON.parse(JSON.stringify(GRID));

    if (boardConfig) {
      this.grid = boardConfig.grid;
      this.vacantCells = boardConfig.vacantCells;
      this.currentPlayer = boardConfig.currentPlayer;
    }
  }

  resetBoard() {
    this.grid = JSON.parse(JSON.stringify(GRID));
  }

  getGrid() {
    return JSON.parse(JSON.stringify(this.grid));
  }

  getVacantCells() {
    const vacantCells = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (
          this.grid[i][j] !== this.playerA &&
          this.grid[i][j] !== this.playerB
        ) {
          vacantCells.push([i, j]);
        }
      }
    }
    return vacantCells;
  }

  display() {
    for (let rowIdx = 0; rowIdx < 3; rowIdx += 1) {
      for (let colIdx = 0; colIdx < 3; colIdx += 1) {
        const x = colIdx * CELL_WIDTH;
        const y = rowIdx * CELL_HEIGHT;

        // DRAW CELLS
        stroke('black');
        fill('skyblue');
        rect(x, y, CELL_WIDTH, CELL_HEIGHT);

        // FILL THE CELLS
        stroke('red');
        const val = this.grid[rowIdx][colIdx];
        if (val === 'X') {
          line(x, y, x + CELL_WIDTH, y + CELL_HEIGHT);
          line(x + CELL_WIDTH, y, x, y + CELL_HEIGHT);
        } else if (val === 'O') {
          noFill();
          ellipse(x + CELL_WIDTH / 2, y + CELL_HEIGHT / 2, CELL_HEIGHT);
        }
      }
    }
  }

  validMove(x, y) {
    return (
      !this.isTerminalState() &&
      this.grid[x][y] !== this.playerA &&
      this.grid[x][y] !== this.playerB
    );
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  isTerminalState() {
    if (this.vacantCells === 0) return { status: 'draw', grid: this.getGrid() };

    for (const row of this.grid) {
      if (row[0] == row[1] && row[1] === row[2])
        return {
          status: 'win',
          type: 'horizontal',
          winner: row[0],
          grid: this.getGrid(),
        };
    }

    for (let i = 0; i < 3; i += 1) {
      if (
        this.grid[0][i] == this.grid[1][i] &&
        this.grid[1][i] == this.grid[2][i]
      )
        return {
          status: 'win',
          type: 'vertical',
          winner: this.grid[0][i],
          grid: this.getGrid(),
        };
    }

    if (
      this.grid[0][0] == this.grid[1][1] &&
      this.grid[1][1] == this.grid[2][2]
    ) {
      return {
        status: 'win',
        type: 'diagonal',
        winner: this.grid[1][1],
        grid: this.getGrid(),
      };
    }

    if (
      this.grid[0][2] == this.grid[1][1] &&
      this.grid[1][1] == this.grid[2][0]
    ) {
      return {
        status: 'win',
        type: 'diagonal',
        winner: this.grid[1][1],
        grid: this.getGrid(),
      };
    }
  }

  placeOnCell(x, y) {
    if (!this.validMove(x, y)) {
      throw new Error('Invalid Move. Cell is not vacant');
    }
    this.grid[x][y] = this.currentPlayer;
    this.vacantCells -= 1;
  }

  placeAndProceed(x, y) {
    this.placeOnCell(x, y);
    if (!this.isTerminalState()) this.togglePlayer();
  }
}
