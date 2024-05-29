const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    // connect with the smtp
    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'willis16@ethereal.email',
            pass: 'r8zm9hfea6Y3GNf3Pw'
        },
    });

    let info = await transporter.sendMail({
        from: '"WanderLuxe" <mail.wanderluxe.com>', // sender address
        to: "sudhir.barik981@gmail.com", // list of receivers
        subject: "WanderLuxe subscrition", // Subject line
        text: "Thank for subscribing to WanderLuxe", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    res.json(info);
};

module.exports = sendMail;
