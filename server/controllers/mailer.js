 import nodemailer from "nodemailer";
 import Mailgen from "mailgen";

 import ENV from "../config_database/config.js";
//  import ENV from "../e."

 //https://ethereal.email/create    tocreate the etherial account
//  let nodeConfig ={
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: ENV.EMAIL, // generated ethereal user
//       pass: ENV.PASSWORD, // generated ethereal password
//  }
// }


let nodeConfig={
    service: "gmail", 
    auth:{
        user:ENV.EMAIL,
        pass: ENV.PASSWORD
    }
}

let transporter = nodemailer.createTransport(nodeConfig);


let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})




// how to call this api  
// POST: localhost:8000/api/registerMail
// @PARAMS {username, userEmail, text, subject}

export const registerMail = async (req,res)=>{
    const {username, userEmail, text, subject} = req.body;

    // create body of email
    var email={
        body: {
            name:username,
            intro: text || "Welcome to iamROARe's WORLD",
            outro: "Need help , Plz just reply this email we would love to help you",

        }
    }

    var emailBody = MailGenerator.generate(email);
    let message={
        from : ENV.EMAIL,
        to : userEmail,
        subject: subject || "Signup successful",
        html: emailBody
    }


    // send mail
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({mess: "you should receive an email from us"})
    })
    .catch(error =>{
        res.status(500).send({error});
    })
}