import React, { useState } from "react";
import FileCloudinaryWidget from "components/CloudinaryWidget/FileCloudinaryWidget";
import { ReactComponent as Trash } from "images/new/trash.svg";
import DeleteConfirmation from "../DeleteConfirmation";

let switchType = false;

const ResumeUpload = ({ user, save }) => {
  const [resumeDetails, setResumeDetails] = useState({
    resumeFileName: `${user.resumeLocation?.split("/")[2]}.pdf`,
    resumeLocation: user.resumeLocation,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalTitle, setDeleteModalTitle] = useState("");
  const [isResumeReady, setIsResumeReady] = useState(true);
  const [fileType, setFileType] = useState(".jpg");

  const callSave = async (resumeStorageLocation) => {
    await save({ resumeLocation: resumeStorageLocation }, true);
    if (isDeleting) {
      setIsDeleting(false);
      setIsLoading(false);
    }
  };

  const handlePreviewError = () => {
    const typeToSet = switchType ? ".jpg" : ".png";
    setIsResumeReady(false);
    setFileType(typeToSet);
    switchType = !switchType;
  };

  const handleResumeUpload = async (resumeStorageLocation) => {
    await callSave(resumeStorageLocation);
    setResumeDetails({
      resumeFileName: `${resumeStorageLocation.split("/")[2]}.pdf`,
      resumeLocation: resumeStorageLocation,
    });
  };

  const onDelete = async () => {
    setIsLoading(true);
    await callSave(null);
    setResumeDetails({
      resumeFileName: null,
      resumeLocation: null,
    });
  };

  const handleDeleteResume = () => {
    setDeleteModalTitle(resumeDetails.resumeFileName);
    setIsDeleting(true);
  };

  const RenderResumePreview = () => {
    const baseUrl = `https://res.cloudinary.com/${
      process.env.REACT_APP_CLOUDINARY_CLOUDNAME
    }/image/upload/v${Date.now()}/${resumeDetails.resumeLocation}`;
    return (
      <div className="relative inline-block items-center">
        {isResumeReady ? (
          <div className="h-80">
            <a
              href={`${baseUrl}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${baseUrl}${fileType}`}
                alt="Resume"
                width={250}
                onError={handlePreviewError}
              />
              &nbsp;{resumeDetails.resumeFileName}
            </a>
            <Trash
              className="absolute top-0 right-0 cursor-pointer"
              onClick={handleDeleteResume}
            />
          </div>
        ) : (
          <div className="pb-1.5">
            <p
              className="pb-1.5"
              onMouseEnter={() => setIsResumeReady(true)}
            >{`Preview will be available shortly (hover to check status)`}</p>
            <a
              href={`${baseUrl}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;{`${resumeDetails.resumeFileName} (open file)`}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="b1 mb-4">Resume.</div>
      {Boolean(resumeDetails?.resumeLocation) && <RenderResumePreview />}
      <FileCloudinaryWidget
        onUpload={handleResumeUpload}
        identifier="resume-upload"
        label="Upload Resume"
        minImageHeight={517}
        minImageWidth={1839}
        resourceType="aspose"
        fileName={`${user.username}_resume`}
      />
      <p className="b5 text-grey-300">
        Preferred format PDF. Other file formats auto-converted to PDF. Max file
        size 6mb.
      </p>
      {isDeleting && (
        <DeleteConfirmation
          isLoading={isLoading}
          heading={"Delete Resume"}
          title={deleteModalTitle}
          handleClose={() => setIsDeleting(false)}
          handleDelete={onDelete}
        />
      )}
    </div>
  );
};

export default ResumeUpload;
