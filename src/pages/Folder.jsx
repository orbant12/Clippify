//REACT & Contexts
import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';

//FIREBASE
import { ref, uploadString, getDownloadURL, uploadBytes,deleteObject} from 'firebase/storage';
import {v4} from "uuid";
import { app,storage } from "../firebase";
import { getFirestore,doc, collection, getDoc,setDoc,getDocs,deleteDoc} from  'firebase/firestore';

//ASSETS
import VideoApp from "../assets/videoTrim/videoApp";
import VideoUrlApp from "../assets/videoTrim/videoUrlApp";
import ZeroWidthStack from "../assets/FileAdd/featureSelect";
import BasicSpeedDial from "../assets/FileAdd/addBtn"
import FileCard from "../assets/FileAdd/fileCard";
import MultipleSelectCheckmarks from '../assets/FileAdd/tagbar'
import TextFieldFile from '../assets/FileAdd/textField'
import DividerStack from "../assets/FileAdd/fileAddCards";
import DelayingAppearance from "../assets/FileAdd/LoadingBtn";
//MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

//ICONS
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

//CSS
import '../Css/folder.css';


function Folder({folderURL}) {

//COMMON VARIABLES
const db = getFirestore(app);
const navigate  = useNavigate()
const { currentuser } = useAuth();
const { id } = useParams();
const folderID = id

//MODAL ACTIVITY
const [isActive, setIsActive] = useState(false);
const [isLinkActive, setIsLinkActive] = useState(false);
const [isUploadActive, setIsUploadActive] = useState(false);
const [selectedPopUp, setSelectedPopUp] = useState(null);

//CURRENT ELEMENTS IN ARRAY
const [folderElements, setFolderElements] = useState([]);
const [userData,setUserData] = useState([])

//CREATE BTN AND EDITING ON MODAL
const [isAddedOn, setIsAddedOn] = useState(false);
const [isEditing, setIsEditing] = useState(false);

//FILE CREATION
const [userFile, setUserFile] = useState([]);
const [fileTitle , setFileTitle] = useState("Untitled")
const [fileImage, setFileImage] = useState("")
const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
const [audioFile, setAudioFile] = useState(null);
const [metaData, setMetaData] = useState(null)
const [tag,setTag] = useState("")

//Provided LINK/FILE
const [linkProvided, setLinkProvided] = useState(true);
const [uploadProvided, setUploadProvided] = useState(true);
const [newTitle, setNewTitle] = useState(folderElements.title);


useEffect(() => {
if (currentuser){
  if(folderElements.length !== 0){


  const currentUserId = currentuser.uid;
  const urlID = id;
  const folderRef = doc(db,"users",currentUserId,"File-Storage",urlID)
  const newFolder = {
    title: folderElements.title,
    color: folderElements.color,
    id: folderElements.id,
    files_count: userFile.length,
  };

  setDoc(folderRef,newFolder)
    .then(() => {
      console.log("File added to the Folder")
    })
  }
}
}, [userFile]);


const fetchData = async () => {
  try {
    if (currentuser) {
      const currentUserId = currentuser.uid;
      const urlID = id;
      // USER ID & FIRESTORE REF     
      const userDocRef = doc(db, "users", currentUserId);
      const folderElementRef = doc(userDocRef, "File-Storage", urlID);  
      // Folder ELEMENT FETCH
      const userSnapshot = await getDoc(userDocRef);
      const docSnapshot = await getDoc(folderElementRef);
      if (docSnapshot.exists()) {
        // Document exists, retrieve its data
        const elementData = docSnapshot.data();
        setFolderElements(elementData);
        setNewTitle(elementData.title);
      } else {
        console.log("Document does not exist.");
        setFolderElements(null);
      };
      if (userSnapshot.exists()) {
        // Document exists, retrieve its data
        const elementUserData = userSnapshot.data();
        setUserData(elementUserData)
      } else {
        console.log("Document does not exist.");
        setUserData(null); // Set to null or handle accordingly
      }
    };
  } catch (error) {
    console.error("Error getting document: ", error);
    window.location.href = "/";
  };
};

//USEEFFECT TO FETCH ELEMENTS.______________________________//
useEffect(() => {

  //UPDATES DISPLAY DEPENDING ON USER "FILE-Storage" DOCS
  if (!currentuser) {
    // No user is logged in, clear the folders
    setUserFile([]);
    return;
  };
  //USER ID & STORAGE REF
  const currentUserId = currentuser.uid;
  const urlID = id; 
  const colRef = collection(db, "users", currentUserId, "File-Storage",urlID,"Files");
  //FETCH AND DISPLAY FOLDER ELEMENTS
  getDocs(colRef)
  .then((querySnapshot) => {
    const userFiles = [];
    querySnapshot.forEach((doc) => {
        userFiles.push({ id: doc.id, ...doc.data() });
    });
    setUserFile(userFiles);
  })
  .catch((error) => {
    console.error("Error fetching user folders: ", error);
  });

  folderURL(folderID);
  // Call fetchData
  fetchData();
}, [id, currentuser]);

// MODAL POP UP LOGIC_________________//
const togglePopup = () => {
  setIsActive(!isActive);
};

// HANDLE SUBMIT
function handleSubmit(e) {
  e.preventDefault();
  togglePopup();
};

// SELECT POP UP LOGIC
const pickedPopup = () => {
  if (selectedPopUp == 1) {
    togglePopup();
    setIsUploadActive(!isUploadActive)
  } else if (selectedPopUp == 0) {
    togglePopup();
    setIsLinkActive(!isLinkActive)
  };
};

//SAVING FILE TO FIRESTORE._____________________//
const createFile = async () => {
  if (currentuser && metaData.videoDuration < 10 && userData.subscription == false) {
    const currentUserId = currentuser.uid;
    const urlID = id;
    const docRef = collection(db, "users", currentUserId, "File-Storage",urlID,"Files");
    const userRef = doc(db,"users",currentUserId)
    const folderFiles = doc(docRef)
    // STORAGE
    const audioMetadata = {
      contentType: 'audio/mp3',
    };
    // FILE NAME
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    // PATH NAME
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + folderElements.id + "/" + folderFiles.id + "/" + metaName}`;
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + folderElements.id + "/" + folderFiles.id + "/" + audioName}`;
    // STORAGE REF
    const videoRef = ref(storage, storagePathVideo);
    const audioRef = ref(storage, storagePathAudio);
    // UPLOAD TO STORAGE
    await uploadString(videoRef, trimmedVideoFile,'data_url',metaData)
    await uploadBytes(audioRef, audioFile,audioMetadata)
    // VIDEO URL
    const storageURL =  await getDownloadURL(videoRef);
    console.log("Video Uploaded")
    // Title
    const userFileTitle = fileTitle
    // Image URL
    const userFileImage = fileImage
    // TAG NAME 
    const userTag = tag
    //VIDEO SIZE
    const videoSize = metaData.videoSize 
    // DURATION

    const userVideoURL = storageURL

    // SET NEW FILE 
    const newFile = {
      content:"",
      title: userFileTitle,
      img: userFileImage,
      url: userVideoURL,
      id: folderFiles.id,
      folder_id: folderID,
      tag: userTag,
      duration: metaData.videoDurationString,
      storage_path_video: storagePathVideo,
      storage_path_audio: storagePathAudio,
      transcription:"",
      related_count: 0,
      video_size: videoSize
    };

    //UPDATE LOCAL SCREEN
    setDoc(folderFiles, newFile)
    .then(() => {
      setUserFile((currentFolders) => [
      ...currentFolders,
      { id: folderFiles.id, ...newFile },
      console.log(userFile)
      ]);
    });

    const newData = {
      id: userData.id,
      fullname: userData.fullname,
      email: userData.email,
      subscription: userData.subscription,
      storage_take: userData.storage_take + videoSize,
      profilePictureURL: userData.profilePictureURL,
      user_since: userData.user_since,
    }
    
    setDoc(userRef,newData)
    console.log("recent sett succ")

    await fetchData()

  } else if(currentuser && userData.subscription == true) {
     const currentUserId = currentuser.uid;
    const urlID = id;
    const docRef = collection(db, "users", currentUserId, "File-Storage",urlID,"Files");
    const userRef = doc(db,"users",currentUserId)
    const folderFiles = doc(docRef)
    // STORAGE
    const audioMetadata = {
      contentType: 'audio/mp3',
    };
    // FILE NAME
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    // PATH NAME
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + folderElements.id + "/" + folderFiles.id + "/" + metaName}`;
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + folderElements.id + "/" + folderFiles.id + "/" + audioName}`;
    // STORAGE REF
    const videoRef = ref(storage, storagePathVideo);
    const audioRef = ref(storage, storagePathAudio);
    // UPLOAD TO STORAGE
    await uploadString(videoRef, trimmedVideoFile,'data_url',metaData)
    await uploadBytes(audioRef, audioFile,audioMetadata)
    // VIDEO URL
    const storageURL =  await getDownloadURL(videoRef);
    console.log("Video Uploaded")
    // Title
    const userFileTitle = fileTitle
    // Image URL
    const userFileImage = fileImage
    // TAG NAME 
    const userTag = tag
    //VIDEO SIZE
    const videoSize = metaData.videoSize 
    // DURATION

    const formattedDuration = metaData.videoDuration;
    const userVideoURL = storageURL

    // SET NEW FILE 
    const newFile = {
      content:"",
      title: userFileTitle,
      img: userFileImage,
      url: userVideoURL,
      id: folderFiles.id,
      folder_id: folderID,
      tag: userTag,
      duration: formattedDuration,
      storage_path_video: storagePathVideo,
      storage_path_audio: storagePathAudio,
      transcription:"",
      related_count: 0,
      video_size: videoSize
    };

    //UPDATE LOCAL SCREEN
    setDoc(folderFiles, newFile)
    .then(() => {
      setUserFile((currentFolders) => [
      ...currentFolders,
      { id: folderFiles.id, ...newFile },
      console.log(userFile)
      ]);
    });

    const newData = {
      id: userData.id,
      fullname: userData.fullname,
      email: userData.email,
      subscription: userData.subscription,
      storage_take: userData.storage_take + videoSize,
      profilePictureURL: userData.profilePictureURL,
      user_since: userData.user_since,
    }
    
    setDoc(userRef,newData)
    console.log("recent sett succ")

    await fetchData()

  }else{
    alert("Clip is too long for free users ! If you want to save longer then 10 minutes clips, please upgrade your account !")
  }
  //HIDE POP UP LOGIC
  if (isLinkActive) { 
    setIsLinkActive(false)
  } else if (isUploadActive) {
    setIsUploadActive(false)
  };
};

