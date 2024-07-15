//REACT & CONTEXTS
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/UserAuthContext';

//COMPONENTS
import Avatar from '@mui/material/Avatar';

//CSS
import '../src/Css/sidebar.css'

//REST API LOCATION
import { ApiLocataion } from './firebase';

//FIREBASE
import {auth} from "./firebase"
import { signOut } from 'firebase/auth';

//ICONS
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';

//FETCHING FUNCTIONS
import { fetchUserFolders,fetchUserData } from './server.js';


function SideBar({themeSwitch}) {

//<******************************VARIABLES*******************************>

//CURRENT USER
const { currentuser } = useAuth();

//CURRENT USER DATA
const [UserData, setUserData] = useState([]);
const [Folders, setFolders] = useState([]);

//TOGGLES
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
const [isFolderActive, setIsFolderActive] = useState(true);

//CURRENT PATH
const [currentPath, setCurrentPath] = useState(window.location.pathname);


//<******************************FUNCTIONS*******************************>

//<====> DATA FETCHING PROCESSES <====>

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
        console.log("Failed to fetch user folders.");
        setFolders([]); // Set to null or handle accordingly
    }   
}

const fetchData = async () => {
    try {
        if (currentuser) {
            const currentUserId = currentuser.uid;
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

useEffect(() => {
    //FETCH USER DATAS
    fetchData();
    fetchUserFolder();
    //SET CURENT PATH
    setCurrentPath(window.location.pathname);
}, [currentuser]);


//<====> HANDLERS <====>

const userSignOut = async() => {
    signOut(auth);
    alert("You have been signed out");
};

const body = document.querySelector('body'),
sidebar = body.querySelector('nav.sidebar')

const barToggle = () => {
    sidebar.classList.toggle("close");
    body.classList.toggle("sidebar-close");
};

const handleDropDown = () => {
    const dropDown = body.querySelector('.drop-down-arrow');
    const navLink = body.querySelector('.nav-link-drop');
    navLink.classList.toggle('active');
    dropDown.classList.toggle('rotate');
    setIsFolderActive(!isFolderActive);
}

const handleAddFolderModal = () => {
    setIsAddFolderModalOpen(!isAddFolderModalOpen);
}



return ( 

<div style={currentPath != "/landing" ?{}:{display:"none"}}>
    <MobileSideBarComponent
        themeSwitch={themeSwitch}
        UserData={UserData}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userSignOut={userSignOut}
    />
    <SideBarComponent
        themeSwitch={themeSwitch}
        UserData={UserData}
        Folders={Folders}
        isFolderActive={isFolderActive}
        barToggle={barToggle}
        handleDropDown={handleDropDown}
        handleAddFolderModal={handleAddFolderModal}
        userSignOut={userSignOut}
    />
</div>

)}


export default SideBar


export const SideBarComponent = ({
    themeSwitch,
    UserData,
    Folders,
    isFolderActive,
    barToggle,
    handleDropDown,
    handleAddFolderModal,
    userSignOut
}) => {
    return (
        <nav className="sidebar" >
        <header>
            <div className="image-text">
                <div className='userURL'>
                    <Avatar alt={UserData.fullname} src={UserData.profilePictureURL} imgProps={{ crossOrigin: "anonymous" }} />
                </div>
                <div className="text logo-text">
                    <p className="name">{UserData.fullname}</p>
                    <span className="profession">Plan: {!UserData.subscription?<span>Free</span>:<span>Premium</span>}</span>
                </div>
            </div>
            <i className='bx bx-chevron-right toggle' onClick={barToggle} />
        </header>

        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links">
                    <li className="nav-link" >
                        <a href="/" >
                            <i className='bx bx-home icon' crossOrigin="anonymus" />
                            <span className="text nav-text" >Home</span>
                        </a>
                    </li>
                    <li className="nav-link-drop">
                        <a className="router" onClick={handleDropDown}>
                            <i className='bx bx-folder icon' crossOrigin="anonymus" />
                            <span className="text nav-text">Your Folders</span>
                            <ArrowRightIcon className='drop-down-arrow' />
                        </a>
                    </li>
                    {!isFolderActive ? (
                        <div className='dropped-folders-container'>
                            {Folders.length == 0 ? 
                            (
                            <div>
                                <p>No folders created yet</p>
                                <div className='create-folder-btn-sidebar' onClick={handleAddFolderModal}>
                                    <h5>Create Folder +</h5>
                                </div>
                            </div>
                            ):(
                                <>
                                    {Folders.map((folder) => (
        
                                        <Link className='folder-box' to={`folder/${folder.id}`}>
                                            <div className='folder-color' style={{background: folder.color}} />
                                            <h3 style={{maxWidth:80}}>{folder.title}</h3>
                                        </Link>
                                    ))}
                                </>
                            )}
                            

                        </div>
                    ):null}
                </ul>
            </div>
            <div className="bottom-content">
                <li className="">
                    <a href="/settings">
                        <i className='bx bx-cog icon' crossOrigin="anonymus" ></i>
                        <span className="text nav-text">Settings</span>
                    </a>
                </li>
                <li className="">
                    <a href="/login" onClick={userSignOut}>
                        <i className='bx bx-log-out icon' crossOrigin="anonymus" ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon' crossOrigin="anonymus"></i>
                        <i className='bx bx-sun icon sun' crossOrigin="anonymus"></i>
                    </div>
                    <span className="mode-text1 text">Dark mode</span>
                    <span className="mode-text2 text">Light mode</span>
                    <div className="toggle-switch">
                        <span className="switch" onClick={themeSwitch}></span>
                    </div>
                </li> 
            </div>
        </div>
    </nav>
    )
}

export const MobileSideBarComponent = ({
    themeSwitch,
    UserData,
    isSidebarOpen,
    setIsSidebarOpen,
    userSignOut
}) => {
    return(
        <div className='sidebaropener'>
        <MenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="sidebar" style={isSidebarOpen?{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"100%",border:"2px solid black"}:null} >
        <header>
            <div className="image-text">
                <div className='userURL'>
                    <Avatar alt={UserData.fullname} src={UserData.profilePictureURL} imgProps={{ crossOrigin: "anonymous" }} />
                </div>
                <div className="text logo-text">
                    <p className="name">{UserData.fullname}</p>
                    <span className="profession">Plan: {!UserData.subscription?<span>Free</span>:<span>Premium</span>}</span>
                </div>
            </div>
            <i className='bx bx-chevron-right toggle' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </header>
        <div className="menu-bar">
            <div className="menu-mobile">
                <ul className="menu-links">
                    <li className="nav-link" >
                        <a href="/" >
                            <i className='bx bx-home icon' crossOrigin="anonymus" />
                            <span className="text nav-text" >Home</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="/memory" className="router">
                            <i className='bx bx-brain icon' crossOrigin="anonymus" />
                            <span className="text nav-text">Your Memory</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="/policies" className="router">
                            <i className='bx bx-question-mark icon' crossOrigin="anonymus" />
                            <span className="text nav-text">Help</span>
                        </a>
                    </li>
                    <li className="nav-link">
                        <a href="/subscription">
                            <i className='bx bx-money icon' crossOrigin="anonymus" ></i>
                            <span className="text nav-text">Subscription</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="bottom-content">
                <li className="">
                    <a href="/settings">
                        <i className='bx bx-cog icon' crossOrigin="anonymus" ></i>
                        <span className="text nav-text">Settings</span>
                    </a>
                </li>
                <li className="">
                    <a href="/login" onClick={userSignOut}>
                        <i className='bx bx-log-out icon' crossOrigin="anonymus" ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon' crossOrigin="anonymus"></i>
                        <i className='bx bx-sun icon sun' crossOrigin="anonymus"></i>
                    </div>
                    <span className="mode-text1 text">Dark mode</span>
                    <span className="mode-text2 text">Light mode</span>
                    <div className="toggle-switch">
                        <span className="switch" onClick={themeSwitch}></span>
                    </div>
                </li> 
            </div>
        </div>
        </div>
    </div>
    )

}