//REACT AND CONTEXTS
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/UserAuthContext'

//CSS
import '../Css/styles.css'
import '../Css/sidebar.css'
import '../Css/login.css'
import '../Css/auth.css'

//FIREBAE
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db} from "../firebase";
import { collection, doc, getDocs, setDoc} from "firebase/firestore";
import { Link } from 'react-router-dom';


const Login = () => {
 

//REGISTER._________________________________________________//
const {SignUp, currentuser} = useAuth()

const [userNamesArray, setUserNamesArray] = useState([])
const [user, setUser] = useState({
  FullName: "",
  userName: "",
  email: "",
  password: "",
});


// GOOGLE PROVIDER__________________________//
const provider = new GoogleAuthProvider();
const googleSignIn = async () => {
  try{
    // "signInWithPopup" FUNCTION
    const result = await signInWithPopup(auth, provider);
    const curruser = result.user
    //FIRESTORE REF
    const colRef = collection(db, "users");
    //USER ID
    const customDocId = curruser.uid;
    //DISPLAY NAME
    const userFullname = curruser.displayName;
    //EMAIL
    const userName = "@"+"user"+Math.floor(Math.random() * 100000);
    const userEmail = curruser.email;
    //PROFILE IMG URL
    const  profilePictureURL = curruser.photoURL
    //TAG FIRESTORE REF
    const tagRef = collection(db, "users", customDocId, "Tags");
    const newTagRef = doc(tagRef);
    //TAG DEFAULT ADD
    const basicTag = {
      tags:[
        "None"
      ]
    };
    try{
      //SET USER DATA TO FIRESTORE
      await setDoc(doc(colRef, customDocId), {
        id: customDocId,
        fullname: userFullname,
        email: userEmail,
        subscription: false,
        profilePictureURL: profilePictureURL,
        storage_take: 0,
        user_since: new Date().toLocaleDateString(),
        followers: 0,
        description:"",
        user_name: userName,
      });
      //SETTING DEFAULT TAGS
      await setDoc(newTagRef,basicTag);
      console.log("Success Storing Google Document");
    } catch(err) {
      console.log(err)
      console.log("Failed Setting user Documents");
    };  
    console.log("Successful Login With Google");
  } catch(error) {
    console.log(error.message)
    console.log("Failed The signinwithPopup function");
  };
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
  if (password == "" ||  email == "" || FullName == "" || userName == "") {
    alert("please fill All the field ")
  } else if (!password.length >= 6 ) {
    alert("Password Must be Greater then 6 Length")
  }else if (userNamesArray.includes(`@${userName}`)){
   alert("Username Already Taken")
  }else{
    SignUp(email, password, FullName, userName)
    { currentuser && setUser({
        FullName: "",
        userName: "",
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
    const usernames = snapshot.docs.map(doc => doc.data().user_name);
    setUserNamesArray(usernames)
  };
  fetchUsernames();
}, []);

return (
<div className='login-page'>
  <div className='login-container'>
    <div className='login-title'>
      <h1>Register</h1>
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
            type='Username'
            name='userName'
            placeholder='Username'
            value={user.userName}
            onChange={UserHandler}
          />
        </div>
        <div className='login-input'>
          <input
            type='text'
            name='FullName'
            placeholder='Fullname'
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
    <div className='login-bottom'>
      <h6>Have an account ? <a href='/register'>Sign up</a></h6>
    </div>
  </div>
  <Link to={"/support/contact-us"} style={{marginTop:20}}> 
      <h6 style={{fontSize:12}}>Contact / Support</h6>
  </Link>
</div>
);
};

export default Login;
