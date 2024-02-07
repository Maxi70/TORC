import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAuth } from "GlobalAuthContext";
import classNames from "classnames";
import { Icon } from "semantic-ui-react";
import normalizeUrl from "normalize-url";
import { SOCIAL_LINK_TYPES, USER_TYPES } from "lookup";
import {
  FetchAppsyncDetailsByUsername,
  FAKE_APPSYNCUSER,
} from "helpers/sampleProfileData";

import ImageViewer from "components/ImageViewer";
import Footer from "components/Footer";
import Header from "components/Header";
import CountryFlag from "utils/CountryFlag";
import styles from "./PublicProfile.module.css";
import placeholderProfileImg from "../../../images/placeholderProfile.png";
import SocialLinks from "components/SocialLinks";
import ProfileDetails from "./ProfileDetails";
import Badges from "components/Badges";
import { sanitizeLocation } from "utils/sanitizeLocation";
import GithubStats from "components/GithubStats";

function Profile() {
  const history = useHistory();
  const { user } = useAuth();
  const [displayPage, setDisplayPage] = useState(false);
  let { username } = useParams();
  username = username.toLowerCase();
  const [appsyncUser, setAppsyncUser] = useState(FAKE_APPSYNCUSER.lazybaer);
  const [personalWebsite, setPersonalWebsite] = useState(null);
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [userOtherLinks, setUserOtherLinks] = useState([]);

  let {
    badges,
    coverPhoto,
    headshotKey,
    locale,
    location,
    socialLinks,
    referralCode,
    stats,
    visibility,
    jobRole,
    userType,
    given_name,
    family_name,
    email,
    phone,
  } = appsyncUser;

  const determinePersonalWebsite = (userData) => {
    const portfolio = userData.socialLinks?.find(
      (s) => s.type === SOCIAL_LINK_TYPES.PORTFOLIO
    );
    if (portfolio?.value && portfolio?.value.length > 0) {
      setPersonalWebsite(portfolio.value);
    } else {
      setPersonalWebsite(null);
    }
  };

  const canUserAccessProfile = useCallback(() => {
    return (
      cognitoGroups.includes(process.env.REACT_APP_COGNITO_ADMIN_GROUP) ||
      cognitoGroups.includes(
        process.env.REACT_APP_COGNITO_GROUP_USER_MANAGERS
      ) ||
      cognitoGroups.includes(process.env.REACT_APP_COGNITO_GROUP_JOB_MANAGERS)
    );
  }, [cognitoGroups]);

  const prepareCustomLinks = () => {
    const otherLinks = appsyncUser?.otherLinks || [];

    setUserOtherLinks(otherLinks);
  };

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

  // Identify personal website of user each time the user's details changes
  useEffect(() => {
    determinePersonalWebsite(appsyncUser);
  }, [appsyncUser]);

  // Fetch details about the user
  useEffect(() => {
    document.title = `${username} - Torc Profile`;

    setDisplayPage(false);
    // Clear any message displayed to user
    setShowMessage(false);

    (async () => {
      try {
        // const x = document.title.meow; // force error, bypass to dummy data
        const loggedInUserName = user === null ? "" : user.username;
        const publicUser = await FetchAppsyncDetailsByUsername(
          username,
          loggedInUserName
        );
        determinePersonalWebsite(publicUser);

        publicUser && setAppsyncUser(publicUser);
        setDisplayPage(true);
      } catch (err) {
        setDisplayPage(false);
        if (err.message?.startsWith("Unknown User")) {
          console.log("unknown");
          history.push(`/nouserfound/${username}`);
        }
        console.log(err);
      }
    })();
  }, [user, history, username]);

  // Display a message bar if:
  // - user is admin and is not viewing their own profile
  // - AND user is viewing a profile that is locked (visibility is NOT FULL)
  useEffect(() => {
    if (
      canUserAccessProfile() &&
      appsyncUser.visibility &&
      appsyncUser.visibility !== "FULL" &&
      user?.username !== appsyncUser.username
    ) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [canUserAccessProfile, appsyncUser, user]);

  useEffect(prepareCustomLinks, [appsyncUser, user]);

  return (
    <>
      <Header className={classNames("z-10", styles["profile-main-header"])} />
      {!displayPage && (
        <div className="flex justify-center h-screen items-center">
          <span className="loader"></span>
        </div>
      )}
      <div className="px-3 py-32 md:p-32 bg-background">
        <div className="bg-white overflow-hidden rounded-sm w-full">
          {displayPage &&
            (visibility === "FULL" ||
              username === user?.username ||
              canUserAccessProfile()) && (
              <section
                className={classNames(
                  "overflow-hidden relative w-full",
                  {
                    [styles["placeholder-image"]]:
                      !coverPhoto && userType !== USER_TYPES.CUSTOMER,
                    [styles["customer-placeholder-image"]]:
                      !coverPhoto && userType === USER_TYPES.CUSTOMER,
                  },
                  styles["profile-header"]
                )}
              >
                {coverPhoto && (
                  <ImageViewer
                    objectKey={coverPhoto}
                    placeholder={<Icon name="user circle" size="massive" />}
                    width="auto"
                    crop="fill"
                    radius={5}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </section>
            )}
          <div className={classNames("z-10 container mx-auto")}>
            <>
              {displayPage ? (
                <>
                  {
                    //if the visibility is full show the profile
                    //otherwise if the user viewing it is the person and it is hidden they can see it
                    //otherwise show the please fill out the referral code page
                    visibility === "FULL" ||
                    username === user?.username ||
                    canUserAccessProfile() ? (
                      <>
                        <div
                          className={classNames(
                            "grid grid-cols-1 md:grid-cols-3",
                            styles["profile-wrapper"]
                          )}
                        >
                          <div
                            className={classNames(
                              "border-r-0 md:border-r-2 col-span-1 border-gray-200 border-solid",
                              "border-gradient"
                            )}
                          >
                            <section
                              className={classNames(
                                "p-8 pb-11 border-gray-200",
                                "text-center",
                                styles["profile-info"]
                              )}
                            >
                              <div
                                className={classNames(
                                  "flex justify-center items-center mb-7 mx-auto min-w-[115px] max-w-[170px] mt-[-32%] md:mt-[-25%]"
                                )}
                              >
                                {userType !== USER_TYPES.CUSTOMER && (
                                  <div
                                    className={classNames(
                                      "relative overflow-hidden shadow-sm bg-blue-800",
                                      styles["profile-header--image"]
                                    )}
                                  >
                                    {headshotKey ? (
                                      <ImageViewer
                                        objectKey={headshotKey}
                                        placeholder={
                                          <Icon
                                            name="user circle"
                                            size="massive"
                                          />
                                        }
                                        radius={5}
                                      />
                                    ) : (
                                      <img
                                        src={placeholderProfileImg}
                                        alt="placeholder"
                                      />
                                    )}
                                  </div>
                                )}
                                {userType === USER_TYPES.CUSTOMER && (
                                  <>
                                    {!headshotKey && (
                                      <div
                                        className={classNames(
                                          "relative overflow-hidden shadow-sm",
                                          styles[
                                            "customer-profile-header--image"
                                          ]
                                        )}
                                      />
                                    )}
                                    {headshotKey && (
                                      <div
                                        className={classNames(
                                          "relative overflow-hidden shadow-sm",
                                          styles["profile-header--image"]
                                        )}
                                      >
                                        <ImageViewer
                                          objectKey={headshotKey}
                                          radius={5}
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                              <h2
                                data-cy="profileUserName"
                                className="sm:text-4xl md:text-2xl lg:text-4xl text-4xl mb-3 text-ellipsis"
                              >
                                {username}
                              </h2>
                              {canUserAccessProfile() && (
                                <>
                                  <p>
                                    {given_name} {family_name}
                                  </p>
                                  <p>{email}</p>
                                  <p>{phone?.number}</p>
                                </>
                              )}

                              {userType === USER_TYPES.CUSTOMER && (
                                <h3 className="text-xl mb-6">
                                  <span className="font-nexa-light italic tracking-wider">
                                    {jobRole}
                                  </span>
                                </h3>
                              )}
                              {(location?.locationId || locale) && (
                                <p className="flex justify-center items-center mb-4 gap-2">
                                  <CountryFlag
                                    country={location.countryCode.toLowerCase()}
                                  />
                                  {location?.locationId
                                    ? sanitizeLocation(location)
                                    : locale}
                                </p>
                              )}
                              {personalWebsite && (
                                <a
                                  rel="noreferrer"
                                  className={classNames(
                                    "inline-block mb-6 text-electricBlue",
                                    styles.personalWebsite
                                  )}
                                  alt="website link"
                                  href={personalWebsite}
                                  target="_blank"
                                >
                                  {normalizeUrl(personalWebsite, {
                                    stripProtocol: true,
                                  })}
                                </a>
                              )}
                              {socialLinks && (
                                <div
                                  className={classNames(
                                    "text-3xl flex justify-center gap-3",
                                    styles["social-links"]
                                  )}
                                >
                                  {
                                    <SocialLinks
                                      links={socialLinks.filter(
                                        (link) => link.type !== "PORTFOLIO"
                                      )}
                                      className={classNames(
                                        "bg-gray-100 rounded w-9 h-9 text-gray-500 flex items-center justify-center",
                                        styles["social-links-icon"]
                                      )}
                                    />
                                  }
                                </div>
                              )}
                            </section>
                            {userOtherLinks && userOtherLinks.length > 0 && (
                              <section
                                className={classNames(
                                  "p-8 border-t-2 border-gray-200",
                                  "border-gradient",
                                  styles["profile-skills"]
                                )}
                              >
                                <h2 className="text-2xl mb-6">Custom links</h2>
                                <div
                                  className={classNames(
                                    "flex flex-wrap pb-14",
                                    styles["skills-wrapper"]
                                  )}
                                >
                                  {userOtherLinks.map(
                                    ({ name, value }, idx) => (
                                      <a
                                        key={idx}
                                        href={value}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={classNames(
                                          "inline-block mr-2 mb-2 px-3.5 py-1.5 text-center rounded text-lg text-white hover:text-white bg-blue-800"
                                        )}
                                      >
                                        {name}
                                      </a>
                                    )
                                  )}
                                </div>
                              </section>
                            )}
                            {badges && (
                              <section
                                className={classNames(
                                  "pt-8 pl-8 w-[90%]",
                                  "border-t-2 border-gray-200 border-solid",
                                  "border-gradient",
                                  styles["profile-achievements"]
                                )}
                              >
                                {badges.length > 0 && (
                                  <div className="flex items-center mb-6">
                                    <h2 className="text-2xl mr-2">Badges</h2>
                                    <span className="text-cyan-600 text-base">
                                      {badges.length}
                                    </span>
                                  </div>
                                )}
                                <Badges badges={badges} />
                              </section>
                            )}

                            {/* Github Stats */}
                            {stats && (
                              <GithubStats
                                stats={stats}
                                isVertical={true}
                                isStandalone={true}
                              />
                            )}
                          </div>
                          <ProfileDetails
                            appsyncUser={
                              username === user?.username
                                ? {
                                    ...appsyncUser,
                                    resumeLocation: user?.resumeLocation,
                                  }
                                : appsyncUser
                            }
                            showPdf={username === user?.username}
                            cognitoGroups={cognitoGroups}
                            minScore={
                              canUserAccessProfile() ||
                              username === user?.username
                                ? 0
                                : 70
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid row-start-3 grid-rows-5 grid-cols-1 mt-25 gap-2 place-items-center font-extrabold justify-content-center text-3xl">
                          <div></div>
                          <div></div>

                          <div>
                            The profile for {username} is locked
                            {userType === USER_TYPES.FREELANCER && (
                              <>
                                . You can help unlock this profile by
                                <Link
                                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-60"
                                  to={`/signup?referralCode=${referralCode}&refSource=PROFILE`}
                                >
                                  {" "}
                                  registering with referral code ({referralCode}
                                  )
                                </Link>
                              </>
                            )}
                            . If you are the owner of this profile, please{" "}
                            <Link
                              alt="login"
                              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-60"
                              to="/login"
                            >
                              login
                            </Link>{" "}
                            to view your profile.
                          </div>
                        </div>
                      </>
                    )
                  }
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        </div>
      </div>
      <Footer />
      {showMessage && (
        <div className="w-1/4 fixed inset-x-0 z-100 bottom-0 pb-5 opacity-100 mx-auto px-2">
          <div className="p-2 rounded bg-red-500">
            <div className="flex align-center justify-center">
              <p className="font-semibold text-white">
                You are currently viewing a LOCKED profile
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
