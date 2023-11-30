export function generateRandomMaze(grid) {
    const numRows = grid.length;
    const numCols = grid[0].length;
  
    // Initialize the grid with walls
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        grid[row][col].isWall = true;
      }
    }
  
    // Start generating maze from a random cell
    const startRow = Math.floor(Math.random() * numRows);
    const startCol = Math.floor(Math.random() * numCols);
    grid[startRow][startCol].isWall = false;
  
    recursiveBacktracking(grid, startRow, startCol);
  }
  
  function recursiveBacktracking(grid, row, col) {
    const directions = [[0, 2], [0, -2], [2, 0], [-2, 0]]; // Up, Down, Right, Left
    shuffleArray(directions);
  
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
  
      if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && grid[newRow][newCol].isWall) {
        const wallRow = row + dx / 2;
        const wallCol = col + dy / 2;
        grid[newRow][newCol].isWall = false;
        grid[wallRow][wallCol].isWall = false;
  
        recursiveBacktracking(grid, newRow, newCol);
      }
    }
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  