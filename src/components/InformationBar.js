import React from "react";
import { Link } from 'react-router-dom';
import '../styles/InformationBar.css';

function InformationBar({currentPath}) {
  if (currentPath === "/about") {
    return null;
  }
  return (
    <div class="infobar">
      <span class="info-node-start"></span>
      <span className="info-label"> Start Node </span>

      <span class="info-node-finish"></span>
      <span className="info-label"> Finish Node </span>

      <span class="unvisited-node"></span>
      <span className="node-label"> Unvisited Node </span>

      <span class="visited-node"></span>
      <span className="node-label"> Visited Node </span>
      
      <span class="wall-node"></span>
      <span className="node-label"> Wall Node </span>
      
      <span class="shortest-path-node"></span>
      <span className="node-label"> Shortest Path </span>
      

    </div>
  );
  
}

export default InformationBar;
