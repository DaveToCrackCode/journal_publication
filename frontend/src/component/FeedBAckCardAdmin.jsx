import React from "react";
import "../style/reviewcard.css";

const FeedBAckCardAdmin = ({ data }) => {
  return (
    <div>
      {data.latest ? (
        <>
          <h1 style={{ textAlign: "center" }}>New Feedback</h1>
          <div className="reviewer-card">
            <h2>Reviewer Comment</h2>
            <div className="remarks">
              <p>Remarks: {data?.remarks}.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Old Feedback</h1>
          <div className="reviewer-card">
            <h2>Reviewer Comment</h2>
            <div className="remarks">
              <p>Remarks: {data?.remarks}.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedBAckCardAdmin;
