/**
 * Component to display image files stored in Cloudinary. Features:
 * - Display custom placeholder when there's no image to display
 * - Display placeholder while cloudinary loads the image
 */

import React, { useEffect } from "react";
import { Image, Transformation, Placeholder } from "cloudinary-react";

function ImageViewer({ objectKey, placeholder, ...props }) {
  const [publicId, setPublicId] = React.useState(null);

  useEffect(() => {
    if (!objectKey) {
      return;
    }

    setPublicId(objectKey);
  }, [objectKey]);

  if (!objectKey) {
    return placeholder;
  }

  return (
    <Image
      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
      secure={true}
      upload_preset={process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}
      publicId={publicId}
      width="auto"
      responsive
    >
      <Transformation fetch_format="auto" quality="auto" {...props} />
      <Placeholder type="vectorize" />
    </Image>
  );
}

export default ImageViewer;
