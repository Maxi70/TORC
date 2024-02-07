import { Icon } from "semantic-ui-react";
import ImageViewer from "components/ImageViewer";
import SocialLinks from "components/SocialLinks";
import placeholderProfileImg from "images/placeholderProfile.png";
import CountryFlag from "utils/CountryFlag";
import commonFinalistStyles from "../../FinalistView.module.css";
import MeetingIndicator from "utils/MeetingIndicator";
import NotesWrapper from "components/Notes";
import { NOTE_TYPES } from "lookup";

export default function FinalistGridBasic({
  user,
  rate,
  jobCalendarEvents,
  jobOpportunityId,
  applicationId,
  isCalibration,
  jobCalibrationIsEnabled,
}) {
  const {
    family_name,
    given_name,
    headshotKey,
    locale,
    location,
    socialLinks,
    username,
  } = user;

  // Remove null values from location object return string to be rendered based on locationKeyNames
  const sanitizeLocation = (locationObj) => {
    const locationKeyNames = ["countryName", "stateName", "cityName"];
    const cleanLocation = [];

    for (const keyName of locationKeyNames) {
      if (locationObj[keyName]) {
        cleanLocation.push(locationObj[keyName]);
      }
    }

    return cleanLocation.join(", ");
  };

  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <NotesWrapper
        jobOpportunityId={jobOpportunityId}
        applicationId={applicationId}
        className="absolute top-5 left-8"
        name={`${given_name} ${family_name}`}
        isReadOnly={isCalibration && !jobCalibrationIsEnabled}
        noteType={isCalibration && NOTE_TYPES.CALIBRATION}
      />
      <span className="absolute font-medium top-5 right-8">
        {rate?.value ? `$${rate.value}/hr` : "N/A"}
      </span>
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center w-24 relative">
          <div
            className={`relative items-center rounded-full shadow-sm bg-blue-800 overflow-hidden pt-[100%] w-[100%] ${commonFinalistStyles["profile--image"]}`}
          >
            {headshotKey ? (
              <ImageViewer
                objectKey={headshotKey}
                placeholder={<Icon name="user circle" size="massive" />}
                radius={5}
              />
            ) : (
              <img alt="placeholder" src={placeholderProfileImg} />
            )}
          </div>
          {location?.locationId && (
            <span className="absolute font-medium bottom-0 right-0">
              <CountryFlag
                country={location.countryCode.toLowerCase()}
                width={32}
                height={24}
              />
            </span>
          )}
        </div>

        <h4 className="font-nexa font-bold text-2xl mt-6 gray-800">
          {given_name}&nbsp;{family_name}
        </h4>
        <a
          className="cursor-pointer mb-4 font-bold text-sm transition-all text-gray-600"
          href={`/#/profile/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{username}
        </a>

        {(location?.locationId || locale) && (
          <p className="flex justify-center items-center mb-4 gap-2 text-gray-500">
            {location?.locationId ? sanitizeLocation(location) : locale}
          </p>
        )}

        {socialLinks && (
          <div className="flex justify-center gap-3">
            {
              <SocialLinks
                links={socialLinks.filter((link) => link.type !== "PORTFOLIO")}
                className="bg-gray-100 rounded w-7 h-7 text-gray-500 flex items-center justify-center"
              />
            }
          </div>
        )}
        {!isCalibration && (
          <div className="mt-4 !font-normal">
            <MeetingIndicator
              candidate={user}
              jobCalendarEvents={jobCalendarEvents}
            />
          </div>
        )}
      </div>
    </section>
  );
}
