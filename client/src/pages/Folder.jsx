//REACT & Contexts
import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/UserAuthContext';

//FIREBASE
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { v4 } from "uuid";
import { storage } from "../firebase";

//PAGE COMPONENTS
import TitleRow from "../assets/Components/Folder/PageComponents/TitleRow";
import FolderRow from "../assets/Components/Folder/PageComponents/FolderRow";
import Example from "../assets/Components/FileAdd/VideoUpload";

//BS
import Container from 'react-bootstrap/Container';

//REST API
import { ApiLocataion } from '../firebase';

//CSS
import '../Css/folder.css';
import "../Css/modal.css"

//FETCHING FUNCTIONS
import { 
  createFileFirestore,
  fetchFolderDetails,
  fetchUserData,
  fetchFolderFiles,
  deleteFolderFirestore,
  updateFolderTitle,
  updateFolderFileCount
} from '../server.js';


function Folder({ folderURL }) {

//<******************************VARIABLES*******************************>

//COMMON VARIABLES
const navigate  = useNavigate()
const { currentuser } = useAuth();
const { id } = useParams();
const folderID = id

//TOGGLE STATES
const [isEditing, setIsEditing] = useState(false);
const [show, setShow] = useState(false);

//USER DATA
const [folderElements, setFolderElements] = useState([]);
const [userData,setUserData] = useState([])

//FILE CREATION
const [userFile, setUserFile] = useState([]);
const [fileTitle , setFileTitle] = useState("Untitled")
const [fileTag, setFileTag ] = useState("")
const [fileImage, setFileImage] = useState("")
const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
const [audioFile, setAudioFile] = useState(null);
const [metaData, setMetaData] = useState(null)

//Provided LINK/FILE
const [newTitle, setNewTitle] = useState(folderElements.title);


//<******************************FUNCTIONS*******************************>

//<====> DATA FETCHING PROCESSES <====>

const fetchData = async () => {
  try {
    if (currentuser) {
      const currentUserId = currentuser.uid;
      const urlID = id; 

      const userSnapshot = await fetchUserData(currentUserId)
      const docSnapshot = await fetchFolderDetails({
        urlID: urlID,
        currentUserId: currentUserId
      })

      if (docSnapshot.status === 200) {
        const elementData = await docSnapshot.json();
        setFolderElements(elementData);
        setNewTitle(elementData.title);
      } else {
        setFolderElements(null);
      };
      if (userSnapshot.status === 200) {
        // Document exists, retrieve its data
        const elementUserData = await userSnapshot.json();
        setUserData(elementUserData)
      } else {
        setUserData(null); // Set to null or handle accordingly
      }
    };
  } catch (error) {
    console.error("Error getting document: ", error);
    window.location.href = "/";
  };
};

const fetchUserFolder = async () => {
  if (!currentuser) {
    setUserFile([]);
    return;
  }
  const currentUserId = currentuser.uid;
  const urlID = id;
  const folderResponse = await fetchFolderFiles({
    currentUserId: currentUserId,
    urlID: urlID
  });
  if (folderResponse.status === 200) {
    const folderData = await folderResponse.json();
    setUserFile(folderData);
  } else {
    setUserFile([]); // Set to null or handle accordingly
  }   
}

useEffect(() => {
  //Current URL
  folderURL(folderID);
  //Data Fetching Processes
  fetchData();
  fetchUserFolder();
}, [id, currentuser]);


//<====> CREATE FILE <====>

const uploadToStorage = async ({

  trimmedVideoFile,
  audioFile,
  metaData,
  storagePathVideo,
  storagePathAudio

}) => {
  const audioMetadata = {
    contentType: 'audio/mp3',
  };
  //== STORAGE UPLOAD ==//
  const videoRef = ref(storage, storagePathVideo);
  const audioRef = ref(storage, storagePathAudio);
  await uploadString(videoRef, trimmedVideoFile,'data_url',metaData)
  await uploadBytes(audioRef, audioFile,audioMetadata)
  const storageURL =  await getDownloadURL(videoRef);
  console.log("Video Uploaded")
  return storageURL
}

const uploadToFirestore = async ({
  storageURL,
  storagePathVideo,
  storagePathAudio,
  folderFileId,
  folderID,
  currentUserId,
  userData,
  metaData,
  fileTitle,
  fileImage,
  fileTag
}) => {
      //== FILE META DATA ==//
      const userFileTitle = fileTitle
      const userFileImage = fileImage
      const userTag = fileTag
      const videoSize = metaData.videoSize 
      const formattedDuration = metaData.videoDuration;
      const userVideoURL = storageURL
      const newFile = {
        content:"",
        title: userFileTitle,
        img: userFileImage,
        url: userVideoURL,
        id: folderFileId,
        folder_id: folderID,
        tag: userTag,
        duration: formattedDuration,
        storage_path_video: storagePathVideo,
        storage_path_audio: storagePathAudio,
        transcription:"",
        related_count: 0,
        video_size: videoSize
      };
  
      //== FIRESTORE UPLOAD ==//
      const createResponse = await createFileFirestore({
        newFile: newFile,
        folderID: folderID,
        currentUserId: currentUserId,
        userData: userData,
        videoSize: videoSize
      })
      if (createResponse.status === 200) {
        const StatusLog = await createResponse.json();
        alert("Your clip has been uploaded succesfully !")
      }else if (createResponse.status === 400) {
        alert("Something went wrong, try refreshing the page !");
      }
}

const createFile = async () => {
  if(currentuser) {
    //== VARIALBES ==//
    const currentUserId = currentuser.uid;
    const urlID = id;
    const folderFileId = `file_${v4()}`
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + metaName}`;
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + audioName}`;

    //== 1.) STORAGE UPLOAD ==//
    const storageURL = await uploadToStorage({
      trimmedVideoFile,
      audioFile,
      metaData,
      storagePathVideo,
      storagePathAudio
    })
    //== 2.) FIRESTORE UPLOAD ==//
    await uploadToFirestore({
      storageURL: storageURL,
      storagePathVideo,
      storagePathAudio,
      folderFileId,
      folderID,
      currentUserId,
      userData,
      metaData,
      fileTitle,
      fileImage,
      fileTag
    })
    //== 3.) UPDATE DATA IN THE END ==//
    await fetchData()
    await fetchUserFolder()

  }else{
    alert("Clip is too long for free users ! If you want to save longer then 10 minutes clips, please upgrade your account !")
  }
  setShow(false)
};


