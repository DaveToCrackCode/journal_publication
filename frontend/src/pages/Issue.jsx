import React,{useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import IssueCard from '../component/IssueCard';
import { useParams } from "react-router-dom";

const Issue = () => {
     const [issueData,setIssueData] = useState([]);
     let {vol} = useParams();
    const fetchIssue = async()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/public/get-issue-data/${vol}`);
        // console.log(response);
          if (response.status === 200) {
            //console.log(response.data.data);
            setIssueData(response.data.data);
            toast.success('Volume Data Fetched  Successfully');
          } else if(response.status === 201){
            toast.error("Volume not Present");
          }
          else {
            toast.error('Failed to Fetch data');
          }

        } catch (error) {
            toast.error('Failed to Fetch data');
        }
    } 
    useEffect(()=>{
        fetchIssue();
    },[])
  return (
    <div style={{display:"flex", flexWrap:"wrap"}}>
      {issueData.map((item) => (
          <IssueCard key={item} issue={item} volume={vol} />
        ))}  
    </div>
  );
}

export default Issue;