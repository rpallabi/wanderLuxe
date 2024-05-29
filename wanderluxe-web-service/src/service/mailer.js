const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'barikvicky101@gmail.com',
        pass: 'Sweetheart@1'
    }
});

var mailOptions = {
    from: 'barikvicky101@gmail.com',
    to: 'sudhir.barik981@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});