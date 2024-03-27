import React from 'react';
import '../style/card.css'; // Import your CSS file for styling
import img from '../img/customers/customer-5.jpg'
const Card = ({ name, email, qualification, imageSrc, pdfLink }) => {
  return (
    <div className="card">
      <img src={img} alt="User" className="user-image" />
      <div className="card-content">
        <h3>{name}</h3>
        <p>Email: {email}</p>
        <p>Qualification: {qualification}</p>
        <p>Specilization-Area: {qualification}</p>
        <p>Mobile : +91 9977886655</p>
        <a href={pdfLink} target="_blank" rel="noopener noreferrer">Degree:{pdfLink}</a>
      </div>
    </div>
  );
};

export default Card;
