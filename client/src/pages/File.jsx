//REACT AND CONTEXTS
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/UserAuthContext';
//FIREBASE
import { doc, collection, getDoc, query,setDoc,getDocs,startAfter,limit,endBefore,limitToLast,orderBy,deleteDoc, updateDoc } from "firebase/firestore";
import { db,storage } from "../firebase";
import { ref, uploadString, getDownloadURL,deleteObject,uploadBytes } from 'firebase/storage';
import {v4} from "uuid";
//ICONS
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//MUI
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
//ASSETS
import FrameVideo from '../assets/File/videoFrame';
import Editor from '../assets/File/txtEditor/txtEditor';
import RelatedVideoBar from '../assets/File/relatedVideo';
import PaginationUi from '../assets/File/paginationUI';
import DividerStack from "../assets/FileAdd/fileAddCards";
import VideoApp from "../assets/videoTrim/videoApp";
import VideoUrlApp from "../assets/videoTrim/videoUrlApp";
import ZeroWidthStack from "../assets/FileAdd/featureSelect";
import MultipleSelectCheckmarks from '../assets/FileAdd/tagbar';
import TextFieldFile from '../assets/FileAdd/textField';
import BasicSpeedDial from "../assets/FileAdd/addBtn";
import ToggleButtons from "../assets/File/mainShow"
import FullFrameVideo from "../assets/File/fullVideoFrame"
import DelayingAppearance from "../assets/FileAdd/LoadingBtn";
//CSS
import '../Css/file.css'


import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function File({prevUrl,mainFileURL}) {


//<******************************VARIABLES*******************************>
//FILE ELEMENT IN ARRAY 
const [fileElements, setFileElements] = useState([])
const [userData,setUserData] = useState([])

//2Bar State
const [secBarState, setSecBarState] = useState(false);

//PAGINATION
const [childrenFiles, setChildrenFiles] = useState([]);
const [lastVisible, setLastVisible] = useState(null);
const [firstVisible, setFirstVisible] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1); // Calculate the total number of pages

//MODAL STATES
const [isLinkActive, setIsLinkActive] = useState(false);
const [isUploadActive, setIsUploadActive] = useState(false);
const [isActive, setIsActive] = useState(false);
const [selectedPopUp, setSelectedPopUp] = useState(null);
const [isAddedOn, setIsAddedOn] = useState(false);
const [linkProvided, setLinkProvided] = useState(true);
const [uploadProvided, setUploadProvided] = useState(true);

//FILE CREATION
const [fileTitle , setFileTitle] = useState("Untitled")
const [fileImage, setFileImage] = useState("")
const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
const [audioFile, setAudioFile] = useState(null);
const [metaData, setMetaData] = useState(null)
const [tag,setTag] = useState("")
const [transcriptionData, setTranscriptionData]= useState("")

//RICH TXT EDITOR
const [generatedHtml,setGeneratedHtml] = useState(null)
const [newContentUpdate,setNewContentUpdate] = useState(null)
const [saveContent,setSaveContent] = useState(null)

//File Title Edit
const [isEditing, setIsEditing] = useState(false);
const [newTitle, setNewTitle] = useState(fileElements.title);

//FREQUENT VARIABLES________________________________//
const { id } = useParams();
const { currentuser } = useAuth();
const folderUrl = prevUrl // FOLDER URL
const currentURL = id //File URL
const navigate  = useNavigate()


//<******************************FUNCTIONS*******************************>

//SET CHILDREN COUNT
useEffect(() => {
  if(currentuser){
    if(fileElements.length !== 0){
      if(childrenFiles){
        //USER DATA AND FIRESTORE REF
          const currentUserId = currentuser.uid; 
          const userDocRef = doc(db, "users", currentUserId);
          const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
          const fileChildrenRef = doc(folderElementRef ,"Files",currentURL);
          const numberOfChild = childrenFiles.length
          updateDoc(fileChildrenRef, {
            related_count: numberOfChild,
          });
      }
    } 
  }
}, [childrenFiles]);

