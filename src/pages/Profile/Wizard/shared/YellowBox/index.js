import classNames from "classnames";
import InfoPopover from "components/FormComponentsNew/InfoPopover";

const YellowBox = ({ handleClick, children, popover, selected }) => {
  return (
    <div className="flex items-center self-center">
      <div
        onClick={handleClick}
        className={classNames(
          "b4-bold !text-xs border rounded-sm border-brandPrimary hover:bg-brandPrimary w-[132px] h-[42px] flex items-center justify-center cursor-pointer",
          {
            "bg-brandPrimary-1000": selected,
          }
        )}
      >
        {children}
      </div>
      {popover && <InfoPopover>{popover}</InfoPopover>}
    </div>
  );
};

export default YellowBox;
