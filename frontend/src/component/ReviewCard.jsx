import React from 'react';
import "../style/reviewcard.css";// Import your CSS file for styling

const ReviewCard = ({data}) => {
    //console.log(data);
  return (
    <div className="reviewer-card">
      <h2>Reviewer Comment</h2>
      <div className="remarks">
        <p>Remarks: {data?.remarks}.</p>
      </div>
      <div className="paragraphs">
        <p>
        Is the abstract concise and informative, summarizing the key findings and significance of the research: {data?.feedbackAnswer.q1}
        </p>
        <p>
        Are the research methods appropriate for addressing the research question: {data?.feedbackAnswer.q2}
        </p>
        <p>
        Is the research question or objective clearly stated: {data?.feedbackAnswer.q3}
        </p>
        <p>
        Are potential biases or limitations of the methodology addressed: {data?.feedbackAnswer.q4}
        </p>
        <p>
        Are the results presented clearly and logically: {data?.feedbackAnswer.q5}
        </p>
        <p>
        Are appropriate statistical analyses used, and are the results statistically significant: {data?.feedbackAnswer.q6}
        </p>
        <p>
        Are potential biases or limitations of the methodology addressed: {data?.feedbackAnswer.q7}
        </p>
        <p>
        Do the conclusions provide insights or implications for future research or practice: {data?.feedbackAnswer.q8}
        </p>
        <p>
        Is the paper well-written and organized: {data?.feedbackAnswer.q9}
        </p>
        <p>
        Are the figures, tables, and other visuals clear and relevant: {data?.feedbackAnswer.q10}
        </p>
        <p>
        Plagarism Checker Result:- is it Original Content: {data?.feedbackAnswer.q11}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;