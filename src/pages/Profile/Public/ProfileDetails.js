import { getWorkExperience } from "helpers/utils";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "GlobalAuthContext";

import classNames from "classnames";
import normalizeUrl from "normalize-url";
import { JOB_APPLICATION_MATCH_STATUS, USER_TYPES } from "lookup";
import moment from "moment";
import axios from "axios";

import ImageViewer from "components/ImageViewer";
import styles from "./PublicProfile.module.css";
import SvgIcon from "components/SvgIcon";
import PdfViewer from "components/PdfViewer/PdfViewer";
import Clock from "images/new/clock.png";
import { MAP_AVAILABILITY } from "constants";
import HoverTooltip from "components/HoverTooltip";
import Badges from "components/Badges";
import GithubStats from "components/GithubStats";
import TextContainer from "components/TextContainer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFProfile from "components/PDFProfile";
import PrintResume from "components/buttons/PrintResume";
import { getMatchHistoryByStatus } from "utils/matchFieldHistory";
import { Link } from "react-router-dom";

// profile section header with a grey bar
const ProfileSectionHeader = ({ title, borderTop }) => {
  return (
    <div
      className={classNames(
        "w-full flex flex-row",
        borderTop && "border-t-2 border-gray-200 border-solid"
      )}
    >
      <div className="font-nexa-light pt-4 px-12 text-2xl uppercase text-electricBlue-800">
        {title}
      </div>
      <div>
        <svg height="48" width="22">
          <polygon
            points="0,0 22,0 22,48"
            style={{ fill: "rgba(229, 229, 229)" }}
          ></polygon>
        </svg>
      </div>
      <div className="bg-gray-200 flex-grow"></div>
    </div>
  );
};

