const valid = ({
  name,
  email,
  password,
  confirmPassword,
}: RegisterPayload): string | null =>
  !name || !email || !password
    ? 'Please add all fields.'
    : !validateEmail(email)
    ? 'Invalid emails.'
    : password.length < 6
    ? 'Password must be at least 6 characters.'
    : password !== confirmPassword
    ? 'Confirm password did not match.'
    : null;

const validateEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default valid;
