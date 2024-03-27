import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Signup.css';
import '../style/general.css';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

 const Signup= () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    qualification: '',
    degree_pdf: null,
    isReviewer: 'none',
    specialistArea: 'none',
    agreeTerm: false,
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { id, value, type, checked, files,name } = e.target;
    //console.log(name+" "+ value);
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    try {
     
    
      const { data } = await toast.promise(
        axios.post('http://localhost:5000/api/v1/author/register', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
        {
          pending: "Register in progress...",
          success: "User Registered successfully",
          error: "Unable to Register user",
          loading: "Register in progress...",
        }
      );
      navigate('/login');
      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors, show an error message, etc.
    }
  };

  return (
    
    
      <section className="section-cta" id="cta">
        <div className="container_">
          <div className="cta">
            <div className="cta-text-box">
              <h2 className="heading-secondary">Join community</h2>
              <p className="cta-text">
                Discover a hub for academic excellence. Connect with experts, 
                submit with ease, and reach global readership—all in one place.
              </p>

              <form className="cta-form" name="sign-up" onSubmit={handleSubmit} >
                <div>
                  <label htmlfor="name">Full Name</label>
                  <input
                    className="input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label  htmlFor="email">Email address</label>
                  <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="label" htmlFor="password">
                  Password
                  </label>
                  <input
                    className="input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                 />
                </div>

                <div> 
                  <label className="label" htmlFor="qualification">
                    Qualification
                  </label>
                    <input
                      className="input"
                      type="text"
                      id="qualification"
                      name="qualification"
                      placeholder="Your Qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    />
                </div>

                <div>
                  <label className="label" htmlFor="degree_pdf">
                    Degree PDF
                  </label>
                    <input
                      className="input"
                      type="file"
                      id="degree_pdf"
                      name="degree_pdf"
                      onChange={handleChange}
                    />
                </div>

                <div>
                  <label className="label" htmlFor="isReviewer">
                    Are you a reviewer?
                  </label>
                    <select
                      className="input"
                      id="isReviewer"
                      name="isReviewer"
                      value={formData.isReviewer}
                      onChange={handleChange}>
                        <option value="none" selected disabled hidden>Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                <label className="label" htmlFor="specialistArea">
                  Specialist Area
                </label>
                  <select
                    className="input"
                    id="specialistArea"
                    name="specialistArea"
                    value={formData.specialistArea}
                    onChange={handleChange}
                  >
                    <option value="none" selected disabled hidden>Select</option>
                    <option value="ml">Machine Learning</option>
                    <option value="webdev">Web Development</option>
                    <option value="mechanical">Mechanical</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                
                <div>
                  <input
                    type="checkbox"
                    id="agree-term"
                    className="agree-term"
                    name="agreeTerm"
                    checked={formData.agreeTerm}
                    onChange={handleChange}
                  />
                  <label className="label-agree-term" htmlFor="agree-term">
                    <span></span>
                    I agree to all statements in{' '}
                    <Link to="#">Terms</Link>
                    <a className="term-service" href="#">
                      Terms of service
                    </a>
                  </label>
                </div>

                <button className="submit-button" type="submit">Register </button>

                
              </form>
            </div>
            <div
              className="cta-img-box"
              role="img"
              aria-label="Books photo"
            ></div>
          </div>
        </div>
      </section>
    //   <div className="container">
    //   <div className="form">
    //     <h2 className="form-title">Sign up</h2>
    //     <form className="form-content" onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <label className="label" htmlFor="name">
    //           Your Name
    //         </label>
            // <input
            //   className="input"
            //   type="text"
            //   id="name"
            //   name="name"
            //   placeholder="Your Name"
            //   value={formData.name}
            //   onChange={handleChange}
            // />
    //       </div>
    //       <div className="form-group">
    //         <label className="label" htmlFor="email">
    //           Your Email
    //         </label>
            // <input
            //   className="input"
            //   type="email"
            //   id="email"
            //   name="email"
            //   placeholder="Your Email"
            //   value={formData.email}
            //   onChange={handleChange}
            // />
    //       </div>
    //       <div className="form-group">
            // <label className="label" htmlFor="password">
            //   Password
            // </label>
            // <input
            //   className="input"
            //   type="password"
            //   id="password"
            //   name="password"
            //   placeholder="Password"
            //   value={formData.password}
            //   onChange={handleChange}
            // />
    //       </div>
    //       <div className="form-group">
            // <label className="label" htmlFor="qualification">
            //   Qualification
            // </label>
            // <input
            //   className="input"
            //   type="text"
            //   id="qualification"
            //   name="qualification"
            //   placeholder="Your Qualification"
            //   value={formData.qualification}
            //   onChange={handleChange}
            // />
    //       </div>
    //       <div className="form-group">
            // <label className="label" htmlFor="degree_pdf">
            //   Degree PDF
            // </label>
            // <input
            //   className="input"
            //   type="file"
            //   id="degree_pdf"
            //   name="degree_pdf"
            //   onChange={handleChange}
            // />
    //       </div>
    //       <div className="form-group">
            // <label className="label" htmlFor="isReviewer">
            //   Are you a reviewer?
            // </label>
            // <select
            //   className="input"
            //   id="isReviewer"
            //   name="isReviewer"
            //   value={formData.isReviewer}
            //   onChange={handleChange}
            // >
            //   <option value="yes">Yes</option>
            //   <option value="no">No</option>
            // </select>
    //       </div>
    //       <div className="form-group">
            // <label className="label" htmlFor="specialistArea">
            //   Specialist Area
            // </label>
            // <select
            //   className="input"
            //   id="specialistArea"
            //   name="specialistArea"
            //   value={formData.specialistArea}
            //   onChange={handleChange}
            // >
            //   <option value="ml">Machine Learning</option>
            //   <option value="webdev">Web Development</option>
            //   <option value="mechanical">Mechanical</option>
            //   {/* Add more options as needed */}
            // </select>
    //       </div>
    //       <div className="form-group checkbox-label">
            // <input
            //   type="checkbox"
            //   id="agree-term"
            //   className="agree-term"
            //   name="agreeTerm"
            //   checked={formData.agreeTerm}
            //   onChange={handleChange}
            // />
            // <label className="label-agree-term" htmlFor="agree-term">
            //   <span></span>
            //   I agree to all statements in{' '}
            //   <Link to="#">Terms</Link>
            //   <a className="term-service" href="#">
            //     Terms of service
            //   </a>
            // </label>
    //       </div>
    //       <div className="form-group">
            // <button className="submit-button" type="submit">
            //   Register
            // </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}
export default Signup;
