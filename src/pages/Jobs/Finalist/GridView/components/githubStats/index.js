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
  <div className="flex flex-col items-center justify-start col-span-1 p-1">
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
  <div className={classNames(styles.statGrid)}>
    {data.map((item, index) => (
      <React.Fragment key={index}>
        <StatDisplay number={item.amt} label={displayNames[item.name]} />
        {index !== 2 && index !== 5 && <VerticalDivider />}
      </React.Fragment>
    ))}
  </div>
);

function FullProfile({ data }) {
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
            <div className={classNames(styles.profilePieChart, "w-full")}>
              <ProfilePieChart data={data.languages} isVertical={true} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function GithubStats({ stats }) {
  return (
    <section className="mb-4">
      <h5 className="font-nexa font-bold text-xl mb-4">Github Stats</h5>
      <section className="flex flex-wrap justify-between">
        <FullProfile data={stats} />
      </section>
    </section>
  );
}
