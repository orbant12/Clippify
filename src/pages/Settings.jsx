//REACT
import { useEffect, useState } from 'react';
import { useAuth } from '../context/UserAuthContext';
import { getPortalUrl } from "../assets/Subscription/checkOutUrl";

//CSS
import '../Css/settings.css';

//ICONS
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

//FIREBASE
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {  collection, doc, getDoc, setDoc,getDocs, updateDoc} from "firebase/firestore";
import { db,app,storage } from "../firebase";
import { updatePassword,sendEmailVerification } from "firebase/auth";


const Settings = () =>{



//<******************************VARIABLES*******************************>

//USER DATA
const [userData, setUserData] = useState([]);

//PASSWORD INPUTS
const [password,setPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")
const [newUsername,setNewUsername] = useState("")

//PASSWORD STATE LOGIC
const [passMatch,setPassMatch] = useState(null)
const [notLong,setNotLong] = useState(null)
const [notEmpty,setNotEmpty] = useState(null)

//EMAIL VERIFIED ?
const [isEmailVerified,setIsEmailVerified] = useState(null)

//PROFILE PICTURE URL
const [image, setImage] = useState(null);

//PAYMENT HISTORY
const [paymentHistory, setPaymentHistory] = useState([]);

const { currentuser } = useAuth();

//<******************************FUNCTIONS*******************************>


//FETCH USER DATA AND PAYMENT HISTORY
const fetchData = async () => {
    try {
        if (currentuser) {
            const currentUserId = currentuser.uid;
            const userDocRef = doc(db, "users", currentUserId);
            const subscriptionsDocRef = collection(db, "customers", currentUserId,"subscriptions");
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                // Document exists, retrieve its data
                const elementData = docSnapshot.data();
                setUserData(elementData);
                setNewUsername(elementData.fullname)
            } else {
                console.log("Document does not exist.");
                setUserData(null); // Set to null or handle accordingly
            };
            getDocs(subscriptionsDocRef)
            .then((querySnapshot) => {
                const userFolders = [];
                querySnapshot.forEach((doc) => {
                    userFolders.push({ id: doc.id, ...doc.data() });
                });
                setPaymentHistory(userFolders);
            })
            .catch((error) => {
                console.error("Error fetching user folders: ", error);
            });
        }
    } catch (error) {
        console.error("Error getting document: ", error);
    };
};

//EMAIL VERIFICATION
useEffect(()=> {
    if(currentuser){
        if(currentuser.emailVerified == true){
            setIsEmailVerified(true)
        }else if (currentuser.emailVerified == false){
            setIsEmailVerified(false)
        }
        fetchData();
    }
},[currentuser])

//HANDLE SAVE USERNAME
const handleSaveButtonUserName = () =>{
    if(currentuser && newUsername.length >= 4){
        const inputNewUsername = newUsername
        const userRef = doc(db,"users",currentuser.uid)
        try{
            updateDoc(userRef,{
                fullname:inputNewUsername
            })
            alert("Your Username has been changed Successfully !")
            fetchData()
        }catch(err){
            console.log(err)
        }
    }else if(4 >= newUsername.length){
        alert("Username Needs to be longer then 3 words !")
    }
}

//Handle Save PAssword
const handleSaveButton = () =>{
    if(passMatch && currentuser){
        updatePassword(currentuser,password) 
    }else{
        alert("Password not matching")
    }
};

//EMAIL VERIFY
const handleVerify = () =>{
    if(currentuser.emailVerified == false){
        sendEmailVerification(currentuser)
        .then(() => {
            alert("Email Verification Sent")
        });
    }else{
        alert("Your Email is already Verified !")
    }
};

//PASSWORD CONFIMATION
useEffect(()=> {
    if(password == confirmPassword && password != "" && password.length > 7){
        setPassMatch(true)
        setNotLong(false)
        setNotEmpty(false)
    }else if (password == confirmPassword && password != "" && 7 >= password.length){
        setNotLong(true)
        setNotEmpty(false)
    }else if (password.length != 0 && confirmPassword.length != 0 && password != confirmPassword){
        setNotEmpty(true)
        setPassMatch(false)
        setNotLong(false)
    }

    if(password.length == 0 && confirmPassword.length == 0){
        setPassMatch(false)
        setPassMatch(false)
        setNotEmpty(false)
        setNotLong(false)
    }
},[confirmPassword,password]);

//PASSWORD HANDLE TO STATE
const handlePassword = (event) => {
    setPassword(event.target.value);
};

//CONFIRM PASSWORD HANDLE TO STATE
const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
};

//USERNAME HANDLE TO STATE
const handleUsername = (event) => {
    setNewUsername(event.target.value);
};

//PROFILE PICTURE HANDLE TO STATE
const handleURL = (event) => {
    const file = event.target.files[0];
    setImage(file);
};

