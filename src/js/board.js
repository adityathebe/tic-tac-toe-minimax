class Board {
  constructor(boardConfig) {
    this.playerA = 'X';
    this.playerB = 'O';
    this.vacantCells = 9;
    this.currentPlayer = this.playerA;
    this.grid = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    if (boardConfig) {
      this.grid = boardConfig.grid;
      this.vacantCells = boardConfig.vacantCells;
      this.currentPlayer = boardConfig.currentPlayer;
    }
  }

  resetBoard() {
    this.grid = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  }

  getGrid() {
    return JSON.parse(JSON.stringify(this.grid));
  }

  getVacantCells() {
    const vacantCells = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (this.grid[i][j] !== this.playerA && this.grid[i][j] !== this.playerB) {
          vacantCells.push([i, j]);
        }
      }
    }
    return vacantCells;
  }

  display() {
    for (const row of this.grid) {
      const displayableRow = row.map(x => (typeof x === 'number' ? '' : x));
      console.log(displayableRow.join('-'));
    }
  }

  validMove(x, y) {
    return !this.isTerminalState() && this.grid[x][y] !== this.playerA && this.grid[x][y] !== this.playerB;
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  isTerminalState() {
    if (this.vacantCells === 0) return { status: 'draw', grid: this.getGrid() };

    for (const row of this.grid) {
      if (row[0] == row[1] && row[1] === row[2])
        return { status: 'win', type: 'horizontal', winner: row[0], grid: this.getGrid() };
    }

    for (let i = 0; i < 3; i += 1) {
      if (this.grid[0][i] == this.grid[1][i] && this.grid[1][i] == this.grid[2][i])
        return { status: 'win', type: 'vertical', winner: this.grid[0][i], grid: this.getGrid() };
    }

    if (this.grid[0][0] == this.grid[1][1] && this.grid[1][1] == this.grid[2][2]) {
      return { status: 'win', type: 'diagonal', winner: this.grid[1][1], grid: this.getGrid() };
    }

    if (this.grid[0][2] == this.grid[1][1] && this.grid[1][1] == this.grid[2][0]) {
      return { status: 'win', type: 'diagonal', winner: this.grid[1][1], grid: this.getGrid() };
    }
  }

  placeOnCell(x, y) {
    if (!this.validMove(x, y)) {
      return console.error({
        msg: 'Invalid Move',
        cell: { x, y },
        player: this.currentPlayer,
        grid: this.getGrid(),
      });
    }
    this.grid[x][y] = this.currentPlayer;
    this.vacantCells -= 1;
  }

  placeAndProceed(x, y) {
    this.placeOnCell(x, y);
    if (!this.isTerminalState()) this.togglePlayer();
  }
}
