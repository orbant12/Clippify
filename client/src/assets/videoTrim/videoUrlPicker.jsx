
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './global.css'
import 'firebase/functions';
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from '../../firebase';

function VideoUrlPicker({ showVideo, handleChange, children }) {

const [videoUrl, setVideoUrl] = useState('');
const [loading, setLoading] = useState(false);

const functions = getFunctions(app);


const handleUrlChange = async (event) => {
  const url = event.target.value;
  setVideoUrl(url);
};

const handleConvert = async () => {
  try {
    setLoading(true);
    const file = await fetch(videoUrl).then((response) => response.blob());
    // Create a file object with a random name
    const fileName = `video_${Math.floor(Math.random() * 100000)}.mp4`;
    const videoFile = new File([file], fileName, { type: 'video/mp4' });
    await handleChange(videoFile); // Pass the video file to the parent component
    
  } catch (error) {
    if(error.message === 'Failed to fetch'){
      alert('This Video protected by law and cannot be downloaded. Convert it to mp4 format and upload it !')
    }
    console.error('Error fetching or converting the video:', error);

  } finally {

    setLoading(false);
  }
};

return showVideo ? (

  <>
    {children}
  </>

) : (
  <div className={`url-picker`}>
    <TextField
      InputProps={{ crossOrigin: 'anonymous' }} 
      fullWidth
      className='txt-field'
      label="Paste Link"
      id="video-url"
      value={videoUrl}
      onChange={handleUrlChange}
    />
    <div id='conver-button-cont'onClick={handleConvert}>
        <div
          disabled={loading}
          className="convert-button"
        >
          {loading ? 'Loading...' : 'Convert'}
        </div>
    </div>
  </div>
);
}

export default VideoUrlPicker;