import React, { useState, useEffect } from "react";
import "../../style/allreviewers.css"
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import '../../style/reviewerrequest.css';

const TrackDetails = () => {
    const [data, setData] = useState(null);
    let { id } = useParams();

    const getCompleteJournalDetails = async () => {
        try {
            const headers = {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            };

            const response = await axios.get(
                `http://127.0.0.1:5000/api/v1/admin/track_details/${id}`,
                { headers }
            );
            console.log(response);
            if (response.status === 200) {
                // Assuming the response.data contains the array of journals
                console.log("One journal", response.data.data);
                setData(response.data.data);
                toast.success("Data Fetched Successfully");
            } else {
                toast.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Some internal server error");
        }
    };

    useEffect(() => {
        getCompleteJournalDetails();
    }, []);
    return (
        <>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "5%" }}>
                <h1><b>Reviewers list is being displayed according to paper track</b></h1>
                {/* <h2 style={{ textAlign: "center" }}><b>{journal.author}</b></h2> */}
                <table id="reviewers-table">
                    <thead>
                        <tr>
                            <th>Reviewer Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Remind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.reviewerDetails.length &&
                            data.reviewerDetails.map((reviewer, index) => (
                                <tr>
                                    <td>{reviewer?.reviewerData?.name}</td>
                                    <td>{reviewer?.reviewerData?.email}</td>
                                    <td>{reviewer?.status === 'accept' ? 'Accepted' : reviewer?.status === 'none'? 'Waiting': reviewer?.status}</td>
                                    <td><button className="remind-button">Remind</button></td>
                                </tr>
                            ))}

                            
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TrackDetails;
