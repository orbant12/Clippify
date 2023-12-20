//REACT & CONTEXTS
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/UserAuthContext'
import { Link } from 'react-router-dom';

//FIRESTORE
import { collection, doc, setDoc,getDocs} from "firebase/firestore";
import {db} from "../firebase";

//CSS
import '../Css/styles.css'
import '../Css/sidebar.css'

//ICONS
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import CloudSyncIcon from '@mui/icons-material/CloudSync';


export function Memory() {

// COMMON VARIABLES
const { currentuser } = useAuth();

// FOLDERS DETAILS
const [folderTitle, setfolderTitle] = useState("");
const [folderColor, setfolderColor] = useState("");
const [folders, setFolders] = useState([]);
const [isPlusClicked,  setIsPlusClicked] = useState(false);
  
// UPDATES DEPENDING ON USER "FILE-Storage" DOCS.__________________//
useEffect(() => {
  if(currentuser){
    //USE ID & FIRESTORE REF
    const currentUserId = currentuser.uid;
    const colRef = collection(db, "users", currentUserId, "File-Storage");

    //GET ALL FODLERS
    getDocs(colRef)
    .then((querySnapshot) => {
      const userFolders = [];
      querySnapshot.forEach((doc) => {
        userFolders.push({ id: doc.id, ...doc.data() });
      });
      setFolders(userFolders);
    }).catch( (error) => {
      console.error("Error fetching user folders: ", error);
    });
  }
}, [currentuser]); 
  
// SETDOCS DETAILS.___________________________________________________________________________
function addFolder() {
  if (currentuser){
    // USER ID & FIRESTORE REF
    const currentUserId = currentuser.uid;
    const docRef = collection(db, "users", currentUserId, "File-Storage");
    const newFolderRef = doc(docRef);
    // CREATED FOLDER DETAILS
    const newFolder = {
      title: folderTitle,
      color: folderColor,
      id: newFolderRef.id,
      files_count:0,
    };
    //SET FOLDER DETAILS TO FIRESTORE
    setDoc(newFolderRef, newFolder)
    .then(() => {
      setFolders((currentFolders) => [
        ...currentFolders,
        { id: newFolderRef.id, ...newFolder },
      ]);
    })
  }
};
   
// CLICKED ON SUBMIT.____________________________________//
function handleSubmit(e) {
if (folderTitle != "" && folderColor != ""){
  e.preventDefault();
  //POP UP CLOSE
  togglePopup();
  //ADD FOLDER TRIGGER
  addFolder();
  //INPUT LISTENERS BACK TO DEFAULT
  setfolderTitle("")
  setfolderColor("")
}else{
  alert("Please fill all the fields")
}
}
  
// Access the state values.___________________//
const handleInputChange = (event) => {
  setfolderTitle(event.target.value);
};

const handleInputChange2 = (event) => {
  setfolderColor(event.target.value);
};
  
// POP UP INPUTS______________________________________________________________.
const togglePopup = () => {
  setIsPlusClicked(!isPlusClicked);
};

return (
    <div className="memory">
    <section id="userCreated-Files">
              <div className="memory_title_memory" >
                <h2>Your Memory</h2>
              </div>
              <div className="ag-format-container" >
               
                <div className="ag-courses_box" id="div-container">
                {!isPlusClicked ?( 
                  <div className="ag-courses_item_plus" id="popOpen" onClick={togglePopup}>
                    <a  className="ag-courses-item_link_plus">
                      <div className="ag-courses-item_bg_plus"></div>
                      
                      <div className="ag-courses-item_title_plus">
                        <i className='bx bx-plus icon' ></i>
                      </div>
              
                      
                    </a>
                  </div>
                  ):(
                 
                  <div className= {`popup`} id="popup-plus" onSubmit={handleSubmit}>
                    <div className="content-popup">
                      <div className="close-btn" onClick={togglePopup} id="popClose">&times;</div>
                      <h1 className='popup-title'>Create File</h1>
                     <div className="wave-group">
                        <input  value={folderTitle} type="text" className="input" id="user-container-title" onChange={handleInputChange}/>
                        <span className="bar"></span>
                        <label className="label">
                          <span className="label-char" style={{ '--index': 0 }}>T</span>
                          <span className="label-char" style={{ '--index': 1 }}>i</span>
                          <span className="label-char" style={{ '--index': 2 }}>t</span>
                          <span className="label-char" style={{ '--index': 3 }}>l</span>
                          <span className="label-char" style={{ '--index': 4 }}>e</span>
                        </label>
                        <div className='colorDiv'>    
                  <p>Pick a Color</p>
                  <div className='bottom-add-folder'>
                      <span className="color-picker">
                        <label>
                         <input type="color"  value={folderColor} onChange={handleInputChange2} id="colorPicker"/>
                
                        </label>
                      </span>
                      <button className="btn-add-file" onClick={handleSubmit} />
                      </div>
              </div> 
              
                
                
                     
                      </div>
                    </div>
                </div>
                )}
              

              {/*ADDED DOM*/}
                  {folders.map(folder => {
                  return (
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
                  )
                

                  
                })}

                </div>
  
                </div>
                  
               
            </section>
    
</div>
)
}

