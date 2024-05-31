export const domain = "/api/";

const apiUrls = {
  signup: domain + "api/auth/signup",
  login: domain + "api/auth",
  send_password: domain + "api/auth/sendOTP",
};

export default { apiUrls }
