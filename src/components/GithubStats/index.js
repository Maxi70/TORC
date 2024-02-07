import styles from "./GithubStats.module.css";
import classNames from "classnames";
import ProfilePieChart from "components/ProfilePieChart";
import HoverTooltip from "components/HoverTooltip";
import React from "react";

const displayNames = {
  IssueEvent: "Issues Created",
  PullRequestEvent: "Pull Requests Submitted",
  IssueCommentEvent: "Comments on Issues",
  PullRequestReviewEvent: "Pull Requests Reviewed",
  PushEvent: "Commits Pushed",
  CreateEvent: "Repositories Created",
};

let isProfileView = false;

const StatsHeader = ({ headline, tooltip, className = "" }) => (
  <div className={classNames("flex", className)}>
    <h6 className="font-nexa font-bold text-base">{headline}</h6>

    {tooltip && (
      <HoverTooltip
        className={styles.githubInfo}
        hoverText={<span>{tooltip}</span>}
      >
        <button type="button" className={classNames(styles.tooltipBtn)} />
      </HoverTooltip>
    )}
  </div>
);

const StatDisplay = ({ number, label }) => (
  <div
    className={classNames(
      "flex flex-col items-center justify-start col-span-1 p-1",
      isProfileView && styles.dividerGradientHorizontal
    )}
  >
    <span className="font-nexa tracking-wide text-lg mb-1">{number}</span>
    <span
      className={classNames(
        "font-nexa-light tracking-wider text-sm text-center lg:mx-1 mx-2 h-full flex items-center text-gray-500",
        styles.label
      )}
    >
      {label}
    </span>
  </div>
);

const VerticalDivider = () => (
  <div className={classNames(styles.dividerGradientVertical, "col-span-1")} />
);

const StatsGrid = ({ data }) => (
  <div
    className={classNames(
      styles.statGrid,
      isProfileView && styles.statGridProfile
    )}
  >
    {data.map((item, index) => (
      <React.Fragment key={index}>
        <StatDisplay number={item.amt} label={displayNames[item.name]} />
        {index !== 2 && index !== 5 && <VerticalDivider />}
      </React.Fragment>
    ))}
  </div>
);

function FullProfile({ data, isVertical, isStandalone }) {
  isProfileView = isStandalone;
  return (
    <>
      <div className="w-full">
        {data.eventCountSummary?.length > 0 && (
          <div className="pb-12">
            <StatsHeader
              headline="Total Actions Over Past 12 Months"
              tooltip="Last refreshed a few hours ago"
              className="pb-9"
            />
            <StatsGrid data={data.eventCountSummary} />
          </div>
        )}

        {data.languages?.length > 0 && (
          <div>
            <StatsHeader
              className="pb-9"
              headline="Top Languages Over Past 12 Months"
            />
            <div
              className={`w-full ${!isStandalone && isVertical && "h-[600px]"}`}
            >
              <ProfilePieChart
                data={data.languages}
                isVertical={isVertical}
                isStandalone={isStandalone}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function GithubStats({
  stats,
  isVertical,
  isStandalone = false,
}) {
  // isStandalone => true is for Profile page, false is for Finalists page (Grid view)
  return (
    <section
      className={classNames({
        "bg-white relative p-8 border-t-2": isVertical && isStandalone,
        "mb-4": !isVertical,
        "bg-white h-full relative p-8 w-[420px] border-r border-b":
          isVertical && !isStandalone,
      })}
    >
      <h5
        className={classNames({
          "font-nexa font-bold text-xl mb-4": isVertical,
          "text-2xl mb-6": !isVertical,
        })}
      >
        Github Stats
      </h5>
      <section className="flex flex-wrap justify-between">
        {stats && (
          <FullProfile
            data={stats}
            isVertical={isVertical}
            isStandalone={isStandalone}
          />
        )}
      </section>
    </section>
  );
}
