import Button from "components/FormComponents/Button";
import React, { useEffect, useState } from "react";
import useImportScript from "../../hooks/useImportScript";
import { API, graphqlOperation } from "aws-amplify";
import { getNylasEditToken } from "graphql/queries";
import Calendar from "images/new/calendar_icon.png";

const ScheduleEditButton = ({ googleOnly = false }) => {
  const [editToken, setEditToken] = useState(null);
  useImportScript(
    "https://schedule.nylas.com/schedule-editor/v1.0/schedule-editor.js"
  );

  const fetchNylasEditToken = async () => {
    const { data } = await API.graphql(graphqlOperation(getNylasEditToken));
    setEditToken(data.getNylasEditToken);
  };

  useEffect(() => {
    fetchNylasEditToken();
  });

  const handleClick = () => {
    window.nylas.scheduler.show({
      auth: {
        pageEditToken: editToken,
      },
      behavior: {
        disableEditing: ["slug"],
        displayOnly: ["event-info", "opening-hours", "calendars"],
      },
    });
  };

  return (
    <>
      {googleOnly ? (
        <Button
          className="mb-5 flex items-center gap-2 w-64 min-w-0"
          bgColor="white"
          isReadOnly={!editToken}
          onClick={handleClick}
        >
          <img src={Calendar} alt="calendar" className="w-10" />
          <div>Edit Google Calendar</div>
        </Button>
      ) : (
        <Button className="mb-5" isReadOnly={!editToken} onClick={handleClick}>
          Edit Scheduler
        </Button>
      )}
    </>
  );
};

export default ScheduleEditButton;
