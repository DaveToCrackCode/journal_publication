import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import "../../style/feedbackPage.css"
import { useParams } from 'react-router-dom';

const FeedBackPage = () => {
    const navigate = useNavigate();
    let [formData,setFormData] = useState(new FormData());
    const {id} = useParams();
    const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
    });
    }
    const handleFeedback = async (e) => {
        e.preventDefault();
        //console.log(formData);
        //const token = localStorage.getItem("token");
        //console.log(token);
        formData ={
          ...formData,
          journalId:id
        }
        try {
          const headers = {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          };
    
          const response = await axios.post('http://127.0.0.1:5000/api/v1/reviewer/feedback', formData,{ headers });
        // console.log(response);
          if (response.status === 200) {
            toast.success('Feedback submitted Successfully');
          } else if(response.status === 201){
            toast.error("Feedback is Already added by you");
          }
          else {
            toast.error('Failed to submit feedback');
          }
        } catch (error) {
          console.error('Feedback:', error);
          toast.error('Some internal server error');
        }
         
      };
    
  return (
    <div className="feedback-block">
        <div className="feedback-history">

   <div className="Feedback">
                    <h4 style={{color: "#c00202" , textAlign: "center", fontSize: "x-large"}}>Provide Feedback About the Paper!</h4>
                    <br />
                    <form onSubmit={handleFeedback}>
                      <table>
                        <tr>
                          <td>
                            <label htmlFor="q1">
                            Is the abstract concise and informative, summarizing the key findings and significance of the research?
                            </label>
                          </td>
                          <td>
                          <select
                              id="q1"
                              value={formData.q1}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q2">
                            Are the research methods appropriate for addressing the research question?
                            </label>
                          </td>
                          <td>
                          <select
                             id="q2"
                              value={formData.q2}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label htmlFor="q3">
                            Is the research question or objective clearly stated?
                            </label>
                          </td>
                          <td>
                          <select
                             id="q3"
                              value={formData.q3}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q4">
                            Are potential biases or limitations of the methodology addressed?
                            </label>
                          </td>
                          <td>
                          <select
                              id="q4"
                              value={formData.q4}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q5">
                            Are the results presented clearly and logically?
                            </label>
                          </td>
                          <td>
                          <select
                              id="q5"
                              value={formData.q5}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label htmlFor="q6">
                            Are appropriate statistical analyses used, and are the results statistically significant?
                            </label>
                          </td>
                          <td>
                          <select
                             id="q6"
                              value={formData.q6}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q7">
                            Are potential biases or limitations of the methodology addressed?
                            </label>
                          </td>
                          <td>
                          <select
                              id="q7"
                              value={formData.q7}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <label htmlFor="q8">
                            Do the conclusions provide insights or implications for future research or practice?
                            </label>
                          </td>
                          <td>
                          <select
                              id="q8"
                              value={formData.q8}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q9">
                            Is the paper well-written and organized?
                            </label>
                          </td>
                          <td>
                          <select
                             id="q9"
                              value={formData.q9}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q10">
                            Are the figures, tables, and other visuals clear and relevant?
                            </label>
                          </td>
                          <td>
                          <select
                              id="q10"
                              value={formData.q10}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="q11">
                            Plagarism Checker Result:- is it Original Content ?
                            </label>
                          </td>
                          <td>
                          <select
                             id="q11"
                              value={formData.q11}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="feedback">
                              Changes Need:
                            </label>
                          </td>
                          <td>
                          <select
                             id="q12"
                              value={formData.q12}
                              onChange={(e) =>
                                handleChange(e)
                              }
                              required
                            >
                              <option value="">Select</option>
                              <option value="minor">Minor Changes</option>
                              <option value="major">Major Changes</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="feedback">
                              Remarks (Up to 100 words):
                            </label>
                          </td>
                          <td>
                            <textarea
                              id="feedback"
                              value={formData.feedback}
                              onChange={(e) => handleChange(e)}
                              maxLength={100}
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2} style={{ textAlign: "center" }}>
                            <button className="button-mockpage" type="submit">
                              Submit
                            </button>
                          </td>
                        </tr>
                      </table>
                    </form>
                  </div>
        </div>
    </div>
  );
}

export default FeedBackPage;