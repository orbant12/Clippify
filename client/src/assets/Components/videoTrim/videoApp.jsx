
import { useState, useEffect} from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg/src/index.js"
import * as helpers from "./utils/helpers";
import VideoFilePicker from "./videoFilePicker";
import OutputVideo from "./videoPlayer";
import OutputVideo2 from "./outputNoDown"
import RangeInput from "./videoRangeInput";
import Form from 'react-bootstrap/Form';
import './global.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useAuth} from "../../../context/UserAuthContext";
import { ApiLocataion } from "../../../firebase";
//FMPEG SETUP
const FF = createFFmpeg({
    log: true,
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

  (async function () {
    await FF.load();
  })();
  

function VideoApp({
  fileImage,
  videoURL,
  setExtractMeta,
  setPassedAudioDataUrl,
  subscriptionState,
  handleTitleInput,
  handleTagInput,
  stageTrackerPassed,
}) {

//<==================================VARIABLES=============================================>

//VIDEO META DATA
const [inputVideoFile, setInputVideoFile] = useState(null);
const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
const [trimIsProcessing, setTrimIsProcessing] = useState(false);
const [videoMeta, setVideoMeta] = useState(null);
const [URL, setURL] = useState(null);

//TIMELINE RANGE LOGIC
const [rStart, setRstart] = useState(0); // 0%
const [rEnd, setRend] = useState(10); // 10%

//THIMBNAILS
const [thumbnails, setThumbnails] = useState([]);
const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);

//LOGIC UX
const [show,setShow]=useState(true)
const [showBtn,setShowBtn]=useState(true)
const [saveBtn,setSaveBtn]=useState(true)
const [videoAppShow,setVideoAppShow]=useState(true)
const [addedShow,setAddedShow]=useState(true)
const [deletedState,setDeletedState]=useState(true)
const [loadingText, setLoadingText] = useState("Loading...");

//MEDIA TITLE
const [mediaTitle,setMediaTitle] = useState("Untitled")

//USER TAGS
const [isNewTagAddActive, setNewTagAddActive] = useState(false)
const [newTagInput, setNewTagInput] = useState("")
const [userTags, setUserTags] = useState([])
const [selectedTag,setSelectedTag] = useState("")

const { currentuser } = useAuth();

//<==================================FUNCTIONS=============================================>

const fetchUserTags = async () => {
  if(currentuser){
    //FETCH TAGS
    const userSnapshot = await fetch(`${ApiLocataion}/user/tags/${currentuser.uid}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    });
    if(userSnapshot.status === 200){
      const elementData = await userSnapshot.json();
      setUserTags(elementData)
    }
  }
}

//UPDATE THE NUM OF ELEMENTS IN FOLDER
useEffect(() => {
  if (currentuser){
    fetchUserTags()
  }
}, [currentuser]);

useEffect(() => {
  if(stageTrackerPassed == 1){
    setVideoAppShow(true)
  }
  if(stageTrackerPassed == 2){
    setMediaTitle("Untitled")
    setInputVideoFile(null)
    setURL(null)
    setTrimmedVideoFile(null)
    setVideoMeta(null)
  }
}, [stageTrackerPassed]);

const handleChange = async (e) => {
  let file = e.target.files[0];
  console.log(file);
  setInputVideoFile(file);
  setDeletedState(true);
  setURL(await helpers.readFileAsBase64(file));
};
  
const handleUpdateRange = (func) => {
    return ({ target: { value } }) => {
      func(value);
    };
};
  
const getThumbnails = async ({ duration }) => {
  if (!FF.isLoaded()) await FF.load();
  setThumbnailIsProcessing(true);
  setShowBtn(false);
  let MAX_NUMBER_OF_IMAGES = 15;
  let offset =
    duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / MAX_NUMBER_OF_IMAGES;
  let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
  FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
  const arrayOfImageURIs = [];
  for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
    let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));
    if (startTimeInSecs + offset > duration && offset > 1) {
          offset = 0;
    }
    try {
      await FF.run(
            "-ss",
            startTimeInSecs,
            "-i",
            inputVideoFile.name,
            "-t",
            "00:00:1.000",
            "-vf",
            `scale=150:-1`,
            `img${i}.png`
      );
      const data = FF.FS("readFile", `img${i}.png`);
      let blob = new Blob([data.buffer], { type: "image/png" });
      let dataURI = await helpers.readFileAsBase64(blob);
      arrayOfImageURIs.push(dataURI);
      FF.FS("unlink", `img${i}.png`);
    } catch (error) {
      console.log({ message: error });
    }
  }
  getFirstFrameImageURL();
  setThumbnailIsProcessing(false);
  return arrayOfImageURIs;
};

const getFirstFrameImageURL = async () => {
  if (!FF.isLoaded()) await FF.load();
  const startTimeInSecs = "00:00:00.005"; // You may need to adjust this time offset.
  FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

  try {
    console.log(`Generating the first frame`);
    await FF.run(
          "-ss",
          startTimeInSecs,
          "-i",
          inputVideoFile.name,
          "-t",
          "00:00:1.000",
          "-vf",
          "scale=150:-1",
          "firstFrame.png"
    );
    const data = FF.FS("readFile", "firstFrame.png");
    let blob = new Blob([data.buffer], { type: "image/png" });
    // Convert the Blob to a data URL
    const dataURI = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    FF.FS("unlink", "firstFrame.png");  
    fileImage(dataURI)
    return dataURI;
  } catch (error) {
    console.error(`Error generating the first frame:`, error);
    return null; // Handle the error gracefully
  }
};

const handleLoadedData = async (e) => {
  const el = e.target;
  const meta = {
    name: inputVideoFile.name,
    duration: el.duration,
    videoWidth: el.videoWidth,
    videoHeight: el.videoHeight,
  };
  console.log({ meta });
  setVideoMeta(meta);
  const thumbnails = await getThumbnails(meta);
  setThumbnails(thumbnails);
};

const toggleVideoApp = async () => {
  setVideoAppShow(false);
  setSaveBtn(true);
  setAddedShow(false);
}

const deleteAction = async () => {
  setVideoAppShow(true);
  setShow(true)
  setAddedShow(true);
  setInputVideoFile(null);
  setDeletedState(false);
  setTrimmedVideoFile(null);
  uploadProvided(true);
}

const handleAudioTrim = async () => {
  let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
  let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
  try {
    FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
    await FF.run(
          "-ss",
          helpers.toTimeString(startTime),
          "-i",
          inputVideoFile.name,
          "-map",
          "0:a:0", // Select the first audio stream
          "-vn", 
          "-t",
          helpers.toTimeString(offset),
          "-acodec",
          "libmp3lame",
          "audio.mp3"
    );
    const data = FF.FS("readFile", "audio.mp3");
    console.log(data);
    setPassedAudioDataUrl(data)
  } catch (error) {
    console.log(error);
  } 
};

const setVideoSize = async (data) => {
  const videoSizeInBytes = new Blob([data.buffer], { type: "video/mp4" }).size;
  const videoNameFile = inputVideoFile.name
  const startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
  const offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
  //Meta Data
  const extractedMeta = {
    videoName: videoNameFile,
    videoDuration: (offset / 60).toFixed(0),
    videoDurationString: helpers.toTimeString(offset),
    videoSize: videoSizeInBytes,
  }
  console.log(extractedMeta)
  setExtractMeta(extractedMeta)      
};

const handleTrim = async () => {
  let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
  let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
  const offsetLenght = (offset / 60).toFixed(0);
   
  if(10 > offset > 5){
    setLoadingText(`Your Video is ${(offset / 60).toFixed(0)} Minutes => Process Time May Take About 30 secounds`)
  }else if (offset > 10){
    setLoadingText(`Your Video is ${(offset / 60).toFixed(0)} Minutes => Process Time May Take About 45 secounds`)
  }else if (offset < 5){
    setLoadingText(`Your Video is ${(offset / 60).toFixed(0)} Minutes => Process Time May Take About 15 secounds`)
  }else{
    setLoadingText(`Loading...`)
  }

  //if(subscriptionState == true){
      setTrimIsProcessing(true);
      setShow(false);
      if(deletedState == false){
        setDeletedState(!deletedState)
      }
      setShowBtn(true);
      setSaveBtn(false);
      try {
        FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
        await FF.run(
          "-ss",
          helpers.toTimeString(startTime),
          "-i",
          inputVideoFile.name,
          "-t",
          helpers.toTimeString(offset),
          "-c:v",
          "copy",
          "ping.mp4"
        );
        const data = FF.FS("readFile", "ping.mp4");
        console.log(data);
        // EXTRACT SIZE
        await setVideoSize(data);
        const dataURL = await helpers.readFileAsBase64(
          new Blob([data.buffer], { type: "video/mp4" })
        );
        await handleAudioTrim()
        //SAVE THE URL
        videoURL(dataURL)
        //VIdeo File
        setTrimmedVideoFile(dataURL);
           
      } catch (error) {
        console.log(error);
      } finally {
        setTrimIsProcessing(false);
      }
  // }else if (subscriptionState == false && offsetLenght < 10) {
  //     setTrimIsProcessing(true);
  //     setShow(false);
  //     if(deletedState == false){
  //       setDeletedState(!deletedState)
  //     }
  //     setShowBtn(true);
  //     setSaveBtn(false);
  //     try {
  //       FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
  //       await FF.run(
  //         "-ss",
  //         helpers.toTimeString(startTime),
  //         "-i",
  //         inputVideoFile.name,
  //         "-t",
  //         helpers.toTimeString(offset),
  //         "-c:v",
  //         "copy",
  //         "ping.mp4"
  //       );
  //       const data = FF.FS("readFile", "ping.mp4");
  //       console.log(data);
  //       // EXTRACT SIZE
  //       await setVideoSize(data);

  //       const dataURL = await helpers.readFileAsBase64(
  //         new Blob([data.buffer], { type: "video/mp4" })
  //       );
  //         //SIZE
      
  //       await handleAudioTrim()
     
  //       //SAVE THE URL
  //       videoURL(dataURL)
  //       //VIdeo File
  //       setTrimmedVideoFile(dataURL);
      
             
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setTrimIsProcessing(false);
  //     }
  // }else{
  //   alert("Please Subscribe to Trim Videos Longer Than 10 Minutes")
  // }
};

/*HANDLE BACK FUNCTION -- Not in production since 2024.04.08*/

/*const HandleBack = () => {
  setShow(!show)
  setDeletedState(!deletedState)
  setBackState(true)
}*/



const handleMediaTitle = (event) => {
  setMediaTitle(event.target.value);
  handleTitleInput(event.target.value)
}

const handleMediaTag = (event) => {
  setSelectedTag(event.target.value)
  handleTagInput(event.target.value)
}

const handleCreateTag = async () => {
  const userAddedTag = newTagInput;
  if(currentuser){
    const response = await fetch(`${ApiLocataion}/user/tags/create`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId: currentuser.uid,
        tagName: [...userTags,userAddedTag]
      }),
    })
    if(response.status == 200){
      fetchUserTags()
      console.log(response)
      setNewTagAddActive(false)
      setNewTagInput("")
    }
  }
}

return (
<div className="upload">
  {videoAppShow?<main className="App">
    {<div className="range-picker">
      {deletedState?
        <RangeInput
          rEnd={rEnd}
          rStart={rStart}
          handleUpdaterStart={handleUpdateRange(setRstart)}
          handleUpdaterEnd={handleUpdateRange(setRend)}
          loading={thumbnailIsProcessing}
          videoMeta={videoMeta}
          thumbNails={thumbnails}
        />:null
      }      
    </div>}
     
  <section className="deck">
    <article className="grid_txt_2">
        {trimIsProcessing ? <h4>{loadingText}</h4>: null}
        {/*If show is True --> VIDEO-FILE-PICKER --> If Video Put then Video Frame --> Auto Run Range Selector */}

        {show?
          <VideoFilePicker
            handleChange={handleChange}
            showVideo={!!inputVideoFile}
          >
            <div className="bord_g_2 p_2">
              <video
                src={inputVideoFile ? URL : null}
                autoPlay
                controls
                muted
                onLoadedMetadata={handleLoadedData}
                crossOrigin="anonymous"
              >
              </video>
            </div>
          </VideoFilePicker>:null
        }
            
    </article>
        {deletedState?
          <OutputVideo
            videoSrc={trimmedVideoFile}
          />:null
        }
  </section>
      
  </main>:null
  }
    {!showBtn?
      <div className="btn-container">
        <div
          onClick={handleTrim}
          className="btn2 btn_b2"
          disabled={trimIsProcessing}
        >
          {trimIsProcessing ? "Loading..." : "Clip"}
          {thumbnailIsProcessing ? " Loading...":""}
        </div>
      </div>:null
    }
          
    {!saveBtn?
      <div className="btn-container">
        <div
          onClick={toggleVideoApp}
          className="btn2 btn_b2"
          disabled={trimIsProcessing}
        >
          {trimIsProcessing ? "loading..." : "Save"}

        </div>

      </div>:null
    }

    {!addedShow?
      <div className={localStorage.getItem('theme') == "dark"?('added-dark'):("added-light")}>
        <OutputVideo2 videoSrc={trimmedVideoFile} />
        <HighlightOffIcon className="added-delete-btn" onClick={deleteAction}/>
        <div style={{marginTop:15}}>
        <label htmlFor="">Title</label>
        <Form.Control size="lg" onChange={(e) => handleMediaTitle(e)} value={mediaTitle} type="text" placeholder="Untitled" />
        </div>
      
        <div style={{marginTop:10}}>
        <hr />
        <label htmlFor="">Add Tags</label>
        <Form.Select className={localStorage.getItem('theme') == "dark"?('tag-field-dark'):("tag-field-light")} onChange={(e) => handleMediaTag(e)} aria-label="Default select example">
          {userTags.length != 0 ?(
            userTags.map((tag) => (
              <option value={tag}>{tag}</option>
            ))
          ):null}
        </Form.Select>
        </div>

        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginRight:"auto",marginLeft:"auto"}}>
          {!isNewTagAddActive?(
            <>
              <h6 onClick={()=> setNewTagAddActive(true)} className={localStorage.getItem('theme') == "dark"?('tag-add-btn-dark'):("tag-add-btn-light")}>+ Add New Tag</h6>
            </>
          ):(
            <div className={localStorage.getItem('theme') == "dark"?('add-your-tag-dark'):("add-your-tag-light")}>
              <h6>Add your own Tag</h6>
              <input type="text" value={newTagInput} onChange={(e) => setNewTagInput(e.target.value)} />
              <h5 className={localStorage.getItem('theme') == "dark"?('tag-add-btn-dark'):("tag-add-btn-light")} onClick={handleCreateTag}>+ Create</h5>
              <h1 onClick={()=> setNewTagAddActive(false)}>X</h1>
            </div>
          )}
          
        </div>
      </div>:null        
    }
</div>
);
}

export default VideoApp
  