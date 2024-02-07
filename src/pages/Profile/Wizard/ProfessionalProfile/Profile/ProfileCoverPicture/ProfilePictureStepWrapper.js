import React from "react";
import ProfileCoverPicture from "./index.js";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";

const ProfilePictureStepWrapper = ({ user, updateProfile, nextStep }) => {
  return (
    <div>
      <ProfileCoverPicture user={user} save={updateProfile} />

      <GetStartedBtn
        className="mt-12 mb-20 self-start"
        label={"CONTINUE"}
        onClick={nextStep}
      />
    </div>
  );
};

export default ProfilePictureStepWrapper;
