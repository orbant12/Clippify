

import "../../Css/policies.css"
import FaqBar from "../../assets/Pricing/faqBar";
import { Link } from "react-router-dom";

const Legal = () =>{

//FAQ_______________________________//

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
        <a style={{color:"orange"}} href="/settings">Settings !</a>{' '}
        And then click on the "Manage Subscription" button.
    </span>
);

    return(
        <div className="legal-page">
            <div className="legal-nav-bar">
            <a href="/"> <h2>Home</h2></a>
                <a href="/policies"><h4>Overview</h4></a>
                <a href="/policies/security"> <h4>Security</h4></a>
                <a href="/support/feedback"> <h4>Feedback</h4></a>
                <h4 className="selected-legal" >Legal</h4>
                <a href="/support/contact-us"> <h4>Contact Us</h4></a>
            </div>

            <div className="legal-page-title">
                <h2>Legal Page</h2>
                <hr style={{borderColor:"black"}}/>
            </div>

            <div className="legal-page-table">
                <div className="legal-page-box">
                    <div>
                        <h3>Terms of Use</h3>
                        <h6>These Terms of Use are effective as of November 1, 2023.</h6>
                    </div>
              
                    <a href="/policies/legal/terms"><h4>Read More</h4></a>
                </div>

                <div className="legal-page-box">
                    <div>
                        <h3>Privacy Policy</h3>
                        <h6>This Privacy Policy was last updated on November 1, 2023.</h6>
                    </div>
             
                    <a href="/policies/legal/privacy-policy"><h4>Read More</h4></a>
                </div>
            </div>

            <div className="legal-page-table2">
                <div className="legal-page-box">
                    <div>
                    <h3>Acceptable Use Policy</h3>
                    <h6>All Clippify users must comply with Clippify's Acceptable Use Policy. This Policy places certain restrictions on the content you can upload, and how you use Clippify.</h6>
                    </div>
                 
                    <a href="/policies/legal/acceptable-use-policy"><h4>Read More</h4></a>
                </div>

                <div className="legal-page-box">
                    <div>
                        <h3>Cookie Policy</h3>
                        <h6>The highlighted text is aimed to give a plain English summary of our Cookie Policy. Please ensure you read the main text as it doesn’t capture everything.</h6>
                    </div>
               
                    <a href="/policies/legal/cookie-policy"><h4>Read More</h4></a>
                </div>
            </div>

            <div className='frth-bar' style={{marginBottom:100,alignContent:"center",alignItems:"center",marginTop:-100}}>
            <hr />
                <div>
            <h1 className='f-bar-title'>FAQ</h1>
                <h4 className='f-bar-subtitle'>Do you have any questions</h4>
                </div>
                <FaqBar FaqTitle={Faq_Third_Title} FaqDesc={Faq_Third_Description}/>
{/*Secound*/}
                <FaqBar FaqTitle={Faq_First_Title} FaqDesc={Faq_First_Description}/>
    {/*Third*/}
                <FaqBar FaqTitle={Faq_Secound_Title} FaqDesc={Faq_Secound_Description}/>

              
    {/*Fourth*/}
                 <FaqBar FaqTitle={Faq_Fourth_Title} FaqDesc={Faq_Fourth_Description}/>

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
    )
}

export default Legal