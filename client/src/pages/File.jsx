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
//MUI
import DeleteIcon from '@mui/icons-material/Delete';

//ASSETS
import FrameVideo from '../assets/File/videoFrame';
import Editor from '../assets/File/txtEditor/txtEditor';
import RelatedVideoBar from '../assets/File/relatedVideo';
import PaginationUi from '../assets/File/paginationUI';
import ToggleButtons from "../assets/File/mainShow"
import FullFrameVideo from "../assets/File/fullVideoFrame"

//CSS
import '../Css/file.css'

//BS
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Example from "../assets/FileAdd/VideoUpload";


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
          const numberOfChild = childrenFiles.length
          fetch(`http://localhost:3000/file/update-count/${currentURL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              relatedCount: numberOfChild,
              userId: currentUserId,
            }),
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
    const recentDocRef = `/folder/${folderUrl}/${currentURL}`;
    fetch(`http://localhost:3000/recent/update/${currentUserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recent: recentDocRef,
      }),
    });
  }
}

//FECT FILE ELEMENTS
const fetchData = async () => {  
  try {
    if (currentuser) {
      //USER DATA AND FIRESTORE REFS
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      //Folder ELEMENT FETCH
      //await getDoc(userDocRef);
      const userSnapshot = await fetch(`http://localhost:3000/user/${currentUserId}`)
      const docSnapshot = await fetch(`http://localhost:3000/file/${currentURL}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderId: urlID,
          userId: currentUserId,
        }),
      
      })
      if (docSnapshot.status === 200) {
        // Document exists, retrieve its data
        const elementData = await docSnapshot.json();
        setFileElements(elementData);
        setNewTitle(elementData.title)
      
        setNewContentUpdate(elementData.content)
      } else {
        console.log("Document does not exist.");
        setFileElements(null); // Set to null if not exists
      }
      if (userSnapshot.status === 200) {
        // Document exists, retrieve its data
        const elementUserData = await userSnapshot.json();
        setUserData(elementUserData)
      } else {
        console.log("Document does not exist.");
        setUserData(null); // Set to null or handle accordingly
      }
    }
  } catch (error) {
    console.error("Error getting file: ", error);
    //window.location.href = "/"
  }
};

//FECT CHILDREN ELEMENTS
const fetchChildren = async () => {
  if(currentuser){
    //PAGINATION INITIAL STATE FETCH FROM REST API
    const currentUserId = currentuser.uid;
    const urlID = folderUrl;
    const queryResponse = await fetch(`http://localhost:3000/file/children/${currentURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderId: urlID,
        userId: currentUserId,
        pageLimit: 3,
      }),
    });
    try {
      const querySnapshot = await queryResponse.json();
      if (querySnapshot.data.length > 0) {
        // Update lastVisible and firstVisible
        const newLastVisible = querySnapshot.lastDocumentId;
        setLastVisible(newLastVisible);
        setFirstVisible(querySnapshot.data[0]);
        // Process the documents and add them to the state
        setChildrenFiles(querySnapshot.data);
        setTotalPages(querySnapshot.totalPages);
      } else {
        console.log("No documents to load.");
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

//RELATED FILE CREATION
const createRelatedFile = async () => {
  //STORAGE SETUP
  if (currentuser){
    //Fodler PATH
    const urlID = folderUrl;
    //CURRENT FILE PATH
    const currentURL = id
    //TYPE for AUDIO
    const audioMetadata = {
        contentType: 'audio/mp3',
    };
    //VIDE & AUDIO NAME
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    const relatedFileUID = `r_file_${v4()}`
    //STORAGE PATH NAMES
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + currentURL + "/" + relatedFileUID + "/" + metaName}`
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + currentURL + "/" + relatedFileUID + "/" + audioName}`
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

    await fetchData()
    console.log("recent sett succ")

    //CHILDREN FILE ELEMENTS & CREATION
    const newRelatedFile = {
      title: userFileTitle,
      img: userFileImage,
      url: userVideoURL,
      id: relatedFileUID,
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
    const response = await fetch(`http://localhost:3000/related-file/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderId: folderUrl,
        userId: currentuser.uid,
        fileId: currentURL,
        relatedFile: newRelatedFile,
        currentStorageTake: userData.storage_take,
        videoSize: videoSize,
      }),
    });
    if (response.status === 200) {
      console.log("Related file added successfully");
    } else {
      console.log("Error adding related file");
    }
  };
  //HIDE POP UP LOGIC
  if(isLinkActive){ 
    setIsLinkActive(false)
  }else if (isUploadActive){
    setIsUploadActive(false)
  }
};

// Pagination NEXT PAGE
const nextPage = async () => {
  if (currentuser) {
    try {
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      const queryResponse = await fetch(`http://localhost:3000/file/children/${currentURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderId: urlID,
          userId: currentUserId,
          pageLimit: 3,
          lastDocumentId: lastVisible ? lastVisible.id : null, // Send the ID of the last document for pagination
        }),
      });

      const querySnapshot = await queryResponse.json();

      if (querySnapshot.data.length > 0) {
        const newLastVisible = querySnapshot.lastDocumentId;
        setLastVisible(newLastVisible);
        setFirstVisible(querySnapshot.data[0]);
        setChildrenFiles(prevChildrenFiles => [...prevChildrenFiles, ...querySnapshot.data.filter(doc => !prevChildrenFiles.some(prevDoc => prevDoc.id === doc.id))]); // Append only new unique documents
      } else {
        console.log("No more documents to load.");
      }
    } catch (error) {
      console.error("Error fetching next page: ", error);
    }
  }
};

// Pagination PREVIOUS PAGE
const fetchPreviousPage = async () => {
  if (currentuser) {
    try {
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      const queryResponse = await fetch(`http://localhost:3000/file/children/${currentURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderId: urlID,
          userId: currentUserId,
          pageLimit: 3,
          firstDocumentId: firstVisible ? firstVisible.id : null, // Send the ID of the first document for pagination
        }),
      });

      const querySnapshot = await queryResponse.json();

      if (querySnapshot.data.length > 0) {
        const newFirstVisible = querySnapshot.firstDocumentId;
        setFirstVisible(newFirstVisible);
        setLastVisible(querySnapshot.data[querySnapshot.data.length - 1]);
        setChildrenFiles(prevChildrenFiles => [...querySnapshot.data.filter(doc => !prevChildrenFiles.some(prevDoc => prevDoc.id === doc.id)), ...prevChildrenFiles]); // Append only new unique documents
      } else {
        console.log("No more documents to load.");
      }
    } catch (error) {
      console.error("Error fetching previous page: ", error);
    }
  }
};


//CHECKPOINT _____!!!

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

//<*********************DELETE*********************>

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
      <Row style={{width:"80%",marginRight:"auto",marginLeft:"auto",paddingTop:70,alignItems:"center"}}>
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
    <Row>
      <Example handleUploadTrigger={createRelatedFile} setTitleInput={setFileTitle} setFileImageEXT={setFileImage} setExtractMetaEXT={setMetaData} setPassedAudioDataUrlEXT={setAudioFile} setVideoUrlEXT={setTrimmedVideoFile} />
    </Row>

</Container>
)}
export default File