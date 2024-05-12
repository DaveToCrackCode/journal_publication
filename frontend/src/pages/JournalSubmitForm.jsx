// JournalSubmitForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/journalsubmisionform.css';
import toast from "react-hot-toast";
import axios from 'axios';

const JournalSubmitForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    keyword:"",
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
       <div className="journal-instructions">
            <h2><b>Instruction for Author</b></h2>
            Submissions must be original and should not have been published previously or be under consideration for publication while being evaluated for this Journal.
            <br /><br />
            The following is the format to be followed, when the authors submit their papers. Also Authors are requested to submit their papers as a MS word file.
            <br /><br />
            <h3><b>Please note that most of the fonts mentioned below comes with Adobe Photoshop.</b></h3> 
            <b>Page Layout :</b> <br />
            <i>Size - A4 sheet <br />
            Margins - 1.5” for top, bottom, left and right.</i> <br />
            
            <b>Paragraph :</b> <br />
            <i>Line spacing – single</i> <br /> <br />

            <b>Paper Format :</b> <br />

            <table>
              <tr>
                <th className='table-blocks'>Headings</th>
                <th className='table-blocks'>Font Style</th>
                <th className='table-blocks'>Font Size</th>
                <th className='table-blocks'>Italic</th>
              </tr>

              <tr>
                <td className="table-blocks">Paper Title</td>
                <td className="table-blocks">Adobe Arabic</td>
                <td className="table-blocks">24</td>
                <td className="table-blocks">No</td>
              </tr>
              <tr>
                <td className="table-blocks">Author Name</td>
                <td className="table-blocks">Adobe Caslon Pro</td>
                <td className="table-blocks">12</td>
                <td className="table-blocks">No</td>
              </tr>
              <tr>
                <td className="table-blocks">Author Address</td>
                <td className="table-blocks">Adobe Caslon Pro</td>
                <td className="table-blocks">10</td>
                <td className="table-blocks">Yes</td>
              </tr>
              <tr>
                <td className="table-blocks">Abstract & Keywords</td>
                <td className="table-blocks">Adobe Garamond Pro</td>
                <td className="table-blocks">10</td>
                <td className="table-blocks">Yes</td>
              </tr>
              <tr>
                <td className="table-blocks">Subtitles</td>
                <td className="table-blocks">Adobe Arabic</td>
                <td className="table-blocks">18</td>
                <td className="table-blocks">No</td>
              </tr>
              <tr>
                <td className="table-blocks">Text & References</td>
                <td className="table-blocks">Adobe Arabic</td>
                <td className="table-blocks">14</td>
                <td className="table-blocks">No</td>
              </tr>
            </table>

      </div>
      <div className="journal-instructions">
        <h2><b>Note :</b></h2>
        All the submissions will be <b>Blind peer-reviewed</b> by the panel of experts associated 
        with the particular field. Submitted papers should meet the internationally accepted 
        criteria and manuscripts should follow the style of the journal for the purpose of both reviewing and editing.
      </div>


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
                  <label htmlfor="keyword">Keyword</label>
                  <input
                    className="input"
                    type="text"
                    id="keyword"
                    name="keyword"
                    placeholder="Keyword"
                    value={formData.keyword}
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
                  <input className="input" type="file" name="pdfFile" onChange={handleChange} accept=".doc,.docx" required />
                </div>

                <div> 
                  <label className="label" htmlFor="journalType">Journal Type <span className="text-danger">*</span></label>
                  <select  className="input" name="journalType" value={formData.journalType} onChange={handleChange} required>
                  <option value="none" selected disabled hidden>Select</option>
                    <option value="Biomedical Engineering">Biomedical Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Communication Engineering">Communication Engineering</option>
                    <option value="Computer Science and Applications">Computer Science and Applications</option>
                    <option value="Electrical and Electronic Engineering">Electrical and Electronic Engineering</option>
                    <option value="Fundamental and Applied Sciences">Fundamental and Applied Sciences</option>
                    <option value="Manufacturing and Industrial Engineering">Manufacturing and Industrial Engineering</option>
                    <option value="Mechanical Engineering and Technology">Mechanical Engineering and Technology</option>
                  </select>
                </div>
                <button className="submit-button" type="submit">Submit</button>
              </form>
    
      </div>
    </div>
  );
};

export default JournalSubmitForm;