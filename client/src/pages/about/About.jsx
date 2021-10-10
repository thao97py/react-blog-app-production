import React from 'react'
import './about.css'
import myPic from "../../images/me.jpg"
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <div className="about">
            <h2 className="aboutTitle">About me</h2>
            <div className="row aboutInfo">
                <div className="col-lg-6">
                    <img className="aboutImg" src={myPic} alt="" />
                </div>
                <div className="aboutDesc col-lg-6">
                    <p >I'm Thao. I'm the owner of this web blog app. I'm also a Software Engieer. I love developing awesome and beautiful web application. This Blog App is my side projects that allows me as well all any welcome blog writters to contribute their knowlege to the members and community readers of this Blog App. <span> <Link to="/contact" className="link"> Contact me if you have any question.</Link></span></p>
                </div>
            </div>
        </div>
    )
}
