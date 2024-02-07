import React, { useState } from "react";

const TextContainer = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const displayText = showFullText
    ? text
    : text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;

  return (
    <div>
      <p>{displayText}</p>
      {text.length > maxLength && (
        <div
          onClick={toggleText}
          className="cursor-pointer text-blue-600 underline"
        >
          {showFullText ? "Less" : "More"}
        </div>
      )}
    </div>
  );
};

export default TextContainer;
