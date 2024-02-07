import React from "react";

import { CheckBox } from "pages/Profile/Wizard/shared/CheckBox";

const Filters = ({ filters, onChange, setFirstPage }) => {
  const handleFilterChange = (filtersKey, filterKey, value) => {
    const output = {
      ...filters,
      [filtersKey]: {
        ...filters[filtersKey],
        [filterKey]: { ...filters[filtersKey][filterKey], value },
      },
    };

    onChange(output);
    setFirstPage();
  };

  return (
    <div className="flex flex-col">
      {Object.keys(filters).map((filtersKey) => {
        const filtersByKey = filters[filtersKey];

        return (
          <div key={filtersKey} className="flex">
            {Object.keys(filtersByKey).map((filterKey) => {
              const filterByKey = filtersByKey[filterKey];

              return (
                <div key={filterKey} className="flex">
                  <CheckBox
                    label={filterByKey.label}
                    checked={filterByKey.value}
                    className="mr-10"
                    onChange={(_, value) =>
                      handleFilterChange(filtersKey, filterKey, value)
                    }
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

Filters.propTypes = {};

Filters.defaultProps = {};

export default Filters;
