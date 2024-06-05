import React, { useState, useEffect } from "react";
import "../../style/allreviewers.css"
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import '../../style/reviewerrequest.css';

const UserDetails = () => {
    const [userData, setData] = useState(null);
    let { id } = useParams();

    const getCompleteJournalDetails = async () => {
        try {
            const headers = {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            };

            const response = await axios.get(
                `http://127.0.0.1:5000/api/v1/admin/user_details/${id}`,
                { headers }
            );
            console.log(response);
            if (response.status === 200) {
                // Assuming the response.data contains the array of journals
                console.log("One user", response.data.data.data);
                setData(response.data.data.data);
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
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingBottom: "5%" }}>

                <table id="reviewers-table">
                    <thead>
                        <tr>
                            <th colSpan={2} style={{textAlign: "center"}}>{userData?.name}'s Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name: </td>
                            <td>{userData?.name}</td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td>{userData?.email}</td>
                        </tr>
                        <tr>
                            <td>Contact: </td>
                            <td>{userData?.contact}</td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{userData?.address}</td>
                        </tr>
                        <tr>
                            <td>City: </td>
                            <td>{userData?.city}</td>
                        </tr>
                        <tr>
                            <td>Country: </td>
                            <td>{userData?.country}</td>
                        </tr>
                        <tr>
                            <td>Track: </td>
                            <td>{userData?.specialistArea}</td>
                        </tr>
                        <tr>
                            <td>Qualification: </td>
                            <td>{userData?.qualification}</td>
                        </tr>
                        <tr>
                            <td>Highest Degree</td>
                            <td onClick={() => window.open(userData?.degree_pdf, '_blank')} style={{color: "blue"}}>Click to Download</td>
                        </tr>



                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserDetails;
