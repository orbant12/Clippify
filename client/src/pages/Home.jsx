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

const [isPlusClicked,setIsPlusClicked] = useState(false)
const [folderTitle, setFolderTitle] = useState('');
const [folderColor, setFolderColor] = useState('');

//<******************************FUNCTIONS*******************************>

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

const fetchUserFolder = async () => {
  if (!currentuser) {
    setFolders([]);
    console.log("No user logged in");
    return;
  }
  // USER ID & FIRESTORE REF
  const currentUserId = currentuser.uid;
  //const colRef = collection(db, "users", currentUserId, "File-Storage");
const folderResponse = await fetch(`http://localhost:3000/user/folder/get/${currentUserId}`,{
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

//UPDATES DEPENDING ON USER "FILE-Storage" DOCS
useEffect(() => {
  // Call fetchData
  fetchData();
  fetchUserFolder();
}, [currentuser]);

//RECENTLY ADDED
useEffect(() => {
  const fetchRecent = async () => {
    try{
      if (userData !== null) {
        const recentFileId = userData.recent_file_id;
        const recentFolderId = userData.recent_folder_id;
        //FETCHIN FOR RECENT FILE
        if(recentFileId){
          const response =  await fetch(`http://localhost:3000/recent`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                recent_folder_id: recentFolderId,
                recent_file_id: recentFileId,
                user_Id: currentuser.uid
              }),
          });
          if (response.status === 200) {
            // Document exists, retrieve its data
            const elementData = await response.json();
            setRecentFiles(elementData);
            folderUrl(elementData.folder_id)
          } else {
            console.log("Document does not exist.");
            setRecentFiles([]); // Set to null or handle accordingly
          }
        }
      }
    } catch(err) {
      console.log(err)
    }
  }
  fetchRecent();
}, [userData]);

// POP UP INPUTS
const togglePopup = () => {
  setIsPlusClicked(!isPlusClicked);
};


// SETDOCS DETAILS.
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
      id: folderUID,
      files_count: 0,
    };
    // HTTP POST
    fetch(`http://localhost:3000/folder-create/${currentUserId}`, {
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

// CLICKED ON SUBMIT.
function handleSubmit(e) {
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
  <hr className='divider-home' />
    {/*RECENTLY ADDED*/}
    <div className="memory_title">
      <h2>Recently Openned</h2>
    </div>
    <div className="folder-card-container" style={{padding:50}}>
        {/*ADDED DOCUMENT*/}
        {recentFiles.length == 0 ? (
          <div className="no-document">No Recent Clips's avalible yet...</div>
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
      <hr className='divider-home' />
    {/*FODLER ADDED*/}
    <div className="memory_title" >
      <h2>Your Folders</h2>
    </div>
    <div className="folder-card-container" > 
      <div className="folder-card-box" >
        {/*ADDED FOLDER*/}
        {!isPlusClicked ? (
            <div
              className="ag-courses_item"
              id="popOpen"
              onClick={togglePopup}
            >
              <a className="ag-courses-item_link" id='add_item_bg'> 
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title" style={{alignItems:"center",display:"flex",flexDirection:"row",justifyContent:"start",height:"100%"}}>
                  <h4>+</h4>
                  <h5 style={{paddingLeft:10,fontWeight:600,fontSize:23}}>Create Folder</h5>
                </div>
              </a>
            </div>
          ) : (
            <div className={`popup`} id="popup-plus" onSubmit={handleSubmit}>
              <div className="content-popup">
                <div
                  className="close-btn"
                  onClick={togglePopup}
                  id="popClose"
                >
                  &times;
                </div>
                <h1 className="popup-title">Create File</h1>
                <div className="wave-group">
                  <input
                    value={folderTitle}
                    type="text"
                    className="input"
                    id="user-container-title"
                    onChange={(e) => setFolderTitle(e.target.value)}
                  />
                  <span className="bar"></span>
                  <label className="label">
                    <span className="label-char" style={{ '--index': 0 }}>
                      T
                    </span>
                    <span className="label-char" style={{ '--index': 1 }}>
                      i
                    </span>
                    <span className="label-char" style={{ '--index': 2 }}>
                      t
                    </span>
                    <span className="label-char" style={{ '--index': 3 }}>
                      l
                    </span>
                    <span className="label-char" style={{ '--index': 4 }}>
                      e
                    </span>
                  </label>
                  <div className="colorDiv">
                    <p>Pick a Color</p>
                    <div className="bottom-add-folder">
                      <span className="color-picker">
                        <label>
                          <input
                            type="color"
                            value={folderColor}
                            onChange={(e) => setFolderColor(e.target.value)}
                            id="colorPicker"
                          />
                        </label>
                      </span>
                      <button
                        className="btn-add-file"
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
        {folders.length === 0 ? (
          <div className="no-folder">
            <a href="/memory" className='no-folder-a' >No Folder Added ! <br /> <span style={{fontSize:15}}>Click to Create ..</span><br />
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


