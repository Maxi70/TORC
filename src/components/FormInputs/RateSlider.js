import Slider from "components/FormComponentsNew/Slider";
import { useEffect, useState } from "react";

const RateSlider = ({ defaultValue, control, save }) => {
  const [range, setRange] = useState(defaultValue || 0);

  useEffect(() => {
    if (defaultValue === range) return;
    save(
      {
        ratePerHour: {
          value: range,
          currency: "USD",
        },
      },
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, defaultValue]);

  return (
    <div className="mt-16">
      <Slider
        name="range"
        control={control}
        min={0}
        max={200}
        numTicks={5}
        labelPrefix="$"
        initialRate={defaultValue}
        updateValue={(value) => setRange(value)}
      />
    </div>
  );
};

export default RateSlider;