//DELETE FOLDER SECTION.-____________________________________//
//ARE YOU SURE MODAL
const [open, setOpen] = useState(false);

const handleOpen = () => setOpen(true);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,                          
};

//DELETE FOLDER
const handleDelete = async () => {
  if (currentuser) {
    // STRAGE REF FOLDER
    const videoRef = ref(storage,`"users"+ "/" +${currentuser.uid + "/" + folderElements.id}`)
    // USER UID
    const currentUserId = currentuser.uid;
    // FIRESTORE REF TO DELETE
    await deleteDoc(doc(db,"users",currentUserId,"File-Storage",folderID));
    console.log('Document successfully deleted');
    // DELETE FOLDER FROM STORAGE
    await deleteObject(videoRef).then(() => {
      console.log("Folder Deleted From Storage")
    }).catch((error) => {
      console.log(error)
    });
    // NAVIGATE BACK
    navigate("/memory");
  };
};
    
//EDIT FOLDER TITLE._________________________//
const handleTitleClick = () => {
  setIsEditing(true);
};

//INPUT VALUE HANDLE
const handleTitleChange = (e) => {
  setNewTitle(e.target.value);
};

//UPDATE AND SET NEW TITLE
const handleTitleBlur = async () => {
  //USER DATA & FIRESTORE REF
  const currentUserId = currentuser.uid;
  const urlID = id; 
  const docRef = doc(db, "users", currentUserId, "File-Storage",urlID);
  //NEW TITLE
  const editedTitle = newTitle;
  //EDIT TITLE ONLY
  const newFile = {
    title: editedTitle,
    id: folderElements.id,
    color: folderElements.color,
    files_count: folderElements.files_count,
  };
  if (editedTitle != "") {

    await setDoc(docRef, newFile)
    .then(() => {
      setUserFile((currentFolders) => [
      ...currentFolders,
      { id: docRef.id, ...newFile },
      console.log(userFile)
      ]);
    })
    setIsEditing(false);
  } else {
    //IF STAYED EMPTY
    alert("No title were given !")
    const newFile = {
      title: "Empty",
      id: folderElements.id,
      color: folderElements.color,
      files_count: folderElements.files_count,
    };
    await setDoc(docRef, newFile)
    .then(() => {
      setUserFile((currentFolders) => [
      ...currentFolders,
      { id: docRef.id, ...newFile },
      console.log(userFile)
      ]);
    });
    setIsEditing(false);
  }
};

