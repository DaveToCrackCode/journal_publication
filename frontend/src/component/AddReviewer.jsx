// ReviewerCard.js
import React, { useState, useEffect } from 'react';
import '../style/addreviewer.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ReviewerCard = ({ title, author, status, date }) => {
  const [reviewers, setReviewers] = useState([]);
  const [newReviewer, setNewReviewer] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [allReviewers, setAllReviewers] = useState([]);
  const [searchReviewer, setSearchReviewer] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [journal,setJournal] = useState({});
  let {id} = useParams();

  //FETCH A JOURNAL BY ID
  const getJournal = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      };

      const response = await axios.get(`http://127.0.0.1:5000/api/v1/admin/getJournal/${id}`, { headers });

      if (response.status === 200) {
        // Assuming the response.data contains the array of journals
       console.log("One journal",response.data.data);
        setJournal(response.data.data);
        toast.success('Data Fetched Successfully');
      } else {
        toast.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Some internal server error');
    }
  };
  const setReviewer = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      };

       const response = await axios.post(`http://127.0.0.1:5000/api/v1/admin/setReviwer/${id}`,reviewers, { headers });

      if (response.status === 200) {
        // Assuming the response.data contains the array of journals
       
        toast.success('Reviewers Add  Successfully');
      } else {
        toast.error('Failed to Add Reviewer');
      }
    } catch (error) {
      console.error('Error while Adding the reviewer:', error);
      toast.error(' Some internal server error Add reviwer page');
    }
  };

  // SEARCHING FUNCTIONALITY
  const handleSearch = (input) => {
    setSearchInput(input);
    const searchInputString = input.toLowerCase().trim();
    if (searchInputString === '') {
      setSearchReviewer([]);
      return;
    }
    const filtered = allReviewers.filter((reviewer) =>
      reviewer.name.toLowerCase().includes(searchInputString)
    );
    // console.log("filtered",filtered);
    setSearchReviewer(filtered);
  };


  //ADD REVIER FROM THE LIST
  const handleAddReviewer = () => {
    //console.log(newReviewer);
    if (newReviewer.name.trim() !== '') {
      setReviewers([...reviewers, newReviewer]);
      setNewReviewer({});
      setSearchInput('');
      setSearchReviewer([]);
      setSelectedReviewer(null);
      //console.log(reviewers);
    }
  };

  const handleRemoveReviewer = (index) => {
    const updatedReviewers = [...reviewers];
    updatedReviewers.splice(index, 1);
    setReviewers(updatedReviewers);
  };

  const handleSelectReviewer = (reviewer) => {
    setSelectedReviewer(reviewer);
    setNewReviewer(reviewer);
  };

  const getAllReviewer = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      };
      const data = await axios.get('http://localhost:5000/api/v1/admin/getAllReviewer', {
        headers,
      });
      setAllReviewers(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReviewer();
    getJournal ();
  }, []);

  return (
    <div className="reviewer-card">
      <h3>Title:{journal?.title}</h3>
      <p>Abstract: {journal?.abstract}</p>
      <p>Status: {journal?.status}</p>
      <span>Journal-Pdf: <a href={journal?.journal_pdf} target='_blank' style={{display:"inline"}}>{journal?.journal_pdf}</a></span>
      <p>Journal-Category: {journal.journalType}</p>
      <h3 style={{fontWeight:"bold"}}>Author Detail</h3>
      <p>Author:{journal?.author?.name}</p>
      <p>Author-Email:{journal?.author?.email}</p>
      
      <button onClick={handleAddReviewer}>Add Reviewer</button>
      {
        reviewers.length > 0 ? <button onClick={setReviewer}>Submit Reviewer</button> :null
      }
      <div className="reviewer-list">
        {reviewers.map((reviewer, index) => (
          <div key={index} className="reviewer-item">
            {reviewer.name}
            <span className="remove-reviewer" onClick={() => handleRemoveReviewer(index)}>
              &#10006;
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search Reviewer"
        value={searchInput.name}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchReviewer.length > 0 && (
        <div className="search-results">
          <p>Search Results:</p>
          <ul>
            {searchReviewer.map((result) => (
              <li key={result._id} onClick={() => handleSelectReviewer(result)}>
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReviewerCard;
