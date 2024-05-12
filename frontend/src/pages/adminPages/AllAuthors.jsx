import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "../../style/allreviewers.css";

const AllAuthors =() =>{
    const [authors,setAuthor]= useState([]);
    const getAllAuthor = async()=>{
        try {
            const headers = {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
              };
           const data = await axios.get("http://localhost:5000/api/v1/admin/getAllAuthor", {
            headers,
          });
          console.log(data.data.data);
          setAuthor(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
   
    useEffect(()=>{
        getAllAuthor();
    },[]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>


   
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>All Authors Registered</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>Track</th>
        </tr>
     
        <tbody>
       
          {authors.map((author)  => (
              <tr key={author._id}>
                <td>{author.name}</td>
                <td>{author.email}</td>
                <td>+91 {author.contact}</td>
                <td>{author.specialistArea}</td>
                {/* <td onClick={() => window.open(author.degree_pdf, '_blank')}>Click</td> */}
              </tr>
            )
          )
        }
      </tbody>
    </table>
    </div>
  );
};

export default AllAuthors;
