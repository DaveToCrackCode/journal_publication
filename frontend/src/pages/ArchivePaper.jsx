import React,{useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import VolumeCard from '../component/VolumeCard';
import { useParams } from "react-router-dom";
const ArchivePaper = () => {
     const [paperData,setPaperData] = useState([]);
     let {vol,issu} = useParams();
    //  console.log(vol);
    //  console.log(issu);
     //console.log("archive");
    const fetchPaper = async()=>{
        try {
            const params = {
                vol: vol,
                issu: issu
              };
            const response = await axios.get('http://127.0.0.1:5000/api/v1/public/get-archive-paper',{ params });
        // console.log(response);
          if (response.status === 200) {
            console.log(response.data.data);
            setPaperData(response.data.data);
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
        fetchPaper();
    },[])
  return (
    <div style={{display:"flex", flexWrap:"wrap"}}>
      <h1>Archive Paper</h1>
    </div>
  );
}

export default ArchivePaper ;