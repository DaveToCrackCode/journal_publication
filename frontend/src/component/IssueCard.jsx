import React from 'react';
import '../style/volumecard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import IssueIcon from "../img/issue.png"
import '../style/volumecard.css';
const IssueCard = ({ issue,volume }) => {
  return (
    <div className="archives">
        <Link className="archiveLink" to={`/archive/${volume}/${issue}`}>
        <img className= "achive-card" src={IssueIcon} alt="" />
          Issue: {issue}
        </Link>

    </div>
  );
};

export default IssueCard;