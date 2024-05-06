import React, { useState, useEffect } from 'react';
import JournalCard from '../../component/JournalCard.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllJournalForReviewing = () => {
  const [journals, setJournals] = useState([]);

  const getAllJournals = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      };

      const response = await axios.get('http://127.0.0.1:5000/api/v1/reviewer/getReviewerJournal', { headers });

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
    <div className='journal-list'>
      {journals.length > 0 ? (
        journals.map((journal) => (
          <JournalCard key={journal._id} journal={journal} />
        ))
      ) : (
        <p>No journals available.</p>
      )}
    </div>
  );
};

export default AllJournalForReviewing;