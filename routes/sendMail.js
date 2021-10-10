const router = require("express").Router(); //import Rourter object of 
var nodemailer = require('nodemailer');
var cors = require('cors');

const transporter = nodemailer.createTransport({
    host: " smtp.gmail.com", //replace with your email provider
    service: 'gmail',
    port: 465,
    secure:true,
    auth: {
        user: "phuongthao97py@gmail.com", //replace with the email address
        pass: "ngaplaiaxaddhtyn" //replace with the password
    }
});
// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

router.post('/send', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n subject: ${subject} \n message: ${message} `
    var mail = {
        from: name,
        to: "phuongthao97py@gmail.com",
        subject:`Message from Blog App ` + subject,
        text: content,
        html:`
            <div style="padding:0px 20px;background-color:rgb(241, 250, 248);">
                <h2 style="color:lightcoral;">Contact From Blog App</h2>
                <h3>Information</h3>
                    <ul>
                    <li>Name: ${name}</li>
                    <li>Eamil: ${email}</li>
                    <li>Subject: ${subject}</li>
                    </ul>
                <h3>Message</h3>
                <p>${message}</p>
                <p style="font-weight:bold;">Best regard</p>
            </div>
        `
    }
    
        transporter.sendMail(mail, (error, data) => {
            if (error) {
                res.send(error)
            } else {
                res.send('Success')
            }
        });
});

module.exports = router