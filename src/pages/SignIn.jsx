//REACT AND CONTEXTS
import React, { useState } from 'react'
import { useAuth } from '../context/UserAuthContext'

//CSS
import '../Css/auth.css'
import '../Css/login.css'

//FIREBASE
import { auth, db} from "../firebase";
import { signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from "firebase/auth";
import { collection, doc, setDoc} from "firebase/firestore";
import { Link } from 'react-router-dom';

const SignIn = () => { 


//<******************************VARIABLES*******************************>

//AUTH CONTEXT
const {Login, currentuser} = useAuth()

//USER useSTATE
const [user, setUser] = useState({
  email: "",
  password: "",
})

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
      </form>
    </div>
    <div className='login-bottom'>
      <h6>Not a user yet ? <a href='/register'>Register</a></h6>
    </div>
  </div>
  <Link to={"/support/contact-us"} style={{marginTop:20}}> 
      <h6 style={{fontSize:12}}>Contact / Support</h6>
  </Link>
</div>
)};

export default SignIn;