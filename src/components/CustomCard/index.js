import { ReactComponent as BlueArrow } from "images/blue_arrow.svg";

const CustomCard = ({ label, title, body, onClick, action, icon }) => {
  return (
    <div className={`relative max-w-[822px] h-[270px]`}>
      <label className="absolute b2 !font-rubik-medium  top-[-18px] bg-white pb-3 pr-2">
        {label}
      </label>
      <div className="absolute left-[-62px] bg-white top-8 pb-4 sm:block hidden">
        {icon}
      </div>
      <div className="border-2 border-solid border-black rounded-[10px] sm:pt-12 sm:pl-[94.7px] sm:pr-[79px] sm:pb-[26px] p-4">
        <div className="b1 mb-4">{title}</div>
        <div className="b2 mb-6">{body}</div>
        <button
          className="b3 text-brandSecondary flex items-center gap-2"
          onClick={onClick}
        >
          <BlueArrow />
          {action}
        </button>
      </div>
    </div>
  );
};

export default CustomCard;
