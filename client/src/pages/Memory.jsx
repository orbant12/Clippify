// REACT & CONTEXTS
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/UserAuthContext';
import { Link } from 'react-router-dom';

// CSS
import '../Css/memory.css';

// ICONS
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import CloudSyncIcon from '@mui/icons-material/CloudSync';


export function Memory() {


//<******************************VARIABLES*******************************>

// COMMON VARIABLES
const { currentuser } = useAuth();

// FOLDERS DETAILS
const [folderTitle, setFolderTitle] = useState('');
const [folderColor, setFolderColor] = useState('');
const [folders, setFolders] = useState([]);
const [isPlusClicked, setIsPlusClicked] = useState(false);

//<******************************FUNCTIONS*******************************>

//FETCH USER SPECIFIC FOLDER
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

// UPDATES DEPENDING ON USER "FILE-Storage" DOCS.
useEffect(() => {
  fetchUserFolder();
}, [currentuser]);

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
    // INPUT LISTENERS BACK TO DEFAULT
    setFolderTitle('');
    setFolderColor('');
  } else {
    alert('Please fill all the fields');
  }
}

// Access the state values.
const handleInputChange = (event) => {
  setFolderTitle(event.target.value);
};

const handleInputChange2 = (event) => {
  setFolderColor(event.target.value);
};

// POP UP INPUTS
const togglePopup = () => {
  setIsPlusClicked(!isPlusClicked);
};

return (
<div className="memory">

    <div className="memory_title_memory">
      <h2>Your Folders</h2>
      <h6>Click on the folder to open and <span style={{borderBottom:"1px solid white"}}>see/add</span> your videos</h6>
    </div>
    <div className="ag-format-container">
      <div className="ag-courses_box" id="div-container">
        {!isPlusClicked ? (
          <div
            className="ag-courses_item"
            id="popOpen"
            onClick={togglePopup}
          >
            <a className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                <i className="bx bx-plus icon"></i>
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
                  onChange={handleInputChange}
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
                          onChange={handleInputChange2}
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

        {/* ADDED DOM */}
        {folders.map((folder) => {
          return (
            <div className="ag-courses_item" key={folder.id}>
              <Link to={`/folder/${folder.id}`}>
                <div className="ag-courses-item_link">
                  <div
                    className="ag-courses-item_bg"
                    style={{ background: folder.color }}
                  />

                  <div className="ag-courses-item_title">{folder.title}</div>
                  <div className="ag-bottom">
                    <div className="ag-courses-item_date-box">
                      <h3>{folder.files_count} Files</h3>
                      <SnippetFolderIcon className="ag-folder-icon" />
                    </div>
                    <div className="auto-sync">
                      <CloudSyncIcon className="ag-auto-sync" />
                      <h6>Auto Sync</h6>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
</div>
);}