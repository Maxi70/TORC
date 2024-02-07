import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faLinkedin,
  faStackOverflow,
  faFacebook,
  faGithub,
  faInstagram,
  faHashnode,
  faDev,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const SOCIAL_MAP = {
  TWITTER: {
    icon: <FontAwesomeIcon icon={faXTwitter} />,
    baseUrl: "https://x.com",
  },
  INSTAGRAM: {
    icon: <FontAwesomeIcon icon={faInstagram} />,
    baseUrl: "https://www.instagram.com",
  },
  LINKEDIN: {
    icon: <FontAwesomeIcon icon={faLinkedin} />,
    baseUrl: "https://www.linkedin.com/in",
  },
  FACEBOOK: {
    icon: <FontAwesomeIcon icon={faFacebook} />,
    baseUrl: "https://www.facebook.com",
  },
  HASHNODE: {
    icon: <FontAwesomeIcon icon={faHashnode} />,
    baseUrl: "https://hashnode.com",
  },
  GITHUB: {
    icon: <FontAwesomeIcon icon={faGithub} />,
    baseUrl: "https://github.com",
  },
  STACKOVERFLOW: {
    icon: <FontAwesomeIcon icon={faStackOverflow} />,
    baseUrl: "https://stackoverflow.com/users",
  },
  DEV: {
    icon: <FontAwesomeIcon icon={faDev} />,
    baseUrl: "https://dev.to",
  },
  PORTFOLIO: {
    icon: (
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} width={24} height={24} />
    ),
  },
};

const SocialLinks = ({ links, color, className }) => {
  if (!links || links?.length === 0) {
    return null;
  }
  return links?.map(({ type, value }) => {
    const baseUrl = SOCIAL_MAP[type]?.baseUrl;
    return (
      <a
        key={type}
        href={
          baseUrl && !value?.startsWith(baseUrl)
            ? type === "HASHNODE" && !value.startsWith("@")
              ? `${baseUrl}/@${value}`
              : `${baseUrl}/${value}`
            : value
        }
        target="_blank"
        rel="noreferrer"
        className={classNames(`text-${color}`, className)}
      >
        {SOCIAL_MAP[type]?.icon}
      </a>
    );
  });
};

export default SocialLinks;
