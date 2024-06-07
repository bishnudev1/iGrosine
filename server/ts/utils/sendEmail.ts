import nodemailer,{SendMailOptions} from 'nodemailer';

export const sendEmail = async (head:string,html:any,buyerEmail:string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bishnudevkhutia26@gmail.com', // Your Gmail email address
            pass: 'jfzf mzts devg akpc' // Your Gmail password
        }
    });

    const mailOptions:SendMailOptions = {
        from: 'bishnudevkhutia26@gmail.com', // Sender address
        to: buyerEmail, // List of recipients
        subject: head, // Subject line
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}