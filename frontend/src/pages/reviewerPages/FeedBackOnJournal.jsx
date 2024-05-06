import React, { useState, useEffect } from 'react';
import '../../style/addreviewer.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const FeedBackOnJournal = () => {
    const [journal, setJournal] = useState({});
    const [user, setUser] = useState(
        localStorage.getItem("token")
            ? jwtDecode(localStorage.getItem("token"))
            : ""
    );
    const [status, setStatus] = useState("none");
    const [change,setChange]=useState(false);
    let { id } = useParams();

    const getJournal = async () => {
        try {
            const headers = {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            };

            const response = await axios.get(`http://127.0.0.1:5000/api/v1/reviewer/getReviewJournal/${id}`, { headers });

            if (response.status === 200) {
                setJournal(response.data.data);
                setChange(false);
                const myData = response.data.data;
                for (let i = 0; i < myData.reviewers.length; i++) {
                    if (myData.reviewers[i]._id === user._id) {
                        setStatus(myData.reviewers[i].status);
                    }
                }
                toast.success('Data Fetched Successfully');
            } else {
                toast.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Some internal server error');
        }
    };

    const AcceptHandler = async()=>{
        try {
            const headers = {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            };

            const response = await axios.post(`http://127.0.0.1:5000/api/v1/reviewer/accept`, {userId:user._id,journalId:id},{ headers });

            if (response.status === 200) {
                setChange(true);
                toast.success('Status change succesfully');
            } else {
                setChange(false);
                toast.error('Failed change status');
            }
        } catch (error) {
            setChange(false);
            console.error('Error fetching data:', error);
            toast.error('Some internal server error when accepting the request');  
        }
    }

    const RejectHandler = async()=>{
        try {
            const headers = {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            };

            const response = await axios.post(`http://127.0.0.1:5000/api/v1/reviewer/reject`, {userId:user._id,journalId:id},{ headers });

            if (response.status === 200) {
                setChange(true);
                toast.success('Status change succesfully');
            } else {
                setChange(false);
                toast.error('Failed change status');
            }
        } catch (error) {
            setChange(false);
            console.error('Error fetching data:', error);
            toast.error('Some internal server error when accepting the request');  
        }
    }

    useEffect(() => {
        getJournal();
    }, [change]);

    const renderButtons = () => {
        if (status === "none") {
            return (
                <div>
                    <button className='accept-button' onClick={AcceptHandler}>Accept</button>
                    <button className='reject-button' onClick={RejectHandler}>Reject</button>
                </div>
            );
        } else if (status === "accept") {
            return (
                <div>
                    <Link  to={`/journals/reviewer/feedback/${id}`} style={{textDecoration: "none"}} 
                    className='feedback-button' >Feedback</Link> 
                </div>
            );
        } else if (status === "reject") {
            return <p style={{ color: "red" }}>You rejected this journal.</p>;
        }
    };

    return (
        <div className="reviewer-card">
            <h3>Title:{journal?.title}</h3>
            <p>Abstract: {journal?.abstract}</p>
            <p>Status: {journal?.status}</p>
            <span>Journal-Pdf: <a href={journal?.journal_pdf} target='_blank' style={{ display: "inline" }}>{journal?.journal_pdf}</a></span>
            <p>Journal-Category: {journal?.journalType}</p>
            <h3 style={{ fontWeight: "bold" }}>Author Detail</h3>
            <p>Author:{journal?.author?.name}</p>
            <p>Author-Email:{journal?.author?.email}</p>

            {renderButtons()}
        </div>
    );
}

export default FeedBackOnJournal;