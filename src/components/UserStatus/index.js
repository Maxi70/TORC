// import React from "react";
import { Auth } from "aws-amplify";

export default function GetUser() {
  return Auth.currentAuthenticatedUser();
}
