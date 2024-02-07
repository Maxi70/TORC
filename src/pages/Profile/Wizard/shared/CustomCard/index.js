import classNames from "classnames";
import { ReactComponent as BlueArrow } from "images/blue_arrow.svg";

const CustomCard = ({ label, title, items, selected }) => {
  return (
    <div
      className={classNames("relative max-w-[822px] h-[270px] cursor-pointer", {
        "text-brandSecondary": selected,
      })}
    >
      <label className="absolute b2 !font-rubik-medium  top-[-18px] bg-white pb-3 pr-2">
        {label}
      </label>
      <div
        className={classNames(
          "b2 h-full border-2 border-solid border-gray-300 rounded-[10px] sm:pt-12 sm:pl-[94.7px] sm:pr-[79px] sm:pb-[26px] p-4",
          {
            "border-brandSecondary": selected,
          }
        )}
      >
        <div>{title}</div>
        {items?.map((i) => (
          <div className="flex items-center gap-2">
            <BlueArrow />
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCard;
