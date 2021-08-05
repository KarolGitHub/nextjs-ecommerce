const valid = ({
  name,
  email,
  password,
  cf_password,
}: registerPayload): string =>
  !name || !email || !password
    ? 'Please add all fields.'
    : !validateEmail(email)
    ? 'Invalid emails.'
    : password.length < 6
    ? 'Password must be at least 6 characters.'
    : password !== cf_password
    ? 'Confirm password did not match.'
    : 'Unexpected error';

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default valid;
