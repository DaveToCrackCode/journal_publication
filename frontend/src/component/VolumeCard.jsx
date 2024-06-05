import React from 'react';
import '../style/volumecard.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import Volume from "../img/volume.png"
const VolumeCard = ({ volume }) => {
  return (
    <div className='archives'>
    <Link className='archiveLink' to={`/archive/${volume}`}>
      <img className= "archive-card" src={Volume} alt="" />
      Volume: {volume}
    </Link>

    </div>
  );
};

export default VolumeCard;