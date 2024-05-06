import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import "../../style/feedbackPage.css"

const FeedBackPage = () => {
    const navigate = useNavigate();
    const [communication, setCommunication] = useState(0);
    const [knowledge, setKnowledge] = useState(0);
    const [confidence, setConfidence] = useState(0);
    const [takenInterview, setTakenInterview] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleFeedback = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
        const formData = {
          communication,
          knowledge,
          confidence,
          takenInterview,
          feedback,
        };
    
    
        try {
          const { data } = await toast.promise(
            axios.post("http://127.0.0.1:5000/api/mock/feedback", 
            formData, config),
            {
              pending: "Feedback Submission in progress...",
              success: "Feedback Submitted successfully",
              error: "Unable to Submit Feedback",
              loading: "Submission in progress...",
            }
          );
          console.log("feedback submission");
          navigate("/");
          // Handle success, redirect, or show a success message
        } catch (error) {
          console.error("Error submitting feedback form:", error);
          // Handle errors, show an error message, etc.
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
                            <label htmlFor="communication">
                            Is the abstract concise and informative, summarizing the key findings and significance of the research?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Are the research methods appropriate for addressing the research question?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="knowledge">
                            Is the research question or objective clearly stated?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Are potential biases or limitations of the methodology addressed?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Are the results presented clearly and logically?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Are appropriate statistical analyses used, and are the results statistically significant?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Are potential biases or limitations of the methodology addressed?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Do the conclusions provide insights or implications for future research or practice?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Is the paper well-written and organized?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Are the figures, tables, and other visuals clear and relevant?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                            <label htmlFor="communication">
                            Plagarism Checker Result:- is it Original Content ?
                            </label>
                          </td>
                          <td>
                          <select
                              id="takenInterview"
                              value={takenInterview}
                              onChange={(e) =>
                                setTakenInterview(e.target.value)
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
                              Remarks (Up to 100 words):
                            </label>
                          </td>
                          <td>
                            <textarea
                              id="feedback"
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
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