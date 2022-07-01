export function validateEmail(email) {
  return email.trim().includes("@");
}

export function validatePassword(password) {
  return password.trim().length > 6;
}