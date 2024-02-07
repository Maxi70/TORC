import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import classNames from "classnames";
import SocialLink from "./socialLinks";

import twitterIcon from "../../images/socialShare/twitterx.svg";
import facebookIcon from "../../images/socialShare/facebook.svg";
import redditIcon from "../../images/socialShare/reddit.svg";
import emailIcon from "../../images/socialShare/email.svg";
import whatsappIcon from "../../images/socialShare/whatsapp.svg";
import linkedinIcon from "../../images/socialShare/linkedin.svg";
import copy from "../../images/socialShare/copy-solid.svg";
import check from "../../images/socialShare/check-solid.svg";
import ReferrallBadges from "./referralBadges";
import { API, graphqlOperation } from "aws-amplify";
import { updateReferralCount } from "graphql/mutations";

const SocialShare = ({ referralCount, referralCode, userType }) => {
  const [isCopied, setIsCopied] = useState(false);

  const captureCopy = async () => {
    await API.graphql(
      graphqlOperation(updateReferralCount, { input: { source: "DIRECT" } })
    );
  };

  const origin = window.location.origin;

  useEffect(() => {
    setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 4000);
  }, [isCopied]);

  const twitterLink = `https://x.com/intent/tweet?url=${encodeURIComponent(
    origin
  )}%2F%23%2Fr%2F${referralCode}%2Ftw&text=Check%20out%20Torc%2C%20a%20new%20talent%20marketplace%20for%20software%20engineers%20I%20just%20joined!&via=opentorc`;
  const facebookLink = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
    origin
  )}%2F%23%2Fr%2F${referralCode}%2Ffb`;
  const redditLink = `https://www.reddit.com/submit?url=${encodeURIComponent(
    origin
  )}%2F%23%2Fr%2F${referralCode}%2Frd&title=You%20should%20check%20out%20Torc%2C%20a%20new%20talent%20marketplace%20for%20software%20engineers%20I%20just%20joined!`;
  const emailLink = `mailto:?subject=Check%20out%20this%20new%20talent%20marketplace%20I%20joined&body=Hey%20there%2C%0A%0ACheck%20out%20Torc%2C%20a%20new%20talent%20marketplace%20for%20software%20engineers%20that%20I%20just%20joined.%20They%27re%20focused%20on%20high-quality%20jobs%20from%20big%20companies%20and%20building%20a%20place%20for%20freelancers%20to%20grow%20their%20careers.%20I%20think%20you%27ll%20like%20it!%0A%0AClick%20my%20link%20to%20check%20it%20out%20and%20sign%20up%3A%20${encodeURIComponent(
    origin
  )}%2F%23%2Fr%2F${referralCode}%2Fem`;
  const whatssappLink = `https://api.whatsapp.com/send?text=You%20should%20check%20out%20Torc%2C%20a%20new%20talent%20marketplace%20for%20software%20engineers%20I%20just%20joined!%20${encodeURIComponent(
    origin
  )}%2F%23%2Fr%2F${referralCode}%2Fwa`;
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    origin
  )}%2F%23%2Fr%2F${referralCode}%2Fln`;

  return (
    <>
      <div className="xl:px-24 lg:px-20 px-10 pt-20">
        <p className="font-rubik-medium text-base mt-20">
          INVITE FRIENDS VIA THE PLATFORMS BELOW
        </p>
        <div
          className={classNames(
            styles.roundedBorder,
            "sm:flex items-center justify-around mt-3 hidden"
          )}
        >
          <SocialLink
            link={twitterLink}
            linkTitle="twitter"
            icon={twitterIcon}
          />
          <SocialLink
            link={linkedinLink}
            linkTitle="linkedin"
            icon={linkedinIcon}
          />
          <SocialLink
            link={facebookLink}
            linkTitle="facebook"
            icon={facebookIcon}
          />
          <SocialLink
            link={redditLink}
            linkTitle="reddit"
            icon={redditIcon}
            newTab
          />
          <SocialLink
            link={whatssappLink}
            linkTitle="whatsapp"
            icon={whatsappIcon}
            newTab
            customSize={"h-8 w-8"}
          />
          <SocialLink
            link={emailLink}
            linkTitle="email"
            icon={emailIcon}
            isLink
            customSize={"w-12 h-12"}
          />
        </div>
        <div className={classNames("sm:hidden", styles.roundyBoxyBorder)}>
          <div className="flex justify-around mt-4">
            <SocialLink
              link={twitterLink}
              linkTitle="twitter"
              icon={twitterIcon}
            />
            <SocialLink
              link={linkedinLink}
              linkTitle="linkedin"
              icon={linkedinIcon}
            />
            <SocialLink
              link={facebookLink}
              linkTitle="facebook"
              icon={facebookIcon}
            />
          </div>
          <div className="flex justify-around mt-5  mb-4">
            <SocialLink
              link={redditLink}
              linkTitle="reddit"
              icon={redditIcon}
              newTab
            />
            <SocialLink
              link={whatssappLink}
              linkTitle="whatsapp"
              icon={whatsappIcon}
              newTab
              customSize={"h-8 w-8"}
            />
            <SocialLink
              link={emailLink}
              linkTitle="email"
              icon={emailIcon}
              isLink
              customSize={"w-12 h-12"}
            />
          </div>
        </div>
      </div>
      <div className="xl:px-24 lg:px-20 px-10 mt-16">
        <p className="font-rubik-medium text-base">
          OR SEND THEM THE DIRECT INVITE LINK
        </p>
        <div
          className={classNames(
            styles.roundedBorder,
            "flex justify-center items-center cursor-pointer mt-3"
          )}
          onClick={async () => {
            setIsCopied(true);
            navigator.clipboard.writeText(`${origin}/#/r/${referralCode}/cp`);
            await captureCopy();
          }}
        >
          <div
            style={{
              marginTop: "8.5px",
              marginBottom: "8.5px",
            }}
          >
            {`${origin}/#/r/${referralCode}/cp`}
          </div>
          <img
            alt="copy"
            src={isCopied ? check : copy}
            className="h-5 w-5 ml-3"
          />
        </div>
      </div>
      {userType === "FREELANCER" && (
        <div className="my-16">
          <ReferrallBadges referralCount={referralCount || 0} />
        </div>
      )}
    </>
  );
};

export default SocialShare;
