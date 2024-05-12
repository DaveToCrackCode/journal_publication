import React,{useState} from 'react';
import '../style/userCard.css';
import { jwtDecode } from 'jwt-decode';

const UserCard = ({author}) => {
const { name, email, contact, address, city, country, qualification, degree_pdf,specialistArea} = author;
console.log(author);

  return (
    <div className="user-card" style={{display: "flex",alignContent: "center", justifyContent: "center"}}>
     <table>
  <tbody>
    <tr>
      <td><h3>Name:</h3></td>
      <td><h3>{name}</h3></td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>{email}</td>
    </tr>
    <tr>
      <td>Contact:</td>
      <td>{contact}</td>
    </tr>
    <tr>
      <td>Track:</td>
      <td>{specialistArea}</td>
    </tr>
    <tr>
      <td>Qualification:</td>
      <td>{qualification}</td>
    </tr>
    <tr>
      <td>Address:</td>
      <td>{address}</td>
    </tr>
    <tr>
      <td>City:</td>
      <td>{city}</td>
    </tr>
    <tr>
      <td>Country:</td>
      <td>{country}</td>
    </tr>
    <tr>
      <td>Degree</td>
      <td style={{color: "blue"}} onClick={() => window.open(degree_pdf, '_blank')}>Click</td>
    </tr>
  </tbody>
</table>

      
   

    </div>
  );
};

export default UserCard;