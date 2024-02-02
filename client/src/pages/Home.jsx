//REACT & CONTEXTS
import React, { useState, useEffect  } from 'react';
import { useAuth } from '../context/UserAuthContext'
import { Link } from 'react-router-dom';


//CSS
import '../Css/styles.css'
import '../Css/sidebar.css'
import '../Css/home.css'
//ASSETS
import CircularWithValueLabel from '../assets/Home/progressBar'
import FileCard from '../assets/FileAdd/fileCard.jsx'
//ICONS
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';


export function Home({folderUrl}) {


//<******************************VARIABLES*******************************>

//COMMON VARIABLES
const { currentuser } = useAuth();

//FOLDERS
const [folders, setFolders] = useState([]);
const [recentFiles, setRecentFiles] = useState([]);
const [userData, setUserData] = useState([]);

//<******************************FUNCTIONS*******************************>

//UPDATES DEPENDING ON USER "FILE-Storage" DOCS
useEffect(() => {
  const fetchUserFolder = async () => {
    if (!currentuser) {
      setFolders([]);
      console.log("No user logged in");
      return;
    }
    // USER ID & FIRESTORE REF
    const currentUserId = currentuser.uid;
    //const colRef = collection(db, "users", currentUserId, "File-Storage");
  const folderResponse = await fetch(`http://localhost:3000/folder/${currentUserId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (folderResponse.status === 200) {
      // Document exists, retrieve its data
      const folderData = await folderResponse.json();
      setFolders(folderData);
    } else {
      console.log("Document does not exist.");
      setFolders([]); // Set to null or handle accordingly
    }   
  }
    //FETCH USER DATA
  const fetchData = async () => {
      try {
        if (currentuser) {
          const currentUserId = currentuser.uid;
          //const userDocRef = doc(db, "users", currentUserId);
          const response = await fetch(`http://localhost:3000/user/${currentUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
          });
          const user = await response.json();
          if (user) {
            setUserData(user);
          } else {
            console.log("Document does not exist.");
            setUserData(null); // Set to null or handle accordingly
          }
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
  };
  // Call fetchData
  fetchData();
  fetchUserFolder();
}, [currentuser]);

//RECENTLY ADDED
useEffect(() => {
  const fetchRecent = async () => {
    try{
      if (userData !== null) {
        const fileChildrenRef = userData.recent;
        //MAKING FOLDER URL ID GLOBAL
        folderUrl(userData.folder_id)
        //FETCHIN FOR RECENT FILE
        const response =  await fetch(`http://localhost:3000/recent`, {
            method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileChildrenRef }),
        });
        if (response.status === 200) {
          // Document exists, retrieve its data
          const elementData = await response.json();
          setRecentFiles(elementData);
          console.log(elementData.folder_id)
          folderUrl(elementData.folder_id)
        } else {
          console.log("Document does not exist.");
          setRecentFiles([]); // Set to null or handle accordingly
        }
      }
    } catch(err) {
      console.log(err)
    }
  }
  fetchRecent();
}, [userData]);


return (
<div className="home">
  <div className='welcome-row'>
    <div>
      <h1>Welcome Back, {userData.fullname}</h1>
      <h6>Clippify is the place to learn and save information</h6>
    </div>
    <div className='cloud'>
      <div><CircularWithValueLabel progress={userData.storage_take / 1000000 / 1000} className='cloud-progress'/></div>
        {userData.subscription ?(<h5>{(userData.storage_take / 1000000 / 1000).toFixed(2)} / 100 GB</h5>):(<h5>{(userData.storage_take / 1000000 / 1000).toFixed(2)} / 10 GB</h5>)}
      <h2 className='cloud-title'>Cloud Storage</h2>
    </div>
  </div>
<hr />
    {/*RECENTLY ADDED*/}
    <div className="memory_title">
      <h2>Recently Openned</h2>
    </div>
    <div className="folder-card-container" style={{padding:50}}>
   
        {/*ADDED DOCUMENT*/}
        {recentFiles.length === 0 ? (
          <div className="no-document">No Recent Clips's added</div>
        ) : (
          <Link to={`/folder/${recentFiles.folder_id}/${recentFiles.id}`}>
            <FileCard 
              imgSrc={recentFiles.img} 
              imgAlt="file img" 
              title={recentFiles.title} 
              tags={recentFiles.tag} 
              related_count={recentFiles.related_count} 
              video_size={recentFiles.video_size}
            />
          </Link>
        )}
      </div>
    <hr />
    {/*FODLER ADDED*/}
    <div className="memory_title" >
      <h2>Your Memory</h2>
    </div>
    <div className="folder-card-container" > 
      <div className="folder-card-box" >
        {/*ADDED FOLDER*/}
        {folders.length === 0 ? (
          <div className="no-folder">
            <a href="/memory" className='no-folder-a' >No Folders Yet <br />
              <div className='inline_txt'><CreateNewFolderIcon sx={{mt:3,pt:0}}/></div>
            </a>
          </div>
        ) : (
          folders.map((folder) => 
            folder && folder.id ? (
              <div className="ag-courses_item" key={folder.id}>
                <Link to={`/folder/${folder.id}`}>
                  <div className="ag-courses-item_link">
                    <div className="ag-courses-item_bg" style={{background: folder.color}} />
                    <div className="ag-courses-item_title" >{folder.title}</div>
                    <div className='ag-bottom'>
                      <div className="ag-courses-item_date-box">
                        <h3>{folder.files_count} Files</h3>
                        <SnippetFolderIcon className='ag-folder-icon'/>
                      </div>
                      <div className='auto-sync'>
                        <CloudSyncIcon className='ag-auto-sync'/>
                        <h6>Auto Sync</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ):null
          )
        )}
      </div>
    </div>
  </div>
)}


