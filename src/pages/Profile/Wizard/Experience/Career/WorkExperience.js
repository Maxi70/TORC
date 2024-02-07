import PropTypes from "prop-types";
import moment from "moment";

import { ReactComponent as Building } from "images/new/buildings.svg";
import { ReactComponent as Pencil } from "images/new/pencil_blue.svg";
import { ReactComponent as Trash } from "images/new/trash_blue.svg";

const JOB_TYPES = {
  FULLTIME: "Full Time",
  PARTTIME: "Part Time",
  SELFEMPLOYED: "Self employed",
};

const WorkExperience = ({ experience, onEdit, onDelete, last }) => {
  const startDate = moment(experience.startDate).format("MMM, YYYY");
  const endDate = experience.endDate
    ? moment(experience.endDate).format("MMM, YYYY")
    : "Present";

  return (
    <div className="flex gap-4 mb-5">
      <div>
        <div className="h-6 w-6 border-[1px] bg-grey-100 border-grey-500 p-1 rounded-[2px]">
          <Building className="w-4 h-4" />
        </div>
        {!last && <div className="w-[2px] h-16 bg-[#d9d9d9] m-auto" />}
      </div>
      <div className="flex justify-between w-full items-start">
        <div>
          <h6>{experience.title}</h6>
          <div className="flex">
            At {experience.companyName} • {JOB_TYPES[experience.format]}
          </div>
          <div className="flex">
            {startDate} - {endDate}
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
};

WorkExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  last: PropTypes.bool,
};

export default WorkExperience;
