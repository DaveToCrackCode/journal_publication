// ReviewerCard.js
import React, { useState, useEffect } from "react";
import "../style/addreviewer.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CompleteJournalDetailsAuthor = () => {
  const [data, setData] = useState(null);
  let { id } = useParams();

  const getCompleteJournalDetails = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/author/getCompleteDetailsOfJournal/${id}`,
        { headers }
      );
      console.log(response);
      if (response.status === 200) {
        // Assuming the response.data contains the array of journals
        //console.log("One journal", response.data.data);
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
      <div className="reviewer-wrapper">
        <div className="reviewer-token">
          <div className="reviewer-discription">
            <h3>
              Title: <b>{data?.journalDetails?.title} </b>
            </h3>
            <p>Abstract: {data?.journalDetails?.abstract}</p>
            <p>Status: {data?.journalDetails?.status}</p>

            <span>
              Journal-Pdf:{" "}
              <a
                href={data?.journalDetails?.journal_pdf}
                target="_blank"
                style={{ display: "inline" }}
              >
                {data?.journalDetails?.journal_pdf}
              </a>
            </span>

            <p>Journal-Category: {data?.journalDetails?.journalType}</p>

            <hr />
            <h3 style={{ fontWeight: "bold" }}>Author Detail</h3>
            <p>Author: {data?.journalDetails?.author?.name}</p>
            <p>Author-Email: {data?.journalDetails?.author?.email}</p>
          </div>

          <hr />

          <h3>
            {" "}
            <b>Reviewers Details</b>
          </h3>
          <div className="reviewer-discription">
            {data &&
              data.reviewerDetails.length &&
              data.reviewerDetails.map((reviewer, index) => (
                <div>
                  <p>Name:{reviewer?.reviewerData?.name}</p>
                  <p>Email:{reviewer?.reviewerData?.email}</p>
                  <p>Status:{reviewer?.status}</p>
                </div>
              ))}

              <hr />
          <h3 style={{ fontWeight: "bold" }}>Progress Of Your Paper </h3>

          <p>Reviewers Added: {data?.totalReviewer}</p>
          <p>Reviewers Accepted: {data?.acceptedReviewers}</p>
          <p>Reviewers Rejected: {data?.rejectedReviewers}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteJournalDetailsAuthor;