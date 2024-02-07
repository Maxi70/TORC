import "./index.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarModal from "./CalendarModal";
import SvgIcon from "components/SvgIcon";
import classNames from "classnames";

const NoResults = ({ message, renderMessage }) => {
  return (
    <div className="absolute flex inset-0 top-2 justify-center">
      <div className="opacity-60 absolute text-center text-red-400 text-lg mb-3">
        {renderMessage ? renderMessage() : message}
      </div>
    </div>
  );
};

const Calendar = ({
  calendarEvents,
  reFreshCalendarEvents,
  noResultsMessage,
  renderCustomNoResults,
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
    eventMaxStack: 1,
    height: "100%",
  });

  useEffect(() => {
    (async () => {
      await handleRefreshEvents();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEventClick = ({ event, el }) => {
    const calendarEvent = {
      start: event.start,
      end: event.end,
      title: event.title,
      ...event.extendedProps,
      el,
    };

    const rect = el.parentNode.getBoundingClientRect();

    el.classList.add("highlight-event");

    calendarEvent.position = {
      left: rect.right - rect.width,
      top: rect.top + window.pageYOffset,
    };

    calendarEvent.rect = rect;

    setSelectedEvent(calendarEvent);
  };

  function renderEventContent(eventInfo) {
    return eventInfo.view.type === "timeGridWeek" ? (
      <div className="flex w-full truncate cursor-pointer">
        <p title={eventInfo.event.title}>{eventInfo.event.title}</p>
      </div>
    ) : (
      <div className="flex w-full truncate cursor-pointer">
        <p className="text-xs 2xl:text-sm" title={eventInfo.event.title}>
          <span className="font-semibold">{eventInfo.timeText}</span>{" "}
          {eventInfo.event.title}
        </p>
      </div>
    );
  }

  const handleViewDidMount = (e) => {
    if (e.view.type === "dayGridMonth") {
      setOptions((prev) => ({ ...prev, dayMaxEvents: true }));
    }
  };

  const handleDatesSet = (e) => {
    if (e.view.type === "dayGridMonth") {
      setOptions((prev) => ({ ...prev, dayMaxEvents: true }));
    }
  };

  const handleCloseModal = () => {
    selectedEvent.el.classList.remove("highlight-event");
    setSelectedEvent(null);
  };

  const handleRefreshEvents = async () => {
    setIsLoading(true);
    await reFreshCalendarEvents();
    setTimeout(() => {
      setOptions((prev) => ({ ...prev, dayMaxEvents: true }));
      setIsLoading(false);
    }, 5);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        {!calendarEvents?.length && (
          <NoResults
            message={noResultsMessage}
            renderMessage={renderCustomNoResults}
          />
        )}
        {!!calendarEvents?.length && (
          <button
            className="absolute top-3 flex z-50 gap-2 hover:underline disabled:opacity-75"
            onClick={handleRefreshEvents}
            disabled={isLoading}
          >
            <p className="text-center font-semibold text-lg">Refresh Events</p>
            <SvgIcon
              type="refresh"
              className={classNames("w-[25px] transform rotate-180", {
                "animate-spin": isLoading,
                "animate-none": !isLoading,
              })}
            />
          </button>
        )}
      </div>
      <div className="w-full h-full p-2 pt-5 font-light font-rubik text-sm relative">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          viewDidMount={handleViewDidMount}
          datesSet={handleDatesSet}
          {...options}
        />
      </div>
      {selectedEvent && (
        <CalendarModal
          calendarEvent={selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

Calendar.propTypes = {
  noResultsMessage: PropTypes.string,
  renderCustomNoResults: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([undefined]),
  ]),
};

Calendar.defaultProps = {
  noResultsMessage: "No results to display",
  renderCustomNoResults: undefined,
};

export default Calendar;