const ProfileDetails = ({
  appsyncUser,
  applicationFieldHistory,
  showPdf = false,
  renderBadges = false,
  renderCustomLinks = false,
  showGithubStats = false,
  showAssessmentLinks = false,
  cognitoGroups = [],
  minScore = 0,
  isCalibration,
}) => {
  const isRateVisible = false;
  const [localTime, setLocalTime] = useState();
  const [timeZoneId, setTimeZoneId] = useState();
  const [filteredAssessments, setFilteredAssessments] = useState([]);

  const { matchedHistory, appliedHistory } = useMemo(() => {
    const matchedHistory = getMatchHistoryByStatus(
      applicationFieldHistory,
      JOB_APPLICATION_MATCH_STATUS.MATCHED
    );

    const appliedHistory = getMatchHistoryByStatus(
      applicationFieldHistory,
      JOB_APPLICATION_MATCH_STATUS.APPLIED
    );

    return { matchedHistory, appliedHistory };
  }, [applicationFieldHistory]);

  let {
    badges,
    bio,
    location,
    skills,
    tagline,
    company,
    companyDetails,
    userType,
    knownLanguages,
    availability,
    ratePerHour,
    careers,
    projectsCaseStudies,
    assessments,
    resumeLocation,
    otherLinks,
    stats,
  } = appsyncUser;

  const baseUrl = `https://res.cloudinary.com/${
    process.env.REACT_APP_CLOUDINARY_CLOUDNAME
  }/image/upload/v${Date.now()}/${resumeLocation}`;
  const auth = useAuth();

  const getSkillColour = (exp) => {
    switch (exp) {
      case "low":
        return "text-zestygreen";
      case "medium":
        return "text-orange";
      case "high":
        return "text-electricBlue";
      default:
        return "text-black";
    }
  };

  useEffect(() => {
    let filterAssessments = assessments?.filter(
      (a) => a.status !== "Time expired"
    );
    if (auth?.user?.userType === USER_TYPES.CUSTOMER)
      filterAssessments = filterAssessments?.filter(
        (a) => a.finalScore >= minScore
      );
    setFilteredAssessments(filterAssessments);
  }, [assessments, minScore, auth]);

  const getExperience = () => {
    let months = getWorkExperience(
      careers?.map((c) => ({ startDate: c.startDate, endDate: c.endDate }))
    );

    const years = Math.floor(months / 12);
    const yearsInStr = months % 12 > 0 ? `${years}+` : `${years}`;
    const yearsUnit = years === 1 && months % 12 === 0 ? "year" : "years";

    return years > 0 ? `${yearsInStr} ${yearsUnit}` : "Fresh";
  };

  const getCompanyAddress = () => {
    let { address } = companyDetails ? companyDetails : {};
    let source = [];

    if (address.line1) {
      source.push(address.line1);
    }
    if (address.line2) {
      source.push(address.line2);
    }
    if (address.city) {
      source.push(address.city);
    }
    if (address.state) {
      source.push(address.state);
    }
    if (address.postalCode) {
      source.push(address.postalCode);
    }
    if (address.country) {
      source.push(address.country);
    }

    return source.join(", ");
  };

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${
            location.latitude
          },${location.longitude}&timestamp=${Math.floor(
            Date.now() / 1000
          )}&key=${process.env.REACT_APP_GOOGLE_TIMEZONES_API_KEY}`
        );
        const { status, timeZoneId } = response.data;

        if (status === "OK") setTimeZoneId(timeZoneId);
        else console.error("Failed to fetch local time.");
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      const googleTime = new Date().toLocaleTimeString("en-US", {
        timeZone: timeZoneId,
      });
      setLocalTime(moment(googleTime, "h:mm:ss A").format("h:mm A"));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeZoneId]);

  const customComparator = (a, b) => {
    if (a.endDate === null && b.endDate === null)
      return moment(b.startDate).diff(a.startDate);
    else if (a.endDate === null) return -1;
    else if (b.endDate === null) return 1;
    else {
      const endDateComparison = moment(b.endDate).diff(a.endDate);
      return endDateComparison === 0
        ? moment(b.startDate).diff(a.startDate)
        : endDateComparison;
    }
  };

  return (
    <div className="col-span-2">
      {userType !== "CUSTOMER" && !isCalibration && (
        <PDFDownloadLink
          className="w-[50px] block ml-auto pt-[20px] pr-[20px]"
          document={
            <PDFProfile
              user={appsyncUser}
              isAdmin={
                cognitoGroups.includes(
                  process.env.REACT_APP_COGNITO_ADMIN_GROUP
                ) ||
                cognitoGroups.includes(
                  process.env.REACT_APP_COGNITO_GROUP_USER_MANAGERS
                ) ||
                cognitoGroups.includes(
                  process.env.REACT_APP_COGNITO_GROUP_JOB_MANAGERS
                )
              }
            />
          }
          fileName={"torc_" + appsyncUser.username + "_resume.pdf"}
        >
          <PrintResume className={"ui image w-[50px]"} />
        </PDFDownloadLink>
      )}
      <div
        className={classNames(
          "flex-grow-1 w-full px-12",
          styles["profile-content-wrapper"]
        )}
      >
        {tagline && (
          <h1
            className={classNames(
              "text-4xl leading-relaxed tracking-wide font-nexa text-black"
            )}
          >
            {tagline}
          </h1>
        )}
        {bio && (
          <section className={classNames("pb-8", "border-gradient")}>
            <p className="text-lg whitespace-pre-wrap">{bio}</p>
          </section>
        )}
        {userType === USER_TYPES.FREELANCER && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6 ">Summary</h2>
            <div className="flex justify-between flex-wrap gap-3">
              <div>
                <div className="text-coolGray-600 font-bold">
                  {getExperience()}
                </div>
                <div className="text-gray-500">Experience</div>
              </div>
              <div>
                <div className="text-coolGray-600 font-bold flex">
                  <div className="min-w-[20px]">
                    <img
                      src={Clock}
                      alt="clock"
                      width="20"
                      height="20"
                      className="mr-1"
                    />
                  </div>
                  <div>{localTime} local time</div>
                </div>
                <div className="text-gray-500">
                  {
                    Intl.DateTimeFormat(undefined, {
                      timeZone: timeZoneId,
                      timeZoneName: "long",
                    }).formatToParts()[6].value
                  }
                </div>
              </div>
              <div>
                <div className="lowercase first-letter:uppercase text-coolGray-600 font-bold">
                  {MAP_AVAILABILITY[availability] ?? "N/A"}
                </div>
                <div className="text-gray-500">Availability</div>
              </div>
              {isRateVisible && (
                <div>
                  <div className="text-coolGray-600 font-bold">
                    {ratePerHour?.value ? `${ratePerHour?.value}/hr` : "N/A"}
                  </div>
                  <div className="text-gray-500">Avg. fee</div>
                </div>
              )}
            </div>
            {applicationFieldHistory?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex-initial w-[40%]">
                  <div className="text-coolGray-600 font-bold">Matched</div>
                  <div className="text-gray-500">
                    by{" "}
                    <Link
                      to={`/profile/${matchedHistory?.creator}`}
                      target="_blank"
                    >
                      @{matchedHistory?.creator}
                    </Link>
                  </div>
                  <div className="text-gray-500">
                    {matchedHistory?.formattedCreatedAt}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-coolGray-600 font-bold">Applied</div>
                  <div className="text-gray-500">
                    {appliedHistory?.formattedCreatedAt}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
        {renderBadges && (
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl mr-2">Badges</h2>
              <span className="text-cyan-600 text-base">{badges.length}</span>
            </div>
            {badges?.length > 0 && <Badges badges={badges} />}
          </section>
        )}

        {skills?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6">Skills</h2>
            <div
              className={classNames(
                "flex flex-wrap gap-3",
                styles["skills-wrapper"]
              )}
            >
              {skills
                ?.sort((a, b) => {
                  const order = {
                    high: 0,
                    medium: 1,
                    low: 2,
                  };
                  return order[a.experience] - order[b.experience];
                })
                .map((skill, idx) => (
                  <HoverTooltip
                    key={`skill-${idx}`}
                    tracking={{ type: "skill", skillName: skill.name }}
                    hoverText={
                      <div className="mx-auto bg-white rounded-[16px] shadow-md relative">
                        <div className="text-center m-2">
                          <p className="text-gray-800">
                            {skill.experience ? (
                              <>
                                <span
                                  className={`font-bold ${getSkillColour(
                                    skill.experience
                                  )}`}
                                >
                                  {skill.experience.charAt(0).toUpperCase() +
                                    skill.experience.slice(1)}
                                </span>{" "}
                                experience{" "}
                              </>
                            ) : (
                              "Experienced "
                            )}
                            in <span className="font-bold">{skill.name}</span>
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <div
                      key={`skill-${idx}`}
                      className={classNames(
                        "inline-block mr-2 mb-2 px-3 py-2 text-center rounded-full text-sm font-medium text-cyan-800 bg-cyan-50",
                        "shadow-xs hover:shadow-xs hover:bg-cyan-100 transition-shadow duration-200"
                      )}
                    >
                      {skill.name}
                    </div>
                  </HoverTooltip>
                ))}
            </div>
          </section>
        )}
        {knownLanguages?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6">Languages</h2>
            <div className="flex flex-wrap gap-8">
              {knownLanguages?.map((language, idx) => (
                <div key={`language-${idx}`} className="flex gap-2">
                  <div className="text-coolGray-600 font-bold">
                    {language.language}
                  </div>
                  <div className="lowercase first-letter:uppercase text-gray-500">
                    {language.level}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {renderCustomLinks && otherLinks?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6">Custom Links</h2>
            <div className="flex flex-wrap gap-3">
              {otherLinks.map(({ name, value }, idx) => (
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
              ))}
            </div>
          </section>
        )}

        {/* Github Stats */}
        {stats && showGithubStats && (
          <>
            <hr className="mb-8" />
            <GithubStats stats={stats} isVertical={false} />
          </>
        )}
        {careers?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6">Experience</h2>
            <div className="gap-8">
              {careers.sort(customComparator).map((career, idx) => (
                <div key={`career-${idx}`} className="flex mb-4">
                  <div className="text-gray-500 flex-none w-44">
                    {moment(career.startDate).format("YYYY")} -{" "}
                    {career.endDate
                      ? moment(career.endDate).format("YYYY")
                      : "Present"}
                  </div>
                  <div>
                    <div className="text-coolGray-600 font-bold">
                      {career.companyName}
                    </div>
                    <div className="text-coolGray-600 font-medium">
                      {career.title}
                    </div>
                    <TextContainer
                      text={career.description ?? ""}
                      maxLength={250}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {projectsCaseStudies?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6">Projects</h2>
            <div className="gap-8">
              {projectsCaseStudies.map((project, idx) => (
                <div key={`projectsCaseStudies-${idx}`} className="flex mb-4">
                  <div className="text-gray-500 flex flex-none w-24 lg:w-44 items-center">
                    {project.startDate && (
                      <>{moment(project.startDate).format("YYYY")} -</>
                    )}{" "}
                    {project.endDate
                      ? moment(project.endDate).format("YYYY")
                      : "Present"}
                  </div>
                  <div>
                    <h2 className="text-2xl mb-2">{project.title}</h2>
                    <div className="text-coolGray-600 font-bold">
                      {project.client}
                    </div>
                    <div>{project.description}</div>
                    {project.link ? (
                      <div className="mt-2">
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.link}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {filteredAssessments?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl mb-6">Assessments</h2>
            <div className="gap-8">
              <div className="grid grid-cols-12 mb-4 text-coolGray-600 font-bold">
                <div className="col-span-2">Date</div>
                <div className="col-span-3">Test name</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-2">Final score</div>
                <div className="col-span-2">Time taken</div>
              </div>
              {filteredAssessments.map((assessment, idx) => (
                <div
                  key={`assessment-${idx}`}
                  className="grid grid-cols-12 mb-4"
                >
                  <div className="text-gray-500 flex-none col-span-2">
                    {assessment.assessmentCompleted
                      ? moment(assessment.assessmentCompleted).format(
                          "YYYY-MM-DD"
                        )
                      : "N/A"}
                  </div>
                  <div className="col-span-3">
                    {showAssessmentLinks && assessment.reportLink ? (
                      <a
                        href={assessment.reportLink}
                        target="_blank"
                        rel="noreferrer"
                        title={assessment.testName}
                        className={classNames({
                          "text-blue-500": !!assessment.reportLink,
                        })}
                      >
                        {assessment.testName || "N/A"}
                      </a>
                    ) : (
                      assessment.testName || "N/A"
                    )}
                  </div>
                  <div className="col-span-3">{assessment.status || "N/A"}</div>
                  <div className="col-span-2">
                    {assessment.finalScore === -1
                      ? "N/A"
                      : assessment.finalScore || "N/A"}
                  </div>
                  <div className="col-span-2">
                    {assessment.timeTaken || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {userType === USER_TYPES.CUSTOMER && (
          <>
            <ProfileSectionHeader title="About My Company" borderTop />
            <div className="p-12 flex">
              <div className="mr-7 w-12">
                {companyDetails?.logo ? (
                  <ImageViewer objectKey={companyDetails?.logo} radius={9999} />
                ) : (
                  <span className="inline-block w-12 h-12 rounded-full bg-gray-200"></span>
                )}
              </div>
              <div className="w-full">
                {(companyDetails?.name || company) && (
                  <h1
                    className={classNames(
                      "text-4xl leading-relaxed tracking-wide font-nexa text-black"
                    )}
                  >
                    {companyDetails?.name || company}
                  </h1>
                )}
                {companyDetails?.bio && (
                  <section className="pt-12 pb-8 border-gradient">
                    <p className="text-lg">{companyDetails?.bio}</p>
                  </section>
                )}
                <section className="pt-12 pb-8 font-rubik-regular tracking-wider text-base">
                  {companyDetails?.address && (
                    <>
                      <SvgIcon type="locationPin" className="inline-block" />
                      <span className="relative -left-3">
                        {getCompanyAddress()}
                      </span>
                    </>
                  )}
                  {companyDetails?.timezone?.label &&
                    ` | ${companyDetails?.timezone?.label}`}
                </section>
                {companyDetails?.url && (
                  <a
                    rel="noreferrer"
                    className={classNames(
                      "inline-block text-electricBlue pr-9 pb-8",
                      styles.personalWebsite
                    )}
                    alt="website link"
                    href={companyDetails?.url}
                    target="_blank"
                  >
                    {normalizeUrl(companyDetails?.url, {
                      stripProtocol: true,
                    })}
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {showPdf && resumeLocation && <PdfViewer pdfUrl={baseUrl} />}
    </div>
  );
};

export default ProfileDetails;
