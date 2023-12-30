

import "../../Css/policies.css"
import VpnLockIcon from '@mui/icons-material/VpnLock';
import BugReportIcon from '@mui/icons-material/BugReport';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StorageIcon from '@mui/icons-material/Storage';

const Security = () =>{
return(
<div className="legal">
    <div className="legal-nav-bar">
        <a href="/"><h2>Home</h2></a>
        <a href="/policies"><h4>Overview</h4></a>
        <h4 className="selected-legal">Security</h4>
        <a href="/support/feedback"> <h4>Feedback</h4> </a>
        <a href="/policies/legal"> <h4>Legal</h4> </a>
        <a href="/support/contact-us"> <h4>Contact Us</h4> </a>
    </div>

    <div className="legal-page-title" style={{textAlign:"center"}}>
        <h2>Security Features</h2>
        <h6 style={{width:"30%",opacity:0.6}}>Your trust is at the center of what we do and why security is a top priority for us. Our products, processes and systems are designed to protect our users and data.</h6>
    </div>

    <div className="security-features-cont">
        <div className="security-row"> 
            <div className="security-box">
                <VpnLockIcon className="highlight-icon" />
                <h3>Data security</h3>
                <h6>
                Our people and systems can only access the data they need to do their job and we store your designs with cloud providers who have top-tier physical security controls.
                </h6>
            </div>

            <div className="security-box">
                <BugReportIcon className="highlight-icon"/>
                <h3>Staged releases</h3>
                <h6>
                We only release software after qualifying it in development and staging environments.
                </h6>
            </div>

            <div className="security-box">
                <SupervisedUserCircleIcon className="highlight-icon" />
                <h3>Account security</h3>
                <h6>
                We use Highest Quality Google Security Features for users and enterprises to secure their accounts
                </h6>
            </div>

            <div className="security-box">
                <StorageIcon className="highlight-icon" />
                <h3>Encryption</h3>
                <h6>
                We keep your clips, notes secure in transit and at rest in our Database (Google Firebase Firestore) .
                </h6>
            </div>
        </div>
    </div>

    <div className="bug">
        <div className="bug-cont">
            <div className="bug-column">
                <h2>Report Bugs !</h2>
                <h5 style={{width:400}}>
                    Our main focus is your smooth experience using our Software. Help us in our goal and if you found something unordenary please contact us !
                </h5>

                <a href="/support/report"><h5>More</h5></a>
            </div>
            <div className="bug-pic" />
        
        </div>
    </div>

    <div className="firebase-security">
        <div className="firebase-sec-title">
            <h2>How can I be sure that Clippify is safe ?</h2>
            <hr style={{width:"100%",borderColor:"black"}} />
        </div>

        <div className="firebase-sec-desc">
            <h5>Clippify is using Google's Firebase Backend as a Service which provides Security for :</h5>
            <ul>
                <li><h5>Safe Authentication</h5></li>
                <li><h5>User Data Safety</h5></li>
                <li><h5>Cloud Storage Security</h5></li>
                <li><h5>Google Analitics</h5></li>
                <li><h5>Live Server is running on Google Cloud</h5></li>
            </ul>
        </div>

        <div className="firebase-sec-more">
            <h5>For More Info about Firebase : <a href="https://firebase.google.com">Firebase.com</a></h5>
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

export default Security 