import React, { useMemo } from "react";

import { openConsentManager } from "@segment/consent-manager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faLinkedinIn,
  faTwitch,
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import URLS from "utils/urls";
import Logo from "components/Logo/Logo";
import Link from "components/Link";

const Line = () => <div className="w-[1px] h-4 bg-white object-small-hidden" />;

const Footer = () => {
  const currentYear = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();

    return year;
  }, []);

  return (
    <div className="bg-black w-full">
      <div className="compact-text container-large sm:!py-16 !py-8">
        <div className="b3 flex flex-col sm:flex-row gap-6 sm:text-left items-center sm:items-stretch text-center text-white justify-between">
          <div className="cursor-pointer">
            <Logo type="white" />
          </div>
          <div>
            <h6 className="pb-2">For Companies</h6>
            <Link url={URLS.HIRE_DEVELOPERS}>Hire developers</Link>
          </div>
          <div>
            <h6 className="pb-2">For Talent</h6>
            <ul>
              <li className="mb-1">
                <Link color="text-brandPrimary" url={URLS.APPLY_JOBS}>
                  Apply for jobs
                </Link>
              </li>
              <li className="mb-1">
                <Link color="text-brandPrimary" url={URLS.TORC_PRODUCTIVITY}>
                  Productivity
                </Link>
              </li>
              <li className="mb-1">
                <Link color="text-brandPrimary" url={URLS.TORC_REFERRAL}>
                  Referral Program
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="pb-2">Insights</h6>
            <Link url={URLS.BLOG}> Blog </Link>
          </div>
          <div>
            <h6 className="pb-2">About</h6>
            <ul>
              <li className="mb-1">
                <Link color="text-brandPrimary" url={URLS.ABOUT_US}>
                  About Torc
                </Link>
              </li>
              <li className="mb-1">
                <Link color="text-brandPrimary" url={URLS.NEWSROOM}>
                  Newsroom
                </Link>
              </li>
              <li className="mb-1">
                <Link url={URLS.CAREER}>Careers</Link>
              </li>
              <li className="mb-1">
                <Link url={URLS.TORC_CORE_PRINCIPLES}>Core Principles</Link>
              </li>
              <li className="mb-1">
                <Link color="text-brandPrimary" url={URLS.CONTACT_US}>
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div className="bg-white sm:w-[1px] sm:h-auto w-full h-[1px]" />
          <div className="flex sm:flex-col flex-row gap-5 sm:w-auto w-full justify-between">
            <a
              aria-label="github link"
              href={URLS.GITHUB}
              target="_blank"
              rel="nooponer noreferrer"
            >
              <FontAwesomeIcon
                className="text-white text-2xl hover:text-brandPrimary cursor-pointer"
                icon={faGithub}
              />
            </a>
            <a
              aria-label="twitter link"
              href={URLS.TWITTER}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="text-white text-2xl hover:text-brandPrimary cursor-pointer"
                icon={faXTwitter}
              />
            </a>

            <a
              aria-label="discord link"
              href={URLS.DISCORD}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="text-white text-2xl hover:text-brandPrimary cursor-pointer"
                icon={faDiscord}
              />
            </a>
            <a
              aria-label="linkedin link"
              href={URLS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="text-white text-2xl hover:text-brandPrimary cursor-pointer"
                icon={faLinkedinIn}
              />
            </a>
            <a
              aria-label="twitch link"
              href={URLS.TWITCH}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="text-white text-2xl hover:text-brandPrimary cursor-pointer"
                icon={faTwitch}
              />
            </a>
          </div>
        </div>

        <div className="b3 bg-black mx-auto sm:ml-0 flex sm:flex-row mt-8 flex-col items-center gap-2 w-fit whitespace-nowrap text-white">
          <div className="object-small-hidden">© Torc {currentYear}</div>
          <Line />
          <Link url={URLS.PRIVACY}>Privacy Policy</Link>
          <Line />
          <Link url={URLS.TERMS}>Terms Of Use</Link>
          <Line />
          <Link color="text-brandPrimary" url={URLS.CORE_PRINCIPLES}>
            Core Principles
          </Link>
          <Line />
          <div
            onClick={openConsentManager}
            className="cursor-pointer hover:text-brandPrimary"
          >
            <button
              className="z-10 cursor-pointer"
              type="button"
              onClick={openConsentManager}
            >
              Cookie Preferences
            </button>
          </div>
          <div className="sm:hidden">© Torc {currentYear}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
