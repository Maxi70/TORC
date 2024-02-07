import * as Yup from "yup";

export let standardObject = {
  given_name: Yup.string().required("Enter your first name"),
  family_name: Yup.string().required("Enter your last name"),
  email: Yup.string().email().required("Enter your email address"),
  location: Yup.object().required("Enter your city, state/province"),
  tagline: Yup.string()
    .required("Enter your tagline")
    .max(60, "Maximum length of a tagline is 60 characters."),
  bio: Yup.string()
    .required("Enter your biography")
    .max(1000, "Maximum length of bio is 1000 characters."),
  phone: Yup.string().required("Enter your phone"),
  whatsAppAllowed: Yup.bool(),
};
