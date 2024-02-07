import { useEffect, useReducer, useState } from "react";
import ImageViewer from "components/ImageViewer";
import CloudinaryWidget from "components/CloudinaryWidget";

import galaxy from "images/backgrounds/space.jpg";
import sky from "images/backgrounds/sky.png";
import ProfilePic from "images/customer-profile.png";
import ProfileCoverPictureReducer from "./reducer";
import * as actionTypes from "./actionTypes";
import { ReactComponent as Trash } from "images/new/trash.svg";
import DeleteConfirmation from "../../DeleteConfirmation";

const INITIAL_STATE = {
  profilePic: null,
  coverPhoto: null,
  existingProfilePic: null,
  existingCoverPhoto: null,
  profilePicForDisplay: false,
  coverPhotoForDisplay: false,
  photoDeleteInProgress: false,
};

function ProfileCoverPicture({ user, save, profileCoverPictureRef }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalTitle, setDeleteModalTitle] = useState("");

  const [state, dispatch] = useReducer(
    ProfileCoverPictureReducer,
    INITIAL_STATE
  );

  // Store the picture
  const handleCoverPhotoUpload = (cloudinaryPublicId) => {
    dispatch({
      type: actionTypes.COVER_PHOTO_SELECTED,
      file: cloudinaryPublicId,
    });
  };

  const onDelete = () => {
    setIsLoading(true);
    if (deleteModalTitle.includes("Cover")) {
      dispatch({
        type: actionTypes.COVER_PHOTO_DELETED,
      });
    }
    if (deleteModalTitle.includes("Profile")) {
      dispatch({
        type: actionTypes.PROFILE_PIC_DELETED,
      });
    }
  };

  const handleDeletePhoto = (type) => {
    setDeleteModalTitle(`your ${type} picture`);
    setIsDeleting(true);
  };

  // Store the picture
  const handleProfilePicUpload = (cloudinaryPublicId) => {
    dispatch({
      type: actionTypes.PROFILE_PIC_SELECTED,
      file: cloudinaryPublicId,
    });
  };

  // Actually upload the picture
  const uploadPicture = async (e) => {
    // e.preventDefault();

    let attribute = {};

    // if (!state.profilePic && !state.coverPhoto && !wasDeleted) {
    //   nextStep();
    //   return;
    // }

    attribute.headshotKey = state.profilePic || state.existingProfilePic;
    attribute.coverPhoto = state.coverPhoto || state.existingCoverPhoto;

    // Save in db
    try {
      const attributesToUpdate = {
        id: user.id,
        ...attribute,
      };

      await save(attributesToUpdate);
    } catch (error) {
      console.log("Appsync save error", error);
    }

    if (state.photoDeleteInProgress) {
      dispatch({
        type: actionTypes.PHOTO_DELETED_COMPLETED,
      });
      setIsDeleting(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.headshotKey || user.coverPhoto) {
      dispatch({
        type: actionTypes.PICTURES_FETCHED,
        profilePic: user.headshotKey,
        coverPhoto: user.coverPhoto,
      });
    }
  }, [user]);

  useEffect(() => {
    if (
      state.photoDeleteInProgress ||
      (state.profilePic && state.profilePic !== user.profilePic) ||
      (state.coverPhoto && state.coverPhoto !== user.coverPhoto)
    ) {
      uploadPicture();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.profilePic, state.coverPhoto, state.photoDeleteInProgress]);

  // const renderDeleteButton = (type, isDisabled) => (
  //   <button
  //     type="button"
  //     className={classNames(
  //       "block mt-2 font-rubik-regular text-red-700 uppercase",
  //       { "opacity-50 cursor-auto": isDisabled },
  //       { "hover:text-red-500": !isDisabled }
  //     )}
  //     onClick={
  //       type === "PROFILE_PIC" ? handleProfilePicDelete : handleCoverPhotoDelete
  //     }
  //     disabled={isDisabled}
  //   >
  //     Delete photo
  //   </button>
  // );

  return (
    <>
      <div ref={profileCoverPictureRef} className="flex gap-12">
        <div className="w-3/5">
          <h5 className="mb-6">Header image.</h5>
          {state.coverPhotoForDisplay ? (
            <div className="h-28 object-center w-full flex justify-center relative">
              <ImageViewer
                objectKey={state.coverPhoto || state.existingCoverPhoto}
              />
              <Trash
                className="absolute  top-0 right-0 cursor-pointer"
                onClick={() => handleDeletePhoto("Cover")}
              />
            </div>
          ) : (
            <div className="h-28 w-full flex">
              <img
                src={user.userType === "CUSTOMER" ? sky : galaxy}
                alt="cover"
                width="100%"
                height="100%"
              />
            </div>
          )}
          <div className="items-center my-8">
            <CloudinaryWidget
              onUpload={handleCoverPhotoUpload}
              identifier="cover-photo-upload"
              label="Upload photo"
              minImageHeight={517}
              minImageWidth={1839}
              imageDimension="1839 pixels wide by 517 pixels tall"
              resourceType="image"
            />
            <p className="b5 text-grey-300">
              Only JPG, PNG format. Max file size 3mb. Recommended size of
              1839x517.
            </p>
            {/* {renderDeleteButton("COVER_PHOTO", !state.existingCoverPhoto)} */}
          </div>
        </div>

        <div className="w-2/5">
          <h5 className="mb-6">Profile image.</h5>

          {state.profilePicForDisplay ? (
            <div className="h-28 object-center w-full flex justify-center relative">
              <ImageViewer
                objectKey={state.profilePic || state.existingProfilePic}
              />
              <Trash
                className="absolute  top-0 right-0 cursor-pointer"
                onClick={() => handleDeletePhoto("Profile")}
              />
            </div>
          ) : (
            <img className="max-w-full h-28" src={ProfilePic} alt="profile" />
          )}
          <div className="items-center my-8">
            <CloudinaryWidget
              onUpload={handleProfilePicUpload}
              identifier="profile-pic-upload"
              label="Upload photo"
              minImageWidth={317}
              minImageHeight={317}
              imageDimension="317 pixels wide by 317 pixels tall"
              resourceType="image"
            />

            <p className="b5 text-grey-300">
              Only JPG, PNG format. Max file size 3mb. Recommended size of
              317x317
            </p>
            {/* {renderDeleteButton("PROFILE_PIC", !state.existingProfilePic)} */}
          </div>
        </div>
      </div>
      {isDeleting && (
        <DeleteConfirmation
          isLoading={isLoading}
          heading={"Delete Photo"}
          title={deleteModalTitle}
          handleClose={() => setIsDeleting(false)}
          handleDelete={onDelete}
        />
      )}
    </>
  );
}

export default ProfileCoverPicture;
