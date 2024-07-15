//REACT AND CONTEXTS
import React, { useState } from 'react'
import { useAuth } from '../context/UserAuthContext'

//CSS
import '../Css/auth.css'
import '../Css/login.css'
import '../Css/navbar.css'

//FIREBASE
import { auth, db} from "../firebase";
import { signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from "firebase/auth";
import { collection, doc, setDoc} from "firebase/firestore";
import { Link } from 'react-router-dom';

//IMAGES
import googleIcon from "../assets/Images/google.svg"

const SignIn = () => { 


//<******************************VARIABLES*******************************>

//AUTH CONTEXT
const {Login, currentuser, SignUp} = useAuth()

//USER useSTATE
const [user, setUser] = useState({
  email: "",
  password: "",
})

const [isActive, setIsActive] = useState(false);

const handleBurgerMenuOpen2 = () => {
  setIsActive(!isActive);
}

const handleBurgerMenuClose2 = () => {
  setIsActive(!isActive);
}

//<******************************FUNCTIONS*******************************>

// GOOGLE PROVIDER
const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    //Firestore REF & USER ID
    const colRef = collection(db, "users");
    const customDocId = result.user.uid;
    //DISPLAY NAME
    const userName = result.user.displayName;
    //EMAIL
    const userEmail = result.user.email;
    //PROFILE IMG URL
    const  profilePictureURL = result.user.photoURL
    //DEFAULT TAG
    const tagRef = collection(db, "users", result.user.uid, "Tags");
    const newTagRef = doc(tagRef);
    //DEFAULT TAG FIRESTORE 
    const basicTag = {
      tags:[
        "None"
      ]
    };
    try{
      //SETT USER DETAILS TO FIRESTORE
      await setDoc(doc(colRef, customDocId), {
        id: customDocId,
        fullname: userName,
        email: userEmail,
        subscription: false,
        storage_take:0,
        recent:"",
        profilePictureURL: profilePictureURL,
        user_created: new Date(),
      });
      //SERR DEF TAGS TO FIRESTORE
      await setDoc(newTagRef,basicTag);
      console.log("Success Google Login Document");
    } catch(err) {
      console.log(err)
    };  
    console.log("Success Google Login !!");
  } catch(error) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.log("User closed the sign-in popup.");
    } else {
      console.error(error);
    }
  };
};

//USER HANDLE
const UserHandler = (e) => {
  const { name, value } = e.target;
  console.log(name +"::::::::::"+value)
  setUser((pre) => {
    return {
      ...pre,
      [name]: value
    }
  });
};

//SUBMIT HANDLE
const SubmitHandler = async (e) => {
  e.preventDefault();
  const { email, password} = user;
  Login(email, password)
  {currentuser && setUser({
      email: "",
      password: "",
    })
  };
};

const HandleGuests = async (e) => {
  e.preventDefault()
  const UID = await generateUID(6)
  const email = `guest_${UID}@clippify.com`
  const password = UID
  const FullName = `Guest_${UID}`
  await SignUp(email, password, FullName)
}

const generateUID = (len) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < len; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
}

//FORGOT PASSWORD
const handleForgotPass = async() => {
  if(user.email != ""){
    await sendPasswordResetEmail(auth,user.email)
    alert("Password Reset Email Sent")
  }else{
    alert("Please Enter Email Address to Reset Password")
  }
}


return(
  <>
  <div className='landing-page'>
  <div className="add">
      <h6>BETA OUT NOW - 100% Free to use</h6>
    </div>
    <nav style={{position:"sticky"}} className={isActive ? "active sticky":"sticky"}>
      <i className='bx bx-menu sidebarOpen' onClick={handleBurgerMenuOpen2}/>
      <span className="logo navLogo"><a style={{fontWeight:500,opacity:1}} href="/">Clippfiy</a></span>
      <div className="menu show">
         <div className="logo-toggle ">
            <span className="logo"><a href="#">Clippify</a></span>
            <i className='bx bx-x siderbarClose' onClick={handleBurgerMenuClose2}></i>
         </div>
         <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a  href="#clipping">Features</a></li>
            <li><a href="/policies">Policies</a></li>
            <li><a href="/support/contact-us">Contact</a></li>
         </ul>
      </div>
      <div className="darkLight-searchBox">

            <Link to={"/login"}>
               <h6 className="try-for-free-btn" >Try for Free</h6>
            </Link>
            

      </div>
    </nav>
  </div>

<div className='login-page'>
  <div className='login-container'>
    <div className='login-title'>
      <h1>Sign in</h1>
      <hr />
    </div>
    <div className='login-form'>
      <form onSubmit={SubmitHandler}>
        <div className='login-input'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={user.email}
            onChange={UserHandler}
          />
        </div>
        <div className='login-input'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={user.password}
            onChange={UserHandler}
          />
        </div>
        <div className='login-input'>
          <button type='submit'>Sign in</button>
        </div>
        <div className='login-input' style={{background:"transparent"}}>
          <button type='button' style={{background:"white"}} onClick={HandleGuests}>Use as guest</button>
        </div>
      </form>
    </div>
        {/*OR*/}
        <h6 style={{opacity:0.6,marginTop:10}}>
        or
    </h6>
    {/*GOOGLE*/}
    <div className='other-form'>
      <div className='google-btn' onClick={googleSignIn}>
        <img src={googleIcon} alt="" />
      </div>
    </div>
    <div className='login-bottom'>
      <h6>Not a user yet ? <a href='/register'>Register</a></h6>
    </div>
  </div>
  <Link to={"/support/contact-us"} style={{marginTop:20}}> 
      <h6 style={{fontSize:12}}>Contact / Support</h6>
  </Link>
</div>
</>
)};

export default SignIn;