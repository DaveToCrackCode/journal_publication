import React from 'react'
import Info from './Info'
import '../style/home.css'; // Assuming your CSS file is in the 'styles' folder
import '../style/general.css';
import '../style/queries.css';
import cust1 from '../img/customers/customer-1.jpg';
import cust2 from '../img/customers/customer-2.jpg';
import cust3 from '../img/customers/customer-3.jpg';
import cust4 from '../img/customers/customer-4.jpg';
import cust5 from '../img/customers/customer-5.jpg';
import cust6 from '../img/customers/customer-6.jpg';
import jrnl from '../img/journal.webp';
import jrnl_min from '../img/journal-min.png';
import screen1 from '../img/app/app-screen-1.png';
import screen2 from '../img/app/app-screen-2.png';
import screen3 from '../img/app/app-screen-3.png';
import screen4 from '../img/app/app-screen-4.png';
import screen5 from '../img/app/app-screen-5.png';


const Home = () => {
  return (
    <>
      
      <section className="section-hero">
        <div className="hero">
          <div className="hero-text-box">
            <h1 className="heading-primary">
             Welcome to IJESACBT!
            </h1>
            <p className="hero-description">
              The smart platform where you can publish your journal with added Reviewers And
              after successfully reviewed it will be published.
            </p>
            {/* <Link className="main-nav-link" to="/" }>Home</Link> */}
            <a href="/about" className="btn btn--full margin-right-sm" >About IJESACBT</a>

            <a href="#how" className="btn btn--outline">Learn more &darr;</a>
            <div className="delivered-meals">
              <div className="delivered-imgs">
                <img src={cust1} alt="Customer photo" />
                <img src={cust2} alt="Customer photo" />
                <img src={cust3} alt="Customer photo" />
                <img src={cust4} alt="Customer photo" />
                <img src={cust5} alt="Customer photo" />
                <img src={cust6} alt="Customer photo" />
              </div>
              <p className="delivered-text">
                <span>xyz+</span> Journals published last year!
              </p>
            </div>
          </div>
          <div className="hero-img-box">
            <picture>
              <source srcset={jrnl} type="image/webp" />
              <source srcset={jrnl_min} type="image/png" />

              <img
                src={jrnl_min}
                className="hero-img"
                alt="Journals from different streams!"
              />
            </picture>
          </div>
        </div>
      </section>
      
    <main>    
      <section className="section-how" id="how">

    <div className="container_">
      <span className="subheading">How it works</span>
      <h2 className="heading-secondary">
        Procedure involves following steps.
      </h2>
    </div>

    <div className="container_ grid grid--2-cols grid--center-v">
      {/* <!-- STEP 01 --> */}
      <div className="step-text-box">
        <p className="step-number">01</p>
        <h3 className="heading-tertiary">
          Submission by Author:
        </h3>
        <p className="step-description">
          Authors submit their manuscripts through the journal's website. 
          They provide necessary details 
          such as title, abstract, keywords, and the full manuscript.
        </p>
      </div>

      <div className="step-img-box">
        <img
          src={screen1}
          className="step-img"
          alt="Submission by author selection screen"
        />
      </div>

      {/* <!-- STEP 02 --> */}
      <div className="step-img-box">
        <img
          src={screen2}
          className="step-img"
          alt="Assignment of Reviewers screen"
        />
      </div>
      <div className="step-text-box">
        <p className="step-number">02</p>
        <h3 className="heading-tertiary">Assignment of Reviewers:</h3>
        <p className="step-description">
          The editor selects potential reviewers based on their expertise in 
          the subject matter of the manuscript.
          Reviewers are usually experts in the field who are invited to review the manuscript. 
          They may accept or decline the invitation based on their availability and expertise.
        </p>
      </div>

      {/* <!-- STEP 03 --> */}
      <div className="step-text-box">
        <p className="step-number">03</p>
        <h3 className="heading-tertiary">Peer Review Process:</h3>
        <p className="step-description">
          Reviewers evaluate the manuscript for its originality, significance, methodology, validity of findings, clarity of presentation, and adherence to ethical guidelines.
          Reviewers provide constructive feedback and recommendations for improvements.
          Typically, reviewers submit their comments and recommendations 
          confidentially to the editor through the journal's online submission system.
        </p>
      </div>
      <div className="step-img-box">
        <img
          src={screen3}
          className="step-img"
          alt="Peer Review Process screen"
        />
      </div>

      {/* <!-- STEP 04 --> */}
      <div className="step-img-box">
        <img
          src={screen4}
          className="step-img"
          alt="Decision by Editor screen"
        />
      </div>
      <div className="step-text-box">
        <p className="step-number">04</p>
        <h3 className="heading-tertiary">Decision by Editor:</h3>
        <p className="step-description">
          Based on the feedback from reviewers, the editor makes a decision on the manuscript.
          Possible decisions include:
          Acceptance: The manuscript is accepted for publication with or without revisions.
          Revision Required: The manuscript needs minor or major revisions before it can be accepted.
          Rejection: The manuscript does not meet the journal's standards and is rejected.
        </p>
      </div>

      {/* <!-- STEP 05 --> */}
      <div className="step-text-box">
        <p className="step-number">05</p>
        <h3 className="heading-tertiary">Revision and Publication:</h3>
        <p className="step-description">
          After receiving feedback from reviewers, authors revise their 
          manuscripts as needed. Upon resubmission, the editor evaluates the 
          revisions and decides whether the manuscript meets the journal's standards 
          for publication. Accepted manuscripts undergo final preparation, such 
          as copyediting and formatting, before being published either online 
          or in print. This process ensures that high-quality research is disseminated to  
          the academic community, advancing knowledge in the field.
        </p>
      </div>
      <div className="step-img-box">
        <img
          src={screen5}
          className="step-img"
          alt="Revision and Publication: screen"
        />
      </div>
    </div>
  </section>
  </main>
  
    
      <Info/>
    
    </>
  )
}

export default Home
