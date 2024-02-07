import React, { useMemo } from "react";
import { withParentSize } from "@visx/responsive";
import { LinearGradient } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Bar, Line } from "@visx/shape";

const displayNames = {
  IssueEvent: "Issue Count",
  PullRequestEvent: "Pull Requests",
  IssueCommentEvent: "Issue Comments",
  PullRequestReviewEvent: "PR Reviews",
  PushEvent: "Total Commits",
  CreateEvent: "Repos Created",
};

/**
 * A bar chart component. Takes an array of objects with the following properties:
 * - name: The label for the bar
 * - amt: The value of the bar
 *
 * Currently used for the following Github actions:
 * - name: 'IssueEvent'
 * - name: 'PullRequestEvent'
 * - name: 'IssueCommentEvent'
 * - name: 'PullRequestReviewEvent'
 * - name: 'PushEvent'
 * - name: 'CreateEvent'
 *
 * the meanings of those names, from issue 390:
 * Issue Count - total issues created
 * Total Pull Requests - total submitted pull requests
 * Total Issue Comments - total commented on issues
 * Total Pull Request Reviews - total pull requests approved
 * Total Commits - total lines of lines of code / commits? Your graph says lines of code
 * Total Repo Contribution - total creating new repositories
 *
 * With inspiration from the visx library example gallery.
 *
 * @param {object[]} data
 * @returns {JSX.Element}
 */
const ProfileBarChart = ({ data, parentWidth, parentHeight }) => {
  const topMargin = 0;
  const bottomMargin = 100;
  const horizontalPadding = 25;
  const xMax = parentWidth;
  const yMax = parentHeight - (topMargin + bottomMargin);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        domain: data.map((d) => d.name),
        padding: 0.7,
      }),
    [xMax, data]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map((d) => d.amt))],
      }),
    [yMax, data]
  );

  return (
    <svg
      width={parentWidth}
      height={parentHeight}
      viewBox={`-2 0 ${parentWidth + horizontalPadding * 2} ${parentHeight}`}
    >
      <LinearGradient
        from="#3DCBA0" // from figma
        to="#EFC739"
        fromOffset="28.53%"
        toOffset="79.91%"
        rotate="-65"
        // x1={0}
        // y1={0}
        // x2={parentWidth}
        // y2={parentHeight}
        id="bargrad"
        // transform="rotate(90)"
      />
      <Group top={topMargin}>
        {data.map((d, i) => {
          // const eventName = displayNames[d.name];
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d.amt) ?? 0);
          const barX = xScale(d.name);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${d.name}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="url(#bargrad)"
              fillOpacity="0.7"
              onClick={() => {}}
            />
          );
        })}
      </Group>
      <Line
        from={{ x: 0, y: 0 }}
        to={{ x: 0, y: parentHeight - bottomMargin }}
        stroke="#B8B8B8"
      />
      <Line
        from={{ x: 0, y: parentHeight - bottomMargin }}
        to={{ x: xMax, y: parentHeight - bottomMargin }}
        stroke="#B8B8B8"
      />
      <Group top={topMargin}>
        {data.map((d, i) => {
          const eventName = d.amt;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d.amt) ?? 0);
          const barX = xScale(d.name);
          const barY = yMax - barHeight;
          return (
            <text
              key={`amt-${d.name}`}
              x={barX + barWidth / 2}
              y={barY - 4}
              textAnchor="middle"
              fontSize="12"
              fill="#B8B8B8"
            >
              {eventName}
            </text>
          );
        })}
      </Group>
      <Group top={parentHeight - bottomMargin}>
        {data.map((d, i) => {
          const eventName = displayNames[d.name];
          const barWidth = xScale.bandwidth();
          const barX = xScale(d.name);
          //   const barY = yMax - barHeight;
          return (
            <text
              key={`text-${d.name}`}
              x={barX + barWidth / 2}
              y={10}
              textAnchor="start"
              fontSize="12"
              fill="#B8B8B8"
              transform={`rotate(45, ${barX + barWidth / 2}, 10)`}
            >
              {eventName}
            </text>
          );
        })}
      </Group>
    </svg>
  );
};

export default withParentSize(ProfileBarChart);
