//REACT AND CONTEXTS
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/UserAuthContext';
import { Link } from 'react-router-dom';
//ICONS
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { sendEmailVerification } from "firebase/auth";
//ASSETS
import AnualSwitch from "../assets/Pricing/anualSwitch"
import FaqBar from "../assets/Pricing/faqBar"
import { getCheckoutUrl,getPortalUrl } from "../assets/Subscription/checkOutUrl"

//CSS
import '../Css/pricing.css';

//FIREBASE
import { app,db } from "../firebase";
import {  doc, getDoc} from "firebase/firestore";


const Subscription = () =>{


//<******************************VARIABLES*******************************>

// COMMON VARIABLES
const { currentuser } = useAuth();

// USERDATA
const [userData, setUserData] = useState([]);

// YEAR TO MONTH TOGGLE
const [isYearlyOn, setIsYearlyOn] = useState(false);

//FAQ
const Faq_First_Title = "How can I refound my subscription ?"
const Faq_First_Description = (
    <span>
        To refund your subscription, you need to{' '}
        <Link style={{color:"orange"}} to="/support/contact-us">contact us here</Link>
    </span>
);

const Faq_Secound_Title = "What is the Terms & Services Policy ?"
const Faq_Secound_Description = (
    <span>
        You can read our Terms of Use Policy by clicking{' '}
        <Link style={{color:"orange"}} to="/policies/legal/terms">here</Link>
    </span>
);

const Faq_Third_Title = "What should I do if I'v found a vulnerability in the Software ?"
const Faq_Third_Description = (
    <span>
        We are still in very early stage of development. If you found a bug please report it {' '}
        <Link style={{color:"orange"}} to="/support/feedback">here</Link>!{' '}
        Thanks - The Clippify Team
    </span>
);

const Faq_Fourth_Title = "What to do if the App not working smoothly ?"
const Faq_Fourth_Description = (
        <span>
            If the App Crashes / Not Displaying the video / Showing the wrong data... Refresh the Page and Try again. <br />If this do not solves your problem plese feel free to{' '}
            <Link style={{color:"orange"}} to="/support/contact-us">contact our support team</Link>!{' '}
            Thanks - The Clippify Team
        </span>
);

const Faq_Fifth_Title = "Where can I manage my subscription ?"
const Faq_Fifth__Description = (
        <span>
            To manage your subscription you need to go to the{' '}
            <Link style={{color:"orange"}} to="/settings">Settings</Link>!{' '}
            And then click on the "Manage Subscription" button.
        </span>
);

//<******************************FUNCTIONS*******************************>

//FETCH USER DATA
useEffect(() => {
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
                } else {
                    console.log("Document does not exist.");
                    setUserData(null); // Set to null or handle accordingly
                };
            }
        } catch (error) {
        console.error("Error getting document: ", error);
        };
    };
    fetchData();
}, [currentuser]);

//STRIPE EXTENSION MONTHLY
const upgradeToMonthly = async () =>{
    if(userData.subscription === false && currentuser.emailVerified === true){
        const priceId = "price_1O7ftVLPhjnJoAbmJFMM7zGJ";
        alert("Loading... It may take a few seconds")
        const checkoutUrl = await getCheckoutUrl(app, priceId);
        window.location.href = checkoutUrl;
    }else if(userData.subscription === true && currentuser.emailVerified === true){
        const portalUrl = await getPortalUrl(app);
        alert("Loading... It may take a few seconds");
        window.location.href = portalUrl;
        console.log("Manage Subscription");
    }else if(currentuser.emailVerified === false){
        sendEmailVerification(currentuser)
        alert("Please Verify Your Email First, Check Your Email Inbox and Refresh the Page !")
    }
};

//STRIPE EXTENSION YEARLY
const upgradeToYearly = async () =>{
    if(userData.subscription === false && currentuser.emailVerified === true){
        const priceId = "price_1O7fuRLPhjnJoAbmj0Vvm8vx";
        alert("Loading... It may take a few seconds")
        const checkoutUrl = await getCheckoutUrl(app, priceId);
        window.location.href = checkoutUrl;
    }else if(userData.subscription === true && currentuser.emailVerified === true){
        const portalUrl = await getPortalUrl(app);
        alert("Loading... It may take a few seconds")
        window.location.href = portalUrl
        console.log("Manage Subscription");
    }else if(currentuser.emailVerified === false){
        sendEmailVerification(currentuser)
        alert("Please Verify Your Email First, Check Your Email Inbox and Refresh the Page !")
    }
};


