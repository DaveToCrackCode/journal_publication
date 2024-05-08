// JournalSubmitForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/journalsubmisionform.css';
import toast from "react-hot-toast";
import axios from 'axios';
import PaperFormat from './PaperFormat';

const JournalSubmitForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    pdfFile: 'null',
    journalType: 'none',
  });

  const handleChange = (e) => {
    const { id, value, type, files,name } = e.target;
    //console.log(name+" "+ value);
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
    
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    try {
     
    
      const { data } = await toast.promise(
        axios.post('http://localhost:5000/api/v1/author/submit-journal', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
           Authorization: localStorage.getItem('token'),
        },
      }),
        {
          pending: "Journal Submitting in progress...",
          success: "Journal Submitting successfully",
          error: "Unable to submit journal",
          loading: "Journal Submitting in progress...",
        }
      );

      //console.log(data);
      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors, show an error message, etc.
    }
  };

  return (
    <div>
       <PaperFormat />
            <div className="form-container">
        <h2 className="text-center mb-4">Journal Submission Form</h2>
        <form className="cta-form" name="sign-up" onSubmit={handleSubmit} >
                <div>
                  <label htmlfor="name">Title</label>
                  <input
                    className="input"
                    type="text"
                    id="name"
                    name="title"
                    placeholder="Your Name"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="abstract"> Abstract <span className="text-danger">*</span> </label>
                    <textarea className="input" 
                      name="abstract" 
                      id='abstract'
                      rows="4" 
                      placeholder="Enter abstract here..."
                      value={formData.abstract} 
                      onChange={handleChange} required>
                    </textarea>
                </div>

                <div>
                  <label className="label" htmlFor="pdfFile" >Journal PDF File <span className="text-danger">*</span>
                  </label>
                  <input className="input" type="file" name="pdfFile" onChange={handleChange} accept=".pdf" required />
                </div>

                <div> 
                  <label className="label" htmlFor="journalType">Journal Type <span className="text-danger">*</span></label>
                  <select  className="input" name="journalType" value={formData.journalType} onChange={handleChange} required>
                    <option value="none" selected disabled>Select</option>
                    <option value="ml">Machine Learning</option>
                    <option value="web-dev">Web Development</option>
                    <option value="deep-learning">Deep Learning</option>
                  </select>
                </div>
                <button className="submit-button" type="submit">Submit</button>
              </form>
    
      </div>
    </div>
  );
};

export default JournalSubmitForm;
