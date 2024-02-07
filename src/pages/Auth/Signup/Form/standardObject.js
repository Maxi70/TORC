import * as Yup from "yup";

export let standardObject = {
  firstname: Yup.string().required("Enter your first name"),
  lastname: Yup.string().required("Enter your last name"),
  email: Yup.string().email().required("Enter your email address"),
  username: Yup.string()
    .required("Choose your username to represent you on the site")
    .min(2, "Username must be a minimum of 2 characters, and no more than 25")
    .max(25, "Username must be a minimum of 2 characters, and no more than 25")
    .matches(
      /^[A-Za-z0-9_-]+$/,
      "Username cannot contain special characters (!@#$%^&*+=) or spaces"
    ),
  location: Yup.object().required("Enter your city, state/province"),
  password: Yup.string()
    .required("Enter your password")
    .min(8, "Minimum length of a password is 8 characters")
    .max(256, "Maximum length of a password is 256 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      `Password must contain at least 8 characters, including:
        • 1 uppercase letter
        • 1 lowercase letter
        • 1 number
        • 1 special character
      `
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),

  agreedToTerms: Yup.bool().oneOf(
    [true],
    "Confirm that you agree to the Torc Talent Agreement, Terms of Service and Privacy Policy"
  ),
};
