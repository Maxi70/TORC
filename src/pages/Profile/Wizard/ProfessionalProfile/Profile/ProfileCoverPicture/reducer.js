import * as actionTypes from "./actionTypes";

export default function ProfileCoverPictureReducer(state, action) {
  switch (action.type) {
    case actionTypes.COVER_PHOTO_SELECTED:
      return {
        ...state,
        coverPhoto: action.file,
        coverPhotoForDisplay: true,
      };
    case actionTypes.PROFILE_PIC_SELECTED:
      return {
        ...state,
        profilePic: action.file,
        profilePicForDisplay: true,
      };
    case actionTypes.PICTURES_FETCHED:
      return {
        ...state,
        existingProfilePic: action.profilePic,
        existingCoverPhoto: action.coverPhoto,
        profilePicForDisplay: !!action.profilePic,
        coverPhotoForDisplay: !!action.coverPhoto,
      };
    case actionTypes.PROFILE_PIC_DELETED:
      return {
        ...state,
        profilePic: null,
        existingProfilePic: null,
        profilePicForDisplay: false,
        photoDeleteInProgress: true,
      };
    case actionTypes.COVER_PHOTO_DELETED:
      return {
        ...state,
        coverPhoto: null,
        existingCoverPhoto: null,
        coverPhotoForDisplay: false,
        photoDeleteInProgress: true,
      };
    case actionTypes.PHOTO_DELETED_COMPLETED:
      return {
        ...state,
        photoDeleteInProgress: false,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
