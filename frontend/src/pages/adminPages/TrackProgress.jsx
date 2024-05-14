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
            console.log(response.data.data)

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

     const [confirmAccept, setConfirmAccept] = useState(false);
    const [paperId, setPaperId] = useState(null);

    const handleAcceptPaper = async (id) => {
        setConfirmAccept(true);
        setPaperId(id);
    };

    const confirmAcceptPaper = async () => {
        try {
            const headers = {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            };

            const response = await axios.post(`http://127.0.0.1:5000/api/v1/admin/acceptPaper/${paperId}`, {}, { headers });

            if (response.status === 200) {
                toast.success('Request Accepted Successfully');
            } else {
                toast.error('Failed to Accept Request');
            }
        } catch (error) {
            console.error('Error Accepting the request:', error);
            toast.error('Some internal server error');
        } finally {
            // Reset confirmation dialog state
            setConfirmAccept(false);
            setPaperId(null);
        }
    };

    const cancelAcceptPaper = () => {
        setConfirmAccept(false);
        setPaperId(null);
    };



    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "5%" }}>
            {/* <h1><b>Reviewers list is being displayed according to paper track</b></h1> */}

            {confirmAccept && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to accept the paper?</p>
                    <button onClick={confirmAcceptPaper}  className="accept-btn" >Yes</button>
                    <button onClick={cancelAcceptPaper}  className="reject-btn" style={{marginLeft: "20px"}}>No</button>
                </div>
            )}

            <table id="reviewers-table">
                <thead>

                    <tr>
                        <th>Paper id</th>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Track</th>
                        <th>Status</th>
                        <th>More</th>

                    </tr>
                </thead>
                <tbody>
                    {journals.some(journal => journal.status !== 'accepted') ? (
                    journals.filter(journal => journal.status !== 'accepted').map((journal) => (
                            <>
                                <tr>
                                    <td>{journal.paper_id}</td>
                                    <td>{journal.author.email}</td>
                                    <td>{journal.title}</td>
                                    <td>{journal.journalType}</td>
                                    <td>{journal.status}</td>
                                    <td><Link style={{ textDecoration: "none" }} to={`/admin/track_details/${journal._id}`}
                                        className="more-button">
                                        More
                                    </Link></td> 
                                </tr>
                                   
                                         <tr>

                                         <td style={{ textAlign: "center" }} colSpan={3}><button className="accept-btn" onClick={() => handleAcceptPaper(journal._id)}>Accept Paper</button> </td>
                                         <td style={{ textAlign: "center" }} colSpan={3} /*onClick={handleRejectPaper}*/><button className="reject-btn">Reject Paper</button> </td>
                                         </tr>
                                    
                            </>


                        ))
                        ):( <tr>
                            <td colSpan={6} style={{textAlign: "center"}}><p>No journals available.</p></td>
                        </tr> 
                    )}
                </tbody>

            </table>
        </div >
    );
};

export default TrackProgress;
