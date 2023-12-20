// REACT AND CONTEXTS
import React, { useState } from 'react';
import { useAuth } from '../context/UserAuthContext';

// CSS
import '../Css/styles.css';
import '../Css/sidebar.css';
import '../Css/login.css';

// FIREBASE
import {
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const Login = () => {


//<******************************VARIABLES*******************************>

// REGISTER
const { SignUp, currentuser } = useAuth();

// USER STATE
const [user, setUser] = useState({
  FullName: '',
  email: '',
  password: '',
});

// GOOGLE PROVIDER
const provider = new GoogleAuthProvider();

//<******************************FUNCTIONS*******************************>

// GOOGLE SIGN-IN FUNCTION
const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const curruser = result.user;

    // FIRESTORE REFERENCES
    const colRef = collection(db, 'users');
    const customDocId = curruser.uid;

    // USER DETAILS
    const userName = curruser.displayName;
    const userEmail = curruser.email;
    const profilePictureURL = curruser.photoURL;

    // TAG FIRESTORE REFERENCE
    const tagRef = collection(db, 'users', customDocId, 'Tags');
    const newTagRef = doc(tagRef);

    // DEFAULT TAGS
    const basicTag = {
      tags: ['None'],
    };

    try {
      // SET USER DATA TO FIRESTORE
      await setDoc(doc(colRef, customDocId), {
        id: customDocId,
        fullname: userName,
        email: userEmail,
        subscription: false,
        profilePictureURL: profilePictureURL,
        storage_take: 0,
        user_since: new Date().toLocaleDateString(),
      });

      // SETTING DEFAULT TAGS
      await setDoc(newTagRef, basicTag);
      console.log('Success Storing Google Document');
    } catch (err) {
      console.log(err);
      console.log('Failed Setting user Documents');
    }

    console.log('Successful Login With Google');
  } catch (error) {
    console.log(error.message);
    console.log('Failed The signinwithPopup function');
  }
};

// USER INPUT HANDLER
const UserHandler = (e) => {
  const { name, value } = e.target;
  console.log(name + '::::::::::' + value);
  setUser((pre) => {
    return {
      ...pre,
      [name]: value,
    };
  });
};

// REGISTER SUBMIT HANDLER
const SubmitHandler = async (e) => {
  e.preventDefault();
  const { email, password, FullName } = user;

  if (password === '' || email === '' || FullName === '') {
    alert('Please fill in all the fields.');
  } else if (!(password.length >= 6)) {
    alert('Password must be greater than 6 characters.');
  } else {
    SignUp(email, password, FullName);

    if (currentuser) {
      setUser({
        FullName: '',
        email: '',
        password: '',
      });
    }
  }
};

return (
<div id="login">
  <div id="login-mobile" style={{ alignContent: 'center' }}>
    <h1>Clippify is Available on PC or Laptop!!</h1>
  </div>
  <div className="container-auth">
    <div className="forms">
      <div className="form-content">
        <div className="cover"></div>
        <div className="signup-form">
          <div className="title">Signup</div>

          {/* REGISTER FORM */}
          <form onSubmit={SubmitHandler}>
            <div className="input-boxes">
              {/* Input fields for name, email, and password */}
              <div className="input-box">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="FullName"
                  value={user.FullName}
                  onChange={UserHandler}
                  required
                />
              </div>
              <div className="input-box">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={user.email}
                  onChange={UserHandler}
                  required
                />
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={user.password}
                  onChange={UserHandler}
                  required
                />
              </div>

              {/* Submit button */}
              <div className="button input-box">
                <input type="submit" />
              </div>

              {/* Google and Apple sign-up buttons */}
              <div
                style={{ display: 'none' }}
                className="google-btn"
                onClick={googleSignIn}
              >
                <div className="google-icon-wrapper">
                  <img
                    crossOrigin="anonymous"
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <p className="btn-text"><b>Register with Google</b></p>
              </div>

              <div style={{ display: 'none' }} className="apple-btn">
                <div className="apple-icon-wrapper">
                  <img
                    crossOrigin="anonymous"
                    className="apple-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  />
                </div>
                <p className="btn-text"><b>Register with Apple</b></p>
              </div>

              {/* Already have an account link */}
              <div className="text sign-up-text">
                Already have an account? <a href="/login">Login now</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
);
};

export default Login;
