import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { Icon } from "semantic-ui-react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ImageViewer from "components/ImageViewer";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import { USER_TYPES } from "lookup";
import placeholderProfile from "../../../../images/placeholderProfile.png";
import ProfileCompletionWidget from "components/ProfileCompletionWidget";

export const ProfileHeader = (props) => {
  const { styles, appsyncUser } = props;
  const { username, headshotKey, userType, profileCompletion, given_name } =
    appsyncUser;
  const history = useHistory();

  const [displayProfilePercentage, setDisplayProfilePercentage] =
    useState(false);

  return (
    <section
      className={classNames(
        "flex justify-center",
        "full-width",
        styles["profile-header"]
      )}
    >
      <div
        className={classNames(
          "flex flex-col-reverse md:flex-row items-center w-full px-6 md:px-0 py-8 md:py-14 justify-between",
          "full-width--wrapper"
        )}
      >
        <div className="pr-14 flex-1">
          <h1 className="lg:text-5xl md:text-3xl text-2xl mb-8">
            Welcome Back, {given_name}
          </h1>

          <div className="flex lg:flex-row flex-col mb-8 w-full">
            <GetStartedBtn
              label="View Profile"
              id="ViewProfile"
              data-cy="ViewProfile"
              className="uppercase w-52"
              textColor="text-black"
              smallButton
              onClick={() => username && history.push(`/profile/${username}`)}
            />
            &nbsp;&nbsp;
            {userType === USER_TYPES.FREELANCER && (
              <GetStartedBtn
                label="Edit Profile"
                className="uppercase w-52"
                textColor="text-black"
                smallButton
                onClick={() => username && history.push(`/profile/wizard/1`)}
              />
            )}
            {userType === USER_TYPES.CUSTOMER && (
              <GetStartedBtn
                label="Edit Profile"
                className="uppercase w-52"
                textColor="text-black"
                smallButton
                onClick={() =>
                  username && history.push(`/profile/customer/wizard/1`)
                }
              />
            )}
          </div>
        </div>
        <div
          className={classNames(
            "flex justify-end items-center mb-12 md:mb-0 flex-1"
          )}
        >
          {userType === USER_TYPES.CUSTOMER ? (
            <>
              {profileCompletion > 99 && (
                <div
                  className={classNames(
                    "relative overflow-hidden shadow-sm",
                    styles["profile-header--image"]
                  )}
                >
                  {headshotKey ? (
                    <ImageViewer
                      objectKey={headshotKey}
                      placeholder={<Icon name="user circle" size="massive" />}
                      radius={5}
                    />
                  ) : (
                    <img src={placeholderProfile} alt="placeholder profile" />
                  )}
                </div>
              )}
              {profileCompletion < 100 && (
                <div
                  className="flex flex-col items-center"
                  onMouseOver={() => setDisplayProfilePercentage(true)}
                  onMouseOut={() => setDisplayProfilePercentage(false)}
                  style={{
                    maxWidth: "300px",
                  }}
                >
                  <CircularProgressbarWithChildren
                    value={profileCompletion ? profileCompletion : 0}
                    className={classNames(
                      profileCompletion < 100 && "animate-pulse",
                      "overflow-hidden"
                    )}
                    counterClockwise
                    strokeWidth={20}
                    styles={buildStyles({
                      pathTransitionDuration: 1,
                      pathColor: "#048dad",
                      trailColor: "#2f2a7b",
                    })}
                  >
                    <div
                      className={classNames(
                        "relative overflow-hidden",
                        !displayProfilePercentage && "bg-yellow-300",
                        styles["profile-header--image"]
                      )}
                    >
                      {!displayProfilePercentage ? (
                        <div className="flex justify-center items-center h-full">
                          {/* <> */}
                          {headshotKey ? (
                            <ImageViewer
                              objectKey={headshotKey}
                              placeholder={
                                <Icon name="user circle" size="massive" />
                              }
                              radius={5}
                            />
                          ) : (
                            <div className="w-full h-full">
                              <img
                                src={placeholderProfile}
                                alt="default profile"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        // </div>
                        <div className="flex flex-col items-center justify-center h-full w-full">
                          <div className="text-4xl text-purple-600 mb-2 tracking-wider">
                            {profileCompletion ? profileCompletion : 0}%
                          </div>
                          <div className="text-base font-rubik-regular tracking-wider">
                            Complete
                          </div>
                        </div>
                      )}
                    </div>
                  </CircularProgressbarWithChildren>

                  <div
                    className={classNames(
                      "font-nexa text-base text-electricBlue-500 tracking-wider mt-8 cursor-pointer",
                      !displayProfilePercentage && "invisible"
                    )}
                    onClick={() =>
                      username &&
                      history.push(
                        `/profile${
                          userType === USER_TYPES.FREELANCER ? "" : "/customer"
                        }/wizard/1`
                      )
                    }
                  >
                    Finish Profile Setup <span>{" >"}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <ProfileCompletionWidget />
          )}
        </div>
      </div>
    </section>
  );
};
