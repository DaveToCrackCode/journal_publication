import React,  { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from "axios";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import '../style/volumecard.css';




const JournalDetails = () => {

    let { vol, issu, id } = useParams();

    console.log(id)

    const [paper, setData] = useState(null);




    const getJournalDetails = async () => {

        try {

          const headers = {

            Authorization: localStorage.getItem("token"),

            "Content-Type": "application/json",

          };




          const response = await axios.get(

            `http://127.0.0.1:5000/api/v1/public/getCompleteDetailsOfJournal/${id}`,

            { headers }

          );

          console.log(response);

          if (response.status === 200) {

            // Assuming the response.data contains the array of journals

            console.log("One journal", response.data.data.data);

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

        getJournalDetails();

    }, []);




  return (

    <div className="archive-wrapper">

        <table className="archive_issue">

            <tr>

                <th colSpan={3}>{paper?.title}</th>

            </tr>

            <tr>

                <td>Volume: {paper?.volume}</td>

                <td>Issue: {paper?.issue}</td>

                <td>Page: {paper?.pageNumber}</td>

            </tr>

            <tr>

                <th colSpan={3}>Abstract</th>

            </tr>

            <tr>

                <td style={{lineHeight: "2", textAlign: "center"}} colSpan={3}>{paper?.abstract}</td>

            </tr>

            <tr>

                <td colSpan={2} onClick={() => window.open(paper?.paperDegree, '_blank')} style={{color: "blue"}}>Click to Download</td>




                <td><b>- {paper?.author} </b></td>

            </tr>







        </table>







    </div>

  );

};




export default JournalDetails;