//REACT & CONTEXTS
import React, { useState, useEffect  } from 'react';
import { useAuth } from '../context/UserAuthContext'

//CSS
import '../Css/sidebar.css'
import '../Css/home.css'

//REST API LOCATION
import { ApiLocataion } from '../server.js';

//PAGE COMPONENTS
import WelcomeRow from '../assets/Components/Home/PageComponents/WelcomeRow.jsx'
import RecentRow from '../assets/Components/Home/PageComponents/RecentRow.jsx'
import FolderRow from '../assets/Components/Home/PageComponents/FolderRow.jsx'

//FETCHING FUNCTIONS
import { fetchUserFolders, fetchRecentFile, fetchUserData } from '../server.js';



export function Home({folderUrl}) {


//<******************************VARIABLES*******************************>

//CURRENT USER
const { currentuser } = useAuth();

//USER DATA
const [folders, setFolders] = useState([]);
const [recentFiles, setRecentFiles] = useState([]);
const [userData, setUserData] = useState([]);

//FOLDER CREATION STATES  
const [isPlusClicked,setIsPlusClicked] = useState(false)
const [folderTitle, setFolderTitle] = useState('');
const [folderColor, setFolderColor] = useState('');
const [visibilityFolder, setVisibilityFolder] = useState('public');


//<******************************FUNCTIONS*******************************>

//<====> DATA FETCHING PROCESSES <====>

const fetchData = async () => {
  try {
    if (currentuser) {
      const currentUserId = currentuser.uid;
      //const userDocRef = doc(db, "users", currentUserId);
      const response = await fetchUserData(currentUserId)
      const user = await response.json();
      if (user) {
        setUserData(user);
      } else {
        console.log("Failed to fetch user data.");
        setUserData(null); // Set to null or handle accordingly
      }
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

const fetchRecent = async () => {
  try{
    if (userData !== null) {
      const recentFileId = userData.recent_file_id;
      const recentFolderId = userData.recent_folder_id;
      //FETCHIN FOR RECENT FILE
      if(recentFileId){
        const response =  await fetchRecentFile({
          recentFileId: recentFileId,
          recentFolderId: recentFolderId,
          currentuser: currentuser
        })
        if (response.status === 200) {
          // Document exists, retrieve its data
          const elementData = await response.json();
          setRecentFiles(elementData);
          folderUrl(elementData.folder_id)
        } else {
          console.log("Failed to fetch recent file.");
          setRecentFiles([]); // Set to null or handle accordingly
        }
      }
    }
  } catch(err) {
    console.log(err)
  }
}

const fetchUserFolder = async () => {
  if (!currentuser) {
    setFolders([]);
    console.log("No user logged in");
    return;
  }

  const currentUserId = currentuser.uid;
  const folderResponse = await fetchUserFolders(currentUserId)

  if (folderResponse.status === 200) {
    // Document exists, retrieve its data
    const folderData = await folderResponse.json();
    setFolders(folderData);
  } else {
    console.log("Document does not exist.");
    setFolders([]); // Set to null or handle accordingly
  }   
}

useEffect(() => {
  // Call fetchData
  fetchData();
  fetchUserFolder();
  fetchRecent();
}, [currentuser]);


//<====> Handlers <====>

const togglePopup = () => {
  setIsPlusClicked(!isPlusClicked);
};

function addFolder() {
  if (currentuser) {
    // USER ID & FIRESTORE REF
    const currentUserId = currentuser.uid;
    //CUSTOM FOLDER NON STRING UID
    const folderUID = Math.random().toString(36).substring(2, 15);
    //const docRef = collection(db, 'users', currentUserId, 'File-Storage');
    // CREATED FOLDER DETAILS
    const newFolder = {
      title: folderTitle,
      color: folderColor,
      visibility: visibilityFolder,
      creator_name: userData.fullname,
      id: folderUID,
      files_count: 0,
    };
    // HTTP POST
    fetch(`${ApiLocataion}/folder-create/${currentUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({folderData:newFolder,folderId:folderUID}),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Folder Added Successfully")
        fetchUserFolder();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleFolderCreateSubmit(e) {
  if (folderTitle !== '' && folderColor !== '') {
    e.preventDefault();
    // POP UP CLOSE
    togglePopup();
    // ADD FOLDER TRIGGER
    addFolder();
    //FETC
    fetchData()
    // INPUT LISTENERS BACK TO DEFAULT
    setFolderTitle('');
    setFolderColor('');
  } else {
    alert('Please fill all the fields');
  }
}

const handleFolderNavigation = (folderId) => {
  window.location.href = `/folder/${folderId}`;
} 


return (
  <div className="home">
    <WelcomeRow userData={userData} />
      {/*RECENT ROW*/}
      {recentFiles.length != 0 ? (
      <RecentRow recentFiles={recentFiles} />
      ):null}
      {/*FOLDER ROW*/}
      <FolderRow 
        folders={folders}
        folderTitle={folderTitle}
        setFolderTitle={setFolderTitle}
        folderColor={folderColor}
        setFolderColor={setFolderColor}
        visibilityFolder={visibilityFolder}
        setVisibilityFolder={setVisibilityFolder}
        isPlusClicked={isPlusClicked}
        setIsPlusClicked={setIsPlusClicked}
        handleFolderCreateSubmit={handleFolderCreateSubmit}
        handleFolderNavigation={handleFolderNavigation}
      />
  </div>
)}


