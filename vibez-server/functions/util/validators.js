const isempty = string => {
  if (string.trim() === '') return true;
  else return false;
};
const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateSignupData = data => {
  let errors = {};

  if (isempty(data.email)) {
    errors.email = 'Email must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'must be a valid email address';
  }

  if (isempty(data.password)) errors.password = 'must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isempty(data.handle)) errors.handle = 'must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
exports.validateLoginData = data => {
  let errors = {};
  if (isempty(data.email)) errors.email = ' must not be empty plox';
  if (isempty(data.password)) errors.password = ' must not be empty plox';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};

  if (!isempty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isempty(data.website.trim())) {
    // from index 0 til index 4
    if (data.website.trim().substring(0, 4) !== 'http') {
      // check if the user input has header "http://""
      userDetails.website = `http://${data.website.trim()}`; // add header "https://" to url
    } else userDetails.website = data.website;
  }
  if (!isempty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
