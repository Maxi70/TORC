import React from "react";
import { useLocation, Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Auth.module.css";
import LogIn from "./Login";
import SignUp from "./Signup";
import ForgotPassword from "./ForgotPassword";

const TABLETS_AND_BELOW_WIDTH = 1025;

function Auth() {
  const location = useLocation();

  let isRightPanelContainer = !["/login", "/forgot-password"].includes(
    location.pathname
  );

  React.useEffect(() => {
    switch (location.pathname) {
      case "/login":
      case "/forgot-password":
        setRightPanelIsActive(false);
        break;
      default:
        setRightPanelIsActive(true);
    }
  }, [location]);

  const [rightPanelIsActive, setRightPanelIsActive] = React.useState(
    isRightPanelContainer
  );
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function setWidthOnResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", setWidthOnResize);

    return () => {
      window.removeEventListener("resize", setWidthOnResize);
    };
  }, []);

  return (
    <>
      {screenWidth >= TABLETS_AND_BELOW_WIDTH && (
        <>
          <div
            className={classNames(styles.container, {
              [styles.rightPanelActive]: rightPanelIsActive,
            })}
          >
            <div
              className={classNames(
                styles.formContainer,
                styles.rightContainer
              )}
            >
              {rightPanelIsActive && (
                <SignUp onLogin={() => setRightPanelIsActive(false)} />
              )}
            </div>
            <div
              className={classNames(styles.formContainer, styles.leftContainer)}
            >
              {!rightPanelIsActive && location.pathname === "/login" && (
                <LogIn />
              )}
              {!rightPanelIsActive &&
                location.pathname === "/forgot-password" && <ForgotPassword />}
            </div>
            <div className={styles.overlayContainer}>
              <div className={styles.overlay}>
                <div
                  className={classNames(
                    styles.overlayPanel,
                    styles.overlayLeft
                  )}
                >
                  <h1>Have we met before?</h1>
                  <p>
                    Does this look familiar? Have you already created an account
                    with us?
                  </p>
                  <Link
                    to="/login"
                    className="ui inverted grey large button"
                    onClick={() => setRightPanelIsActive(false)}
                  >
                    Login
                  </Link>
                </div>
                <div
                  className={classNames(
                    styles.overlayPanel,
                    styles.overlayRight
                  )}
                >
                  <h1>You there!</h1>
                  <p>
                    Don't have an account yet? Go ahead and share some details
                    with us and we'll set you right up!
                  </p>
                  <Link
                    to="/signup"
                    className="ui inverted black large button"
                    onClick={() => setRightPanelIsActive(true)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {screenWidth < TABLETS_AND_BELOW_WIDTH && (
        <>
          {location.pathname === "/login" && <LogIn />}
          {location.pathname === "/forgot-password" && <ForgotPassword />}
          {location.pathname === "/signup" && <SignUp />}
        </>
      )}
    </>
  );
}

export default Auth;
