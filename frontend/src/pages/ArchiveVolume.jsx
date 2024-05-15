import React,{useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import VolumeCard from '../component/VolumeCard';
import '../style/volumecard.css';

const ArchiveVolume = () => {
     const [volumeData,setVolumeData] = useState([]);
    const fetchVolume = async()=>{
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/v1/public/get-archive-data');
        // console.log(response);
          if (response.status === 200) {
            //console.log(response.data.data);
            setVolumeData(response.data.data);
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
        fetchVolume();
    },[])
  return (
    <div className='archive-wrapper'>
      {volumeData.map((vol) => (
          <VolumeCard key={vol._id} volume={vol.volume} />
        ))}  
    </div>
  );
}

export default ArchiveVolume;