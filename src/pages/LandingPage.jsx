//CSS
import "../Css/login.css"
import "../Css/style.css"
import "../Css/styles.css"

//REACT
import React, {useState} from "react"

//ASSETS AND IMAGES AND ICONS
import AnualSwitch from "../assets/Pricing/anualSwitch"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import laptopOnly from '../assets/Images/file-page.svg';
import phoneOnly from '../assets/Images/Landing-Ai.svg';
import supporter1 from '../assets/Images/supporter-2.svg';
import supporter2 from '../assets/Images/support-3.svg';
import googleSVG from '../assets/Images/google.svg';
import clippingFeature from '../assets/Images/Landing-clipping-cornered.svg';
import notesFeature from '../assets/Images/Landing-notes_feature.svg';
import relatedFeature from '../assets/Images/Landing-related-feature-cornered.svg';
import aiFeature1 from '../assets/Images/landing-ai-feature.svg';
import aiFeature2 from '../assets/Images/landing-ai-f-summ.svg';
import aiFeature3 from '../assets/Images/landing-ai-f-chat.svg';



const LandingPage = () => {

const [isYearlyOn, setIsYearlyOn] = useState(false);

const startClippify = () => {
   window.location.href = "/login"
}

return(

   <div className="landing-page">
      {/*NAV HEADER*/}
    <header className="header">
       <nav className="nav container">
          <div className="nav__data">
             <a href="/landing" className="nav__logo">
                <i className="ri-planet-line"></i> Clippify
             </a>
             
             <div className="nav__toggle" id="nav-toggle">
                <i className="ri-menu-line nav__burger"></i>
                <i className="ri-close-line nav__close"></i>
             </div>
          </div>

      
          <div className="nav__menu" id="nav-menu">
             <ul className="nav__list">
           
                <li className="dropdown__item">
                   <div className="nav__link">
                      Features <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                   </div>

                   <ul className="dropdown__menu">
                      <li>
                         <a href="#ai-feature" className="dropdown__link">
                            <i className="ri-pie-chart-line"></i> 
                           Script Analysis
                         </a>                          
                      </li>

                      <li>
                         <a href="#notes" className="dropdown__link">
                            <i className="ri-arrow-up-down-line"></i> Notes
                         </a>
                      </li>

                      <li>
                         <a href="#ai-feature" className="dropdown__link">
                            <i className="ri-arrow-up-down-line"></i> Ai Chat
                         </a>
                      </li>

                     
                      <li className="dropdown__subitem">
                         <div className="dropdown__link">
                            <i className="ri-bar-chart-line"></i> Clips <i className="ri-add-line dropdown__add"></i>
                         </div>

                         <ul className="dropdown__submenu">
                  
    
                            <li>
                               <a href="#clipping" className="dropdown__sublink">
                                  <i className="ri-cash-line"></i> Saving
                               </a>
                            </li>
    
                            <li>
                               <a href="#organise" className="dropdown__sublink">
                                  <i className="ri-refund-2-line"></i> Organising
                               </a>
                            </li>
                         </ul>
                      </li>
                   </ul>
                </li>

               
                <li className="dropdown__item">
                   <div className="nav__link">
                      Policies <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                   </div>

                   <ul className="dropdown__menu">
                      <li>
                         <a href="/policies/legal" className="dropdown__link">
                            <i className="ri-user-line"></i> Legal
                         </a>                          
                      </li>

                      <li>
                         <a href="/support/feedback" className="dropdown__link">
                            <i className="ri-lock-line"></i> Feedback
                         </a>
                      </li>

                      <li>
                         <a href="/policies/security" className="dropdown__link">
                            <i className="ri-message-3-line"></i> Security
                         </a>
                      </li>
                   </ul>
                </li>

                <li><a href="/policies" className="nav__link">FAQ</a></li>

                <li><a href="#price" className="nav__link">Pricing</a></li>

                <li><a href="/support/contact-us" className="nav__link">Contact</a></li>

                <li><a href="/login" className="login-btn">Login</a></li>
                <li><a href="/register" className="try-btn">Try for Free</a></li>

             </ul>
          </div>
          <div className="nav_side">
          </div>
       </nav>
       
    </header>

    {/*1Row*/}
    <section id="welcome-page" >
      
         <div className="only-pc">
            <img src={googleSVG} alt="google" />
            <h4>Only Avalible Pc & Laptop</h4>
         </div>
       <div className="welcome-text">
          
        
          <h2>Create Your <span className="w_text_animated">Second Brain</span> and Store</h2> 
          <h3>Endless Infromation with <span className="w_highlight">Clippify</span></h3>
          <h6>Clippify enables you to effortlessly collect and store video clips from various sources. Whether it's the funny moments from your family gatherings, educational tutorials, or mesmerizing travel snippets, you can create your collection without any hassle.</h6>

          <button onClick={startClippify} className="comic-button">Start Clippify</button>
       </div>
    </section>

     {/*2Row*/}


     {/*Slider Row*/}
      <div className="feature-1-landing">

            <img className="laptopOnly-show" src={laptopOnly} alt="laptop-note-feature" />
            <img className="phoneOnly-show" src={phoneOnly} alt="laptop-note-feature" />

      
      </div>

    {/*3Row*/}
       <section id="usecase2">
          <div className="block2">
             <h1>Approved and Used by</h1>
             <img style={{marginTop:-80,opacity:0.5}} src={supporter1} alt="" />
             <img style={{marginTop:-110,opacity:0.3}} src={supporter2} alt="" />
             
          </div>
       </section>

  <section id="ai-feature" className="slider_container">
   <div style={{marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>
   <h4 style={{opacity:0.6}}>Everything Clippify has to offer</h4>
       <h1>Features</h1>
   </div>

   <div className="feature-row-1" id="clipping"> 
  
      <div className="feature-desc-landing">
         <h6>Gather Inspiration</h6>
         <h3>The fastest way to get ideas out of your head.</h3>
         <h5>Upload & Clip out the part you want to remember or use with clippify's features</h5>
      </div>
      <img src={clippingFeature} alt="clipping feature" />
   </div>

   <div className="feature-row-1" id="notes"> 
   <img src={notesFeature} alt="clipping feature" />
  <div className="feature-desc-landing">
   
     <h6>Make It Your Own</h6>
     <h3>Note Out The Best Parts.</h3>
     <h5>You can make Notes that you can save and come back to when you need to remember something...</h5>
  </div>

</div>

   <div className="feature-row-1" id="organise"> 

  <div className="feature-desc-landing">
   
     <h6>All In One Place</h6>
     <h3>Save & Organise Your Clips.</h3>
     <h5>You can find your Clips & Notes all in one place related to each other </h5>
  </div>
   <img src={relatedFeature} alt="clipping feature" />
   </div>
    
</section>

       {/*5Row*/}
       <section id="usecase">
          <div className="block">
             <h1>Clippify is best for Saving :</h1>
             <div className="echo-for-container">
                <div className="echo-for">

                   <div className="usecase-type">
                      <a href="#" >
                    
                         <h5>Students</h5>
                      </a>
                   </div>

                   <div className="usecase-type">
                      <a href="#" >
                 
                         <h5>Content Creators</h5>
                      </a>
                   </div>
                   
                </div>
                <div className="echo-for">
                 
                      <div className="usecase-type">
                         <a href="#" >
                       
                            <h5>Idea / Inspiration Hunters</h5>
                         </a>
                      </div>

                      <div className="usecase-type">
                         <a href="#" >
                         
                            <h5>Podcast Listeners</h5>
                         </a>
                      </div>
                   
                </div>
             </div>
      
             
          </div>
       </section>

       <section id="ai-feature" className="slider_container">
   <div style={{marginLeft:"auto",marginRight:"auto",textAlign:"center"}}>
   <h4 style={{opacity:0.6}}>Ai Feature</h4>
       <h1>Clippify Ai</h1>
   </div>

   <div className="ai-feature-row-1" id="clipping"> 
  
      <div className="feature-desc-landing">
         <h6>Script Analasis</h6>
         <h3>Click Analise the Script and Ask Whatever.</h3>
         <h5>Ai will firstly save the transcript of your video and then it can analise it..</h5>
      </div>
      <img src={aiFeature1} alt="clipping feature" />
   </div>

   <div className="feature-row-1" id="notes"> 
   <img src={aiFeature2} alt="clipping feature" />
  <div className="feature-desc-landing">
   
     <h6>Easy & Convenient</h6>
     <h3>You can Ask For a Summerie</h3>
     <h5>Click the Summerize, and sit back and watch Clippify's Magic</h5>
  </div>

</div>

   <div className="feature-row-1" id="organise"> 

  <div className="feature-desc-landing">
   
     <h6>Ai Chat</h6>
     <h3>You can Simply Chat with Clippify</h3>
     <h5>Want some quick answers from your Ai friend ask whatever you want !</h5>
  </div>
  <img src={aiFeature3} alt="clipping feature" />
</div>



      

       
       </section>

      {/*6Row*/}

      <div id="price" className='sub-page' style={{backgroundColor:"#fff",marginTop:0}}> 
            <div className='f-bar' style={{paddingTop:100}}>
                <h1 className='f-bar-title'>Pricing</h1>
         
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
                        <h3>5 min Max Video Length</h3>
                        </div>

                        <div className='included-1'>
                        <CheckCircleOutlineOutlinedIcon/>
                        <h3>Ai Chat Only</h3>
                        </div>
                    </div>
                    <div className='sub-btn'>
                <div className='btn-box'>
                    <a href="/login"><h3 className='btn-txt'>Free Service</h3></a>
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
                    <a href="/login"><h3 className='btn-txt' >Get Professional</h3></a>
                </div>
                <div className='price'>
                  <h3>30$ / Month</h3>
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
                <a href="/login"><h3 className='btn-txt'>Get Professional</h3></a>
                </div>
                <div className='price'>
                    <h3>100$ / Yearly</h3>
                </div>
            </div>
                    </div>
                </div>
                )}
    
            </div>
            </div>

            <div className='t-bar'  style={{backgroundColor:"#fff",paddingBottom:100}}>
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



            <footer style={{alignSelf:"center"}} className="footer">
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

export default LandingPage