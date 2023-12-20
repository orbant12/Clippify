

const AcceptableUse = () =>{
    return(
        <div className="acceptable-use-policy">
            <div className="stepback-bar">
                <a href="/policies"><h5 className="step">Overview</h5></a>
                <h5 style={{opacity:0.5,cursor:"pointer"}}>/</h5>
                <a href="/policies/legal"><h5 className="step">Legal</h5></a>
                <h5>/</h5>
                <h5>Acceptable Use Policy</h5>
            </div>
            <div className="terms-title">
                <h1>Acceptable Use Policy</h1>
                <hr style={{width:270,marginBottom:10,borderColor:"black"}}/>
                <h6>Welcome to Clippify - All Clippify users must comply with Clippify’s Acceptable Use Policy. This Policy places certain restrictions on the content you can upload, the designs you create, and how you use Clippify.</h6>
            </div>
            <div style={{paddingTop:10}} className="terms-title">
                <h6>Clippify reserves the right to determine whether content violates this Policy at its sole discretion. This Policy may be updated from time to time.</h6>
            </div>
            <div className="terms-list">
                <div className="accept-use-welcome">
                    <h3>Anti-discrimination</h3>
                    <div>
                       
                        <h6>Clippify does not support and will not tolerate its Service being used to discriminate against others, especially when based on race, religion, sex, sexual orientation, age, disability, ancestry or national origin. You are not permitted to use the Service in a manner which would or would likely incite, promote or support such discrimination and you must not use the Service to incite or promote hostility or violence. If we believe in our sole determination that your use of the Service is being used to discriminate, especially if based on race, religion, sex, sexual orientation, age, disability, ancestry or national origin, we may permanently or temporarily terminate or suspend your access to the Service without notice and liability for any reason.</h6>
                    </div>
                 
                  
                </div>
                <hr style={{margin:50,borderColor:"black",marginLeft:"auto"}} />

                <div className="accept-use-welcome1">
                    <div>
                    <h3>General Use</h3>
                    </div>

                    <div>
                        <ol>
                            <li><h6>Promotes or creates a risk of physical or mental harm, emotional distress, death, disability, or disfigurement to yourself, any person, or animal</h6></li>
                            <li><h6>Promotes or creates a risk of harm, loss, or damage to any property</h6></li>
                            <li><h6>Seeks to harm or exploit children</h6></li>
                            <li><h6>Is harassing, abusive, racially or ethnically offensive, defamatory, invasive of personal privacy or publicity rights, libelous, or threatening</h6></li>
                            <li><h6>Seeks to harm or exploit children</h6></li>
                            <li><h6>Discriminates, incites, or promotes discrimination against others based on race, religion, sex, sexual orientation, age, disability, ancestry, national origin, or any other basis</h6></li>
                            <li><h6>Is sexually explicit or pornographic in nature or contains links to such material</h6></li>
                            <li><h6>Involves the sale or promotion of illegal activities, products, or services</h6></li>
                            <li><h6>Is fraudulent or promotes fraudulent activity</h6></li>
                            <li><h6>Violates the rights of any individual or third party, including their intellectual property and data privacy rights</h6></li>
                            <li><h6>Contains any information or content that you do not have a right to make available under any law or due to confidentiality, contractual, or fiduciary duties</h6></li>
                            <li><h6>Contains any information or disinformation that is false, deceptive, or misleading or otherwise promotes, endorses, encourages, or facilitates the spread of false information</h6></li>
                            <li><h6>Violates any applicable law or promotes activities that are illegal in nature</h6></li>
                            <li><h6>Threatens or undermines democratic processes or institutions</h6></li>

                        </ol>
                    </div>
                    
                    <div>
                        <h6>Last Updated: November, 01, 2023</h6>
                    </div>
                  
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

export default AcceptableUse