//RECENT LOAD SETTER
const setRecentlyOpenned = async () => {
  if (currentuser) {
    //USER DATA AND FIRESTORE REFS
    const currentUserId = currentuser.uid;  
    const userDocRef = doc(db, "users", currentUserId);
    const urlID = folderUrl;
    const recentDocRef = doc(db,"users",currentUserId,"File-Storage",urlID,"Files",currentURL)
    updateDoc(recentDocRef, {
      recent: recentDocRef,
    });
    console.log("recent sett succ") 
  }
}

//FECT FILE ELEMENTS
const fetchData = async () => {  
  try {
    if (currentuser) {
      //USER DATA AND FIRESTORE REFS
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      const userDocRef = doc(db, "users", currentUserId);
      const folderElementRef = doc(userDocRef, "File-Storage", urlID);
      const fileElementRef = doc(folderElementRef ,"Files",currentURL);
      //Folder ELEMENT FETCH
      const userSnapshot = await getDoc(userDocRef);
      const docSnapshot = await getDoc(fileElementRef);
      if (docSnapshot.exists()) {
        // Document exists, retrieve its data
        const elementData = docSnapshot.data();
        setFileElements(elementData);
        setNewTitle(elementData.title)
      
        setNewContentUpdate(elementData.content)
      } else {
        console.log("Document does not exist.");
        setFileElements(null); // Set to null if not exists
      }
      if (userSnapshot.exists()) {
        // Document exists, retrieve its data
        const elementUserData = userSnapshot.data();
        setUserData(elementUserData)
      } else {
        console.log("Document does not exist.");
        setUserData(null); // Set to null or handle accordingly
      }
    }
  } catch (error) {
    console.error("Error getting file: ", error);
    window.location.href = "/"
  }
};

