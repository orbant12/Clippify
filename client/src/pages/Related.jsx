// REACT & CONTEXTS
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserAuthContext';

// FIREBASE
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, deleteObject, getDownloadURL } from 'firebase/storage';

// MUI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// ASSETS
import FullFrameVideo from '../assets/Components/File/fullVideoFrame';
import Editor from '../assets/Components/File/txtEditor/txtEditor';

// ICONS
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
// CSS
import '../Css/file.css';

//BS
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//COMPONETS
import ToggleButtons from "../assets/Components/File/mainShow"

function Related({ prevUrl, mainFileURL }) {


//<******************************VARIABLES*******************************>

// CURRENT ELEMENTS IN ARRAY
const [fileElements, setFileElements] = useState([]);
const [prevFileElements, setPrevFileElements] = useState([]);
const [userData, setUserData] = useState([]);

// RICH TXT EDITOR
const [saveContent, setSaveContent] = useState(null);
const [newContentUpdate, setNewContentUpdate] = useState(null);

// File Title Edit
const [isEditing, setIsEditing] = useState(false);
const [newTitle, setNewTitle] = useState(fileElements.title);
const [transcriptionData, setTranscriptionData] = useState(null);
const [generatedHtml,setGeneratedHtml] = useState(null)

// COMMON VARIABLES
const { id } = useParams();
const { currentuser } = useAuth();
const folderUrl = prevUrl; // FOLDER URL
const mainFileUrl = mainFileURL;
const currentURL = id; // File URL
const navigate = useNavigate();

//<******************************FUNCTIONS*******************************>

// USE EFFECT TO LOAD DATA ON PAGE
useEffect(() => {
  const fetchData = async () => {
    try {
      if (currentuser) {
        // USER ID AND FIRESTORE REFS
        const currentUserId = currentuser.uid;
        const userDocRef = doc(db, 'users', currentUserId);
        const folderElementRef = doc(
          userDocRef,
          'File-Storage',
          folderUrl
        );
        const fileElementRef = doc(
          folderElementRef,
          'Files',
          mainFileUrl,
          'Children',
          currentURL
        );
        const prevFileElementRef = doc(
          folderElementRef,
          'Files',
          mainFileUrl
        );
        // Folder ELEMENT FETCH
        const userSnapshot = await getDoc(userDocRef);
        const docSnapshot = await getDoc(fileElementRef);
        const prevDocSnapshot = await getDoc(prevFileElementRef);
        // CURRENT FILE
        if (docSnapshot.exists()) {
          // Document exists, retrieve its data
          const elementData = docSnapshot.data();
          setFileElements(elementData);
          setNewTitle(elementData.title);
          setNewContentUpdate(elementData.content);
        } else {
          console.log('Document does not exist.');
          setFileElements(null); // Set to null or handle accordingly
        }
        // USER
        if (userSnapshot.exists()) {
          // Document exists, retrieve its data
          const elementUserData = userSnapshot.data();
          setUserData(elementUserData);
        } else {
          console.log('Document does not exist.');
          setUserData(null); // Set to null or handle accordingly
        }
        // PREV FILE
        if (prevDocSnapshot.exists()) {
          // Document exists, retrieve its data
          const elementData = prevDocSnapshot.data();
          setPrevFileElements(elementData);
        } else {
          console.log('Document does not exist.');
          setPrevFileElements(null); // Set to null if not exists
        }
      }
    } catch (error) {
      console.error('Error getting file: ', error);
      window.location.href = '/';
    }
  };
  fetchData();
}, [id, currentuser]);

// SAVE RICH TEXT EDITOR CONTENT
useEffect(() => {
  const storeHTMLContentInFirestore = async (htmlContent) => {
    try {
      // USER ID AND FIRESTORE REFS
      const currentUserId = currentuser.uid;
      const userDocRef = doc(db, 'users', currentUserId);
      const folderElementRef = doc(
        userDocRef,
        'File-Storage',
        folderUrl
      );
      const fileChildrenRef = doc(
        folderElementRef,
        'Files',
        mainFileUrl,
        'Children',
        currentURL
      );
      // EDITOR JSON
      const editorContent = htmlContent;

      // ONLY TEXT EDITOR CHANGES
      await setDoc(fileChildrenRef, {
        content: editorContent,
        title: fileElements.title,
        img: fileElements.img,
        url: fileElements.url,
        id: fileElements.id,
        folder_id: folderUrl,
        tag: fileElements.tag,
        duration: fileElements.duration,
        storage_path_video: fileElements.storage_path_video,
        storage_path_audio: fileElements.storage_path_audio,
        transcription: fileElements.transcription,
        video_size: fileElements.video_size,
      });
      setNewContentUpdate(editorContent);

      console.log('JSON content stored in Firestore.');
    } catch (error) {
      console.error('Error storing HTML content: ', error);
    }
  };
  storeHTMLContentInFirestore(saveContent);
}, [saveContent]);

// DELETE FOLDER SECTION
// ARE YOU SURE MODAL
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

const deleteEndSett = async () => {
  const currentUserId = currentuser.uid;
  const colRef = doc(
    db,
    'users',
    currentUserId,
    'File-Storage',
    folderUrl,
    'Files',
    mainFileUrl,
    'Children',
    currentURL
  );
  const fileRef = doc(
    db,
    'users',
    currentUserId,
    'File-Storage',
    folderUrl,
    'Files',
    mainFileUrl
  );
  const userRef = doc(db, 'users', currentUserId);

  await updateDoc(fileRef, {
    video_size: prevFileElements.video_size - fileElements.video_size,
  });

  // USER SIZE DELETE
  await updateDoc(userRef, {
    storage_take: userData.storage_take - fileElements.video_size,
  });

  // DELETE FIRESTORE DOC
  await deleteDoc(colRef);
  console.log('All Documents successfully deleted');
  // NAVIGATE
  navigate(`/folder/${folderUrl}/${mainFileUrl}`);
};

// DELETE FOLDER
const handleDelete = async () => {
  if (currentuser) {
    // STORAGE REFS
    const videoRef = ref(storage, fileElements.storage_path_video);
    const audioRef = ref(storage, fileElements.storage_path_audio);
    const transName = `${fileElements.storage_path_audio + '.wav_transcription.txt'}`;
    const transcriptRef = ref(storage, transName);

    // DELETE Loop
    getDownloadURL(transcriptRef)
      .then((url) => {
        // DELETE VIDEO
        deleteObject(videoRef).then(() => {
          console.log('Video Deleted');
          deleteObject(audioRef).then(() => {
            console.log('Audio Deleted');
            deleteObject(transcriptRef).then(() => {
              console.log('Transcription Deleted');
              deleteEndSett();
            }).catch((error) => {
              console.log(error);
            });
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          alert(
            "Ai is processing your video, you can't delete it yet. Please try again 3 minutes later."
          );
        } else {
          console.log(error);
        }
      });
  }
};

// EDIT FOLDER TITLE
const handleTitleClick = () => {
  setIsEditing(true);
  console.log(isEditing);
};

// INPUT HANDLE
const handleTitleChange = (e) => {
  setNewTitle(e.target.value);
};

// EDIT TITLE
const handleTitleBlur = async () => {
  if (currentuser) {
    // NEW TITLE
    const editedTitle = newTitle;
    // USER ID
    const currentUserId = currentuser.uid;
    // Fodler PATH
    const folderURL = folderUrl;
    // CURRENT FILE PATH
    const urlID = id;
    // FIRESTORE REF
    const docRef = doc(
      db,
      'users',
      currentUserId,
      'File-Storage',
      folderURL,
      'Files',
      mainFileUrl,
      'Children',
      urlID
    );
    // IF LEFT EMPTY OR NOT
    if (editedTitle !== '') {
      await updateDoc(docRef, {
        title: editedTitle,
      });
      console.log('Title Updated');
      setIsEditing(false);
    } else {
      // ALERT
      alert('No title were given !');
      await updateDoc(docRef, {
        title: "Empty",
      });
      setIsEditing(false);
    }
  }
};

// ENTER LISTEN
const handleKeyUp = (e) => {
  if (e.key === 'Enter') {
    handleTitleBlur();
  }
};

// TRANSCRIPTION
useEffect(() => {
  if (currentuser) {
    try {
      const currentUserId = currentuser.uid; // Assuming you have the user's ID
      // Fodler PATH
      const folderURL = folderUrl;
      // CURRENT FILE PATH
      const urlID = id;
      const docRef = doc(
        db,
        'users',
        currentUserId,
        'File-Storage',
        folderURL,
        'Files',
        mainFileUrl,
        'Children',
        urlID
      );
      const transcription_data = transcriptionData;
      // Create a new document in Firestore with the HTML content
      updateDoc(docRef, {
        transcription: transcription_data,
      });
      console.log('Transcription Stored');
    } catch (error) {
      console.log(error);
    }
  }
}, [transcriptionData]);

// BACK BTN
const navigateBack = () => {
  navigate(`/folder/${folderUrl}/${mainFileUrl}`);
};


return (
<Container fluid>

    <div className='file-page'>
      {/*1 BAR */}
      <Row style={{width:"70%",marginRight:"auto",marginLeft:"auto",paddingTop:70,alignItems:"center"}}>
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
        <div className='zero_bar-row2'> 
          <div className='back-button'>
            <ArrowBackIosNewIcon onClick={navigateBack} sx={{p:1}}/> 
          </div>
        </div>
    </Row>
      {/*2 BAR */}
      <div className='sec_bar-cont'>
        {/*VIDEO FRAME With PAG*/}
      {/* 2 BAR */}
        {/* VIDEO FRAME */}
        <div className='sec_bar-video-main'>
          <FullFrameVideo crossOrigin="anonymous" videoSrc={fileElements.url} />
        </div>

        {/* CLIPS COLLECTION */}
      </div>
      {/*3 BAR*/}
      <div className='third_bar-features-cont'>
        <div className='rich-txt-editor'>
          {/*EDITOR*/}
          <Editor 
            isSubscribed={userData.subscription}  
            data={setGeneratedHtml} 
            setData={newContentUpdate} 
            setContent={setSaveContent} 
            audioUrl={fileElements.storage_path_audio} 
            passTranscription={setTranscriptionData}
          /> 
        </div>
      </div>
    </div>
</Container>
);}

export default Related

