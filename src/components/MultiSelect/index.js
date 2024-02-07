import { useEffect, useRef } from "react";
import classNames from "classnames";
import { useState } from "react";
import Chip from "components/Chip";
import SvgIcon from "components/SvgIcon";

const MultiSelect = ({
  options = [],
  onOptionChange,
  onSelectAll,
  onClearAll,
  onResetToDefault,
  filterActiveOptions,
  initialDefaultValues,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const MultiSelectRef = useRef(null);

  const activeOptions = options.filter((option) => option.isActive);

  const filteredOptions = filterActiveOptions
    ? options.filter((option) => !option.isActive)
    : options;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        MultiSelectRef.current &&
        !MultiSelectRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={MultiSelectRef}
      className="-m-0.5 p-0.5 rounded flex bg-gradient-to-r from-[#83D9BB] to-[#F4D675]"
    >
      <div
        className="relative bg-white w-full rounded"
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <div className="flex flex-wrap gap-x-[2.5px] gap-y-1 rounded max-w-[90%] px-3 py-2">
          {!!activeOptions.length ? (
            activeOptions.map((activeOption) => {
              const formattedActiveOption = {
                ...activeOption,
                value: activeOption.label,
              };
              return (
                <div key={activeOption.label}>
                  <Chip
                    {...formattedActiveOption}
                    onClose={(e) => {
                      e.stopPropagation();
                      onOptionChange(activeOption.label);
                    }}
                    className="px-1.5 !text-black"
                  />
                </div>
              );
            })
          ) : (
            <>{"All (Select an Option)"}</>
          )}
        </div>
        {showOptions && (
          <div
            className={classNames(
              "absolute z-50 bg-white w-full rounded-sm border-2 p-3 mt-1"
            )}
          >
            <div className="flex items-center text-sm whitespace-nowrap text-blue-300 font-semibold gap-2 pl-2">
              {!!initialDefaultValues.length &&
                (initialDefaultValues.length !== activeOptions.length ||
                  !initialDefaultValues.every((initialDefaultValue) => {
                    const ele = activeOptions.find(
                      ({ label }) => label === initialDefaultValue.label
                    );
                    return ele?.isActive === initialDefaultValue.isActive;
                  })) && (
                  <p
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResetToDefault(e);
                    }}
                    title={initialDefaultValues.map((e) => e.label).join(", ")}
                  >
                    {"Reset (Default)"}
                  </p>
                )}
              {onSelectAll && (
                <p
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectAll(e);
                  }}
                >
                  Select All
                </p>
              )}
            </div>
            <ul>
              {filteredOptions.map((option) => (
                <li
                  key={option.label}
                  className={classNames(
                    "flex items-center justify-between text-sm whitespace-nowrap hover:!bg-gray-200 cursor-pointer p-2 mt-1.5",
                    { "border-l-2 border-blue-300": option.isActive }
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOptionChange(option.label);
                  }}
                >
                  <span
                    className={classNames("overflow-hidden text-ellipsis", {
                      "font-bold": option.isActive,
                    })}
                  >
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="absolute flex items-center h-full gap-x-[2px] top-1/2 right-4"
          style={{
            transform: "translateY(-50%)",
          }}
        >
          {onClearAll && !!activeOptions.length && (
            <>
              <button
                className="w-4"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearAll(e);
                }}
              >
                <SvgIcon type="cross" />
              </button>
              <div className="bg-[#dadada] h-3/4 w-[1.5px] mr-[4px]"></div>
            </>
          )}

          <svg
            viewBox="0 0 0.5 1"
            height="1rem"
            style={{
              transform: `${!showOptions ? "rotate(90deg)" : "rotate(-90deg)"}`,
              pointerEvents: `none`,
            }}
          >
            <polyline
              points="0.04,0.15 0.4,0.5 0.04,0.85"
              fill="none"
              stroke="currentColor"
              strokeWidth="20%"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
