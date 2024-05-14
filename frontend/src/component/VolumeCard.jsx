import React from 'react';
import '../style/volumecard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const VolumeCard = ({ volume }) => {
  return (
    <div className="volume-card">
        <Link className="main-nav-link" to={`/archive/${volume}`}>
          Volume: {volume}
        </Link>

    </div>
  );
};

export default VolumeCard;