//ENTER LISTENER
const handleKeyUp = (e) => {
  if (e.key === 'Enter') {
    handleTitleBlur();
  }
};

//BACK BTN ._________________________________//
const navigateBack = () => {
  navigate("/");
};


return(
<div className='folder-container'>
      <div className='zero_bar-row-folder'> 
      <div className='back-button-folder'>
      <ArrowBackIosNewIcon onClick={navigateBack}/> 
      </div>
   </div>
        <div className="folder" >
         
         {/*FIRST BAR*/}
        <div className='first_bar-title'>    
                 <div className="first_bar-left" >
                 {isEditing ? (
        <input
        className="folder-input-change"
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onKeyPress={handleKeyUp}
          autoFocus
        />
      ) : (
        <h2 className="first_bar-txt" onClick={handleTitleClick}>
          {newTitle}
        </h2>
      )}
         {isEditing ? <h5 style={{opacity:0.8,paddingTop:5}}>Press Enter to OK</h5>:null}
                </div>
                <div>
                <DesignServicesIcon sx={{fontSize:30}} className='first_bar-edit' onClick={handleTitleClick} />
                <DeleteForeverIcon sx={{fontSize:30,ml:3}} className='first_bar-delete' onClick={handleOpen} />
                <Modal
              open={open}
            
            aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           You will lose all of your documents permanently
          </Typography>
          <Button sx={{color:'red',ml:32,mt:5}} onClick={handleDelete}>DELETE</Button>
        </Box>
      </Modal>
   
            </div>
          </div>
 {/*MODAL  */}
 {
          isActive?
            <div className= {`popup-fodler ${isActive ? 'active' : ''}`}id="popup-1" onSubmit={handleSubmit}>
                    <div className="overlay-popup-fodler"></div>
                    <div className="content-popup-fodler">
                      <div className="close-btn-fodler" onClick={togglePopup} id="popClose">&times;</div>
                      <h1 className="Add-New-title">Add New</h1>
                      <div className="popup-fodler-con">
                          {/*<MultipleSelectCheckmarks />*/}
                          <DividerStack setSelectedPopUp={setSelectedPopUp}/>
                          
                          
                          
                      </div>
                      <Button id="add-btn-file" onClick={pickedPopup} variant="contained">Create</Button>
                    </div>
              </div>:null
              }
                  {/*LINK MODAl  */}
                  {isLinkActive?
            <div className= {`popup-fodler ${isLinkActive ? 'active' : ''}`}id="popup-link" onSubmit={handleSubmit}>
                    <div className="overlay-popup-fodler-link"></div>
                    <div className="content-popup-fodler-link">
                      <div className="close-btn-fodler-link" onClick={pickedPopup} id="popClose-link">Back</div>
                      <TextFieldFile fileTitle={setFileTitle}/>
                      <div className="popup-fodler-con-link">
                          {/*<MultipleSelectCheckmarks />*/}
                          <div className="add-link2">
                            {
                            linkProvided?<h2 className="txt-field-title">Paste in The URL</h2>:null
                          }
                          
                          <VideoUrlApp subscriptionState={userData.subscription} setCreateBtn={setIsAddedOn} setPassedDataUrl={setTrimmedVideoFile} linkProvided={setLinkProvided} fileImage={setFileImage} setExtractMeta={setMetaData} setPassedAudioDataUrl={setAudioFile}/>
  
                          </div>
                          <div className="add-link-notes2">
                            <h1>Add Features </h1>
                            {/**/}
                            <ZeroWidthStack/>
                            {/*TAGS */}
                            <MultipleSelectCheckmarks selectedTag={setTag}/>
                          </div>
                        </div>
                        {
                        isAddedOn? <div className="create-btn-bottom" onClick={createFile}><DelayingAppearance id="create-upload2" variant="contained"/></div> :null
                      }
                    </div>
                  </div>:null
                  }

                           {/*Upload MODAl  */}
                           {isUploadActive?
            <div className= {`popup-fodler ${isUploadActive ? 'active' : ''}`}id="popup-upload" onSubmit={handleSubmit}>
                    <div className="overlay-popup-fodler-upload"></div>
                    <div className="content-popup-fodler-upload">
                      <div className="close-btn-fodler-upload" onClick={pickedPopup} id="popClose-upload">Back</div>
                      <TextFieldFile fileTitle={setFileTitle}/>
                      <div className="popup-fodler-con-upload">
                          {/*<MultipleSelectCheckmarks />*/}
                          <div className="add-link">
                            {
                            uploadProvided?<h2 className="txt-field-title2">Upload File</h2>:null
                          }
                          <VideoApp subscriptionState={userData.subscription} setCreateBtn={setIsAddedOn} videoURL={setTrimmedVideoFile} uploadProvided={setUploadProvided} fileImage={setFileImage}  setExtractMeta={setMetaData} setPassedAudioDataUrl={setAudioFile}/>
                          </div>
                          <div className="add-link-notes">
                            <h1>Add Features </h1>
                            <h5>You can add them later</h5>
                            <ZeroWidthStack/>
                            <MultipleSelectCheckmarks selectedTag={setTag}/>
                          </div>                          
                      </div>
                      {
                        isAddedOn? <div className="create-btn-bottom-1" onClick={createFile}><DelayingAppearance id="create-upload" variant="contained"/></div> :null
                      }
                      
                    </div>
             
    
              </div>:null}
          {/*SEC BAR*/}
        {
          !isActive && !isLinkActive && !isUploadActive?
          <div className="file-map-container">
  {userFile.length === 0 ? (
    <div className="no-doc">No files added</div>
  ) : (
    userFile.map((file) =>
      file && file.id ? (
        <div key={file.id}>
          <Link to={`/folder/${folderID}/${file.id}`}>
            {file && file.img && file.title && (
              <FileCard imgSrc={file.img} imgAlt="file img" title={file.title} tags={file.tag} related_count={file.related_count} video_size={file.video_size}/>
            )}
          </Link>
        </div>
      ) : null
    )
  )}
</div>:null }
                   
       
              <BasicSpeedDial togglePopup={togglePopup} />
        </div>
        
</div>
)
}

export default Folder