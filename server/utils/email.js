// const nodemailer=require('nodemailer')
// const dotenv=require('dotenv')
// dotenv.config();


// const transporter=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS
//     }
// });


// exports.sendBookingEmail=async(userEmail, userName, eventTitle)=>{
//     try {
//         const mailOptions={
//             from:process.env.EMAIL_USER,
//             to:userEmail,
//             subject:`Booking Confirmed: ${eventTitle}`,
//             html:`
//             <h2>Hi ${userName}!</h2>
//             <p>Your Booking is confirmed ${eventTitle}</p>
//             <p>Thankyou for choosing EventNext</p>`
//         }
//         await transporter.sendMail(mailOptions)
//     } catch (error) {
//         console.error(`Error sending email: `,error)
//     }
// }
// exports.sendOtpEmail=async(email,OTP,type)=>{
// try {
//     const title=type==='account_verification' ? 'Verify your EventNext Account':'Event Booking Verification'
//     const msg=type==='account_verification'?'Please use the following OTP to verify your new EventNext account'
//     :'Please use the following OTP to verify and confirm your event booking.';
//     const mailOptions={
//     from:process.env.EMAIL_USER,
//     to:email,
//     subject:'Your OTP Code',
//     html:`<div style="max-width:500px;margin:40px auto;background:#ffffff;padding:40px;border-radius:16px;font-family:Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.1);border:1px solid #e5e7eb;">

//     <h2 style="text-align:center;color:#111827;font-size:28px;margin-bottom:20px;">
//         ${title}
//     </h2>

//     <p style="color:#4b5563;font-size:16px;line-height:1.6;text-align:center;margin-bottom:30px;">
//         ${msg}
//     </p>

//     <div style="background:#f3f4f6;border:2px dashed #9ca3af;border-radius:12px;padding:20px;text-align:center;font-size:36px;font-weight:bold;letter-spacing:8px;color:#000;margin-bottom:25px;">
//         ${OTP}
//     </div>

//     <p style="text-align:center;color:#6b7280;font-size:14px;margin-bottom:0;">
//         This code expires in 5 minutes.
//     </p>

// </div>`
// }
// await transporter.sendMail(mailOptions)
// } catch (error) {
//   console.error(`Error sending OTP to ${email} for ${type}: `,error)  
// }
// }

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
        <h2>Hi ${userName}!</h2>
        <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
        <p>Thank you for choosing Eventora.</p>
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your Eventora Account' : 'Eventora Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new Eventora account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #111;">${title}</h2>
                    <p style="color: #555; font-size: 16px;">${msg}</p>
                    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;">
                        ${otp}
                    </div>
                    <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${userEmail} for ${type}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };