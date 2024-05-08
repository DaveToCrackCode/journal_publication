// Home.js

import React from "react";
import "../style/info.css"; // Assuming your CSS file is in the 'styles' folder
import "../style/general.css";
import "../style/queries.css";
import index1 from "../img/indexing/index1.png";
import index2 from "../img/indexing/index2.jpg";
import index3 from "../img/indexing/index3.png";
import index4 from "../img/indexing/index4.png";
import index5 from "../img/indexing/index5.png";
import index6 from "../img/indexing/index6.gif";
import index7 from "../img/indexing/index7.png";
import index8 from "../img/indexing/index8.png";

const Info = () => {
  return (
    <>
      <h1 style={{textAlign:"center"}}><b>Indexing</b></h1>
     <div className="description-info">
      <img className="index-images" src={index1} />
      <img className="index-images" src={index6} />
      <img className="index-images" src={index8} />
      <img className="index-images" src={index4} />
      <img className="index-images" src={index5} />
      <img className="index-images" src={index2} />
      <img className="index-images" src={index3} />
      <img className="index-images" src={index7} />
     </div>
    </>
  );
};

export default Info;
