import React,{useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../../style/allreviewers.css"

const AcceptedPapers =() =>{
    const [journals, setJournals] = useState([]);

    const getAllJournals = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        };
  
        const response = await axios.get('http://127.0.0.1:5000/api/v1/admin/getAllJournals', { headers });
  
        if (response.status === 200) {
          // Assuming the response.data contains the array of journals
          // console.log(response.data.data);
          setJournals(response.data.data);
          toast.success('Data Fetched Successfully');
        } else {
          toast.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Some internal server error');
      }
    };
  
    useEffect(() => {
      getAllJournals();
    }, []);
  
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>


   
    <table id='reviewers-table'>
      <tr><td colSpan={5} style={{textAlign: "center"}}> <h2><b>Papers which Accepted by Admin!</b></h2></td></tr>
        <tr>
          <th>Paper ID</th>
          <th>Title</th>
          <th>Keywords</th>
          <th>View</th>
          <th>Status</th>
        </tr>
     
        <tbody>
        {journals.some(journal => journal.status === 'accepted') ? (
        journals.filter(journal => journal.status === 'accepted').map((journal) => (
            <tr>
                <td>{journal.paper_id}</td>
                <td>{journal.title}</td>
                <td>{journal.keyword}</td>
                <td onClick={() => window.open(journal.journal_pdf, '_blank')}>Click</td>
                <td>{journal.status}</td>
            </tr>
          
        ))
      ) : (
        <tr>
          <td colSpan={5} style={{textAlign: "center"}}> <p>No journals available.</p></td>
        </tr>
      )}
      </tbody>
    </table>
    </div>
  );
};

export default AcceptedPapers;
