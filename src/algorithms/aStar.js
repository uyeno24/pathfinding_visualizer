export function aStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, finishNode);

  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistanceAndHeuristic(unvisitedNodes, startNode);
    const closestNode = unvisitedNodes.shift();
    
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    
    updateUnvisitedNeighborsWithHeuristic(closestNode, finishNode, grid);
  }
  
  return visitedNodesInOrder; // Return the visited nodes without a path.
}


function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
}

function sortNodesByDistanceAndHeuristic(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => {
      const totalDistanceA = nodeA.distance + nodeA.heuristic;
      const totalDistanceB = nodeB.distance + nodeB.heuristic;

      // Compare total distances
      if (totalDistanceA !== totalDistanceB) {
          return totalDistanceA - totalDistanceB;
      } 
      else if(nodeA.heuristic !== nodeB.heuristic){
          // If total distances are the same, prioritize nodes with lower heuristics
          return nodeA.heuristic - nodeB.heuristic;
      }
      else {
        if (nodeA.row === nodeB.row) {
          return nodeA.col - nodeB.col; // Prioritize nodes in the same row
        } 
        else if (nodeA.col === nodeB.col) {
          return nodeA.row - nodeB.row; // Prioritize nodes in the same column
        } 
        else {
          // If they are neither in the same row nor column, prioritize based on row order
          return nodeA.row - nodeB.row;
        }
      }
  });
}




function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisitedNeighborsWithHeuristic(node, finishNode, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      const newDistance = node.distance + 1;
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.heuristic = manhattanDistance(neighbor, finishNode);
        neighbor.previousNode = node;
      }
    }
  }