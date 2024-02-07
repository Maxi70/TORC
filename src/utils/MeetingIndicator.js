import classNames from "classnames";
import CalendarModal from "components/Calendar/CalendarModal";
import Modal from "components/Modal";
import { useMemo, useState } from "react";

const formatDate = (date) => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MeetingIndicator = ({ candidate, jobCalendarEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const candidateMeetings = jobCalendarEvents?.filter((e) =>
    e.title.includes(candidate.username)
  );

  const dateTime = new Date().getTime();

  const sortedMeetings = useMemo(() => {
    if (!candidateMeetings?.length) return [];
    const sortedUpcomingMeetings = candidateMeetings
      .filter((item) => new Date(item.end).getTime() >= dateTime)
      .sort((a, b) => a.date - b.date);

    const sortedPastMeetings = candidateMeetings
      .filter((item) => new Date(item.end).getTime() < dateTime)
      .sort((a, b) => a.date - b.date);
    return [...sortedUpcomingMeetings, ...sortedPastMeetings];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateMeetings]);

  if (!candidateMeetings?.length) {
    return null;
  }

  const handleEventClick = (event, calendarEvent) => {
    const el = event.target;
    el.parentNode.classList.add("highlight-event");

    calendarEvent.el = el;

    const rect = el.parentNode.getBoundingClientRect();
    calendarEvent.position = {
      left: rect.right - rect.width,
      top: rect.top,
    };

    calendarEvent.start = new Date(calendarEvent.start);
    calendarEvent.end = new Date(calendarEvent.end);

    calendarEvent.rect = rect;
    setSelectedEvent(calendarEvent);
  };

  const handleCloseModal = () => {
    selectedEvent.el.parentNode.classList.remove("highlight-event");
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="flex flex-col">
        {sortedMeetings.map((meeting) => (
          <div
            className="flex items-center gap-2 text-sm font-semibold text-blue-400 cursor-pointer hover:underline"
            title={
              new Date(meeting.end).getTime() >= dateTime
                ? "Upcoming meeting"
                : "Meeting completed"
            }
            onClick={(e) => handleEventClick(e, meeting)}
          >
            <p>Meeting: </p>

            <div
              className={classNames(
                "w-3 h-3 rounded-full",
                new Date(meeting.end).getTime() >= dateTime
                  ? "bg-blue-500"
                  : "bg-green-500"
              )}
            ></div>

            <p>{formatDate(new Date(meeting.start))}</p>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <Modal onClose={handleCloseModal}>
          <CalendarModal
            calendarEvent={selectedEvent}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default MeetingIndicator;
