import { useEffect } from "react";

import Availability from "./Availability";
import Rate from "./Rate";
import Profile from "./Profile";
import getCurrentClass from "../shared/utils";
import ProjectStyle from "./ProjectStyle";

const ProfessionalProfile = ({
  user,
  handleSubStepQueryParams,
  currentSubStep,
  refs,
  saveAttributes,
  setDisabled,
}) => {
  useEffect(() => {
    handleSubStepQueryParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="compact-text container-large">
      {currentSubStep < 4 ? (
        <>
          <h1 className="mb-[1vh]">Professional profile</h1>
          <ProjectStyle
            jobRef={refs[0]}
            user={user}
            save={saveAttributes}
            setDisabled={setDisabled}
            isCurrent={currentSubStep === 1}
          />
          {currentSubStep > 1 && (
            <Availability
              user={user}
              className={getCurrentClass(2, currentSubStep)}
              availabilityRef={refs[1]}
              save={saveAttributes}
              setDisabled={setDisabled}
              isCurrent={currentSubStep === 2}
            />
          )}
          {currentSubStep > 2 && (
            <Rate
              user={user}
              className={getCurrentClass(3, currentSubStep)}
              rateRef={refs[2]}
              save={saveAttributes}
              setDisabled={setDisabled}
            />
          )}
        </>
      ) : (
        <Profile
          user={user}
          profileRef={refs[3]}
          profileCoverPictureRef={refs[4]}
          save={saveAttributes}
        />
      )}
    </div>
  );
};

export default ProfessionalProfile;
