import React from "react";
import '../style/journalsubmisionform.css';

const PaperFormat = () =>{
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
          </div>
);    
};
export default PaperFormat;