import { SOCIAL_LOGIN_ACCOUNTS } from "lookup";

const isSocialLoginuser = (identityUsername) => {
  if (identityUsername.startsWith(SOCIAL_LOGIN_ACCOUNTS.GOOGLE)) {
    return true;
  }
  if (identityUsername.startsWith(SOCIAL_LOGIN_ACCOUNTS.GITHUB)) {
    return true;
  }
  if (identityUsername.startsWith(SOCIAL_LOGIN_ACCOUNTS.ETHEREUM)) {
    return true;
  }

  return false;
};

export default isSocialLoginuser;