return(
<div className='sub-page'> 
    <div className='f-bar'>
        <h1 className='f-bar-title'>Pricing</h1>
        <h4 className='f-bar-subtitle'>Your current state: {!userData.subscription?<span>Free</span>:<span>Premium</span>}</h4>
        <div className='f-bar-switch'>
            <AnualSwitch stateAnnualSwitch={setIsYearlyOn}/>
        </div>
    </div>

    <div className='s-bar'>
        <div className='sub-box'>
            <div className='box-title'>
                <h3 className='title-tag'>Basic</h3>
                <h1 className='title-main'>Free</h1>
                <h6>Free users can use:</h6>
            </div>

            <div className='box-inculded'>
                <div className='included-1'>
                    <CheckCircleOutlineOutlinedIcon/>
                    <h3>Store up to 10/gb to Cloud</h3>
                </div>

                <div className='included-1'>
                    <CheckCircleOutlineOutlinedIcon/>
                    <h3>10 minute Max Video Length</h3>
                </div>

                <div className='included-1'>
                    <CheckCircleOutlineOutlinedIcon/>
                    <h3>Ai Chat Only</h3>
                </div>
            </div>

            <div className='sub-btn'>
                <div className='btn-box'>
                    <h3 className='btn-txt'>Free Service</h3>
                </div>
            </div>
        </div>
        {isYearlyOn ? (
            <div className={`sub-box2 ${isYearlyOn ? 'active' : ''}`}>
                <div className='box-title'>
                    <h3 className='title-tag2'>Most popular</h3>
                    <h1 className='title-main'>Monthly</h1>
                    <h6>Professional users can use:</h6>
                </div>
                <div className='box-inculded'>
                    <div className='included-2'>
                        <div className='included-col'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3 >Store up to 100/gb</h3>
                        </div>

                        <div className='included-col2'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3 >Unlimited Ai Access</h3>
                        </div>
                    </div>

                    <div className='included-2'>
                        <div className='included-col'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3>Script Analising Ai</h3>
                        </div>
                    
                        <div className='included-col3'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3>Unlimited Related Video's</h3>
                        </div>
                    </div>

                    <div className='included-3'>
                        <CheckCircleOutlineOutlinedIcon/>
                        <h3>Store Clips with No Limitations</h3>
                    </div>

                    <div className='sub-btn'>
                        <div className='btn-box'>
                            <h3 className='btn-txt' onClick={upgradeToMonthly}>Get Professional</h3>
                        </div>
                        <div className='price'>
                            <h3>10$ / Month</h3>
                        </div>
                    </div>
                </div>
            </div>
        ) : ( 
            <div className={`sub-box3 ${!isYearlyOn ? 'active' : ''}`}>
                <div className='box-title'>
                    <h3 className='title-tag2'>Best Offer</h3>
                    <h1 className='title-main'>Yearly</h1>
                    <h6>Annual users can use:</h6>
                </div>
                <div className='box-inculded'>
                    <div className='included-2'>
                        <div className='included-col'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3 className='included-col-txt'>Store up to 100/gb</h3>
                        </div>
            
                        <div className='included-col2'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3 >Unlimited Ai Access</h3>
                        </div>
                
                    </div>

                    <div className='included-2'>
                        <div className='included-col'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3>Script Analising Ai</h3>
                        </div>
                    
                        <div className='included-col3'>
                            <CheckCircleOutlineOutlinedIcon/>
                            <h3>Unlimited Related Video's</h3>
                        </div>
                
                    </div>

                    <div className='included-3'>
                        <CheckCircleOutlineOutlinedIcon/>
                        <h3>Store Clips with No Limitations</h3>
                    </div>

                    <div className='sub-btn'>
                        <div className='btn-box'>
                            <h3 className='btn-txt' onClick={upgradeToYearly}>Get Professional</h3>
                        </div>
                        <div className='price'>
                            <h3>100$ / Yearly</h3>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>

    <div className='t-bar'>
        <div className='first-row'>
            <div className='comp-title'>
                <h3 className='comp-title-txt'>Compare plans</h3>
                <h5 className='comp-title-subtxt'>Find the best choice for you</h5>
            </div>

            <div className='comp-free'>
                <h1>Free</h1>
            </div>

            <div className='comp-m'>
                <h1>Monthly</h1>
            </div>

            <div className='comp-yrl'>
                <h1>Yearly</h1>
            </div>
        </div>

        <div className='first-row'>
            <div className='comp-title'>
                <h3 className='comp-txt'>Cloud Storage</h3>
            </div>

            <div className='comp-free'>
                <h1 className='comp-nmbr'>10 / gb</h1>
            </div>

            <div className='comp-m'>
                <h1 className='comp-nmbr' >100 / gb</h1>
            </div>

            <div className='comp-yrl'>
                <h1 className='comp-nmbr' >100 / gb</h1>
            </div>
        </div>

        <div className='first-row'>
            <div className='comp-title'>
                <h3 className='comp-txt'>Clippify Ai</h3>
            </div>

            <div className='comp-free'>
                <h1 className='comp-nmbr'>Ai Chat Only</h1>
            </div>

            <div className='comp-m'>
                <h1 className='comp-nmbr' >FULL Access</h1>
            </div>

            <div className='comp-yrl'>
                <h1 className='comp-nmbr' >FULL Access</h1>
            </div>
        </div>

        <div className='first-row'>
            <div className='comp-title'>
                <h3 className='comp-txt'>Related Video Storage</h3>
            </div>

            <div className='comp-free'>
                <h1 className='comp-nmbr'>3 / MAX</h1>
            </div>

            <div className='comp-m'>
                <h1 className='comp-nmbr' >Unlimited</h1>
            </div>

            <div className='comp-yrl'>
                <h1 className='comp-nmbr' >Unlimited</h1>
            </div>
        </div>

        <div className='first-row'>
            <div className='comp-title'>
                <h3 className='comp-txt'>Saved Video Length <h5>(min)</h5></h3>
            </div>

            <div className='comp-free'>
                <h1 className='comp-nmbr'>10 / MAX</h1>
            </div>

            <div className='comp-m'>
                <h1 className='comp-nmbr' >Unlimited</h1>
            </div>

            <div className='comp-yrl'>
                <h1 className='comp-nmbr' >Unlimited</h1>
            </div>
        </div>            
    </div>

    <div style={{marginBottom:100}} className='frth-bar'>
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

    <footer style={{width:1920,alignSelf:"center",textAlign:"left"}} className="footer">
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

export default Subscription