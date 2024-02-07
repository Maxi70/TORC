import Select from "components/FormComponents/Select";
import { forwardRef } from "react";
import { useFieldArray } from "react-hook-form";
import XIcon from "components/XIcon";

const RegionSearch = forwardRef(
  ({ name, control, register, isReadOnly }, ref) => {
    const {
      fields: selectedRegions,
      append,
      remove,
    } = useFieldArray({ name, control, keyName: `key` });

    const regionsSelected = selectedRegions ?? [];
    return (
      <div>
        <Select
          onChange={(evt) =>
            void (
              evt.target.value !== `unselected` &&
              append({ name: evt.target.value })
            )
          }
          value="unselected"
          isReadOnly={isReadOnly}
        >
          <option value="unselected">Select developer location</option>
          {regions
            .filter(
              (region) =>
                !regionsSelected?.map(({ name }) => name)?.includes(region)
            )
            ?.map((region) => (
              <option key={region}>{region}</option>
            ))}
        </Select>
        {regionsSelected?.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {regionsSelected?.map((field, index) => (
              <span
                key={field.name}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded font-bold flex gap-2 items-center"
              >
                {field.name}
                <button
                  type="button"
                  className="increase-touch-target"
                  onClick={() => !isReadOnly && void remove(index)}
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default RegionSearch;

const regions = [
  "Africa",
  "Asia",
  "Australia",
  "Eastern Europe",
  "North America",
  "South America",
  "Western Europe",
];
