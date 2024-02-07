/**
 * Component that loads the cloudinary widget
 */
import React, { useEffect, useRef } from "react";
import { ReactComponent as Upload } from "images/upload_icon.svg";
import { API, graphqlOperation } from "aws-amplify";
import { getCloudinarySignature } from "graphql/queries";

/**
 * Widget to handle uploading files to Cloudinary CDN.
 *
 * @param {Object} props - Component props
 */
function FileCloudinaryWidget({ onUpload, ...props }) {
  let cloudinaryWidget = useRef();

  useEffect(() => {
    cloudinaryWidget.current = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_RESUME,
        sources: ["local"],
        clientAllowedFormats:
          props.resourceType === "aspose"
            ? [
                "PDF",
                "doc",
                "docx",
                "docm",
                "dotx",
                "rtf",
                "txt",
                "xls",
                "xlsx",
                "xlsm",
                "pot",
                "potm",
                "potx",
                "pps",
                "ppsm",
                "pptx",
                "ppt",
                "pptm",
              ]
            : [],
        multiple: false,
        maxFileSize: 6291456,
        language: "en",
        publicId: props.fileName,
        prepareUploadParams: (cb, { public_id, upload_preset }) => {
          API.graphql(
            graphqlOperation(getCloudinarySignature, {
              publicId: public_id,
              preset: upload_preset,
            })
          )
            .then((response) => {
              cb(response.data.getCloudinarySignature);
            })
            .catch(() => {
              alert("Something Went Wrong, Please Try Again");
              cb({ cancel: true });
            });
        },
      },
      (err, result) => {
        if (err) {
          console.log("Error loading upload widget", err);
          if (err.statusText) {
            alert(err.statusText);
          }

          return;
        }

        if (result.event === "queues-end") {
          if (result.info?.files[0].status === "success") {
            const publicId = result.info?.files[0].uploadInfo.public_id;
            onUpload(publicId);
          } else {
            cloudinaryWidget.current.close();
          }
        }
        return;
      }
    );
  });

  const showUploadWidget = () => {
    if (cloudinaryWidget.current) {
      cloudinaryWidget.current.open();
    }
  };

  return (
    <div className="sm:flex  items-center gap-2 cursor-pointer mb-1">
      <Upload />
      <button
        type="button"
        loading={props.uploadInProgress}
        onClick={showUploadWidget}
        className="b3 text-brandSecondary"
      >
        {props.uploadInProgress ? "Uploading..." : props.label}
      </button>
    </div>
  );
}

export default FileCloudinaryWidget;
