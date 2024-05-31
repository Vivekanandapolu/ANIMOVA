import validator from "validator";

// export const validateEmail = (email) => {
//   return validator.isEmail(email);
// };

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
