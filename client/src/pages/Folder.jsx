//REACT & Contexts
import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/UserAuthContext';

//FIREBASE
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { v4 } from "uuid";
import { storage } from "../firebase";

//ASSETS
import FileCard from "../assets/FileAdd/fileCard";

//ICONS
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteIcon from '@mui/icons-material/Delete';

//ASSETS
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Example from "../assets/FileAdd/VideoUpload";

//CSS
import '../Css/folder.css';


function Folder({folderURL}) {


//<******************************VARIABLES*******************************>

//COMMON VARIABLES

const navigate  = useNavigate()
const { currentuser } = useAuth();
const { id } = useParams();
const folderID = id

//MODAL ACTIVITY
const [isLinkActive, setIsLinkActive] = useState(false);
const [isUploadActive, setIsUploadActive] = useState(false);

//CURRENT ELEMENTS IN ARRAY
const [folderElements, setFolderElements] = useState([]);
const [userData,setUserData] = useState([])

//CREATE BTN AND EDITING ON MODAL
const [isEditing, setIsEditing] = useState(false);

//FILE CREATION
const [userFile, setUserFile] = useState([]);
const [fileTitle , setFileTitle] = useState("Untitled")
const [fileTag, setFileTag ] = useState("")
const [fileImage, setFileImage] = useState("")
const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
const [audioFile, setAudioFile] = useState(null);
const [metaData, setMetaData] = useState(null)
const [tag,setTag] = useState("")

//Provided LINK/FILE
const [newTitle, setNewTitle] = useState(folderElements.title);


//<******************************FUNCTIONS*******************************>

//UPDATE THE NUM OF ELEMENTS IN FOLDER
useEffect(() => {
  if (currentuser){
    if(folderElements.length !== 0){
      const currentUserId = currentuser.uid;
      const urlID = id;
      fetch(`http://localhost:3000/folder/update-count/${urlID}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, fileCount: userFile.length}),
      })

    }
  }
}, [userFile]);

//FETCH FOLDER DATA
const fetchData = async () => {
  try {
    if (currentuser) {
      const currentUserId = currentuser.uid;
      const urlID = id; 
      // Folder ELEMENT FETCH
      const userSnapshot = await fetch(`http://localhost:3000/user/${currentUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });
      const docSnapshot = await fetch(`http://localhost:3000/folder/${urlID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUserId, folderId: urlID}),
      });
      if (docSnapshot.status === 200) {
        // Document exists, retrieve its data
        const elementData = await docSnapshot.json();
        setFolderElements(elementData);
        setNewTitle(elementData.title);
      } else {
        console.log("Document does not exist.");
        setFolderElements(null);
      };
      if (userSnapshot.status === 200) {
        // Document exists, retrieve its data
        const elementUserData = await userSnapshot.json();
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

//FETCH FILES IN FOLDER
const fetchUserFolder = async () => {
  if (!currentuser) {
    setUserFile([]);
    console.log("No user logged in");
    return;
  }
  // USER ID & FIRESTORE REF
  const currentUserId = currentuser.uid;
  const urlID = id;
  //const colRef = collection(db, "users", currentUserId, "File-Storage");
const folderResponse = await fetch(`http://localhost:3000/folder/file`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: currentUserId, folderId: urlID}),
  })
  if (folderResponse.status === 200) {
    // Document exists, retrieve its data
    const folderData = await folderResponse.json();
    setUserFile(folderData);
  } else {
    console.log("Document does not exist.");
    setUserFile([]); // Set to null or handle accordingly
  }   
}

//ON PAGE LOAD AND REFRESH
useEffect(() => {
  folderURL(folderID);
  // Call fetchData
  fetchData();
  fetchUserFolder();
}, [id, currentuser]);

//SAVING FILE TO FIRESTORE
const createFile = async () => {
  if (currentuser && metaData.videoDuration < 10 && userData.subscription == false) {
    const currentUserId = currentuser.uid;
    const urlID = id;
  
    const folderFileId = `file_${v4()}`
    // STORAGE
    const audioMetadata = {
      contentType: 'audio/mp3',
    };
    // FILE NAME
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    // PATH NAME
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + metaName}`;
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + audioName}`;
    // STORAGE REF
    const videoRef = ref(storage, storagePathVideo);
    const audioRef = ref(storage, storagePathAudio);
    // UPLOAD TO STORAGE
    await uploadString(videoRef, trimmedVideoFile,'data_url',metaData)
    await uploadBytes(audioRef, audioFile,audioMetadata)
    // VIDEO URL
    const storageURL =  await getDownloadURL(videoRef);
    console.log("Video Uploaded To Storage")
    // Title
    const userFileTitle = fileTitle
    // Image URL
    const userFileImage = fileImage
    // TAG NAME 
    const userTag = fileTag
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
      id: folderFileId,
      folder_id: folderID,
      tag: userTag,
      duration: metaData.videoDurationString,
      storage_path_video: storagePathVideo,
      storage_path_audio: storagePathAudio,
      transcription:"",
      related_count: 0,
      video_size: videoSize
    };

    //UPDATE VIDEO
    const createResponse = await fetch(`http://localhost:3000/folder/file-create/${folderID}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileToUpload: newFile, userId: currentUserId, currentStorageTake: userData.storage_take, videoSize: videoSize}),
    })
    if (createResponse.status === 200) {
      // Document exists, retrieve its data
      const StatusLog = await createResponse.json();
      console.log(StatusLog)
    }else  {
      alert("Something went wrong, try refreshing the page !");
    }
    //UPDATE LOCAL SCREEN
    await fetchData()
    await fetchUserFolder()

  } else if(currentuser && userData.subscription == true) {
    const currentUserId = currentuser.uid;
    const urlID = id;
    const folderFileId = `file_${v4()}`
    // STORAGE
    const audioMetadata = {
      contentType: 'audio/mp3',
    };
    // FILE NAME
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    // PATH NAME
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + metaName}`;
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + audioName}`;
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
      id: folderFileId,
      folder_id: folderID,
      tag: userTag,
      duration: metaData.videoDurationString,
      storage_path_video: storagePathVideo,
      storage_path_audio: storagePathAudio,
      transcription:"",
      related_count: 0,
      video_size: videoSize
    };

    //UPDATE VIDEO
    const createResponse = await fetch(`http://localhost:3000/folder/file-create/${folderID}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileToUpload: newFile, userId: currentUserId, currentStorageTake: userData.storage_take, videoSize: videoSize}),
    })
    if (createResponse.status === 200) {
      // Document exists, retrieve its data
      const StatusLog = await createResponse.json();
      //Success Alert the client
      alert("Your clip has been uploaded succesfully !")
    }else if (createResponse.status === 400) {
      alert("Something went wrong, try refreshing the page !");
    }
    //UPDATE LOCAL SCREEN
    await fetchData()
    await fetchUserFolder()

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

//<**********DELETE*************>

//DELETE FOLDER
const handleDelete = async () => {
  if (currentuser) {
    // STRAGE REF FOLDER
    const videoRef = ref(storage,`"users"+ "/" +${currentuser.uid + "/" + folderElements.id}`)
    // USER UID
    const currentUserId = currentuser.uid;
    // FIRESTORE REF TO DELETE
    const deleteResponse = await fetch(`http://localhost:3000/folder/delete/${folderID}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUserId}),
    })
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
  //NEW TITLE
  const editedTitle = newTitle;
  if (editedTitle != "") {
    await fetch(`http://localhost:3000/folder/update-title/${urlID}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUserId, folderTitle: editedTitle}),
    })
    setIsEditing(false);
  } else {
    //IF STAYED EMPTY
    alert("No title were given !")
    await fetch(`http://localhost:3000/folder/update-title/${urlID}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUserId, folderTitle: editedTitle}),
    })
    setIsEditing(false);
  }
};

//ENTER LISTENER
const handleKeyUp = (e) => {
  if (e.key === 'Enter') {
    handleTitleBlur();
  }
};

//BACK BTN 
const navigateBack = () => {
  navigate("/");
};


return(
<div style={{display:"flex",flexDirection:"column",width:"100%"}}>
  <Container fluid style={{width:"85%",justifyContent:"center",alignItems:"center"}} >
    <Row style={{width:"80%",marginRight:"auto",marginLeft:"auto",paddingTop:50,alignItems:"center",justifyContent:"space-between"}}>
      <Col >
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
          {isEditing ? 
            <h5 style={{opacity:0.8,paddingTop:5}}>Press Enter to OK</h5>:null
          }
      </Col>
    
        <Col className='col-auto folder-edit-btn' style={{cursor:"pointer"}} >
            <DesignServicesIcon onClick={handleTitleClick}/>
        </Col>
        <Col className='col-auto folder-delete-btn' style={{cursor:"pointer"}} >
            <DeleteIcon onClick={handleDelete}/>
        </Col>
  
    </Row>

    <Row style={{marginTop:10}}>
      <Col>
      {userFile.map((file) => (
        <Link to={`/folder/${id}/${file.id}`}>
        <div key={file.id}>
          <FileCard imgSrc={file.img} title={file.title} tags={file.tag} video_size={file.video_size} />
        </div>
        </Link>
      ))}
      </Col>
    </Row>

  <Row>
    <Example setTagInput={setFileTag} handleUploadTrigger={createFile} setTitleInput={setFileTitle} setFileImageEXT={setFileImage} setExtractMetaEXT={setMetaData} setPassedAudioDataUrlEXT={setAudioFile} setVideoUrlEXT={setTrimmedVideoFile} />
  </Row>
  </Container>
</div>
)
}

export default Folder