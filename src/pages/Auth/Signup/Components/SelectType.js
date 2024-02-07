import PropTypes from "prop-types";

import PrimaryBtn from "components/buttons/Primary";

const SelectType = ({ setIsEnterprise }) => {
  const choosePath = (value) => setIsEnterprise(value);
  return (
    <div className="sm:flex items-center gap-32 justify-between">
      <div className="sm:w-2/5 w-full">
        <div className="b2 whitespace-nowrap mb-6">I'm a company</div>
        <PrimaryBtn
          id="lookingWorkButton"
          label="Looking to hire"
          onClick={() => choosePath(true)}
          fullWidth
        />
      </div>
      <div className="items-center sm:ml-6 my-6 sm:my-0 flex justify-center">
        <div className="w-0.5	h-44 bg-gray-300 rotate-90 sm:rotate-0 z-[-1] absolute sm:relative" />
        <div className="ml-[-24px] rounded-xs bg-gray-200">
          <div className="b4-bold w-12 flex items-center justify-center h-12">
            OR
          </div>
        </div>
      </div>
      <div className="sm:w-2/5 w-full">
        <div className="b2 whitespace-nowrap mb-6">I'm an engineer</div>
        <PrimaryBtn
          id="searchingWorkButton"
          label="Searching for work"
          fullWidth
          onClick={() => choosePath(false)}
        />
      </div>
    </div>
  );
};

PrimaryBtn.propTypes = {
  setIsEnterprise: PropTypes.func,
};

export default SelectType;
