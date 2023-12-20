
import { useState } from "react"
import "../../Css/policies.css"
import VpnLockIcon from '@mui/icons-material/VpnLock';
import BugReportIcon from '@mui/icons-material/BugReport';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StorageIcon from '@mui/icons-material/Storage';
import MultipleSelectChip from "../../assets/Policy/FeedbackSelector"
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { db, storage } from "../../firebase"
import { doc,setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid";

import {useAuth} from "../../context/UserAuthContext";


const Feedback = () =>{

const { currentuser } = useAuth();

const [reportTitle,setReportTitle] = useState("")
const [reportDescription,setReportDescription] = useState("")
const [reportFile,setReportFile] = useState(null)
const [reportCategory,setReportCategory] = useState("")


const handleReportFile = (e) =>{
    e.preventDefault();
    setReportFile(e.target.files[0]);

}

const handleReportTitle = (e) =>{
    e.preventDefault();
    setReportTitle(e.target.value);
}

const handleReportDescription = (e) =>{
    e.preventDefault();
    setReportDescription(e.target.value);
}

const handleReportSubmit = async () =>{
const reportId = v4();
const reportDate = new Date().toLocaleDateString();
if(currentuser){
    if(reportDescription.length > 10){
        if(reportTitle.length > 1){
            if(reportCategory.length != ""){
                try{
                    if(reportFile != null && currentuser){
                    
                        const feedbackRef = doc(db, "feedback", reportId,reportCategory,currentuser.uid);
                        const storageRef = ref(storage, `users/${currentuser.uid}/feedback/${reportId}`);
                        await uploadBytes(storageRef, reportFile);
                        const fileUrl = await getDownloadURL(storageRef);
                    
                        const newFeedback = {
                            title: reportTitle,
                            description: reportDescription,
                            file: fileUrl,
                            report_id: reportId,
                            user_id: currentuser.uid,
                            user_email: currentuser.email,
                        }
            
                        await setDoc(feedbackRef,newFeedback)
                        setDoc(doc(db, "feedback",reportId), {
                            created: reportDate,
                            report_id: reportId,
                            user_id: currentuser.uid
                        });
                        alert("Your Feedback has been sent to our Team. Thank you for your Support")   
                    }else{
                const feedbackRef = doc(db, "feedback", reportId,reportCategory,currentuser.uid);
                const newFeedback = {
                    title: reportTitle,
                    description: reportDescription,
                    report_id: reportId,
                    user_id: currentuser.uid,
                    user_email: currentuser.email,
                }
                await setDoc(feedbackRef,newFeedback)
                setDoc(doc(db, "feedback",reportId), {
                    created: reportDate,
                    report_id: reportId,
                    user_id: currentuser.uid
                });    
                alert("Your Feedback has been sent to our Team. Thank you for your Support")
                    }
                }catch(err){
            console.log(err)
                }
            }else{
        alert("Please select a category for your problem")
            }
        }else{
                alert("Please give a title for your problem")
        }    
    }else{
            alert("Please give a detailed description about your problem")
    }
}else{
        alert("You can't send a feedback if you are not logged in !")
}
}


return(
        <div className="legal-page">
            <div className="legal-nav-bar">
            <a href="/"><h2>Home</h2></a>
                <a href="/policies"><h4>Overview</h4></a>
                <a href="/policies/security"><h4 >Security</h4></a>
                <h4 className="selected-legal">Feedback</h4> 
                <a href="/policies/legal"> <h4>Legal</h4> </a>
                <a href="/support/contact-us"> <h4>Contact Us</h4> </a>
            </div>

            <div className="legal-page-title" style={{textAlign:"center"}}>
                <h2>Feedback</h2>
                <h6 style={{width:500,fontSize:10}}>Your trust is at the center of what we do and why security is a top priority for us. Our products, processes and systems are designed to protect our users and data.</h6>
            </div>

            <div className="security-features-cont">
               <div className="security-row"> 
                    <div className="security-box">
                      <VpnLockIcon className="highlight-icon" />
                      <h3>Early Stage of Develpment</h3>
                      <h6>
                     Our Team is really working hard to make our software better and better. We are in the early stage of development and we need your help to make our software better.
                      </h6>
                    </div>

                    <div className="security-box">
                      <BugReportIcon className="highlight-icon"/>
                      <h3>Any Bugs ?</h3>
                      <h6>
                        If you found any bugs or problems with our software, please report it to us. We will fix it as soon as possible.
                      </h6>
                    </div>

                    <div className="security-box">
                      <SupervisedUserCircleIcon className="highlight-icon" />
                      <h3>User Feedback ?</h3>
                      <h6>
                      We are always open to user feedback. If you have any suggestions or ideas, please let us know.
                      </h6>
                    </div>

                    <div className="security-box">
                      <StorageIcon className="highlight-icon" />
                      <h3>Request ?</h3>
                      <h6>
                        If you have any request for new features, refound, subscription, payment, please let us know.
                      </h6>
                    </div>
               </div>
            </div>

<div className="bug">
            <div className="bug-cont">
                <div className="bug-column">
                    <h2>We need You !</h2>
                    <h5 style={{width:400}}>
                       If you found any bugs or problems with our software, please report it to us. We will fix it as soon as possible. Our Team is working hard to make our software better and better.
                    </h5>

                    <ArrowCircleDownIcon className="highlight-icon" />
                   
                </div>
                <div className="bug-pic">
                    
                </div>
            </div>
            </div>

            <div className="report-container">
                <div className="firebase-sec-title">
                    <h2>Report a vulnerability</h2>
                    <hr style={{width:440,borderColor:"black"}} />
                </div>
             <div className="report-title">
                <div>
                <h2>Report Title</h2>
                <h6>Give a Title for your problem</h6>
                </div>
             
                <input type="text" className="input-txt" onChange={handleReportTitle} value={reportTitle}/>
             </div>
             <hr style={{width:840,borderColor:"black"}} />

            <div className="report-select">
                <div>
                <h2>Issue Category</h2>
                <h6>Give an Area where you found your Problem</h6>
                </div>
            <MultipleSelectChip reportCategory={setReportCategory}/>
            </div>
            <hr style={{width:840,borderColor:"black"}} />

            <div className="report-upload">
                <div>
                    <div>
                        <h6 style={{opacity:0.8}} className="highlighter">Optional</h6>
                        <h2>Upload Evidence</h2>
                        <h6>Please provide evidence for Faster / Smoother Improvment</h6>
                    </div>
                    <input type="file" className="inpit-file" style={{paddingTop:25}} onChange={handleReportFile} />
                </div>
            </div>

            <hr style={{width:840,borderColor:"black"}} />


            <div className="report-desc">
                <div>
                    <h6 style={{opacity:0.8}} className="highlighter">Minimum 10 words</h6>
                    <h2>Description</h2>
                    <h6>Please give a detailed description about your problem</h6>
                </div>
                <textarea style={{width:840,height:300,padding:10}} onChange={handleReportDescription} value={reportDescription}  />
            </div>

            <div className="report-send">
                <button style={{width:200,height:50}} onClick={handleReportSubmit}>Send</button>
            </div>
        
            </div>
         
           
          

            <footer style={{width:1920,alignSelf:"center"}} className="footer">
             <div className="container-footer">
                <div className="row">
                   <div className="footer-col">
                      <h4>company</h4>
                      <ul>
                         <li><a href="/support/contact-us">about us</a></li>
                         <li><a href="/policies/legal/terms">Terms of Use</a></li>
                         <li><a href="/policies/legal/privacy-policy">privacy policy</a></li>
                         
                      </ul>
                   </div>
                   <div className="footer-col">
                      <h4>get help</h4>
                      <ul>
                         <li><a href="/policies">FAQ</a></li>
                         <li><a href="/subscription">subscription</a></li>
                         <li><a href="/settings">cancel & returns</a></li>
                         <li><a href="/settings">payment options</a></li>
                      </ul>
                   </div>
                   <div className="footer-col">
                      <h4>Contact Us</h4>
                      <ul>
                         <li><a href="/support/contact-us">Customer Support</a></li>
                         <li><a href="/support/feedback">Any Questions ?</a></li>
                      </ul>
                   </div>
                   <div className="footer-col">
                      <h4>follow us</h4>
                      <div className="social-links">
                         <a href="#"><i className="fab fa-facebook-f"></i></a>
                         <a href="#"><i className="fab fa-twitter"></i></a>
                         <a href="https://www.instagram.com/echotheorca.app/"><i className="fab fa-instagram"></i></a>
                         <a href="https://www.youtube.com/channel/UCA5s3Bjs3MiXWnsg_Wn10hQ"><i className="fab fa-youtube"></i></a>
                      </div>
                   </div>
                </div>
             </div>
         </footer>

        </div>
)
}

export default Feedback