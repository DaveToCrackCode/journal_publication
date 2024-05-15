import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useParams } from "react-router-dom";
import "../style/volumecard.css";


const ArchivePaper = () => {
  const [paperData, setPaperData] = useState([]);
  let { vol, issu } = useParams();
  //  console.log(vol);
  //  console.log(issu);
  //console.log("archive");
  const fetchPaper = async () => {
    try {
      const params = {
        vol: vol,
        issu: issu
      };
      const response = await axios.get('http://127.0.0.1:5000/api/v1/public/get-archive-paper', { params });
      // console.log(response);
      if (response.status === 200) {
        console.log(response.data.data);
        setPaperData(response.data.data);
        toast.success('Issue Fetched  Successfully');
      } else if (response.status === 201) {
        toast.error("Issue not Present");
      }
      else {
        toast.error('Failed to Fetch data');
      }

    } catch (error) {
      toast.error('Failed to Fetch data');
    }
  }
  useEffect(() => {
    fetchPaper();
  }, [])
  return (
    <>
      {paperData.map((paper) => (
        <Link to={`/archive/${vol}/${issu}/${paper._id}`} style={{ textDecoration: "none" }} className='archive-wrapper'>
     
            <table className='archive_issue'>
              <tr>
                <th colSpan={4}><h2>{paper.title}</h2></th>
              </tr>

              <tr>
                <td>- {paper.author}</td>
              </tr>
              <tr>
                <td>Volume: {paper.volume}</td>
                <td>Issue: {paper.issue}</td>
                <td>Page: {paper.pageNumber}</td>
                <td>Published: {paper.date}</td>
              </tr>
            </table>
     
        </Link>
      ))}
    </>
  );
}

export default ArchivePaper;