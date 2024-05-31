import { validateEmail } from "../../utils/emailVallidator.js";
import { sendOTP } from "../../utils/otpService.js";
import { generateToken } from "../../utils/token.js";
import Users from "../Models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  try {
    const { email, password, phoneNumber } = req.body;
    if (!email || !password || !phoneNumber) {
      throw { status: 400, success: false, message: "Enter All Fields" };
    }
    if (!validateEmail(email)) {
      throw { status: 400, success: false, message: "Invalid Email Format" };
    }
    if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      throw { status: 400, success: false, message: "Invalid Mobile Number" };
    }

    if (password.length < 5) {
      throw {
        status: 400,
        success: false,
        message: "Password Atleast 5 characters ",
      };
    }
    req.body.email = email.toLowerCase();
    const find_user = await Users.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });

    if (find_user) {
      if (phoneNumber == find_user.phoneNumber) {
        throw { status: 401, success: false, message: "Phone Already Exists" };
      }
      if (email == find_user.email) {
        throw { status: 401, success: false, message: "Email Already Exists" };
      }
    }

    //Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;

    const user = new Users(req.body);
    await user.save();

    return res
      .status(201)
      .send({ success: true, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

//Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw { status: 400, success: false, message: "Enter All Fields" };
    }
    const find_user = await Users.findOne({ email: email.toLowerCase() });
    if (!find_user) {
      throw { status: 404, success: false, message: "User Not Found" };
    }

    const comparePass = await bcrypt.compare(password, find_user.password);
    console.log(password, find_user.password);
    if (!comparePass) {
      throw { status: 404, success: false, message: "Password Not Matched" };
    }
    const token = generateToken(find_user);
    throw {
      status: 200,
      success: true,
      message: "User Logged in",
      token: token,
    };
  } catch (error) {
    next(error);
  }
};

//Sending Forgot password
export const sendingOtp = async (req, res, next) => {
  const { email } = req.body;

  try {
    const otp = await sendOTP(email); // Assuming sendOTP is a function to send OTP via email

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(otp, salt);
    const updateUser = await Users.updateOne(
      { email: email },
      { $set: { password: hashpass } }
    );
    console.log(updateUser);
    if (updateUser) {
      throw {
        status: 200,
        success: true,
        message: "New Password Sent Successfully",
      };
    } else {
      throw {
        status: 500,
        success: false,
        message: "Failed to update password",
      };
    }
  } catch (err) {
    next(err);
  }
};
