//REACT AND CONTEXTS
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from "react-router-dom";
import { useAuth } from '../context/UserAuthContext';

//FIREBASE
import { doc,deleteDoc, updateDoc } from "firebase/firestore";
import { db,storage } from "../firebase";
import { ref, uploadString, getDownloadURL,deleteObject,uploadBytes } from 'firebase/storage';

//UID GENERATOR
import {v4} from "uuid";

//PAGE COMPONENTS
import TitleRow from '../assets/Components/File/PageComponents/TitleRow';
import ContentRow from '../assets/Components/File/PageComponents/ContentRow';

//COMPONENTS
import Editor from '../assets/Components/File/txtEditor/txtEditor';
import Example from "../assets/Components/FileAdd/VideoUpload";

//CSS
import '../Css/file.css'

//BS
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

//REST API LOCATION
import { ApiLocataion } from '../firebase';


function File({prevUrl,mainFileURL}) {

//<******************************VARIABLES*******************************>

//COMMON VARIABLES
const { id } = useParams();
const { currentuser } = useAuth();
const folderUrl = prevUrl; 
const currentURL = id; 
const navigate  = useNavigate();

//USER DATA
const [fileElements, setFileElements] = useState([]);
const [userData,setUserData] = useState([]);

//TOGGLE STATES
const [secBarState, setSecBarState] = useState(false);

//PAGINATION
const [childrenFiles, setChildrenFiles] = useState([]);
const [lastVisible, setLastVisible] = useState(null);
const [firstVisible, setFirstVisible] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

//FILE CREATION
const [fileTitle , setFileTitle] = useState("Untitled");
const [fileImage, setFileImage] = useState("");
const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
const [audioFile, setAudioFile] = useState(null);
const [metaData, setMetaData] = useState(null);
const [transcriptionData, setTranscriptionData]= useState("");
const [fileTag, setFileTag ] = useState("")

//RICH TXT EDITOR
const [generatedHtml,setGeneratedHtml] = useState(null);
const [newContentUpdate,setNewContentUpdate] = useState(null);
const [saveContent,setSaveContent] = useState(null);

//File Title Edit
const [isEditing, setIsEditing] = useState(false);
const [newTitle, setNewTitle] = useState(fileElements.title);


//<******************************FUNCTIONS*******************************>

//<====> RECENT FILE UPDATE <====>

const setRecentlyOpenned = async () => {
  if (currentuser) {
    const currentUserId = currentuser.uid;
    updateRecentFile({
      currentUserId: currentUserId,
      folderUrl: folderUrl,
      currentURL: currentURL,
    })
  }
}


//<====> USER DATA <====>

const fetchData = async () => {  
  try {
    if (currentuser) {
      //USER DATA AND FIRESTORE REFS
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      //Folder ELEMENT FETCH
      //await getDoc(userDocRef);
      const userSnapshot = await fetch(`${ApiLocataion}/user/${currentUserId}`)
      const docSnapshot = await fetch(`${ApiLocataion}/file/${currentURL}`,{
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

const fetchChildren = async () => {
  if(currentuser){
    //PAGINATION INITIAL STATE FETCH FROM REST API
    const currentUserId = currentuser.uid;
    const urlID = folderUrl;
    const queryResponse = await fetch(`${ApiLocataion}/file/children/${currentURL}`, {
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

useEffect(() => {
  mainFileURL(currentURL)
  //USER DATA
  fetchData();
  fetchChildren();
  //RECENT FILE UPDATE
  setRecentlyOpenned();
}, [id, currentuser]);


//<====> CREATE RELATED FILE <====>

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
  relatedFileUID,
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
      const newRelatedFile = {
        title: userFileTitle,
        img: userFileImage,
        url: userVideoURL,
        id: relatedFileUID,
        folder_id: folderUrl,
        tag: userTag,
        duration: formattedDuration,
        storage_path_video:storagePathVideo,
        storage_path_audio:storagePathAudio,
        content: generatedHtml,
        transcription:"",
        video_size: videoSize,
      };
  
      //== FIRESTORE UPLOAD ==//
      const createResponse = await createRelatedFile({
        newRelatedFile: newRelatedFile,
        folderID: folderID,
        fileID: currentURL,
        currentUserId: currentUserId,
        userData: userData,
        videoSize: videoSize,
        currentStorageTake: userData.storage_take,
      })
      if (createResponse.status === 200) {
        const StatusLog = await createResponse.json();
        alert("Your clip has been uploaded succesfully !")
      }else if (createResponse.status === 400) {
        alert("Something went wrong, try refreshing the page !");
      }
}

const createRelatedFile = async () => {
  if (currentuser){
    const urlID = folderUrl;
    const currentURL = id
    const allName = `${v4() + metaData.videoName}`
    const metaName = `videos/${allName}`
    const audioName = `audio/${allName}`
    const relatedFileUID = `r_file_${v4()}`
    const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + currentURL + "/" + relatedFileUID + "/" + metaName}`
    const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + currentURL + "/" + relatedFileUID + "/" + audioName}`
    const currentUserId = currentuser.uid;

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
      relatedFileUID,
      currentUserId,
      userData,
      metaData,
      fileTitle,
      fileImage,
      fileTag
    })
    //== 3.) UPDATE DATA IN THE END ==//
    await fetchData()
  };
};


//<====> PAGINATION <====>

const nextPage = async () => {
  if (currentuser) {
    try {
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      const queryResponse = await fetch(`${ApiLocataion}/file/children/${currentURL}`, {
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

const fetchPreviousPage = async () => {
  if (currentuser) {
    try {
      const currentUserId = currentuser.uid;
      const urlID = folderUrl;
      const queryResponse = await fetch(`${ApiLocataion}/file/children/${currentURL}`, {
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


//<====> RICH TEXT EDITOR <====> CHECKOPOINT !!!!!

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


//<====> HANDLERS <====>

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

const navigateBack = () => {
  navigate(`/folder/${folderUrl}`);
};


//<====> TRANSCRIPT UPDATER <====>

useEffect(() => {
  if(currentuser){ 
    try{
      const currentUserId = currentuser.uid; //UID
      const userDocRef = doc(db, "users", currentUserId);
      const folderElementRef = doc(userDocRef, "File-Storage", folderUrl);
      const fileChildrenRef = doc(folderElementRef ,"Files",currentURL);
      const transcription_data = transcriptionData

      updateDoc(fileChildrenRef, {
        transcription: transcription_data,
      });
    } catch(error) {
      console.log(error)
    }
  }
}, [transcriptionData]);


//<====> RELATED FILE COUNTER TRACKER <====>

useEffect(() => {
  if(currentuser){
    if(fileElements.length !== 0){
      if(childrenFiles){
        //USER DATA AND FIRESTORE REF
          const currentUserId = currentuser.uid; 
          const numberOfChild = childrenFiles.length
          fetch(`${ApiLocataion}/file/update-count/${currentURL}`, {
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


return (
  <Container fluid>
      <div className='file-page'>
        {/*1 BAR */}
        <TitleRow
          newTitle={newTitle}
          isEditing={isEditing}
          handleTitleChange={handleTitleChange}
          handleKeyUp={handleKeyUp}
          handleTitleClick={handleTitleClick}
          handleDelete={handleDelete}
          navigateBack={navigateBack}
        />
        {/*2 BAR */}
        <ContentRow
          secBarState={secBarState}
          setSecBarState={setSecBarState}
          fileElements={fileElements}
          childrenFiles={childrenFiles}
          folderUrl={folderUrl}
          currentURL={currentURL}
          nextPage={nextPage}
          fetchPreviousPage={fetchPreviousPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
        {/*3 BAR*/}
        <div className='third_bar-features-cont'>
          <div className='rich-txt-editor'>
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