import React from "react";
import "../style//authors.css";
import PaperFormat from "./PaperFormat";

const Instructions = () => {
  return (
    <div className="authors-wrapper">
      <div className="authors-token">
        <h1>
          <i>
            <b>Paper Format</b>
          </i>
        </h1>
        <PaperFormat />
      </div>
      <div className="authors-token">
        <h1>
          <i>
            <b>Submission Guidelines</b>
          </i>
        </h1>
        <div className="description">
            <ol>
                <li>Submit your paper online by register yourself using the Register
                    link in the upper right corner.</li>
                <li>A Login ID and the Password will be send to your registered Email.</li>
                <li>Using this credentials, please login to your webpage using the Login link.</li>
                <li>Use the link Author (Submit paper) for paper submission.</li>
                <li>For new paper submission, use New Submission link. To see the status of your old papers, use My Submission link.</li>
                <li>Enter your details in the space given(first time only)</li>
                <li>Also you can enter the Co-Authors details (First Name, Last Name, Email, Country, Organization, webpage (if any)) by entering the number
                    of Co-authors (excluding you) in the space and click the ADD button.</li>
                <li>Enter Title, Keywords and Abstract of the paper.</li>
                <li>Upload your paper in the searchable pdf format without any author details in the paper.</li>
                <li>Finally click the submit button.</li>
                <li>Any time you can see the status of your papers using the My Submission link.</li>
                <li>After getting review comments from all the reviewers, resubmit the paper after doing modifications according to the comments.</li>
                <li>Once paper status is accepted then upload your camera ready final paper (see Paper Format) as an MS Word file.</li>
            </ol>
        </div>
        <div className="description">
        <h2><b>Note :</b></h2>
        All the submissions will be <b>Double Blind peer-reviewed</b> by the panel of experts associated with the particular field. Submitted 
        papers should meet the internationally accepted criteria and manuscripts should follow the style of the journal for the purpose of both reviewing and editing.
        </div>
      </div>
      

      <div className="authors-token">
        <h1>
          <i>
            <b>About Payment</b>
          </i>
        </h1>
        <div className="about-description">
            <h2><b>Publication Charges:</b></h2>
            <b>No Publication fee</b> is required for publishing the paper in our IJESACBT Journal. 
            Publication is done at the free of cost. <br /> <br />

            Suppose that the submitted paper is not in the prescribed form of the journal, 
            then article formatting <b>fee of Rs.2000/ $100 (INDIA/Abroad)</b> will be charged 
            from the authors, otherwise there is no fees for publication. <br /> <br />

            As IJESACBT is a <b>non-profitable </b>open access journal that act only as a bridge between 
            the authors and the readers, anyone can access the full version of the Published paper from 
            Volume 1(Year 2010) onwards.
        </div>
      </div>
      <div className="authors-token">
        <h1>
          <i>
            <b>Copyright claims</b>
          </i>
        </h1>
        <div className="description">
            <ul>
                <li>Any claims of copyright infringement should be addressed to the Editor bearing the subject line <b>"Copyright Infringement"</b>.</li>
                <li>The claim must be sufficed by documented evidence supporting the same version as being published or copyrighted or patented by the aggrieved 
                    party before the date of publication of the concerned IJESACBT article. On receipt of the claim, the IJESACBT Editorial Board, if found deemed, 
                    shall inform the IJESACBT author to provide an explanation; the discussion of which shall be transparent to both parties.</li>
                <li>The IJESACBT Board reserves the sole rights to decide the validity of any such claims. After deliberation, if the claim 
                    is found justified, the concerned manuscript will be removed from all IJESACBT archives and servers. In case, the 
                    changes required are minimal such as inclusion of references, the authors will be intimated to do the required 
                    amendments. The alternative version shall undergo peer-review as any other general submission and shall be published 
                    in the same issue(number) of the concerned volume.</li>
                <li>Any claims on copyright will be addressed with the highest priority. A revert mail will be dispatched within 3 working days 
                    provided the claim is supported with documented evidence.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
