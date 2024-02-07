import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useHistory, useLocation, Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import Amplify, { Hub } from "aws-amplify";
import awsConfig from "aws-exports.js";
import styles from "./Header.module.css";
import HumpImg from "../../images/hump.png";

import Cookies from "universal-cookie";

import { useAuth } from "GlobalAuthContext";
import { USER_TYPES } from "lookup";
import HeaderLoginButton from "../buttons/HeaderLogin";
import { setReferralCookies } from "helpers/utils";

function urlMatchesLocation(url) {
  if (window.location.href.includes(url)) {
    return url;
  }

  return null;
}

awsConfig.oauth.domain =
  process.env.REACT_APP_COGNITO_HOSTED_DOMAIN || awsConfig.oauth.domain;
const aAcceptabelSignInURLs = awsConfig.oauth.redirectSignIn.split(",");
const aAcceptableSignOutURLs = awsConfig.oauth.redirectSignOut.split(",");
awsConfig.oauth.redirectSignIn = aAcceptabelSignInURLs.find(urlMatchesLocation);
awsConfig.oauth.redirectSignOut =
  aAcceptableSignOutURLs.find(urlMatchesLocation);

Amplify.configure(awsConfig);
const Auth = Amplify.Auth;

/**
 * The header component.
 *
 * @param {React.ReactElement} pageHeader Page-specific header component renderprop.
 * @param {HTMLElement.Style} backgroundStyle Custom background style object.
 * @param {boolean} hasHump Whether to render a white hump (for signup pages).
 * @param {string} className Custom class name(s).
 * @returns
 */

