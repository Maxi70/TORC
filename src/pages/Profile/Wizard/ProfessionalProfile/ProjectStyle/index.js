import classNames from "classnames";
import { useEffect, useState } from "react";

import ImageWithCheck from "../../shared/ImageWithCheck";
import { PROJECT_STYLES } from "../utils";

const ProjectStyle = ({
  jobRef,
  user,
  setDisabled,
  save,
  isCurrent,
  className,
}) => {
  const [selectedStyles, setSelectedStyles] = useState(
    user.projectStyles || []
  );

  const isSelected = (styleId) => selectedStyles.find((s) => s.id === styleId);

  const handleClick = (style) => {
    let newValue = [...selectedStyles];
    if (isSelected(style.id))
      newValue = newValue.filter((s) => s.id !== style.id);
    else newValue.push({ id: style.id, title: style.title });

    setSelectedStyles(newValue);
    save({ projectStyles: newValue }, true);
  };

  useEffect(() => {
    if (!isCurrent) return;
    setDisabled(selectedStyles.length === 0);
  }, [selectedStyles, setDisabled, isCurrent]);

  return (
    <div className={classNames(className)} ref={jobRef}>
      <div className="b1 mb-8">Which types of projects interest you?</div>
      <div className="b2 flex justify-center gap-7">
        {PROJECT_STYLES.map((style) => (
          <ImageWithCheck
            key={style.id}
            logo={style.logo}
            text={style.title}
            selected={isSelected(style.id)}
            handleClick={() => handleClick(style)}
            className="w-48"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectStyle;
