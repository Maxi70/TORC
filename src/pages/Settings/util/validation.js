export function validatePassword({
  currentPassword,
  password,
  confirmPassword,
}) {
  let errors = [];

  errors.push(checkPasssword({ currentPassword, password }));

  if (confirmPassword !== password) {
    errors.push(
      "confirmPassword",
      "Password confirmation does not match the new password."
    );
  }

  return errors;
}

export function checkPasssword({ currentPassword, password }) {
  const errors = { password: "" };
  if (currentPassword === password) {
    errors.password = "Please select a new password.";
  }

  if (password.length > 256) {
    errors.password = "Maximum length of a password is 256 characters.";
  }

  if (password.length < 8) {
    errors.password = "Minimum length of a password is 8 characters.";
  }

  if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    )
  ) {
    errors.password =
      "Please ensure your password contains at least one, upper and lowercase characters, one number, and one special characters, and is of minimum length 8";
  }
  return errors;
}

export function checkConfirmPassword({ password, confirmPassword }) {
  const errors = { confirmPassword: "" };
  if (password !== confirmPassword) {
    errors.confirmPassword = "Password confirmation does not match.";
  }

  return errors;
}