const Header = ({
  pageHeader,
  backgroundStyle,
  hasHump,
  className,
  hideMenu,
}) => {
  const [user, setUser] = useState(null);
  const [signingOut, setSigningOut] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    // Listen for any changes to the currently logged in user details

    Hub.listen("opentorc", updateUsername);

    return () => void Hub.remove("opentorc", updateUsername);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUser(auth.user);
  }, [auth, history]);

  // Function to handle changes to the username
  const updateUsername = async ({ payload: { event, data } }) => {
    switch (event) {
      case "usernamechanged":
        // We could also instruct to fetch the latest user data
        // but we'll for now directly update to the value provided
        setUser({
          ...user,
          username: data.updatedUsername,
        });
        break;
      default:
        // This component won't handle any other event
        break;
    }
  };

  const params = new URLSearchParams(useLocation().search);
  setReferralCookies(params);

  const signOut = async () => {
    // Placing this first because Auth signout
    // could redirect the user
    setSigningOut(true);
    const cookies = new Cookies();
    cookies.remove("username", { path: "/" });
    await Auth.signOut();
    history.push("/");
  };

  const canUserAccessPayments = useCallback(() => {
    return cognitoGroups.includes(process.env.REACT_APP_COGNITO_PAYMENTS_GROUP);
  }, [cognitoGroups]);

  const canUserAccessJobOpps = useCallback(() => {
    return cognitoGroups.includes(
      process.env.REACT_APP_COGNITO_CUSTOMER_JOB_APPROVED_GROUP
    );
  }, [cognitoGroups]);

  // Fetch groups the logged in user belongs to
  useEffect(() => {
    (async () => {
      try {
        const auth = await Auth.currentSession();

        const groups = auth.getAccessToken().payload["cognito:groups"] || [];
        setCognitoGroups(groups);
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();
  }, []);

  return (
    <div
      className={classNames("w-full overflow-hidden relative", className)}
      style={backgroundStyle}
    >
      <div className={classNames("w-full", styles.header)}>
        <div className="mx-12 my-6" style={{ gridArea: `logo` }}>
          {user ? (
            <Link
              alt="link to dashboard if logged in or home if logged out"
              to="/dashboard"
            >
              <Logo />
            </Link>
          ) : (
            <Link
              alt="link to dashboard if logged in or home if logged out"
              to="/www"
            >
              <Logo />
            </Link>
          )}
        </div>

        <div
          className="bg-header pl-10 pr-8 p-2 self-stretch ml-8 md:ml-0 justify-end flex h-16 items-center"
          style={{
            clipPath: `polygon(0% 0%, 15px 100%, 100% 100%, 100% 0%)`,
            gridArea: `user`,
          }}
        >
          <div className={classNames(pathname === "/login" && "invisible")}>
            <HeaderLoginButton
              text="Login"
              alt="Login to your account"
              name={user?.given_name}
              type={user?.userType}
              familyName={user?.family_name}
              onClick={() =>
                void setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)
              }
              showMenu={user && !hideMenu}
              headshotKey={user?.headshotKey}
              jobRole={
                user?.careers?.length > 0 &&
                user?.careers?.filter((c) => !c.endDate)[0]
              }
            />
          </div>
        </div>

        {/* <div style={{ gridArea: `nav` }}>
          {user && !hideMenu && (
            <button
              alt="side menu button"
              onClick={() =>
                void setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)
              }
              className="fixed top-14 right-0 flex items-center gap-4 rounded-l md:w-28 w-12 h-12 px-6 py-4 text-white font-nexa z-50 bg-navy transition-all"
              style={{
                background: isSidebarOpen && `white`,
                color: isSidebarOpen && `black`,
                width: isSidebarOpen && `14rem`,
                zIndex: 1001,
              }}
            >
              <svg
                viewBox="0 0 2 2"
                className="h-3"
                style={{
                  flexBasis: `0.75rem`,
                  flexShrink: 0,
                  transform: `${
                    isSidebarOpen ? `scaleX(-1)` : ``
                  } scaleY(-1) rotate(135deg)`,
                }}
              >
                <path d="M 1,0 L 2,0 L 2,0.8 L 1,0.8" fill="currentColor" />
                <path d="M 0,1 L 2,1 L 2,2 L 0,2" fill="currentColor" />
              </svg>
              <span
                className="hidden w-0 overflow-visible"
                style={{ display: isSidebarOpen && `block` }}
              >
                Close&nbsp;Menu
              </span>
              {!isSidebarOpen && (
                <span className="md:visible invisible">MENU</span>
              )}
            </button>
          )}
        </div> */}
      </div>

      {pageHeader}
      {hasHump && (
        <div className="w-full absolute bottom-0 z-10">
          <img src={HumpImg} alt="" className="w-full" />
        </div>
      )}

      {/* Sidebar (positioned `fixed`) */}
      <div
        className="fixed right-0 top-0 text-right z-40 h-full bg-gray-800 transition-transform pl-12 pb-8 pr-6 pt-6 flex flex-col gap-8 text-white"
        style={{
          transform: isSidebarOpen ? `translateX(0px)` : `translateX(100%)`,
        }}
      >
        <div
          onClick={() =>
            void setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen)
          }
          className="ml-auto cursor-pointer mr-6"
        >
          X
        </div>
        {user?.userType === USER_TYPES.FREELANCER && (
          <>
            <SidebarLink to="/dashboard">My dashboard</SidebarLink>
            <SidebarLink to="/jobs/roles">Job roles</SidebarLink>
            <SidebarLink to="/jobs/matches">My jobs</SidebarLink>
            {canUserAccessPayments() && (
              <SidebarLink to="/payments">My payments</SidebarLink>
            )}
            <SidebarLink to="/settings">My settings</SidebarLink>
            <div
              className="px-6 py-4 rounded-l w-56 text-lg cursor-pointer mt-auto hover:text-gray-50 text-gray-400"
              onClick={signOut}
              disabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </div>
          </>
        )}
        {user?.userType === USER_TYPES.CUSTOMER && (
          <>
            <SidebarLink to="/dashboard">My dashboard</SidebarLink>
            {canUserAccessJobOpps() && (
              <SidebarLink to="/jobs/opportunities">My jobs</SidebarLink>
            )}
            {canUserAccessPayments() && (
              <SidebarLink to="/payments">My payments</SidebarLink>
            )}
            <SidebarLink to="/settings">My settings</SidebarLink>
            <div
              className="px-6 py-4 rounded-l w-56 text-lg cursor-pointer mt-auto hover:text-gray-50 text-gray-400"
              onClick={signOut}
              disabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

function SidebarLink(props) {
  return (
    <div className="flex group items-center text-xl">
      <div className="group-hover:visible invisible h-2 w-2 rounded bg-white" />
      <NavLink
        to={props.to}
        className="hover:text-gray-50 text-gray-400 px-6 py-4 rounded-l w-56"
      >
        {props.children}
      </NavLink>
    </div>
  );
}
