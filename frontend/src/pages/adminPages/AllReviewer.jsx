import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "../../style/allreviewers.css";
import { Link } from 'react-router-dom';


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
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>


    {/* Biomedical Engineering Track */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Biomedical Engineering Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Biomedical Engineering') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Biomedical Engineering' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Chemical Engineering */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Chemical Engineering Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Chemical Engineering') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Chemical Engineering' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Civil Engineering */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Civil Engineering</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Civil Engineering') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Civil Engineering' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Communication Engineering */}
    <table id='reviewers-table'> 
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Communication Engineering Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Communication Engineering') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Communication Engineering' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Computer Science and Applications */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Computer Science and Applications Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Computer Science and Applications') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Computer Science and Applications' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Electrical and Electronic Engineering */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Electrical and Electronic Engineering Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Electrical and Electronic Engineering') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Electrical and Electronic Engineering' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Fundamental and Applied Sciences */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Fundamental and Applied Sciences Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Fundamental and Applied Sciences') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Fundamental and Applied Sciences' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Manufacturing and Industrial Engineering */}
    <table id='reviewers-table'>
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Manufacturing and Industrial Engineering</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Manufacturing and Industrial Engineering') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Manufacturing and Industrial Engineering' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>


    {/* Mechanical Engineering and Technology */}
    <table id='reviewers-table'>  
      <tr><td colSpan={4} style={{textAlign: "center"}}> <h2><b>Reviewers in Mechanical Engineering and Technology Track</b></h2></td></tr>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone No.</th>
          <th>More Details</th>
        </tr>
     
        <tbody>
        {reviewers.some(reviewer => reviewer.specialistArea === 'Mechanical Engineering and Technology') ? (
          reviewers.map((reviewer) => (
            reviewer.specialistArea === 'Mechanical Engineering and Technology' && (
              <tr key={reviewer._id}>
                <td>{reviewer.name}</td>
                <td>{reviewer.email}</td>
                <td> {reviewer.contact}</td>
                <td><Link to={`/user-details/${reviewer._id}`} className="detail-button" style={{marginTop: "0px"}}>
                     Click here
                </Link></td>
              </tr>
            )
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{fontWeight: "bold", textAlign: "center"}}>No one here</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  );
}

export default AllReviewer;
