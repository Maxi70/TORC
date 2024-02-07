/**
 * Component that loads the cloudinary widget
 */

import React, { useEffect, useRef } from "react";

// import spicyFileCursor from "images/spicy-file-cursor.png";

// import styles from "./CloudinaryWidget.module.css";
import { ReactComponent as Upload } from "images/upload_icon.svg";

/**
 * Widget to handle uploading files to Cloudinary CDN.
 *
 * @param {Object} props - Component props
 */
function CloudinaryWidget(props) {
  let cloudinaryWidget = useRef();

  useEffect(() => {
    cloudinaryWidget.current = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        sources:
          props.resourceType === "image" ? ["local", "camera"] : ["local"],
        multiple: false,
        cropping: true,
        resourceType: props.resourceType,
        clientAllowedFormats:
          props.resourceType === "image" ? ["png", "jpeg", "jpg"] : [],
        maxImageFileSize: 6291456,
        croppingAspectRatio: props.minImageHeight
          ? props.minImageWidth / props.minImageHeight
          : undefined,
        croppingShowDimensions: true,
        language: "en",
        text: {
          en: {
            local: {
              dd_title_single: `Drag and drop ${
                props.resourceType === "image" ? "an image" : "a file"
              } here. Ideal dimensions would be ${props.imageDimension}`,
            },
            crop: {
              title: "Crop your image",
              skip_btn: "Continue without cropping",
            },
          },
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

        if (result.event === "success") {
          props.onUpload(result.info.public_id);
        } else if (result.event === "queues-end") {
          // Did the upload succeed?
          if (result.info.files && result.info.files[0]?.failed) {
            // No, upload failed
            // Reset state
            cloudinaryWidget.current.close();
            cloudinaryWidget.current.open();
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

export default CloudinaryWidget;
