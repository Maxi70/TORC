import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ApplicantActions from "pages/Jobs/ApplicantReview/ApplicantModal";
import ImageViewer from "components/ImageViewer";
import { capitalize } from "helpers/utils";
import { MAP_CURRENCY_TO_SIGN, MAP_AVAILABILITY } from "constants";
import placeholderPicture from "images/placeholderProfile.png";
import SocialLinks from "components/SocialLinks";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import { getMatchHistoryByStatus } from "utils/matchFieldHistory";
import { useMemo } from "react";
import NotesWrapper from "components/Notes";

const MatchCard = ({
  match,
  user,
  jobSkills,
  jobOpp,
  jobStatus,
  isApplicantsList,
}) => {
  const { matchedHistory, appliedHistory } = useMemo(() => {
    const matchedHistory = getMatchHistoryByStatus(
      match.fieldHistory,
      JOB_APPLICATION_MATCH_STATUS.MATCHED
    );

    const appliedHistory = getMatchHistoryByStatus(
      match.fieldHistory,
      JOB_APPLICATION_MATCH_STATUS.APPLIED
    );

    return { matchedHistory, appliedHistory };
  }, [match.fieldHistory]);

  const prepareBio = (bio) =>
    bio.length < 200 ? bio : `${bio.slice(0, 200)}...`;

  const prepareDate = (date) => {
    if (!date) {
      return "-";
    }

    return dayjs(date).format("MM/DD/YYYY");
  };

  const prepareRate = (rate) => {
    if (!rate?.value) {
      return "-";
    }

    const currencySign = MAP_CURRENCY_TO_SIGN[rate.currency] || "";

    return `${currencySign}${rate.value}/h`;
  };

  const matchedSkills = jobSkills.filter((name) =>
    user.skills?.some((userSkill) => userSkill.name === name)
  );

  return (
    <section className="mt-16 border-2 border-brandSecondary-300 rounded-sm relative">
      <div className="flex flex-col md:flex-row gap-x-14 p-16">
        <div className="w-48 text-sm flex flex-col flex-shrink-0">
          <div className="w-32 h-32 overflow-hidden">
            <ImageViewer
              objectKey={user.headshotKey}
              width="128"
              height="128"
              placeholder={
                <img
                  className="bg-grey-800"
                  src={placeholderPicture}
                  alt="Placeholder"
                />
              }
            />
          </div>
          <p className="mt-6 font-bold">{user.tagline}</p>
          {user.bio && <p className="mt-6">{prepareBio(user.bio)}</p>}
          <p className="mt-6 text-base">
            Matched by{" "}
            <Link to={`/profile/${match.creator}`} target="_blank">
              @{match.creator}
            </Link>
          </p>
          {match.fieldHistory?.length > 0 && (
            <>
              <p className="text-base">{matchedHistory?.formattedCreatedAt}</p>
              {isApplicantsList && (
                <div className="mt-2 text-base">
                  <p>Applied</p>
                  <p>{appliedHistory?.formattedCreatedAt}</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex-grow">
          <h4>{`${user.given_name} ${user.family_name?.slice(0, 1)}.`}</h4>
          <Link to={`/profile/${user.username}`} target="_blank">
            <h6>@{`${user.username}`}</h6>
          </Link>
          {/* not authorized to access applications */}
          <div className="flex justify-between flex-wrap lg:flex-nowrap gap-x-6 mt-4">
            {/* not clear how where to take this 
            <div className="text-center">
              <p className="font-bold text-lg">-</p>
              <p className="text-base">Experience</p>
            </div>
            */}
            <div className="text-center">
              <p className="font-bold text-lg">
                {prepareRate(match.customerRate)}
              </p>
              <p className="text-base">Rate</p>
            </div>
            {/* how to calculate? 
            <div className="text-center">
              <p className="font-bold text-lg">-</p>
              <p className="text-base">Offset</p>
            </div>
            */}
            <div className="text-center">
              <p className="font-bold text-lg">
                {MAP_AVAILABILITY[user.availability] ||
                  user.availability ||
                  "-"}
              </p>
              <p className="text-base">Availability</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">
                {prepareDate(match.availableStartDate)}
              </p>
              <p className="text-base whitespace-nowrap">Ready to Start</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{user.countryName}</p>
              <p className="text-base">Location</p>
            </div>
          </div>
          {/* limit skills and add hover. what about icons? */}
          {matchedSkills.length ? (
            <div className="mt-4 text-base">
              <p className="mb-2">Matched Skills</p>
              <div className="flex flex-wrap gap-x-4">
                {matchedSkills.map((skill) => (
                  <span className="font-nexa" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {user.knownLanguages?.length ? (
            <div className="mt-4 text-base">
              <p className="mb-2">Languages</p>
              <div className="flex flex-wrap gap-x-4">
                {user.knownLanguages.map(
                  ({ language, level }, index, array) => (
                    <div key={language}>
                      <span className="font-bold" key={language}>
                        {language}
                      </span>
                      {` ${capitalize(level)}`}
                      {array.length !== index + 1 && ","}
                    </div>
                  )
                )}
              </div>
            </div>
          ) : null}
          {/* icons? */}
          {(user.socialLinks || user.otherLinks) && (
            <div className="mt-4">
              <p className="mb-2 text-base">Links</p>
              <div className="flex flex-wrap gap-x-4">
                {
                  <SocialLinks
                    links={user.socialLinks?.filter((link) => link.value)}
                  />
                }
                {user.otherLinks?.map(
                  ({ createdAt, description, name, value }, index) => (
                    <a
                      key={`${index}_${createdAt}`}
                      href={value}
                      title={description}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <>
                        <FontAwesomeIcon icon={faLink} />
                        <span className="ml-1">{name?.slice(0, 10)}</span>
                      </>
                    </a>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {isApplicantsList && (
        <ApplicantActions
          status={match.status}
          jobOpp={jobOpp}
          applicationId={match?.application.id}
          application={match}
          jobStatus={jobStatus}
        />
      )}
      <NotesWrapper
        jobOpportunityId={match?.jobOpportunityId}
        applicationId={match?.applicationId}
        className="absolute top-8 right-8"
        name={`${user.given_name} ${user.family_name?.slice(0, 1)}.`}
      />
    </section>
  );
};

export default MatchCard;
