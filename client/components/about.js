import React from 'react';

const About = () => {
    return (
     <div className="row">
         <div className="row" id="wrap">
                <div id="happy-img">
                    <img id="main-image" src="shri_mentee.png" />
                </div>
                <div id="title">
                    <h1>Vacation</h1>
                </div>
         </div>
         <div className="row" id="aboutus">
             <h2>About Us</h2>
             <p>

             </p>
         </div>
         <div className="row" id="images">
                <h2>Meet the Developers</h2>
                <ul className="col-md-11 col-md-offset-1" id="photos">
                    <li className="floatLeft">
                        <img className="imagesSec" src="alex.jpg"/>
                        <h3>Alexander Onate</h3>
                        <p>Full Stack Developer</p>
                    </li>
                    <li className="floatLeft">
                        <img className="imagesSec"src="laisa.jpg"/>
                        <h3>Laisa Barros</h3>
                        <p>Front-End Developer</p>
                        <p>UI/UX Designer</p>
                    </li>
                </ul>
         </div>
     </div>
 );
};
export default About;
