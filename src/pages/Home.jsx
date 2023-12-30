//REACT & CONTEXTS
import React, { useState, useEffect  } from 'react';
import { useAuth } from '../context/UserAuthContext'
import { Link } from 'react-router-dom';
//FIREBASE
import { collection, doc, getDocs,query,limit,getDoc} from 'firebase/firestore';
import { db } from "../firebase";
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
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import TwitterIcon from '@mui/icons-material/Twitter';


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
  if (!currentuser) {
    setFolders([]);
    return;
  }
  // USER ID & FIRESTORE REF
  const currentUserId = currentuser.uid;
  const colRef = collection(db, "users", currentUserId, "File-Storage");
  // Fetch all documents (folders) in the subcollection
  getDocs(colRef)
    .then((querySnapshot) => {
      const userFolders = [];
      querySnapshot.forEach((doc) => {
        userFolders.push({ id: doc.id, ...doc.data() });
      });
    setFolders(userFolders);
    })
    .catch((error) => {
      console.error("Error fetching user folders: ", error);
    });
    //FETCH USER DATA
    const fetchData = async () => {
      try {
        if (currentuser) {
          const currentUserId = currentuser.uid;
          const userDocRef = doc(db, "users", currentUserId);
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            // Document exists, retrieve its data
            const elementData = docSnapshot.data();
            setUserData(elementData);
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
}, [currentuser]);

//RECENTLY ADDED
useEffect(() => {
  const fetchRecent = async () => {
    try{
      if (userData !== null) {
        const fileChildrenRef = userData.recent;
        folderUrl(userData.folder_id)
        const docSnapshot = await getDoc(fileChildrenRef)
        if (docSnapshot.exists()) {
          // Document exists, retrieve its data
          const elementData = docSnapshot.data();
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
  <div id="userCrated-Files">
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

    {/*RECENTLY ADDED*/}
    <div className="memory_title">
      <h2>Recently Openned</h2>
    </div>
    <div className="ag-format-container">
      <div className="ag-courses_box2">
        {/*ADDED DOM*/}
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
    </div>
    <div className="memory_title" >
      <h2>Your Memory</h2>
    </div>
    <div className="ag-format-container" > 
      <div className="ag-courses_box" >
        {/*ADDED DOM*/}
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
</div>
)}