//FECT CHILDREN ELEMENTS
const fetchChildren = async () => {
  const totalItems = 6;
  const pageSize = 3;
  const totalPageCount = Math.ceil(totalItems / pageSize);
  setTotalPages(totalPageCount);
  if (currentuser) {
    //USER DATA AND FIRESTORE REF
    const currentUserId = currentuser.uid;
    const userDocRef = doc(db, "users", currentUserId);
    const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
    const fileChildrenRef = collection(folderElementRef ,"Files",currentURL,"Children");
    //QUERY WITH 3 LIMIT
    const queryRef = query(fileChildrenRef,orderBy("id","asc"), limit(pageSize));
    try {
      const querySnapshot = await getDocs(queryRef);
      if (!querySnapshot.empty) {
        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastVisible(newLastVisible);
        setFirstVisible(querySnapshot.docs[0]);

        // Process the documents and add them to the state
        const newChildrenFiles = querySnapshot.docs.map((doc) => doc.data());
        setChildrenFiles([...newChildrenFiles]);
      } else {
        console.log("No more documents to load.");
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }
}

//ON LOAD FETCH DATA
useEffect(() => {
  mainFileURL(currentURL)
  fetchData();
  fetchChildren();
}, [id, currentuser]);

//RECENT LOAD useEffect Call
useEffect(() => {
  if (userData !== null) {
    setRecentlyOpenned();
  // Call the function when userData is set
  }
}, [userData]);

//MODAL ACTIVE LOGIC STATES
const togglePopup = () => {
  if(currentuser && childrenFiles.length < 3){
    setIsActive(!isActive);
  }else if (currentuser && childrenFiles.length >= 3 && userData.subscription === false){
    alert("You can only add 3 related clips as a Free User !")
  }else if (currentuser && childrenFiles.length >= 3 && userData.subscription === true){
    setIsActive(!isActive);
  }
};

function handleSubmit(e) {
  e.preventDefault();
  togglePopup();
}

const pickedPopup = () => {
  if(selectedPopUp == 1){
    togglePopup();
    setIsUploadActive(!isUploadActive)
  } else if (selectedPopUp == 0) {
    togglePopup();
    setIsLinkActive(!isLinkActive)
  }
};

//RELATED FILE CREATION
const createRelatedFile = async () => {
  //STORAGE SETUP
  if (currentuser){
    //USER ID
    const currentUserId = currentuser.uid;
    //Fodler PATH
    const urlID = folderUrl;
    //CURRENT FILE PATH
    const currentURL = id
    //FIRESTORE REFS
    const userRef = doc(db,"users",currentUserId)
    const docRef = doc(db, "users", currentUserId, "File-Storage",urlID); 
    const relatedFiles = collection(docRef,"Files",currentURL,"Children")
    const fileRef = doc(db, "users", currentUserId, "File-Storage",urlID,"Files",currentURL); 
    const relatedFilesRef = doc(relatedFiles)
    //TYPE for AUDIO
    const audioMetadata = {
        contentType: 'audio/mp3',
    };
    //VIDE & AUDIO NAME
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    //STORAGE PATH NAMES
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + currentURL + "/" + relatedFilesRef.id + "/" + metaName}`
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + currentURL + "/" + relatedFilesRef.id + "/" + audioName}`
    //STORAGE REFRENCES
    const videoRef = ref(storage, storagePathVideo);
    const audioRef = ref(storage, storagePathAudio);
    //UPLOAD TO STORAGE
    await uploadString(videoRef, trimmedVideoFile,'data_url')
    await uploadBytes(audioRef, audioFile,audioMetadata)
    //DOWNLOAD URL
    const storageURL =  await getDownloadURL(videoRef);
    //CONSOLE OF SUCCESS
    console.log("Video Uploaded")

    //File Title
    const userFileTitle = fileTitle
    //Image URL
    const userFileImage = fileImage 
    // TAG NAME
    const userTag = tag 
    //VIDEO SIZE
    const videoSize = metaData.videoSize 
    //STORAGE URL
    const userVideoURL = storageURL

    await updateDoc(fileRef, {
      video_size: fileElements.video_size + videoSize,
      related_count: childrenFiles.length + 1,
    });
    await updateDoc(userRef, {
      storage_take: userData.storage_take + videoSize,
    });
    await fetchData()
    console.log("recent sett succ")

    //CHILDREN FILE ELEMENTS & CREATION
    const newRelatedFile = {
    title: userFileTitle,
    img: userFileImage,
    url: userVideoURL,
    id: relatedFilesRef.id,
    folder_id: folderUrl,
    tag: userTag,
    duration: metaData.videoDurationString,
    storage_path_video:storagePathVideo,
    storage_path_audio:storagePathAudio,
    content: generatedHtml,
    transcription:"",
    video_size: videoSize,
    };
    //SETTING THE CHILDREN FILE TO FIRESTORE
    setDoc(relatedFilesRef, newRelatedFile)
    .then(() => {
      // Folder added successfully, you can update your local state if needed
      setChildrenFiles((currentFolders) => [
        ...currentFolders,
        { id: relatedFilesRef.id, ...newRelatedFile},
        console.log(childrenFiles)
      ]);
    })
  };
  //HIDE POP UP LOGIC
  if(isLinkActive){ 
    setIsLinkActive(false)
  }else if (isUploadActive){
    setIsUploadActive(false)
  }
};

//Pagination NEXT PAGE
const nextPage= async () =>{
  if(currentuser){
    //USER DATA AND FIRESTORE REF
    const currentUserId = currentuser.uid;
    const userDocRef = doc(db, "users", currentUserId);
    const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
    const fileChildrenRef = collection(folderElementRef ,"Files",currentURL,"Children");
    //PAGINATION NEXT LOGIC
    if (currentPage < totalPages) {
      try {
        if (lastVisible) {
          const queryRef = query(fileChildrenRef,orderBy("id","asc"),startAfter(lastVisible),limit(3));
          const querySnapshot = await getDocs(queryRef);
          if (!querySnapshot.empty) {
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            console.log(newLastVisible)
            setLastVisible(newLastVisible);
            setCurrentPage(currentPage + 1);
            // Process the documents and add them to the state
            const newChildrenFiles = querySnapshot.docs.map((doc) => doc.data());
            setChildrenFiles([...newChildrenFiles]);
          } else {
            console.log("No more documents to load.");
          }
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
  }
};

//PAGINATION PREV PAGE
async function fetchPreviousPage() {
  if(currentuser){
    //USER DATA AND FIRESTORE REF
    const currentUserId = currentuser.uid;
    const userDocRef = doc(db, "users", currentUserId);
    const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
    const fileChildrenRef = collection(folderElementRef ,"Files",currentURL,"Children");
    //PAGINATION PREV LOGIC
    if (currentPage > 1) {
      try {
        if (!firstVisible) {
          console.log("No previous page available.");
          return;
        }
        // Start before the firstVisible document
        const queryRef = query(fileChildrenRef,orderBy("id","asc"),endBefore(lastVisible),limitToLast(3));
        const querySnapshot = await getDocs(queryRef);
        if (!querySnapshot.empty) {
          const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          setLastVisible(newLastVisible);
          setCurrentPage(currentPage - 1);
          const newChildrenFiles = querySnapshot.docs.map((doc) => doc.data());
          setChildrenFiles([...newChildrenFiles]);
        } else {
          console.log("No previous documents available.");
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }
  }
}

//SAVE RICH TEXT EDITOR CONTENT
useEffect(() => {
  const storeHTMLContentInFirestore = async (htmlContent) => {
    try {
        //USER DATA AND FIRESTORE REF
        const currentUserId = currentuser.uid; 
        const userDocRef = doc(db, "users", currentUserId);
        const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
        const fileChildrenRef = doc(folderElementRef ,"Files",currentURL);
        const numberOfChild = childrenFiles.length
        //TXT EDITOR JSON
        const editorContent = htmlContent
      
      // ONLY TEXT EDITOR CONTENT CHANGES
      await updateDoc(fileChildrenRef, {
        content: editorContent,
      });
      setNewContentUpdate(editorContent)
      console.log("HTML content stored in Firestore.");
    } catch (error) {
      console.error("Error storing HTML content: ", error);
    }
  };
  storeHTMLContentInFirestore(saveContent)
}, [saveContent]);

//<******************************DELETE*******************************>
//ARE YOU SURE MODAL
const [open, setOpen] = useState(false);

const handleOpen = () => {
  if(childrenFiles.length === 0){
    setOpen(true);
  }else{
    alert("You need to delete all related clips first !")
  }
};

//MODAL STYLING
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

//DELETE FOLDER CODE
const handleDelete = async () => {
  //USER DATA
  const currentUserId = currentuser.uid;
  const colRef = doc(db,"users",currentUserId,"File-Storage",folderUrl,"Files",currentURL);
  const userRef = doc(db,"users",currentUserId);
  //STORAGE DATA
  const videoRef = ref(storage, fileElements.storage_path_video);
  const audioRef = ref(storage, fileElements.storage_path_audio);
  const transName = `${fileElements.storage_path_audio + ".wav_transcription.txt"}`
  const transcriptRef = ref(storage,transName)
  //DELETE VIDEO
  await deleteObject(videoRef).then(() => {
    console.log("video deleted")
  }).catch((error) => {
    console.log(error)
  });
  //DELETE AUDIO
  await deleteObject(audioRef).then(() => {
    console.log("audio deleted")
  }).catch((error) => {
    console.log(error)
  });
  //DELETE TRANSCRIPTION
  await deleteObject(transcriptRef).then(() => {
    console.log("transcription deleted")
  }).catch((error) => {
    console.log(error)
  });
  //DELETE FROM USER
  await updateDoc(userRef, {
    storage_take: userData.storage_take - fileElements.video_size,
  });
//DELETE DOCUMENTS FIRESTORE
  await deleteDoc(colRef);
  console.log('All Document successfully deleted !');
  //NAVIGATE BACK
  navigate(`/folder/${folderUrl}`);   
};

//EDIT FOLDER TITLE
const handleTitleClick = () => {
  setIsEditing(true);
  console.log(isEditing)
};
const handleTitleChange = (e) => {
  setNewTitle(e.target.value);
};

const handleTitleBlur = async () => {
  if(currentuser){ 
    //NEW TITLE
    const editedTitle = newTitle;
    const currentUserId = currentuser.uid;
    //Fodler PATH
    const folderURL = folderUrl;
    //CURRENT FILE PATH
    const urlID = id; 
    const docRef = doc(db, "users", currentUserId, "File-Storage",folderURL,"Files",urlID);
    //TITLE CHANGES ONLY
    if(editedTitle != ""){
      await updateDoc(docRef, {
        title: editedTitle,
      });
      console.log("Title Updated")
      setIsEditing(false);
    }else{
      alert("No title were given !")
      await updateDoc(docRef, {
        title: "Empty",
      });
      setIsEditing(false);
    }
  }
};

const handleKeyUp = (e) => {
  if (e.key === 'Enter') {
    handleTitleBlur();
  }
};

//BACK BTN
const navigateBack = () => {
  navigate(`/folder/${folderUrl}`);
};

//  TRANSCRIPTION UPDATE
useEffect(() => {
  if(currentuser){ 
    try{
      const currentUserId = currentuser.uid; //UID
      const userDocRef = doc(db, "users", currentUserId);
      const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
      const fileChildrenRef = doc(folderElementRef ,"Files",currentURL);
      //Transcription Text
      const transcription_data = transcriptionData
      // Create a new document in Firestore with the HTML content
      updateDoc(fileChildrenRef, {
        transcription: transcription_data,
      });
      console.log("Transcription Stored");
    } catch(error) {
      console.log(error)
    }
  }
}, [transcriptionData]);


return (
<Container fluid>
    <div className='zero_bar-row2'> 
      <div className='back-button'>
        <ArrowBackIosNewIcon onClick={navigateBack} sx={{p:1}}/> 
      </div>
    </div>
    <div className='file-page'>
      {/*1 BAR */}
      <Row style={{width:"80%",marginRight:"auto",marginLeft:"auto",paddingTop:20,alignItems:"center"}}>
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
        <Col className='col-auto' style={{border:"1px solid black"}} >
            <DesignServicesIcon/>
        </Col>
        <Col className='col-auto' style={{border:"1px solid black"}} >
            <DesignServicesIcon/>
        </Col>
    </Row>
      {/*2 BAR */}
      <div className='sec_bar-cont'>
        {/*VIDEO FRAME With PAG*/}
        {!secBarState?
          <>
            <div className='sec_bar-video'>
              <FrameVideo crossOrigin="anonymous" videoSrc={fileElements.url} />
            </div>
            {/*CLIPS COLLECTION*/}
            <div className='sec_bar-clips-cont'>
              {childrenFiles.length === 0 ? (
                <p style={{textAlign:"center",marginTop:80,opacity:0.6}} >No related videos added</p>
              ) : (
                childrenFiles.map(element => (
                  element && element.id ? (
                    <div className="clip-sec" key={element.id}>
                      {/* You might want to uncomment the Link component if needed */}
                      <Link to={`/folder/${folderUrl}/${currentURL}/${element.id}`}> 
                        <RelatedVideoBar imgURL={element.img} relatedDuration={(element.duration).match(/\d+:\d+:\d+/)[0]} relatedTag={element.tag} relatedTitle={element.title}/>
                      </Link> 
                    </div>
                  ):null
                ))
              )}
                
              <div className='pagination-bar'>
                <PaginationUi 
                  fetchNextPage={nextPage} 
                  fetchPreviousPage={fetchPreviousPage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                /> {/*Pagination Bottom Bar*/}
              </div>
            </div>
          </>:(
            <div className='sec_bar-video-main'>
              <FullFrameVideo crossOrigin="anonymous" videoSrc={fileElements.url} />
            </div>
          )}
      </div>
       {/*TOGGLE BUTTON */}
      <div className='main-view-select'>
        <ToggleButtons secBarState={setSecBarState}/>
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
)}
export default File