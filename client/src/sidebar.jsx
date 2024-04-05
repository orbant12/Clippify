import React, { useState, useEffect } from 'react';

import { useAuth } from './context/UserAuthContext';

import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import '../src/Css/sidebar.css'
import { ApiLocataion } from './firebase';

import {auth} from "./firebase"
import { signOut } from 'firebase/auth';

function SideBar({themeSwitch}) {

const { currentuser } = useAuth();

//CURRENT USER DATA
const [UserData, setUserData] = useState([]);

//SIDEBAR TOGGLE
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const [currentPath, setCurrentPath] = useState(window.location.pathname);

useEffect(() => {
    const fetchData = async () => {
        try {
            if (currentuser) {
                const currentUserId = currentuser.uid;
                //FETCH USER DATA
                const response = await fetch(`${ApiLocataion}/user/${currentUserId}`, {
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
    setCurrentPath(window.location.pathname);
}, [currentuser]);


//SIGN OUT
const userSignOut = async() => {
    signOut(auth);
    console.log("logged out")
};

//SideBr toggle
const body = document.querySelector('body'),
sidebar = body.querySelector('nav.sidebar')

const barToggle = () => {
    sidebar.classList.toggle("close");
};



return ( 

<div style={currentPath != "/landing" ?{}:{display:"none"}}>
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
    <nav className="sidebar close" >
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
    </nav>
</div>

)}


export default SideBar