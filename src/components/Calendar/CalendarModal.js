import { ReactComponent as CrossIcon } from "images/cross.svg";
import React, { useMemo, useEffect, useRef } from "react";
import { formatDate, formatDateTime, formatTimeRange } from "./helper";
import classNames from "classnames";

const PARTICIPANT_STATUS_CLASS = {
  yes: "text-green-900",
  maybe: "text-orange",
  no: "text-red-500",
  noreply: "",
};

const CalendarModal = ({ calendarEvent, onClose }) => {
  const modalRef = useRef(null);
  const {
    participants,
    description,
    title,
    start,
    end,
    position,
    rect,
    owner,
  } = calendarEvent;

  const { isSameDate, translateXValue, translateYValue } = useMemo(() => {
    const isSameDate =
      typeof start === "string"
        ? start === end
        : start.toDateString() === end.toDateString();

    const modalRatioWidth = rect.left / window.innerWidth;

    const translateXValue = modalRatioWidth < 0.35 ? "25%" : "-100%";

    const modalRationHeight = rect.top / (0.8 * window.innerHeight);

    const translateYValue =
      modalRationHeight > 1
        ? "-100%"
        : `${(modalRationHeight * -100).toString()}%`;

    return { isSameDate, translateYValue, translateXValue };
  }, [rect.left, rect.top, start, end]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const formatSameDateRange = (start, end) => {
    return (
      <p className="text-sm">
        {formatDate(start)} · {formatTimeRange(start, end)}
      </p>
    );
  };

  const formatDateRange = (start, end) => {
    return (
      <p className="text-sm">
        {formatDateTime(start)} - {formatDateTime(end)}
      </p>
    );
  };

  const parseStringToHTML = (inputString) => {
    const lines =
      inputString.split("<br>").length === 1
        ? inputString.split("\n")
        : inputString.split("<br>");

    const paragraphs = lines.map((line, index) => {
      if (line.includes("http")) {
        let url;
        let indexof = -1;
        const regex = /<a href="(.*?)">/;
        const match = regex.exec(line);

        if (!match) {
          indexof = line.indexOf("http");
          url = line.slice(indexof, line.length);
        } else {
          url = match[1].trim();
          indexof = line.indexOf("<a");
        }
        const linkText = line.slice(0, indexof);

        return (
          <div key={index}>
            <p>{linkText}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-all"
            >
              {url}
            </a>
          </div>
        );
      }

      return (
        <p key={index} className="mt-1">
          {line}
        </p>
      );
    });

    return paragraphs;
  };

  const conferencing = ({ provider, details }) => (
    <div className="mt-2">
      <a
        href={details.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 break-all font-bold hover:underline"
      >
        {provider}
      </a>
      <div className="text-xs font-semibold text-gray-500 pl-1">
        {details.meetingCode && <p>Code: {details.meetingCode}</p>}
        <p>Password: {details.password}</p>
      </div>
    </div>
  );

  return (
    <div
      className="max-w-[448px] fixed bg-white shadow z-[9999] mt-4 rounded_modal "
      style={{
        ...position,
        transform: `translateX(${translateXValue}) translateY(${translateYValue})`,
      }}
      ref={modalRef}
    >
      <div className="flex flex-col justify-between items-start px-4 py-6 mb-4 border-b-2">
        <CrossIcon
          onClick={onClose}
          className="absolute top-2 right-2 w-[25px] h-[25px] opacity-50 cursor-pointer hover:opacity-100"
        />
        <p className="text-2xl font-bold">{title}</p>
        <div>
          {isSameDate
            ? formatSameDateRange(start, end)
            : formatDateRange(start, end)}
        </div>
      </div>
      <div className="h-[60vh] overflow-y-auto px-6 mb-4">
        <div>
          <p className="font-semibold">Guests: </p>
          <div className="pl-1">
            {[...participants]
              .sort(({ email }) => (owner.includes(email) ? -1 : 1))
              .map((p, index) => (
                <div key={index}>
                  <p
                    className={classNames(
                      "text-sm",
                      PARTICIPANT_STATUS_CLASS[p.status]
                    )}
                    title={p.status}
                  >
                    {p.email}
                  </p>
                  {owner.includes(p.email) && (
                    <p className="text-xs font-semibold  text-gray-500 mb-2">
                      Organizer
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
        {calendarEvent.conferencing && conferencing(calendarEvent.conferencing)}
        <div className="flex flex-col text-sm mt-2">
          <p className="font-semibold">Description: </p>
          <div className="pl-1">{parseStringToHTML(description)}</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
