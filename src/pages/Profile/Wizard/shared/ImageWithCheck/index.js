import classNames from "classnames";
import { ReactComponent as Checkmark } from "images/new/Checkmark.svg";

const ImageWithCheck = ({
  logo,
  selected = false,
  handleClick,
  text,
  className,
}) => {
  return (
    <div
      className={classNames(
        `group flex flex-col gap-[2vh] cursor-pointer opacity-60 hover:opacity-100 hover:text-brandSecondary-1000 font-rubik-regular text-black leading-7 tracking-[-0.69px] text-[22px]`,
        {
          "!opacity-100 text-brandSecondary-1000 font-semibold": selected,
        },
        className
      )}
      onClick={handleClick}
    >
      <div className="relative w-[18vh] h-[18vh] max-w-[144.2px] max-h-[130px]">
        {logo}
        <Checkmark
          className={classNames(
            "absolute group-hover:visible group-hover:opacity-60 invisible right-[-16px] top-0",
            {
              "!visible !opacity-100": selected,
            }
          )}
        />
      </div>
      <div>{text}</div>
    </div>
  );
};

export default ImageWithCheck;
