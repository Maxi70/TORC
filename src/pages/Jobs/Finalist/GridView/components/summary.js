import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import { getWorkExperience } from "helpers/utils";
import { MAP_AVAILABILITY } from "constants";
import { getMatchHistoryByStatus } from "utils/matchFieldHistory";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import { Link } from "react-router-dom";

export default function FinalistGridSummary(props) {
  const [localTime, setLocalTime] = useState();
  const [timeZoneId, setTimeZoneId] = useState();

  const { matchedHistory, appliedHistory } = useMemo(() => {
    const matchedHistory = getMatchHistoryByStatus(
      props.matchFieldHistory,
      JOB_APPLICATION_MATCH_STATUS.MATCHED
    );

    const appliedHistory = getMatchHistoryByStatus(
      props.matchFieldHistory,
      JOB_APPLICATION_MATCH_STATUS.APPLIED
    );

    return { matchedHistory, appliedHistory };
  }, [props.matchFieldHistory]);

  useEffect(() => {
    if (!props.location) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/timezone/json?location=${
            props.location.latitude
          },${props.location.longitude}&timestamp=${Math.floor(
            Date.now() / 1000
          )}&key=${process.env.REACT_APP_GOOGLE_TIMEZONES_API_KEY}`
        );
        const { status, timeZoneId } = response.data;

        if (status === "OK") setTimeZoneId(timeZoneId);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchData();
  }, [props.location]);

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

  const getExperience = () => {
    let months = getWorkExperience(
      props.careers?.map((c) => ({
        startDate: c.startDate,
        endDate: c.endDate,
      }))
    );

    const years = Math.floor(months / 12);
    const yearsInStr = months % 12 > 0 ? `${years}+` : `${years}`;
    const yearsUnit = years === 1 && months % 12 === 0 ? "year" : "years";

    return years > 0 ? `${yearsInStr} ${yearsUnit}` : "Fresh";
  };

  return (
    <section className="w-[420px] bg-white border-r h-full border-b p-8">
      <section className="mb-4">
        <h5 className="font-nexa font-bold text-xl mb-4">Summary</h5>
        <dl className="grid grid-cols-2">
          <dt className="text-gray-500">Experience</dt>
          <dd className="text-right">{getExperience()}</dd>
          <dt className="text-gray-500">
            Local Time <br />(
            {
              Intl.DateTimeFormat(undefined, {
                timeZone: timeZoneId,
                timeZoneName: "long",
              }).formatToParts()[6].value
            }
            )
          </dt>
          <dd className="text-right">{localTime}</dd>
          <dt className="text-gray-500">Availability</dt>
          <dd className="text-right">
            {MAP_AVAILABILITY[props.availability] ?? "N/a"}
          </dd>
          <dt className="text-gray-500">
            <p>Matched</p>
            <p>
              {matchedHistory?.creator ? (
                <>
                  by{" "}
                  <Link
                    to={`/profile/${matchedHistory?.creator || ""}`}
                    target="_blank"
                  >
                    @${matchedHistory?.creator}
                  </Link>
                </>
              ) : (
                "-"
              )}
            </p>
          </dt>
          <dd className="text-right">
            {matchedHistory?.formattedCreatedAt || "-"}
          </dd>
          <dt className="text-gray-500">Applied</dt>
          <dd className="text-right">
            {appliedHistory?.formattedCreatedAt || "-"}
          </dd>
          {/* <dt className="text-gray-500">Ready to start</dt>
          <dd className="text-right"></dd> */}
        </dl>
      </section>
    </section>
  );
}
