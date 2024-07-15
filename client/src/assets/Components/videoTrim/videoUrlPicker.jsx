
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './global.css'
import 'firebase/functions';
import { ApiLocataion } from '../../../firebase';

function VideoUrlPicker({ showVideo, handleChange, children }) {

//<==================================VARIABLES=============================================>

const [videoUrl, setVideoUrl] = useState('');
const [loading, setLoading] = useState(false);

//<==================================FUNCTIONS=============================================>

const handleUrlChange = async (event) => {
  const url = event.target.value;
  setVideoUrl(url);
};

const handleConvert = async () => {
  try {
    setLoading(true);
    //REQUEST MODE TO "NO-CORS" TO AVOID CORS ERROR
    const youtubeMP4_response = await fetch(`${ApiLocataion}/youtube-mp4`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoUrl }),
    });

    if (!youtubeMP4_response.ok) {
        throw new Error('Failed to fetch MP4 file');
    }

    // Retrieve the response body as an ArrayBuffer
    const arrayBuffer = await youtubeMP4_response.arrayBuffer();

    // Create a Blob from the ArrayBuffer
    const mp4Blob = new Blob([arrayBuffer], { type: 'video/mp4' });

    // Now you can use the mp4Blob as needed, for example, you can create a File object from it
    const fileName = `video_${Math.floor(Math.random() * 100000)}.mp4`;
    const mp4File = new File([mp4Blob], fileName, { type: 'video/mp4' });

    // Pass the video file to the parent component if needed
    await handleChange(mp4File);
    
  } catch (error) {
    if(error.message === 'Failed to fetch'){
      alert(error)
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
  <div className={localStorage.getItem('theme') == "dark" ?(`url-picker-dark`):('url-picker-light')}>
    <h5>Insert your Video URL</h5>
    <input type="text"
      value={videoUrl}
      onChange={handleUrlChange}
      placeholder='URL here ...'
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