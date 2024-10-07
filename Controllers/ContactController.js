
const transporter = require("../utils/Nodemailer");
require("dotenv").config();

const ContactController = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        if (name === "" && email === "" && message === "") {
            res.render('contact', { message: "All fields required" });
        }

        const sendmail = await transporter.sendMail({
            from: process.env.MY_EMAIL,
            to: process.env.MY_EMAIL,
            subject: `sender's email : ${email}`,
            name: `${name}`,
            text: `${message}`,
            replyTo: `${email}`
        });


        if (!sendmail) {
            res.render('contact', { message: "Message not sent" });
        }
        res.render('contact', { message: "Message sent succesfully" });
        req.body.name = "";
        req.body.email = "";
        req.body.message = "";


    }


    
    catch (error) {
    console.log(error);
    res.render('contact', { message: "Something went wrong" });
}
}

module.exports = ContactController