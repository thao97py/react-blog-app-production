import React, { useState, useEffect } from 'react'
import {axiosInstance} from "../../config";
import "./contact.css"

const initialState = {
    username: "",
    email: "",
    subject: "",
    message: ""
};

export default function Contact() {
    // const [contactName, setContactName] = useState("Your Name");
    // const [contactEmail, setContactEmail] = useState("Your Email");
    // const [contactSubject, setContactSubject] = useState("Subject");
    // const [contactMessage, setContactMessage] = useState("Message");

    const [
        { username, email, subject, message },
        setState
    ] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
      };

    const [error, setError] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went wromg. Please try again.");

    const contactData = {
        name: username,
        email: email,
        subject: subject,
        message: message
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance({
            method: 'post',
            url: '/sendmessage/send',
            data: contactData
        }).then(res => {
            setSendSuccess(true);
            clearState();
        }).catch(error => {
            setError(true);
            if (error.response) {
                // Request made and server responded
                //console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log(error.message);
            }
        });

    }



    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact">
                    <div className="section-title">
                        <h2>Contact</h2>
                        <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                    </div>

                    <div className="contactMap">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172138.65564773488!2d-122.48249053169148!3d47.61317422193177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1633242746492!5m2!1sen!2sus" loading="lazy"></iframe>
                    </div>

                    <div className="row mt-5">

                        <div className="col-lg-4">
                            <div className="info">
                                <div className="address">
                                    <i className="fas fa-location-arrow"></i>
                                    <h4>Location:</h4>
                                    <p>Seattle, Washington, 98188</p>
                                </div>

                                <div className="email">
                                    <i className="fas fa-envelope"></i>
                                    <h4>Email:</h4>
                                    <p>phuongthao97py@gmail.com</p>
                                </div>

                                <div className="phone">
                                    <i className="fas fa-phone-square-alt"></i>
                                    <h4>Call:</h4>
                                    <p>+1 206 637 9560</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 mt-5 mt-lg-0">

                            <form method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={username}
                                            placeholder="Your name"
                                            name="username"
                                            required
                                            onChange={onChange} />
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input
                                            type="email" className="form-control" id="email"
                                            name ="email"
                                            value={email} 
                                            placeholder="Your email"
                                            required
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <input
                                        type="text" className="form-control" id="subject"
                                        value={subject}
                                        name ="subject"
                                        placeholder="Subject"
                                        required
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        value={message}
                                        name ="message"
                                        placeholder="Message"
                                        required
                                        onChange={onChange}
                                    >
                                    </textarea>
                                </div>
                                <div className="my-3 ">
                                    <div className="loading">Loading</div>
                                    {error && <div className="error-message">{errorMessage}</div>}
                                    {sendSuccess && <div className="sent-message">Your message has been sent. Thank you!</div>}
                                </div>
                                <div className="text-center"><button type="submit">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
