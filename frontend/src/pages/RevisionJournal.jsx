import React, { useState } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/revisionjournal.css";
const RevisionJournal = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [formData,setFormData] = useState(new FormData());
  let {id} = useParams();
  console.log(id);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }
  const updatedFormData = {...formData , journalId:id};
  console.log( updatedFormData);

  try {
    const headers = {
      Authorization: localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data',
    };

    const response = await axios.post(
      `http://127.0.0.1:5000/api/v1/author/submit-update-journal`,updatedFormData,
      { headers }
    );
    //console.log(response);
    if (response.status === 200) {
      // Assuming the response.data contains the array of journals
      //console.log("Feedback", response.data.data);
       setMessage("journal updated succesfully");
    } else {
        setMessage("journal updated Fail try again")
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setMessage("Some internal server error");
  }
  };

  return (
    <div className="file-upload-form">
      <h2>Upload a Revision of Journal</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="journalFile"  value={formData.jouranlFile} onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RevisionJournal;
