import { useContext, createContext, useEffect, useState } from "react"

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


//LOGIN
const Login = async (email,password) => {
  const logEmail = email;
  const logPass = password  
  try{
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ logEmail, logPass }),
    });
    if (response.ok) {
      const user = await response.json();
      setuser(user);
      console.log('User login successfully:', user);
    } else {
      const error = await response.json();
      console.error('Login failed:', error);
    }
  }catch(error){
    console.log(error)
    alert("Wrong Email or Password")
  }
}



//REGISTRATION HTTP REQUEST POST SEND TO SERVER
const SignUp = async (email, password, FullName,userName) => {
  try {
    const response = await fetch('http://localhost:3000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, FullName, userName }),
    });

    if (response.ok) {
      const user = await response.json();
      setuser(user);
      console.log('User registered successfully:', user);
      alert("Wellcome new User create successfully");
    } else {
      const error = await response.json();
      console.error('Registration failed:', error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
};





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