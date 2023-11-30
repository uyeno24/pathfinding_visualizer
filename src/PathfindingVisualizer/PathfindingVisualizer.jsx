import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {aStar} from '../algorithms/aStar';
import './PathfindingVisualizer.css';
import { generateRandomMaze } from '../maze/MazeGenerator';


var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      selectedNode: null,
      isStartSelected: false,
      isFinishSelected: false,
      heuristic: null,
      isRunning: false,
    };
    this.pathfindingVisualizerRef = React.createRef();
  }

  componentDidMount() {
    const grid = getInitialGrid(FINISH_NODE_ROW, FINISH_NODE_COL);
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    if (this.state.isRunning) return;

    const { grid } = this.state;
    const node = grid[row][col];
  
    if (node.isStart) {
      this.setState({ mouseIsPressed: true, selectedNode: node, isStartSelected: true });
    } 
    else if (node.isFinish) {
      this.setState({ mouseIsPressed: true, selectedNode: node, isFinishSelected: true });
    } 
    else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }
  
  

  handleMouseEnter(row, col) {
    if (this.state.isRunning) return;
    const { mouseIsPressed, grid, selectedNode, isStartSelected, isFinishSelected } = this.state;
  
    if (!mouseIsPressed) return;
  
    const newGrid = grid.slice();
    const node = newGrid[row][col];
  
    if (isStartSelected && node !== selectedNode) {
      START_NODE_ROW = row;
      START_NODE_COL = col;
      const previousStartNode = newGrid[selectedNode.row][selectedNode.col];
      previousStartNode.isStart = false;
      node.isStart = true;
      node.heuristic = manhattanDistance(node, newGrid[FINISH_NODE_ROW][FINISH_NODE_COL]);
      this.setState({ grid: newGrid, selectedNode: node });
    } else if (isFinishSelected && node !== selectedNode) {
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      const previousFinishNode = newGrid[selectedNode.row][selectedNode.col];
      previousFinishNode.isFinish = false;
      node.isFinish = true;
      node.heuristic = manhattanDistance(node, newGrid[START_NODE_ROW][START_NODE_COL]);
      this.setState({ grid: newGrid, selectedNode: node });
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      this.setState({ grid: newGrid });
    }
  }
  

  handleMouseUp() {
    if (this.state.isRunning) return;
    this.setState({
      mouseIsPressed: false,
      selectedNode: null,
      isStartSelected: false,
      isFinishSelected: false,
    });
  }
  

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);  // 10 * i
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        let className = 'node node-shortest-path';
        if(node.row == START_NODE_ROW && node.col == START_NODE_COL) {
          className = 'node node-start yellow-background';
        }
        else if (node.row == FINISH_NODE_ROW && node.col == FINISH_NODE_COL) {
          className = 'node node-finish yellow-background';
        }
        document.getElementById(`node-${node.row}-${node.col}`).className =
          className;
      }, 50 * i); // 50 * i
    }
  }

  visualizeAlgorithm(algorithm) {
    this.setState({ isRunning: true });
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    console.log('finishnode row: ' + finishNode.FINISH_NODE_ROW);
    console.log('finishnode col: ' + finishNode.FINISH_NODE_COL);
    let visitedNodesInOrder = null;
    if (algorithm === "Dijkstra") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    }
    else if (algorithm === "AStar") {
      visitedNodesInOrder = aStar(grid, startNode, finishNode);
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  generateRandomMaze() {
    const { grid } = this.state;
    const newGrid = grid.slice();
    
    generateRandomMaze(newGrid); // Call the maze generation function
    
    this.setState({ grid: newGrid });
  }

  getGrid() {
    return this.state.grid;
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
  
    return (
      <div className="container">
        <div className="button-container">
          <button className="buttons" onClick={() => this.visualizeAlgorithm("Dijkstra")}>
            Visualize Dijkstra's Algorithm
          </button>
          <button className="buttons" onClick={() => this.visualizeAlgorithm("AStar")}>
            Visualize A* Algorithm
          </button>
          <button className="buttons" onClick={() => this.generateRandomMaze(grid)}>
            Generate Maze
          </button>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: "flex" }}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={() => this.handleMouseDown(row, col)}
                    onMouseEnter={() => this.handleMouseEnter(row, col)}
                    onMouseUp={() => this.handleMouseUp()}
                    row={row}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }  
}

function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

const getInitialGrid = (finishRow, finishCol) => {
  const grid = [];
  for (let row = 0; row < 21; row++) {
    const currentRow = [];
    for (let col = 0; col < 51; col++) {
      currentRow.push(createNode(col, row, finishRow, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, finishRow, finishCol) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    heuristic: Math.abs(finishRow - row) + Math.abs(finishCol - col),
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};




