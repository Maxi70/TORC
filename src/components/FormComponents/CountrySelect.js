import { useMemo } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelect = ({ name, control, isReadOnly }) => {
  const options = useMemo(() => countryList().getData(), []);

  const getOptionForValue = (value) => {
    return options.find((o) => o.value === value);
  };

  return (
    <div
      className="-m-0.5 p-0.5 rounded flex"
      style={{
        background: `linear-gradient(to right, #83D9BB, #F4D675)`,
      }}
    >
      <div className="bg-white rounded w-full relative">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, ref, value } }) => (
            <Select
              components={{
                DropdownIndicator: () => (
                  <svg
                    viewBox="0 0 0.5 1"
                    height="1rem"
                    style={{ transform: `translateY(-50%) rotate(90deg)` }}
                    className="absolute top-1/2 right-4"
                  >
                    <polyline
                      points="0.04,0.15 0.4,0.5 0.04,0.85"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="20%"
                      strokeLinejoin="miter"
                    />
                  </svg>
                ),
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }),
                indicatorSeparator: () => {},
                option: (base) => ({
                  ...base,
                  paddingLeft: "1rem",
                }),
                valueContainer: (base) => ({
                  ...base,
                  paddingLeft: "1rem",
                }),
              }}
              placeholder="Select your country"
              onChange={(option) => onChange(option.value)}
              onBlur={onBlur}
              value={getOptionForValue(value)}
              options={options}
            />
          )}
        />
      </div>
    </div>
  );
};

export default CountrySelect;
