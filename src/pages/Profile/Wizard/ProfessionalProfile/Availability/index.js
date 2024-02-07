import { useEffect, useState } from "react";
import YellowBox from "../../shared/YellowBox";
import { AVAILABILITIES } from "./availabilities";

const Availability = ({
  className,
  availabilityRef,
  user,
  save,
  setDisabled,
  isCurrent,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState(
    user.availability
  );

  const onAvailableChange = async (value) => {
    setSelectedAvailability(value);
    save({ availability: value }, true);
  };

  useEffect(() => {
    if (!isCurrent) return;
    setDisabled(selectedAvailability === null);
  }, [selectedAvailability, setDisabled, isCurrent]);

  return (
    <div className={className} ref={availabilityRef}>
      <div className="b1">Your current availability for new jobs.</div>
      <div className="b2 mb-8">
        Select the option that best matches you today.
      </div>
      <div className="sm:flex gap-16">
        {AVAILABILITIES.map((availability, index) => (
          <YellowBox
            key={index}
            handleClick={() => onAvailableChange(availability.value)}
            selected={selectedAvailability === availability.value}
            popover={availability.popover}
          >
            {availability.label}
          </YellowBox>
        ))}
      </div>
    </div>
  );
};

export default Availability;
