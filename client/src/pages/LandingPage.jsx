//CSS
import "../Css/login.css"
import "../Css/style.css"
import "../Css/styles.css"
//REACT
import React, {useState} from "react"
//ASSETS AND IMAGES AND ICONS
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import laptopOnly from '../assets/Images/file-page.svg';
import phoneOnly from '../assets/Images/Landing-Ai.svg';
import clippingFeature from '../assets/Images/Landing-clipping-cornered.svg';
import notesFeature from '../assets/Images/Landing-notes_feature.svg';
import relatedFeature from '../assets/Images/Landing-related-feature-cornered.svg';
import aiFeature1 from '../assets/Images/landing-ai-feature.svg';
import aiFeature2 from '../assets/Images/landing-ai-f-summ.svg';
import aiFeature3 from '../assets/Images/landing-ai-f-chat.svg';

import { Link } from "react-router-dom";

const LandingPage = () => {


//<******************************VARIABLES*******************************>

//SUBSCRIPTION SWITCH
const [isYearlyOn, setIsYearlyOn] = useState(false);

//<******************************FUNCTIONS*******************************>


const [isActive, setIsActive] = useState(false);

 const handleBurgerMenuOpen2 = () => {
   setIsActive(!isActive);
   
 }
 
 const handleBurgerMenuClose2 = () => {
   setIsActive(!isActive);
 }
 
return(
<div className="landing-page">
   {/*NAV HEADER*/}
   <nav className={isActive ? "active":""}>
    <div className="nav-bar active">
      <i className='bx bx-menu sidebarOpen' onClick={handleBurgerMenuOpen2}/>
      <span className="logo navLogo"><a style={{marginRight:20,fontWeight:600,color:"black",opacity:0.6}} href="/">Clippfiy</a></span>
      <div className="menu show">
        <div className="logo-toggle ">
          <span className="logo"><a href="#">Clippify</a></span>
          <i className='bx bx-x siderbarClose' onClick={handleBurgerMenuClose2}></i>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a  href="#clipping">Features</a></li>
          <li><a href="/portfolio">Policies</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="/support/contact-us">Contact</a></li>
        </ul>
      </div>
      <div className="darkLight-searchBox">
   
          <Link style={{color:"black",paddingTop:5,position:"absolute",right:20}} to={"/login"}>
            <h6 style={{border:"2px solid black",borderRadius:20,padding:8,fontSize:10,backgroundColor:"white",fontWeight:600}}>Try for Free</h6>
          </Link>
          

      </div>
    </div>
  </nav>
        


   {/*1Row*/}
   <section id="welcome-page" >
      <div className="welcome-text">
         <h2>Create Your <span className="w_text_animated">Second Brain</span> and Store</h2> 
         <h3>Endless Infromation with <span className="w_highlight">Clippify</span></h3>
         <h6>Clippify enables you to effortlessly collect and store video clips from various sources. Whether it's the funny moments from your family gatherings, educational tutorials, or mesmerizing travel snippets, you can create your collection without any hassle.</h6>
        
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
         <h1 style={{fontWeight:600}}>More Then 100 + Users</h1>
         <h3 style={{opacity:0.6,fontSize:10}}>Join The Community</h3>
      </div>
   </section>

   <section id="ai-feature" className="slider_container">
      <div style={{marginLeft:"auto",marginRight:"auto",textAlign:"center",marginTop:40}}>
         <h4 style={{opacity:0.6,fontSize:16}}>Everything Clippify has to offer</h4>
         <h1>Features</h1>
      </div>
      <hr style={{width:"10%",marginLeft:"auto",marginRight:"auto", border:"1px solid black"}} />
      <div className="feature-row-1" id="clipping"> 
         <div className="feature-desc-landing">
            <h6>Gather Inspiration</h6>
            <h3>The fastest way to get ideas out of your head.</h3>
            <h5>Upload & Clip out the part you want to remember or use with clippify's features</h5>
         </div>
         <img src={clippingFeature} alt="clipping feature" />
      </div>

      <hr style={{width:"10%",marginLeft:"auto",marginRight:"auto", border:"1px solid black"}} />

      <div className="feature-row-1" id="notes"> 
         <img src={notesFeature} alt="clipping feature" />
         <div className="feature-desc-landing">
            <h6>Make It Your Own</h6>
            <h3>Note Out The Best Parts.</h3>
            <h5>You can make Notes that you can save and come back to when you need to remember something...</h5>
         </div>
      </div>
      <hr style={{width:"10%",marginLeft:"auto",marginRight:"auto", border:"1px solid black"}} />
      <div className="feature-row-1" style={{marginBottom:100}} id="organise"> 
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
         <h1 className="block-title">Clippify is best for Saving :</h1>
         <div className="echo-for-container">
            <div className="echo-for">
               <div className="usecase-type">
                 
                     <h5>Students</h5>
              
               </div>

               <div className="usecase-type">
               
                     <h5>Content Creators</h5>
               
               </div>
            </div>

            <div className="echo-for">
               <div className="usecase-type">
             
                     <h5>Idea / Inspiration </h5>
          
               </div>
               <div className="usecase-type">
               
                     <h5>Podcast Listeners</h5>
         
               </div>
            </div>
         </div>
      </div>
   </section>

   <section id="ai-feature" className="slider_container">
      <div style={{marginLeft:"auto",marginRight:"auto",textAlign:"center",marginTop:50}}>
         <h4 style={{opacity:0.6,fontSize:15}}>Ai Feature</h4>
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
      <hr style={{width:"10%",marginLeft:"auto",marginRight:"auto", border:"1px solid black"}} />
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

   <div style={{display:"flex",flexDirection:"column",width:"100%",marginRight:"auto",marginLeft:"auto",marginTop:50}}>
   <hr style={{marginBottom:50}} />
      <div style={{marginRight:"auto",marginLeft:"auto",marginBottom:-50}} >
          <h1 style={{fontSize:40,fontWeight:600}}>Pricing</h1>
      </div>
      <div id="pricing" className='s-bar' style={{marginRight:"auto",marginLeft:"auto"}}>
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
                              <h3>Store up to 100/gb</h3>
                           </div>
               
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3 >Unlimited Ai Access</h3>
                           </div>
                  
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3>Script Analising Ai</h3>
                           </div>
                     
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3>Unlimited Related Video's</h3>
                           </div>
                  
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3>Store Clips with No Limitations</h3>
                           </div>
                     </div>

                     <div className='sub-btn'>
                           <div className='btn-box'>
                              <h3 className='btn-txt' >Get Professional</h3>
                           </div>
                           <div className='price'>
                              <h3>10$ / Monthly</h3>
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
                              <h3>Store up to 100/gb</h3>
                           </div>
               
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3 >Unlimited Ai Access</h3>
                           </div>
                  
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3>Script Analising Ai</h3>
                           </div>
                     
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3>Unlimited Related Video's</h3>
                           </div>
                  
                           <div className='included-col'>
                              <CheckCircleOutlineOutlinedIcon/>
                              <h3>Store Clips with No Limitations</h3>
                           </div>
                     </div>

                     <div className='sub-btn'>
                           <div className='btn-box'>
                              <h3 className='btn-txt'>Get Professional</h3>
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
)}

export default LandingPage