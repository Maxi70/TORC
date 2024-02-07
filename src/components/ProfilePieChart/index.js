import React, { useState } from "react";
import { withParentSize } from "@visx/responsive";
import { Group } from "@visx/group";
import { Circle, Pie } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";
import { Text } from "@visx/text";
import { useMediaQuery } from "react-responsive";

const getColor = (index) => {
  const colors = ["#302C7F", "#A970D0", "#3DCBA0", "#007A94"];
  return index === 0 ? "url(#bargrad)" : colors[(index - 1) % colors.length];
};

// TODO: move labels to external text
// SEE: https://githubmemory.com/repo/airbnb/visx/issues/978
// SEE: https://codesandbox.io/s/clever-wildflower-dz4n0?file=/Example.tsx

const ProfilePieChart = ({
  data,
  parentWidth,
  parentHeight,
  isVertical,
  isStandalone,
}) => {
  const base = 10; // To base everything else on
  const margin = isVertical
    ? {
        top: base,
        right: base,
        bottom: base,
        left: base,
      }
    : {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      };
  const width = parentWidth - margin.left - margin.right;
  const height = parentHeight - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const chartTop = centerY + margin.top;
  const legendCircleRadius = base;
  const donutWidth = radius * 0.35;
  const circleRadius = isVertical ? legendCircleRadius : 14;

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const isLargePortrait = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isSmallPortrait = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const amt = (d) => d.value;
  const sortValues = (a, b) => b.value - a.value;

  const total = data.reduce((acc, curr) => acc + amt(curr), 0);
  const truncData = [...data].sort(sortValues).slice(0, 5);

  const initialData = {
    name: truncData[0].name,
    pct: (truncData[0].value / total) * 100,
  };
  const [currLang, setCurrLang] = useState(initialData);

  return (
    <div
      className={
        !isVertical &&
        isLargePortrait &&
        isDesktopOrLaptop &&
        "flex pl-6 pt-2.5 justify-between"
      }
    >
      <div>
        {truncData.map((data, index) => (
          <div
            onMouseEnter={() =>
              setCurrLang({ name: data.name, pct: (data.value / total) * 100 })
            }
            className={`flex cursor-pointer items-center ${
              isVertical ? "mb-2 gap-2" : "mb-6 gap-4"
            }`}
            key={`group-${index}`}
          >
            <div>
              <svg width={circleRadius * 2} height={circleRadius * 2}>
                <Circle
                  key={`circle-${index}`}
                  cx={circleRadius}
                  cy={circleRadius}
                  r={circleRadius}
                  fill={getColor(index)}
                />
              </svg>
            </div>
            <div>
              <p
                key={`text-${index}`}
                className={` font-rubik-regular font-semibold ${
                  isVertical ? "text-base" : "text-lg"
                } ${isVertical ? "" : "tracking-wide"}`}
              >
                {data.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <svg
          width={
            isVertical
              ? parentWidth
              : isLargePortrait && isDesktopOrLaptop
              ? 450
              : radius * 2
          }
          height={
            isVertical
              ? !isSmallPortrait && !isLargePortrait && !isDesktopOrLaptop
                ? radius * 2
                : radius * 4
              : isLargePortrait && isDesktopOrLaptop
              ? 450
              : radius * 2
          }
        >
          {/* 400 px tall in landscape, 800 px tall in portrait */}
          <LinearGradient
            from="#BA89CD" // from figma
            to="#84CAF0"
            // fromOffset="28.53%"
            // toOffset="79.91%"
            rotate="-35"
            // x1={0}
            // y1={0}
            // x2={parentWidth}
            // y2={parentHeight}
            id="bargrad"
          />
          <Group
            top={
              isVertical
                ? isStandalone && isSmallPortrait && !isLargePortrait
                  ? radius + 65
                  : radius
                : isDesktopOrLaptop
                ? chartTop
                : radius
            }
            left={radius}
          >
            <Pie
              data={data}
              pieValue={amt}
              pieSortValues={sortValues}
              outerRadius={
                isVertical
                  ? radius
                  : isStandalone && isSmallPortrait && !isLargePortrait
                  ? radius - 150
                  : radius
              }
              innerRadius={
                isVertical ? radius - donutWidth : radius - donutWidth
              }
              padAngle={0}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const { name } = arc.data;
                  const arcPath = pie.path(arc);
                  const arcFill = getColor(index);
                  return (
                    <g
                      key={`arc-${name}-${index}`}
                      onMouseEnter={() =>
                        setCurrLang({
                          name: arc.data.name,
                          pct: (arc.data.value / total) * 100,
                        })
                      }
                    >
                      <path d={arcPath} fill={arcFill} />
                    </g>
                  );
                });
              }}
            </Pie>
            {currLang && (
              <Text
                fontFamily="'Nexa Light', sans-serif"
                fontSize={
                  isStandalone && isSmallPortrait && !isLargePortrait
                    ? "35"
                    : "52"
                }
                dx={10}
                color="#6321BE"
                textAnchor="middle"
                y={
                  isStandalone && isSmallPortrait && !isLargePortrait
                    ? -radius - 20
                    : 10
                }
              >
                {`${currLang.pct.toFixed(1)}%`}
              </Text>
            )}
            {currLang && (
              <Text
                fontFamily="Rubik, sans-serif"
                fontSize={
                  isStandalone && isSmallPortrait && !isLargePortrait
                    ? "14"
                    : "16"
                }
                textAnchor="middle"
                y={
                  isStandalone && isSmallPortrait && !isLargePortrait
                    ? -radius - 5
                    : "40"
                }
              >
                {currLang.name}
              </Text>
            )}
          </Group>
        </svg>
      </div>
    </div>
  );
};

export default withParentSize(ProfilePieChart);
