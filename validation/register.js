const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username)
    ? data.username
    : (errors.username = "Username field is required");

  data.email = !isEmpty(data.email)
    ? data.email
    : (errors.email = "Email field is required");

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //Check length of password
  if (data.password.length < 4) {
    errors.password = "Password must be longer than 4 characters";
  } else {
    data.password = data.password;
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  //Check if password input are equal
  if (data.password !== data.password2) {
    errors.password2 = "Passwords do not match";
  } else {
    data.password2 = data.password2;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
