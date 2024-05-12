import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import "../../style/allreviewers.css"

const TrackProgress = () => {
    const [journals, setJournals] = useState([]);

    const getAllJournals = async () => {
        try {
            const headers = {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            };

            const response = await axios.get('http://127.0.0.1:5000/api/v1/admin/getAllJournals', { headers });

            if (response.status === 200) {
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
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "5%" }}>
            {/* <h1><b>Reviewers list is being displayed according to paper track</b></h1> */}

                <table id="reviewers-table">
                    <thead>
                        
                        <tr>
                            <th>Paper id</th>
                            <th>Title</th>
                            <th>Track</th>
                            <th>Status</th>
                            <th>More</th>

                        </tr>
                    </thead>
                    <tbody>
                    {journals.map((journal) => (
                        <tr>
                            <td>{journal.paper_id}</td>
                            <td>{journal.title}</td>
                            <td>{journal.journalType}</td>
                            <td>{journal.status}</td>
                            <td><Link style={{textDecoration:"none"}} to={`/admin/track_details/${journal._id}`} className="more-button">
                                More
                            </Link></td>
                        </tr>

                    ))}
                    </tbody>
          
        </table>
        </div >
    );
};

export default TrackProgress;
