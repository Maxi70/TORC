import classNames from "classnames";
import Button from "components/FormComponents/Button";
import Calendar from "images/new/calendar_icon.png";
import { useAuth } from "GlobalAuthContext";

const ScheduleLinkButton = ({
  googleOnly = false,
  errorMessage = "",
  className = "",
  redirectURL,
}) => {
  const auth = useAuth();

  const state = `${auth?.user?.username}${
    redirectURL ? `redirectURL=${encodeURIComponent(redirectURL)}` : ""
  }`;

  const handleRedirectToNylas = () => {
    const REDIRECT_URI = process.env.REACT_APP_NYLAS_REDIRECT_URI;
    const CLIENT_ID = process.env.REACT_APP_NYLAS_CLIENT_ID;
    const SCOPES = `calendar`;
    window.location = `https://api.nylas.com/oauth/authorize?client_id=${CLIENT_ID}&login_hint=${encodeURIComponent(
      auth?.user?.email
    )}&scopes=${SCOPES}&state=${state}&response_type=code&redirect_uri=${REDIRECT_URI}`;
  };
  return (
    <>
      {googleOnly ? (
        <Button
          className={classNames(
            "mb-5 flex items-center gap-2 w-64 min-w-0",
            className
          )}
          bgColor="white"
          onClick={handleRedirectToNylas}
        >
          <img src={Calendar} alt="calendar" className="w-10" />
          <div>Connect with Google Calendar</div>
        </Button>
      ) : (
        <Button
          className={classNames("mb-5", className)}
          onClick={handleRedirectToNylas}
        >
          Link Calendar
        </Button>
      )}
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
    </>
  );
};

export default ScheduleLinkButton;
