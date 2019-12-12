const isEmpty = require("./is-empty");

module.exports = function validateAddIdeaInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title)
    ? data.title
    : (errors.title = "Title field is required");

  data.details = !isEmpty(data.details)
    ? data.details
    : (errors.details = "Details field is required");

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