//<====> HANDLERS <====>

const handleDelete = async () => {
  if (currentuser) {
    const videoRef = ref(storage,`"users"+ "/" +${currentuser.uid + "/" + folderElements.id}`)
    const currentUserId = currentuser.uid;
    // == 1.) Delete from FIRESTORE == //
    await deleteFolderFirestore({
      folderID: folderElements.id,
      currentUserId: currentUserId
    })
    // == 2.) Delete from STORAGE == //
    await deleteObject(videoRef);

   // == 3.) NAVIGATE BACK == //
    navigate("/");
  };
};

const handleTitleClick = () => {
  setIsEditing(true);
};

const handleTitleChange = (e) => {
  setNewTitle(e.target.value);
};

const handleTitleBlur = async () => {
  const currentUserId = currentuser.uid;
  const urlID = id; 
  const editedTitle = newTitle;

  if (editedTitle != "") {
    await updateFolderTitle({
      currentUserId: currentUserId,
      urlID: urlID,
      editedTitle: editedTitle
    })
    setIsEditing(false);
  } else {
    alert("No title were given !")
    await updateFolderTitle({
      currentUserId: currentUserId,
      urlID: urlID,
      editedTitle: folderElements.title
    })
    setIsEditing(false);
  }
};

const handleKeyUp = (e) => {
  if (e.key === 'Enter') {
    handleTitleBlur();
  }
};

const handleNavigateBack = () => {
  navigate("/");
};

//<====> NUMBER OF FILES IN THE FOLDER - TRACKER <====>

useEffect(() => {
  if (currentuser){
    if(folderElements.length !== 0){
      const currentUserId = currentuser.uid;
      const urlID = id;
      updateFolderFileCount({
        currentUserId: currentUserId,
        urlID: urlID,
        userFile: userFile
      })

    }
  }
}, [userFile]);


return(
  <div className='folder-page'>
    <Container fluid style={{width:"90%",justifyContent:"center",alignItems:"center"}} >
      <TitleRow
        newTitle={newTitle}
        isEditing={isEditing}
        handleTitleChange={handleTitleChange}
        handleKeyUp={handleKeyUp}
        handleTitleClick={handleTitleClick}
        handleDelete={handleDelete}
        navigateBack={handleNavigateBack}
      />

      <FolderRow
        userFile={userFile}
        id={id}
        setShow={setShow}
      />

      <div style={{display:"flex",flexDirection:"row", width:"100%"}}>
        <Example
          triggerPopUp={show}
          setTagInput={setFileTag}
          handleUploadTrigger={createFile}
          setTitleInput={setFileTitle}
          setFileImageEXT={setFileImage} 
          setExtractMetaEXT={setMetaData} 
          setPassedAudioDataUrlEXT={setAudioFile} 
          setVideoUrlEXT={setTrimmedVideoFile} 
          handleHideTrigger={() => setShow(false)}
        />
      </div>

    </Container>
  </div>
)
}

export default Folder