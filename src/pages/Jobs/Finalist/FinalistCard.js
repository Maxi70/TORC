import ImageViewer from "components/ImageViewer";
import { Icon } from "semantic-ui-react";
import placeholderPicture from "images/placeholderProfile.png";
import SocialLinks from "components/SocialLinks";
import { sanitizeLocation } from "utils/sanitizeLocation";
import CountryFlag from "utils/CountryFlag";
import MeetingIndicator from "utils/MeetingIndicator";
import styles from "./FinalistView.module.css";

export default function FinalistCard({
  candidate,
  jobCalendarEvents,
  renderMeetingIndicator,
  size,
  rate,
}) {
  return (
    <>
      <div className="flex items-center gap-8">
        <div
          className={`flex justify-center items-center ${
            size === "large" ? "w-32" : "w-28"
          }`}
        >
          <div
            className={`relative items-center rounded-full overflow-hidden pt-[100%] w-[100%] shadow-sm bg-blue-800 ${styles["profile--image"]}`}
          >
            {candidate.headshotKey ? (
              <ImageViewer
                objectKey={candidate.headshotKey}
                placeholder={<Icon name="user circle" size="massive" />}
                radius={5}
              />
            ) : (
              <img alt="placeholder" src={placeholderPicture} />
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2 items-center w-full text-gray-600">
          <div className={`${size === "large" ? "w-96" : "w-44"}`}>
            <div
              className={`font-bold whitespace-pre overflow-hidden overflow-ellipsis ${
                size === "large" ? "text-2xl" : "text-lg"
              }`}
            >
              {candidate.given_name} {candidate.family_name}
            </div>
            {candidate.username && size === "large" && (
              <div className="mb-2 mt-[-2px] ml-1.5">
                <a
                  className="cursor-pointer font-bold text-base transition-all text-gray-500"
                  href={`/#/profile/${candidate.username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{candidate.username}
                </a>
              </div>
            )}
            <div>{candidate.jobRole}</div>
            {(candidate.location?.locationId || candidate.locale) && (
              <p className="flex items-center mb-4 gap-2 leading-4">
                <CountryFlag
                  country={candidate.location.countryCode.toLowerCase()}
                />
                {candidate.location?.locationId
                  ? sanitizeLocation(candidate.location)
                  : candidate.locale}
              </p>
            )}
          </div>
          <div className="font-bold">
            {rate?.value ? `$${rate.value}/hr` : "N/A"}
          </div>
        </div>
      </div>
      {renderMeetingIndicator && (
        <div class="pt-3">
          {jobCalendarEvents && (
            <MeetingIndicator
              candidate={candidate}
              jobCalendarEvents={jobCalendarEvents}
            />
          )}
        </div>
      )}
      {size === "large" && candidate?.socialLinks && (
        <div className="text-2xl flex gap-3 ml-36">
          {
            <SocialLinks
              links={candidate?.socialLinks.filter(
                (link) => link.type !== "PORTFOLIO"
              )}
              className="bg-gray-100 rounded w-6 h-6 text-gray-500 flex items-center justify-center"
            />
          }
        </div>
      )}
    </>
  );
}
