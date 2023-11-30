import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ pathfindingVisualizerRef }) {

  return (
    <div className="header">
      <Link to="/" className="headerName">Pathfinding Visualizer</Link>
      <div className="header-right">
        <div className="left-section">
          <div className="dropdown">
            {/* <button className="dropbtn"> Algorithms <i className="fa fa-caret-down"></i></button>
            <div className="dropdown-content">
              <a value="Dijkstra">Dijkstra</a>
              <a value="A*">A*</a>
              <a value="Depth First Search">Depth First Search</a>
            </div> */}
          </div>
          {/* <button onClick={() => generateRandomMaze(pathfindingVisualizerRef.current)}>Generate Maze</button> */}
          <button class="button" onClick={() => window.location.reload(true)}> Clear Board </button>
        </div>
        <Link to="/about">About Us</Link>
      </div>
    </div>
  );
}

export default Navbar;
