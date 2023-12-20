//REACT AND CONTEXTS
import React, { useState } from 'react'
import { useAuth } from '../context/UserAuthContext'

//CSS
import '../Css/login.css'

//FIREBASE
import { auth, db} from "../firebase";
import { signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail} from "firebase/auth";
import { collection, doc, setDoc} from "firebase/firestore";


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
<div id='reg'>

  <div id='login-mobile' style={{alignContent:"center"}}>
    <h1>Clippify is Avalible on Pc or Laptop !!</h1>
  </div>

  <div className="container-auth"> 
    <div className="forms">
      <div className="form-content">
        <div className="cover" />

        <div className="login-form">
          <div className="title">Login</div>
        
          <form onSubmit={SubmitHandler} >
            <div className="input-boxes">

              <div className="input-box" id="userEmail2" >
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Enter your email" name="email" value={user.email} onChange={UserHandler}   required/>
              </div>

              <div className="input-box" id="userPassword2">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" name="password" value={user.password} onChange={UserHandler} required/>
              </div>

              <div className="userRemember">
                <label className="switch-remember">
                  <input type="checkbox"/>
                  <span className="slider-remember"></span>
                </label>
                <h4>Remember Me</h4>
              </div>

              <div className="text" onClick={handleForgotPass} >
                <a href="#" >Forgot password?</a>
              </div>
              
              <div className="button input-box">
                <input  type="submit" />
              </div>

              <div style={{display:"none"}}  className="google-btn" onClick={googleSignIn}>
                <div className="google-icon-wrapper">
                  <img crossOrigin="anonymous" className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p className="btn-text"><b>Sign in with Google</b></p>
              </div>

              <div style={{display:"none"}} className="apple-btn" id="btnApple">
                <div className="apple-icon-wrapper">
                  <img crossOrigin="anonymous" className="apple-icon" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"/>
                </div>
                <p className="btn-text" ><b>Sign in with Apple</b></p>
              </div>

              <div className="text sign-up-text">Don't have an account?
                <a href="/register">Sigup now</a>
              </div>

            </div>
          </form>

        </div>

      </div>
    </div>
  </div>

</div>
)};

export default SignIn;