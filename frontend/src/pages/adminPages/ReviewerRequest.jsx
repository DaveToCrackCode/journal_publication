import React, { useState,useEffect } from 'react';
import '../../style/reviewerrequest.css'; // Import your CSS file
import '../../style/allreviewers.css';
import axios from 'axios';
import toast from 'react-hot-toast';



const ReviewerRequest = () => {
  

  const [Reviewer,setReviewer]= useState([]);

  const fetchAllData = async()=>{
    try {
        const headers = {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        };
  
        const response = await axios.get('http://127.0.0.1:5000/api/v1/admin/getReviewerRequest', { headers });
  
        if (response.status === 200) {
          // Assuming the response.data contains the array of journals
          console.log(response.data.data);
          setReviewer(response.data.data);
          toast.success('Data Fetched Successfully');
        } else if(response.status==203){
            toast.success('Not any Reviewer Request are Present'); 
        }
        else {
          toast.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Some internal server error');
      }
  }

  const handleAccept = async(id) => {
    try {
        const headers = {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        };
  
        const response = await axios.delete(`http://127.0.0.1:5000/api/v1/admin/acceptRequest/${id}`, { headers });
  
        if (response.status === 200) {
            fetchAllData();
          toast.success('Request Accepted SuccesFully');
        } else if(response.status === 203){
            toast.error('Failed to Accept Request');
        }
        else {
          toast.error('Failed to Accept Request');
        }
      } catch (error) {
        console.error('Error Accept the request:', error);
        toast.error('Some internal server error');
      }
  };

  const handleReject = async(id) => {
    try {
        const headers = {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        };
  
        const response = await axios.delete(`http://127.0.0.1:5000/api/v1/admin/acceptRequest/${id}`, { headers });
  
        if (response.status === 200) {
         fetchAllData();
          toast.success('Request Reject SuccesFully');
        } else if(response.status === 203){
            toast.error('Failed to Reject Request');
        }
        else {
          toast.error('Failed to Reject Request');
        }
      } catch (error) {
        console.error('Error Reject the request:', error);
        toast.error('Some internal server error');
      }
  };

  useEffect(()=>{
    fetchAllData();
  },[])
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <table id='reviewers-table'> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Degree</th>
            <th>Qualification</th>
            <th>Track</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
        {Reviewer.length > 0 ? (
  Reviewer.map(applicant => (
    <tr key={applicant._id}>
      <td>{applicant.reviewerId.name}</td>
      <td>{applicant.reviewerId.email}</td>
      <td><a href={applicant.reviewerId.degree_pdf}>Degree Pdf</a></td>
      <td>{applicant.reviewerId.qualification}</td>
      <td>{applicant.reviewerId.specialistArea}</td>
      <td>
        <button onClick={() => handleAccept(applicant._id)} className="accept-btn">Accept</button>
        <button onClick={() => handleReject(applicant._id)} className="reject-btn">Reject</button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6" style={{textAlign:"center"}}>NO DATA</td>
  </tr>
)}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewerRequest;