


import "../../Css/policies.css"
import "../../Css/sidebar.css"
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import GavelIcon from '@mui/icons-material/Gavel';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FaqBar from "../../assets/Pricing/faqBar";
import { Link } from "react-router-dom";
const Policies = () =>{

//<******************************VARIABLESS*******************************>
//1
const Faq_First_Title = "How can I refound my subscription ?"
const Faq_First_Description = (
    <span>
        To refund your subscription, you need to{' '}
        <Link style={{color:"orange"}} to="/support/contact-us">contact us here</Link>
    </span>
);
//2
const Faq_Secound_Title = "What is the Terms & Services Policy ?"
const Faq_Secound_Description = (
    <span>
        You can read our Terms of Use Policy by clicking{' '}
        <Link style={{color:"orange"}} to="/policies/legal/terms">here</Link>
    </span>
);
//3
const Faq_Third_Title = "What should I do if I'v found a vulnerability in the Software ?"
const Faq_Third_Description = (
    <span>
        We are still in very early stage of development. If you found a bug please report it {' '}
        <Link style={{color:"orange"}} to="/support/feedback">here</Link>!{' '}
        Thanks - The Clippify Team
    </span>
);
//4
const Faq_Fourth_Title = "What to do if the App not working smoothly ?"
const Faq_Fourth_Description = (
    <span>
        If the App Crashes / Not Displaying the video / Showing the wrong data... Refresh the Page and Try again. <br />If this do not solves your problem plese feel free to{' '}
        <Link style={{color:"orange"}} to="/support/contact-us">contact our support team</Link>!{' '}
        Thanks - The Clippify Team
    </span>
);
//5
const Faq_Fifth_Title = "Where can I manage my subscription ?"
const Faq_Fifth__Description = (
    <span>
        To manage your subscription you need to go to the{' '}
        <a style={{color:"orange"}} href="/settings">Settings !</a>{' '}
        And then click on the "Manage Subscription" button.
    </span>
);


return(
<div className="legal">
    <div className="legal-nav-bar">
        <a href="/"><h2>Home</h2></a>
        <h4 className="selected-legal">Overview</h4>
        <a href="/policies/security"><h4>Security</h4></a>
        <a href="/support/feedback"> <h4>Feedback</h4></a>
        <a href="/policies/legal"><h4>Legal</h4></a>
        <a href="/support/contact-us"><h4>Contact Us</h4></a>
    </div>

    <div className="policies-cont">
        <div className="policies-title">
            <h2 style={{fontSize:30,marginTop:10}}>Policies</h2>
            <hr style={{marginTop:10}}/>
        </div>

        <div className="policies-table">
            <a href="/policies/security">
                <div className="policy-box">
                    <VpnLockIcon className="highlight-icon"/>

                    <div>
                        <h2>Security</h2>
                        <h6>Read how we make sure for your data Security</h6>
                    </div>

                </div>
            </a>

            <a href="/policies/legal/privacy-policy">
                <div className="policy-box">
                    <AddModeratorIcon className="highlight-icon" />
                    <div>
                        <h2>Privacy Policy</h2>
                        <h6>Read how we make sure for your data Security</h6>
                    </div>
                </div>
            </a>

            <a href="/policies/legal/terms">
                <div className="policy-box">
                    <AutoStoriesIcon className="highlight-icon" />
                    <div>
                        <h2>Terms of Use</h2>
                        <h6>Read how we make sure for your data Security</h6>
                    </div>
                </div>
            </a>
        </div>

        <div className="policies-table">
            <a href="/policies/legal/acceptable-use-policy">
                <div className="policy-box">
                    <GavelIcon className="highlight-icon" />
                    <div>
                        <h2>Acceptable Use Policy</h2>
                        <h6>Read how we make sure for your data Security</h6>
                    </div>
                </div>
            </a>

            <a href="/policies/legal/terms">
                <div className="policy-box">
                    <PsychologyAltIcon className="highlight-icon" />
                    <div>
                        <h2>Ai Product Terms</h2>
                        <h6>Read how we make sure for your data Security</h6>
                    </div>
                </div>
            </a>

            <a href="/policies/support/about-us">
                <div className="policy-box">
                    <ApartmentIcon  className="highlight-icon"/>
                    <div>
                        <h2>About Us</h2>
                        <h6>Read how we make sure for your data Security</h6>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <div className="bug">
        <div className="bug-cont2">
            <div className="bug-column">
                <h2>Report Bugs !</h2>
                <h5 style={{width:400}}>
                    Our main focus is your smooth experience using our Software. Help us in our goal and if you found something unordenary please contact us !
                </h5>

                <a className="highlighted-a" href="/support/report"><h5>More</h5></a>
            </div>
            <div className="bug-pic" />
        </div>
    </div>

    <div className='frth-bar' style={{marginBottom:100}}>
        <hr />
        <div>
            <h1 className='f-bar-title'>FAQ</h1>
            <h4 className='f-bar-subtitle'>Do you have any questions</h4>
        </div>
        {/*FIRST*/}
        <FaqBar FaqTitle={Faq_Third_Title} FaqDesc={Faq_Third_Description}/>
        {/*Secound*/}
        <FaqBar FaqTitle={Faq_First_Title} FaqDesc={Faq_First_Description}/>
        {/*Third*/}
        <FaqBar FaqTitle={Faq_Secound_Title} FaqDesc={Faq_Secound_Description}/>    
        {/*Fourth*/}
        <FaqBar FaqTitle={Faq_Fourth_Title} FaqDesc={Faq_Fourth_Description}/>
        {/*Fifth*/}
        <FaqBar FaqTitle={Faq_Fifth_Title} FaqDesc={Faq_Fifth__Description}/>
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
)};

export default Policies