import { useContext, createContext, useEffect, useState } from "react"
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import { auth, db,app } from "../firebase";
import { collection, doc, setDoc,getDoc, updateDoc} from "firebase/firestore";
import { getPremiumStatus } from "../assets/Components/Subscription/getPremiumStatus";

const userContext = createContext();

//REFERENC TO ACCESS CODE.-----------------------------------------
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {


//<******************************VARIABLESS*******************************>

//CURRENT USER DATA 
const [currentuser, setuser] = useState()
const [error, setError] = useState("")
const [isPremium,setIsPremium] = useState(false)
const [userData, setUserData] = useState([]);

//<******************************FUNCTIONS*******************************>

//PREMUIM STATE TOGGLE
useEffect(() => {
  if(currentuser){
    const userRef= doc(db,"users",currentuser.uid)
    updateDoc(userRef,{
      subscription: isPremium
    })
  }
}, [isPremium]);

//CHECKING FOR AUTHENTICATED USER AND GET DATA
useEffect(() => {
  onAuthStateChanged(auth, user => {
    console.log(user)
    if (user) {
      setuser(user)
      console.log(`Logged in user: ${user.uid}`)
      if(window.location.pathname == "/login" || window.location.pathname == "/register"){
        window.location.href = "/"
      }
    }
    else {
      if(window.location.pathname == "/" || window.location.pathname == "/memory"){
          window.location.href = "/landing"
        }
    }
  })

  //PREMIUM STATE AND USER DATA FETCH
  const checkPremium = async () => {
    const newPremiumStatus = auth.currentUser
      ? await getPremiumStatus(app)
      : false;
      setIsPremium(newPremiumStatus);
  };

  const fetchData = async () => {
    try {
      if (currentuser) {
        const currentUserId = currentuser.uid;
        const userDocRef = doc(db, "users", currentUserId);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          // Document exists, retrieve its data
          const elementData = docSnapshot.data();
          setUserData(elementData);
          checkPremium()
        } else {
          console.log("Document does not exist.");
          setUserData(null); // Set to null or handle accordingly
        }
      }
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };
  fetchData()
}, [currentuser]);

//LOGIN
const Login = async (email,password) => {
  const logEmail = email;
  const logPass = password
  try{
    await signInWithEmailAndPassword(auth,logEmail,logPass)
    .then((userCredential) => {
      // Signed in 
        const user = userCredential.user;
        console.log(user)
        window.location.href = "/"
    })
  }catch(error){
    console.log(error)
    alert("Wrong Email or Password")
  }
}

//REGISTRATION
const SignUp = async (email, password, FullName) => {
  const userName = FullName;
  const regEmail = email;
  const userPassword = password;
  try {
    const result = await createUserWithEmailAndPassword(auth, regEmail, userPassword);
    //RESULT == USER DATA
    const signeduser = result.user;
    //Setting Fresh Registrated user To the Document
    const userId = signeduser.uid;
    const colRef = collection(db, "users");
    const tagRef = collection(db, "users", userId, "Tags");
    //const newTagRef = doc(tagRef);
    console.log(userId);
    //SETTING USER DOCUMENT TO FIRESTORE
    try {
      await setDoc(doc(colRef, userId),{
        id: userId,
        fullname: userName,
        email: regEmail,
        subscription: false,
        storage_take:0,
        profilePictureURL: "",
        recent:"",
        user_since: new Date().toLocaleDateString(),
      });

      await setDoc(doc(tagRef,userId),{
          tags:[
            "None"
          ]
      });

      console.log("Document successfully added!");
            
    } catch (error) {
      console.error("Error adding document: ", error);
    };

    alert("Wellcome new User create successfully");
    await sendEmailVerification(signeduser)
    window.location.href = "/"
          
  } catch(err) {
    //ERROR IF ITS IN ALREADY USE
    if (err.code === "auth/email-already-in-use") {
      alert("Email already in use, try another email");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
      alert("Password must be at least 6 characters");
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      setError(err.message);
    }
  }
}

//END VALUES ACCES To ALL JSX
const value = {
  SignUp,
  error,
  currentuser,
  Login,
}


return (
  <userContext.Provider value={value}>{children}</userContext.Provider>
)}

export default UserAuthContext