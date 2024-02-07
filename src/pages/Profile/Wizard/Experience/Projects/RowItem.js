import PropTypes from "prop-types";
import { ReactComponent as Building } from "images/new/buildings.svg";
import { ReactComponent as Pencil } from "images/new/pencil_blue.svg";
import { ReactComponent as Trash } from "images/new/trash_blue.svg";
import { ReactComponent as Link } from "images/new/link.svg";
import moment from "moment";

export default function RowItem({ index, experience, onEdit, onDelete }) {
  let message = "";

  if (!experience.endDate) {
    message = "in progress";
  } else if (!experience.startDate) {
    message = "completed";
  } else {
    const projectDurationInMonths = moment(experience.endDate).diff(
      moment(experience.startDate),
      "months"
    );
    message = `${projectDurationInMonths} ${
      projectDurationInMonths < 2 ? "month" : "months"
    }`;
  }

  return (
    <div className="flex gap-4 pb-5 mb-5 border-b last:border-b-0">
      <div>
        <div className="h-6 w-6 border-[1px] bg-grey-100 border-grey-500 p-1 rounded-[2px]">
          <Building className="w-4 h-4" />
        </div>
      </div>
      <div className="flex justify-between w-full items-start">
        <div>
          <h6>{experience.title}</h6>
          <div className="flex gap-2 py-1 items-center">
            {experience.workType === "PROJECT" && (
              <>{`${experience.client || ""} - ${message}`}</>
            )}
            <Link />
            {experience.link}
          </div>
        </div>
        <div className="b3 text-brandSecondary flex items-center ml-auto gap-4">
          <button
            onClick={() => onEdit(experience.id)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Pencil />
            Edit
          </button>
          <button
            onClick={() => onDelete(experience.id)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Trash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

RowItem.propTypes = {
  index: PropTypes.number.isRequired,
  experience: PropTypes.shape({
    client: PropTypes.string,
    description: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    workType: PropTypes.string,
    link: PropTypes.string,
    stack: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
