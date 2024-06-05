// Home.js

import React from 'react';
import Menu from './Menu';
import '../style/home.css'; // Assuming your CSS file is in the 'styles' folder
import Navvar from '../component/Navvar';

const Hero = () => {
  return (
    
    <div className="home-container">
       <Menu/>
      <div className="welcome-section">
        <h1>Welcome to IJESACBT!</h1>
        <p>About IJESACBT</p>
        <p>
          The "International Journal of Engineering Science, Advanced Computing and Bio-Technology (IJESACBT)" is an international online journal in English published quarterly. IJESACBT is purely an Open Access non-paid Online journal. There is no fee for publishing the article and reading the articles. The aim of IJESACBT is to publish peer-reviewed research and review articles, faster without delay (within 2-3 months) in the developing field of engineering science, computing, and bio-technology.
        </p>
      </div>

      <div className="policy-section">
        <h2>Journal Policy</h2>
        <p>
          IJESACBT provides an international forum for the electronic publication of high-quality scholarly articles in all areas of Engineering, Science, Advanced Computing, and Bio-Technology.
        </p>
        <p>
          All research articles submitted to IJESACBT should be original in nature, never previously published in any journal or presented in a conference or undergoing such a process across the globe. All the submissions will be Blind peer-reviewed by the panel of experts associated with a particular field. Submitted papers should meet the internationally accepted criteria, and manuscripts should follow the style of the journal for the purpose of both reviewing and editing.
        </p>
      </div>

      <div className="call-for-articles-section">
        <h2>Call for Research and Review Articles</h2>
        <ul>
          <li>Engineering and Bio-Technology</li>
          <li>Science</li>
          {/* Add more list items based on your content */}
        </ul>
      </div>

      <div className="license-section">
        <p>
          This work is licensed under a Creative Commons Attribution 3.0 License.
        </p>
      </div>
    </div>
  );
}

export default Hero;
