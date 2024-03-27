import React from "react";
import "../style/circle.css";

// component of home page 
const Circle = () => {
  return (
    <section className="container circles">
      <div className="circle">

        <span className="circle-name">

          Submitted
          <br />
          Journals
        </span>
      </div>
      <div className="circle">
        
        <span className="circle-name">
          Pending
          <br />
          Journals
        </span>
      </div>
      <div className="circle">
        
        <span className="circle-name">
          Publish
          <br />
          Journals
        </span>
      </div>
    </section>
  );
};

export default Circle;
