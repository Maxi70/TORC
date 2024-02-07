import PropTypes from "prop-types";

import PrimaryBtn from "components/buttons/Primary";

const Banner = ({ buttonId, label, text, handleClick }) => {
  return (
    <div className="bg-gray-200 w-full h-48 flex justify-center items-center px-10">
      <div className="w-[353px]">
        <div className="b2 mb-6">{text}</div>
        <PrimaryBtn
          id={buttonId}
          label={label}
          onClick={handleClick}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

Banner.propTypes = {
  buttonId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Banner;
