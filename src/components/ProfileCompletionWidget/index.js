import React, { useMemo, useState } from "react";
import classNames from "classnames";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import { useAuth } from "GlobalAuthContext";
import { getLinks, getTextContent } from "./helpers";

import ImageViewer from "components/ImageViewer";
import SvgIcon from "components/SvgIcon";
import WizardLink from "./molecules/WizardLink";

import styles from "./index.module.css";
import "react-circular-progressbar/dist/styles.css";

const ProfileCompletionWidget = () => {
  const [isImageVisible, setIsImageVisible] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = useAuth()?.user ?? {};
  const profileCompletion = user?.profileCompletion || 0;
  const { title = "", description = "" } = useMemo(
    () => getTextContent(profileCompletion),
    [profileCompletion]
  );

  const links = useMemo(() => getLinks(user), [user]);

  return (
    <div
      className={classNames(
        `w-full h-min flex flex-col px-1 pb-1 md:px-2 md:pb-2 lg:px-4 lg:pb-4 ${styles.container}`
      )}
    >
      <div className="flex flex-row-reverse md:flex-row w-full">
        <div className={`pt-8 pl-4 lg:pl-0 lg:pr-4 ${styles.text}`}>
          <p
            className={classNames(
              `font-bold mb-2 text-sm md:text-base lg:text-xl ${styles.title}`
            )}
          >
            {title}
          </p>
          <p className="font-normal text-xs md:text-sm lg:text-base">
            {description}
          </p>
        </div>

        <div
          className={classNames(
            `pt-6 flex justify-center items-start ${styles.bar}`
          )}
        >
          <CircularProgressbarWithChildren
            className="relative"
            value={user.profileCompletion}
            counterClockwise
            strokeWidth={20}
            styles={buildStyles({
              pathTransitionDuration: 1,
              pathColor: "#0495b7",
              trailColor: "#302C7F",
            })}
          >
            <span className={classNames(`text-purple-600 ${styles.percent}`)}>
              {user.profileCompletion}%
            </span>

            <span className={styles.complete}>Complete</span>

            <div
              onMouseEnter={() => setIsImageVisible(true)}
              onMouseLeave={() => setIsImageVisible(false)}
              className={classNames(
                `bg-white block rounded-full p-4 overflow-hidden transition-all absolute flex justify-center items-center ${styles.image}`,
                { "opacity-0": isImageVisible, "opacity-1": !isImageVisible }
              )}
            >
              <ImageViewer
                objectKey={user.headshotKey}
                placeholder={<SvgIcon type="user" className="w-full h-full" />}
                radius={5}
              />
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.values(links).map((link, index) => {
          return (
            <div key={link.path}>
              <div
                className={classNames(`mb-3 ${styles.linkSeparator}`, {
                  hidden: index === 0,
                  "md:hidden": index < 2,
                })}
              />

              <WizardLink {...link} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileCompletionWidget;
