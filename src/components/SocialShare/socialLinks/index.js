import { API, graphqlOperation } from "aws-amplify";
import classNames from "classnames";
import { updateReferralCount } from "graphql/mutations";

const REFERRAL_SOURCE = {
  email: "EMAIL",
  facebook: "FACEBOOK",
  linkedin: "LINKEDIN",
  reddit: "REDDIT",
  twitter: "TWITTER",
  whatsapp: "WHATSAPP",
};

const SocialShare = ({ link, linkTitle, icon, newTab, isLink, customSize }) => {
  const captureCopy = async () => {
    await API.graphql(
      graphqlOperation(updateReferralCount, {
        input: { source: REFERRAL_SOURCE[linkTitle] },
      })
    );
  };

  const handleShare = async () => {
    if (newTab) {
      window.open(link, linkTitle);
    } else {
      window.open(link, linkTitle, `left=0,top=0,width=550,height=350`);
    }
    await captureCopy();
  };

  if (isLink) {
    return (
      <a href={link} onClick={captureCopy}>
        <img
          alt={linkTitle}
          src={icon}
          className={classNames(customSize ? customSize : "h-10 w-10")}
        />
      </a>
    );
  }

  return (
    <button onClick={handleShare}>
      <img
        alt={linkTitle}
        src={icon}
        className={classNames(customSize ? customSize : "h-10 w-10")}
      />
    </button>
  );
};

export default SocialShare;
