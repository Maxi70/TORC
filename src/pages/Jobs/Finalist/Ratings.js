import classNames from "classnames";
import { JOB_APPLICATION_MATCH_RATINGS_FORMATTED } from "lookup";
import DESIRABLESRC from "images/reactions/DESIRABLE.png";
import NEUTRALSRC from "images/reactions/NEUTRAL.png";
import UNDESIRABLESRC from "images/reactions/UNDESIRABLE.png";
import VERYDESIRABLESRC from "images/reactions/VERYDESIRABLE.png";
import VERYUNDESIRABLESRC from "images/reactions/VERYUNDESIRABLE.png";
import { useState } from "react";

const RATINGS_SRC = {
  DESIRABLE: DESIRABLESRC,
  NEUTRAL: NEUTRALSRC,
  UNDESIRABLE: UNDESIRABLESRC,
  VERYDESIRABLE: VERYDESIRABLESRC,
  VERYUNDESIRABLE: VERYUNDESIRABLESRC,
};

const Ratings = ({ rating, handleClickRating, isReadOnly }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const formattedRatingsKeys = Object.keys(
    JOB_APPLICATION_MATCH_RATINGS_FORMATTED
  );

  const handleClick = async (formattedRatingsKey) => {
    setIsUpdating(true);
    await handleClickRating(formattedRatingsKey);
    setIsUpdating(false);
  };

  return (
    <div
      className={classNames(
        "flex ml-8 gap-4 cursor-pointer",
        { "cursor-not-allowed": isReadOnly },
        { "animate-bounce": !isReadOnly && !rating },
        { "animate-pulse": isUpdating }
      )}
    >
      {formattedRatingsKeys.map((formattedRatingsKey, index) => (
        <div
          key={index}
          title={
            isReadOnly
              ? "Read Only"
              : JOB_APPLICATION_MATCH_RATINGS_FORMATTED[formattedRatingsKey]
          }
          className={`${rating !== formattedRatingsKey && "grayscale"}`}
          onClick={() => !isReadOnly && handleClick(formattedRatingsKey)}
        >
          <img
            src={RATINGS_SRC[formattedRatingsKey]}
            alt=""
            width="auto"
            height="auto"
          />
        </div>
      ))}
    </div>
  );
};
export default Ratings;
