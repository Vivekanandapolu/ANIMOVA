import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Users from "../src/Models/user.model.js";

dotenv.config();

// In-memory store for OTPs
const otps = {};

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Enable the verp option to verify recipient email addresses
  verp: true,
};

const transporter = nodemailer.createTransport(smtpConfig);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
export async function sendOTP(email) {
  const otp = generateOTP();
  const otpExpiration = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
  otps[email] = { otp, otpExpiration };

  // Verify the SMTP connection
  try {
    const valid_mail = await transporter.verify();
    if (valid_mail) {
      console.log(valid_mail, "////////");
      const user = await Users.findOne({ email: email });
      if (!user) {
        throw { status: 404, success: false, message: "User Not Found" };
      }

      const mailOptions = {
        from: `"ANIMOVA" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your OTP for verification",
        text: `Your OTP is: ${otp}`,
        html: `<p>Your new ANIMOVA password is: <strong>${otp}</strong></p><br>Note : You can change the password inside the ANIMOVA`,
      };
      await transporter.sendMail(mailOptions);
      return otp;
    }
  } catch (error) {
    throw {
      status: error.status,
      success: error.success,
      message: error.message,
    };
  }
}
