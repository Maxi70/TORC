import React, { useState } from "react";

const CountryFlag = ({ country, width = 16, height = 12 }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  if (imageError) return null; // Return null to show nothing when the image is broken

  return (
    <img
      src={`https://flagcdn.com/${width}x${height}/${country}.png`}
      srcSet={`https://flagcdn.com/64x78/${country}.png 2x,
https://flagcdn.com/96x72/${country}.png 3x`}
      width={width}
      height={height}
      alt="flag"
      onError={handleImageError}
    />
  );
};

export default CountryFlag;
