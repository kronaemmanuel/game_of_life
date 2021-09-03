const cellWidth = 20;
let numOfColumns, numOfRows;
let grid;
let nextGrid;

function setup() {
  createCanvas(600, 600);
  background(200);

  numOfColumns = width / cellWidth;
  numOfRows = height / cellWidth;

  grid = create2dArray(numOfRows, numOfColumns);
  nextGrid = create2dArray(numOfRows, numOfColumns);

  for (let x = 0; x < numOfColumns; x++) {
    for (let y = 0; y < numOfRows; y++) {
      grid[x][y] = random(["alive", "dead"]);
    }
  }

  frameRate(30);
}

function draw() {
  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfRows; j++) {
      if (grid[i][j] === "alive") {
        fill(0);
      } else {
        fill(255);
      }
      stroke(0);
      rect(j * cellWidth, i * cellWidth, cellWidth, cellWidth);
    }
  }
  createNextGeneration();
}

function create2dArray(rows, columns) {
  let array = new Array(columns);
  for (let i = 0; i < columns; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function createNextGeneration() {
  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfRows; j++) {
      let neighbours = getNeighbours(i, j);
      let aliveNeighbours = neighbours.filter(
        (neighbour) => neighbour === "alive"
      ).length;

      if (aliveNeighbours <= 1) {
        nextGrid[i][j] = "dead";
      } else if (aliveNeighbours === 2) {
        nextGrid[i][j] = grid[i][j];
      } else if (aliveNeighbours === 3) {
        nextGrid[i][j] = "alive";
      } else {
        nextGrid[i][j] = "dead";
      }
    }
  }

  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

function getNeighbours(columnPosition, rowPosition) {
  let neighbours = [];

  for (let x = columnPosition - 1; x <= columnPosition + 1; x++) {
    for (let y = rowPosition - 1; y <= rowPosition + 1; y++) {
      if (x >= 0 && y >= 0 && x < numOfColumns && y < numOfRows) {
        if (!(x == columnPosition && y == rowPosition)) {
          neighbours.push(grid[x][y]);
        }
      }
    }
  }

  return neighbours;
}
