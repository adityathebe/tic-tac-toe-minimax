const CELL_WIDTH = 50;
const DEFAULT_STROKE_WEIGHT = 1;

class BoardCellUI {
  constructor(x1, y1, name = "") {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1 + CELL_WIDTH;
    this.y2 = y1 + CELL_WIDTH;
    this.name = name;
  }

  display() {
    rect(this.x1, this.y1, CELL_WIDTH, CELL_WIDTH);
    strokeWeight(2);
    if (this.name === "X") {
      line(this.x1, this.y1, this.x2, this.y2);
      line(this.x2, this.y1, this.x1, this.y2);
    }

    if (this.name === "O") {
      ellipse(
        this.x1 + CELL_WIDTH * 0.5,
        this.y1 + CELL_WIDTH * 0.5,
        CELL_WIDTH,
        CELL_WIDTH
      );
    }
    strokeWeight(DEFAULT_STROKE_WEIGHT);
  }
}

class BoardUI {
  constructor() {
    this.boardCells = [];
  }

  createBoardCells() {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const newCell = new BoardCellUI(
          CELL_WIDTH * (i + 1),
          CELL_WIDTH * (j + 1)
        );
        this.boardCells.push(newCell);
      }
    }
  }

  display() {
    for (const cell of this.boardCells) {
      cell.display();
    }
  }
}

let boardUI;
function setup() {
  createCanvas(500, 500);
  boardUI = new BoardUI();
  boardUI.createBoardCells();
}

function mousePressed(point) {
  for (const cell of boardUI.boardCells) {
    if (point.x >= cell.x1 && point.x <= cell.x2) {
      if (point.y >= cell.y1 && point.y <= cell.y2) {
        cell.name = "X";
      }
    }
  }
}

function draw() {
  textSize(66);
  textAlign(LEFT);

  background(51);

  boardUI.display();
}
