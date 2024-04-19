//REACT AND CONTEXTS
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/UserAuthContext'

//CSS
import '../Css/login.css'
import '../Css/auth.css'
import '../Css/navbar.css'

//FIREBAE
import { signInWithPopup, GoogleAuthProvider,signInWithRedirect } from "firebase/auth";
import { auth, db} from "../firebase";
import { collection, doc, getDocs, setDoc} from "firebase/firestore";
import { Link } from 'react-router-dom';

//IMAGES
import googleIcon from "../assets/Images/google.svg"



const Login = () => {


//REGISTER._________________________________________________//
const {SignUp, currentuser} = useAuth()

const [userNamesArray, setUserNamesArray] = useState([])
const [user, setUser] = useState({
  FullName: "",
  email: "",
  password: "",
});

const [isActive, setIsActive] = useState(false);

const handleBurgerMenuOpen2 = () => {
  setIsActive(!isActive);
}

const handleBurgerMenuClose2 = () => {
  setIsActive(!isActive);
}

// GOOGLE PROVIDER__________________________//
const provider = new GoogleAuthProvider();

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const curruser = result.user;
    const colRef = collection(db, "users");
    const customDocId = curruser.uid;
    const userFullname = curruser.displayName;
    const userEmail = curruser.email;
    const profilePictureURL = curruser.photoURL;
    const tagRef = collection(db, "users", customDocId, "Tags");
    const newTagRef = doc(tagRef);
    const basicTag = {
      tags: ["None"]
    };

    await setDoc(doc(colRef, customDocId), {
      id: customDocId,
      fullname: userFullname,
      email: userEmail,
      subscription: false,
      profilePictureURL: profilePictureURL,
      storage_take: 0,
      user_since: new Date().toLocaleDateString(),
      followers: 0,
      description: ""
    });

    await setDoc(newTagRef, basicTag);
    console.log("Success Storing Google Document");
    console.log("Successful Login With Google");
    if (result.user) {
      // Redirect to a different route on successful sign-in
      window.location.href = '/';
    }
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.log("User closed the login popup.");
      // Inform the user that the login process was interrupted
      // and provide them with an option to retry.
      // For example:
      alert("Login process was interrupted. Please try again.");
    } else {
      console.log(error.message);
      console.log("Failed to sign in with Google.");
    }
  }
};




//REGISTER USER INPUT HANDLER
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

//REGISTER SUBMIT HANDLER
const SubmitHandler = async (e) => {
  e.preventDefault()
  const { email, password, FullName, userName } = user;
  if (password == "" ||  email == "" || FullName == "" ) {
    alert("please fill All the field ")
  } else if (!password.length >= 6 ) {
    alert("Password Must be Greater then 6 Length")
  }else if (userNamesArray.includes(`@${userName}`)){
   alert("Username Already Taken")
  }else{
    SignUp(email, password, FullName)
    { currentuser && setUser({
        FullName: "",
        email: "",
        password: "",
      })
    };
  };
};

//FETCH ALL USERNAMES
useEffect(() => {
  const fetchUsernames = async () => {
    const colRef = collection(db, "users");
    const snapshot = await getDocs(colRef);
    const usernames = snapshot.docs.map(doc => doc.data().fullname);
    setUserNamesArray(usernames)
  };
  fetchUsernames();
}, []);

return (
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
      <h1>Register</h1>
      <hr />
    </div>
    {/*FORMS*/}
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
            type='text'
            name='FullName'
            placeholder='Username'
            value={user.FullName}
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
          <button type='submit'>Register</button>
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
      <h6>Have an account ? <a href='/login'>Sign up</a></h6>
    </div>
  </div>
  <Link to={"/support/contact-us"} style={{marginTop:20}}> 
      <h6 style={{fontSize:12}}>Contact / Support</h6>
  </Link>
</div>
  </>

);
};

export default Login;