//UPLOAD PROFILE PICTURE
const handleUpload = async () =>{
    if(currentuser && image != null){
        const userRef = doc(db,"users",currentuser.uid)
        const storageRef = ref(storage,`users/${currentuser.uid}/profilePicture/${image.name}`)
        await uploadBytes(storageRef,image)
        const uploadedURL = await getDownloadURL(storageRef)
        try{
            updateDoc(userRef,{
                profilePictureURL:uploadedURL
            })
            alert("Your Profile Picture Uploaded Successfully")
            fetchData()
        }catch(err){
            console.log(err)
        }
    }
}

//MANAGE SUBSCRIPTION
const manageSubscription = async() =>{
    const portalUrl = await getPortalUrl(app);
    alert("Loading... It may take a few seconds")
    window.location.href = portalUrl
    console.log("Manage Subscription");
}

return(
<div className="settings">
    {/*FIRST BAR*/}
    <div className="f-settings">
        <div className="f-title-settings">
            <h1>Settings</h1>
            <div className='f-title-sections'>
                <a href="#profile-settings"><h5 className='section-settings-left'>Profile</h5></a>
                <a href="#payment-settings"><h5 className='section-settings'>Payment</h5></a>
                <a href="#support-settings"><h5 className='section-settings'>Support</h5></a>
                <a href="#history-settings"><h5 className='section-settings-right'>History</h5></a>
            </div>
        </div>
    </div>
    {/*PROFILE*/}
    <div className='profile-settings' id='profile-settings'>
        <div className='profile-title'>
            <div className='title-row'>
                <div >
                    <h2 className='profile-title-txt'>Profile</h2>
                    <h5 className='profile-title-desc'>Change your profile details</h5>
                </div>
            </div>     
            <hr style={{marginTop:10}} />
        </div>

        <div className='profile-first-row'>
            <div>
                <h5 className='text-settings'>User Name</h5>
                <h6 style={{opacity:0.6}}>Type inside of the block</h6>
            </div>
            <input type="text" style={{width:300}} value={newUsername} onChange={handleUsername} />
            <div>
                <button className='submit-settings-btn' onClick={handleSaveButtonUserName} >Save</button>
            </div>
        </div>

        <hr style={{marginTop:50}} />

        <div className='profile-first-row-pass'>
            <div>
                <h5>Password</h5>
                <h6 style={{opacity:0.6}}>Security</h6>
            </div>
            <div className='pass-inputs'>
                <input type="password" style={{width:300}} placeholder="New Password" value={password} onChange={handlePassword}/>
                <input type="password" style={{width:300}} placeholder="Confirm New Password" value={confirmPassword} onChange={handleConfirmPassword}/>
                {passMatch === true?
                    <div style={{display:"flex",flexDirection:"row",color:"green"}}>
                        <CheckIcon />
                        <h3>Correct</h3>
                    </div>:null
                }
                {notLong === true?
                    <div style={{display:"flex",flexDirection:"row",color:"red"}}>
                        <ClearIcon />
                        <h6>Not Long Enough - Add more then 7 letters</h6>
                    </div>:null
                }
                {notEmpty ? 
                    <div style={{display:"flex",flexDirection:"row",color:"red"}}>
                        <ClearIcon />
                        <h6>Passwords not matching</h6>
                    </div>:null
                }
            </div>
            <button className='submit-settings-btn' onClick={handleSaveButton} >Save</button>    
        </div>

        <hr style={{marginTop:50}} />

        <div className='profile-first-row-picture'>
            <div>
                <h5>Profile Picture</h5>
                <h6 style={{opacity:0.6}}>Upload you profile picture</h6>
            </div>

            <img crossOrigin='anonymus' style={{maxHeight: 150,width:150,marginTop:0,borderRadius:10}} src={userData.profilePictureURL} alt="Profile Picture" />

            <input type="file" onChange={handleURL} />
        
            <button className='submit-settings-btn' onClick={handleUpload}>Upload</button>    
        </div>

        <hr style={{marginTop:100}} />

        <div className='profile-first-row-details'>
            <div>
                <h5>Current Details</h5>
                <h6 style={{opacity:0.6}}>These are live data</h6>
            </div>

            <div>
                <h6 className='highlighter'>{(userData.storage_take / 1000000 / 1000).toFixed(2)} GB</h6>
                <h5 style={{fontWeight:600}}>Storage Take</h5>
            </div>

            <a href="/subscription">
                <div>
                    <h6>{!userData.subscription?<span className='highlighter'>Free</span>:<span className='highlighter'>Premium</span>}</h6>
                    <h5 style={{fontWeight:600}}>Subscription</h5>
                </div>
            </a>

            <div>
                <h6 className='highlighter'>{userData.user_since}</h6>
                <h5 style={{fontWeight:600}}>User Since</h5>
            </div>

            <div onClick={handleVerify} style={{cursor:"pointer"}}>
                <h6 className='highlighter'>{userData.email}</h6>
                {!isEmailVerified?
                    <h5>Not Verified - Click to Verify</h5>:
                    <h5 style={{fontWeight:600}}>Verified</h5>
                }
            </div>
        </div>

        <hr style={{marginTop:50}} />
    </div>
    {/*Payment*/}
    <div className='payment-settings' id='payment-settings'>
        <div className='profile-title'>
            <div className='title-row'>
                <div >
                    <h2 className='profile-title-txt'>Manage Subscription</h2>
                    <h5 className='profile-title-desc'>Your Current Payment Details</h5>
                </div>
            </div>
            
            <hr style={{marginTop:10}} />
        </div>
        <div className='profile-first-row'>
            <div>
                <h5>Add or Edit Payment Details</h5>
                <h6 style={{opacity:0.6}}>Card Number / Adress Details</h6>
            </div>

            <div className='card-selection'>
                <button className='manage-payment-button' onClick={manageSubscription}>Edit Your Payment Details</button>
            </div>
            
        </div>
        <hr style={{marginTop:50}} />
        <div className='profile-first-row'>
            <div>
                <h5>Cancel Your Subscription</h5>
                <h6 style={{opacity:0.6}}>Don't want to be Premium ?</h6>
            </div>

            <div className='card-selection'>
                <button className='manage-payment-button' onClick={manageSubscription}>End Premium</button>
            </div>
            
        </div>
        <hr style={{marginTop:50}} />
        <div className='profile-first-row'>
            <div>
                <h5>Refound</h5>
                <h6 style={{opacity:0.6}}>Add or Edit Your Card Details</h6>
            </div>

            <div className='card-selection'/>
        </div>
        <hr style={{marginTop:50}} />
    </div>

    {/*SUpport*/}
    <div className='support-settings' id='support-settings'>
        <div className='profile-title'>
            <div className='title-row'>
                <div >
                    <h2 className='profile-title-txt'>Support</h2>
                    <h5 className='profile-title-desc'>Any Questions ?</h5>
                </div>  
            </div>
            
            <hr style={{marginTop:10}} />
        </div>

        <div className='profile-first-row'>
            <div>
                <h5>Terms & Policies</h5>
                <h6 style={{opacity:0.6}}>Add or Edit Your Card Details for Payment</h6>
            </div>

            <div className='policies'>
                <a href='/policies' className='manage-payment-button'>Visit Legal Center</a>
            </div>
            
        </div>
        <hr style={{marginTop:50}} />

        <div className='profile-first-row'>
            <div>
                <h5>Get in Touch</h5>
                <h6 style={{opacity:0.6}}>Fast & Helpful Customer Service</h6>
            </div>

            <div className='customer-service-contact'>
                <h4>Contact Us</h4>
                <h6>clippify.support@gmail.com</h6>
            </div>
            
        </div>
        <hr style={{marginTop:50}} />
    </div>

    {/*History*/}
    <div className='support-settings' id='support-settings'>
        <div className='profile-title'>
            <div className='title-row'>
                <div >
                    <h2 className='profile-title-txt'>History</h2>
                    <h5 className='profile-title-desc'>Track Your Subscriptions ?</h5>
                </div>  
            </div>
            
            <hr style={{marginTop:10}} />
            <div className='history-table'>
                <div className='history-f-row'>
                    
                    <div>
                        <h3 className='history-table-title'>Name</h3>
                        <hr />
                    </div>

                    <div>
                        <h3 className='history-table-title'>Created On</h3>
                        <hr />
                    </div>
                    
                    <div>
                        <h3 className='history-table-title'>Status</h3>
                        <hr />
                    </div>
                    
                    <div>
                        <h3 className='history-table-title'>Total</h3>
                        <hr />
                    </div>
                    
                </div>

                <div className='history-f-row2' id='history-settings'>
                    {paymentHistory.length === 0 ? (
                        <div style={{width:230,textAlign:"left"}} className="no-folder">No Purchase Yet </div>
                    ) : (
                    paymentHistory.map((payment) => 
                        payment && payment.id ? (
                            <div key={payment.id} className='history-data-row'>
                                <h6>{payment.items[0].price.product.name}</h6>
                                <h6 style={{paddingRight:110}}>{payment.created.toDate().toLocaleString('en-US', {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit',minute: '2-digit',second: '2-digit',hour12: false,})}</h6>
                                <h5 style={{paddingRight:126,fontWeight:600}}>{payment.status}</h5>
                                <h5 style={{paddingRight:12}}>{payment.items[0].price.unit_amount/100}$</h5>
                            </div>
                        ):null
                    ))}
                </div>
            </div>

        </div> 
    </div>
</div>
)}

export default Settings