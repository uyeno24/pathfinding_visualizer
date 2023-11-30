import React from "react";
import '../styles/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import ProfilePic from '../assets/profilepic.jpg';

function About() {
  return (
    <div className="about-wrapper">
      <div className="about-left">
        <div className="about-left-content">
          <div>
            <div className="shadow">
              <div className="about-img">
                <img src={ProfilePic} alt="about image" />
              </div>
            </div>
            <h2>Tyler<br />Uyeno</h2>
            <h3>Fullstack Developer</h3>
          </div>
          <ul className="icons">
            <li>
                <a href="https://www.facebook.com/bobo.fett.16" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                </li>
                <li>
                <a href="https://twitter.com/Tyler_U02" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                </li>
                <li>
                <a href="https://www.linkedin.com/in/tyleruyeno/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                </li>
                <li>
                <a href="https://www.instagram.com/tyler_uyeno/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="about-right">
        <h1>hi<span>!</span></h1>
        <h2>Here's who I am &amp; what I do</h2>
        <div className="about-btns">
            <a href="https://drive.google.com/file/d/1Jkgg5wAIvDeRxq9EngecVHkWMlkIYAMf/view?usp=share_link" className="btn btn-blue" target="_blank" rel="noopener noreferrer">resume</a>
            {/* <button type="button" className="btn btn-blue">resume</button> */}
            {/* <button type="button" className="btn btn-white">projects</button> */}
        </div>
        <div className="about-para">
          <p>I'm Tyler, a Computer Science Major at the University of Portland. I am currently looking for a full time position in Summer 2024. </p>
          <p><u><strong>Project Goals:</strong></u></p>
          <p><strong>Algorithm Implementation:</strong> Implementing a wider range of algorithms such as depth-first search and Breadth-First Search</p>
          <p><strong>Weighted Nodes:</strong> Introduce support for weighted nodes within your project for weighted algorithms.</p>
          <p><strong>Maze Generation Bug Fixes:</strong> Address and fix bugs in your maze generation algorithm.</p>
          <p><u><strong>Contact:</strong></u></p>
          <p>I'd love to hear your thoughts on this project. Feel free to reach out to me at tyler.uyeno@gmail.com or through any of the links on the page!</p>
        </div>
      </div>
    </div>
  );
}

export default About;
