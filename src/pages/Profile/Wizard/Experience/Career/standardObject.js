import * as Yup from "yup";

export let standardObject = {
  jobtitle: Yup.string().required("Enter your first name"),
  company: Yup.string().required("Enter the company name"),
};
