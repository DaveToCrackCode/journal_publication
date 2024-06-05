import React,{useState,useEffect} from 'react';
import Card from '../component/Card';
import axios from 'axios';
import JournalCard from '../component/JournalCard'


const AllReviewer = () => {
    const [reviewers,setReviewer]= useState([]);
    const getAllReviewer = async()=>{
        try {
            const headers = {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
              };
           const data = await axios.get("http://localhost:5000/api/v1/admin/getAllReviewer", {
            headers,
          });
          console.log(data.data.data);
          setReviewer(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllReviewer();
    },[]);
  return (
    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
       {reviewers.map((reviewer) => (
        <Card
          key={reviewer._id} 
          name={reviewer.name} 
          email={reviewer.email} 
          qualification={reviewer.qualification} 
          imageUrl={reviewer.imageUrl} 
          pdfLink={reviewer.degree_pdf} 
        />
      ))}
      
    </div>
  );
}

export default AllReviewer;
