import React from 'react';
import '../style/volumecard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const IssueCard = ({ issue,volume }) => {
  return (
    <div className="volume-card">
        <Link className="main-nav-link" to={`/archive/${volume}/${issue}`}>
          Issue: {issue}
        </Link>

    </div>
  );
};

export default IssueCard;