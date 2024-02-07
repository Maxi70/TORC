import { forwardRef, useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";

import { ReactComponent as RadioOn } from "images/new/1-form-radio-on.svg";
import Input from "components/FormComponentsNew/Input";

const clamp = (x, min, max) => Math.min(max, Math.max(min, x));

const Slider = forwardRef(
  (
    {
      name,
      control,
      min,
      max,
      numTicks,
      labelPrefix = ``,
      labelSuffix = ``,
      valueSuffix = ``,
      isReadOnly,
      hidePrefix,
      hideNumbers,
      step,
      updateValue,
      updateOnValChange,
      initialRate,
    },
    ref
  ) => {
    const {
      field: { onChange, value },
    } = useController({ name, control });

    const innerRef = useRef(null);
    const [sliderValue, setSliderValue] = useState(value || initialRate);

    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
      if (updateOnValChange) {
        setSliderValue(value);
      }
    }, [value, updateOnValChange]);

    const prevXPos = useRef(null);

    useEffect(() => {
      const onPointerMove = (evt) => {
        if (!innerRef.current) return;
        if (evt.buttons !== 1) return;
        if (isMoving) evt.preventDefault();

        const mouseMovement = prevXPos.current
          ? evt.clientX - prevXPos.current
          : 0;

        const divWidth = innerRef.current.getBoundingClientRect().width;
        setSliderValue((sliderValue) => {
          if (isMoving) {
            const newValue = clamp(
              sliderValue + (mouseMovement / divWidth) * (max - min),
              min,
              max
            );

            if (step) {
              const roundedStep = Math.round(newValue / step) * step;
              onChange(roundedStep);
              // if (updateValue) {
              //   updateValue(roundedStep);
              // }
              return newValue;
            }
            // if (updateValue) {
            //   updateValue(Math.round(newValue));
            // }
            onChange(Math.round(newValue));
            return newValue;
          }
          return sliderValue;
        });
        prevXPos.current = evt.clientX;
      };

      if (!isReadOnly) {
        window.addEventListener(`pointermove`, onPointerMove);
        return () =>
          void window.removeEventListener(`pointermove`, onPointerMove);
      }
    }, [min, max, onChange, isMoving, isReadOnly, step]);

    useEffect(() => {
      const onPointerUp = (evt) => {
        evt.preventDefault();
        setIsMoving(false);
        if (step) {
          const roundedStep = Math.round(sliderValue / step) * step;
          onChange(roundedStep);
          updateValue(roundedStep);
          setSliderValue(roundedStep);
        } else updateValue(Math.round(sliderValue));
        prevXPos.current = null;
      };

      if (!isReadOnly) {
        window.addEventListener(`pointerup`, onPointerUp);
        window.addEventListener(`pointercancel`, onPointerUp);
        return () => {
          window.removeEventListener(`pointerup`, onPointerUp);
          window.removeEventListener(`pointercancel`, onPointerUp);
        };
      }
    });

    const sliderPercent = ((Math.round(sliderValue) - min) / (max - min)) * 100;

    function handleInputChange({ target: { value } }) {
      const isValueValid = !isNaN(+value);
      const isGreaterThanMax = isValueValid && value > max;

      let finalValue = value;

      switch (true) {
        case !isValueValid:
          finalValue = sliderValue;
          break;

        case isGreaterThanMax:
          finalValue = max;
          break;

        default:
          break;
      }

      setSliderValue(finalValue);
      onChange(Math.round(finalValue));
      updateValue(finalValue);
    }

    const getSliderValue = () => {
      return `${labelPrefix}${Math.round(sliderValue)}${
        labelSuffix || valueSuffix
      }`;
    };

    return (
      <div>
        <div className="flex items-start justify-between">
          <div className="w-full">
            <div
              ref={ref}
              className="w-full relative
                mt-2"
            >
              <div ref={innerRef} className="w-full h-full rounded bg-white">
                <input
                  type="range"
                  value={sliderPercent}
                  disabled={true}
                  className="w-full"
                />
                <div
                  className="absolute p-0.5 rounded"
                  style={{
                    top: `50%`,
                    left: `${sliderPercent >= 0 ? sliderPercent : 0}%`,
                    transform: `translate(-50%, -50%)`,
                    touchAction: `none`,
                    cursor: isMoving ? `grabbing` : `grab`,
                  }}
                  onPointerDown={(evt) => {
                    evt.preventDefault();
                    setIsMoving(true);
                  }}
                >
                  {!hidePrefix && (
                    <div className="b2 text-center text-slider absolute top-[-40px] left-1">
                      {getSliderValue()}
                    </div>
                  )}
                  <RadioOn />
                </div>
              </div>
            </div>

            <div className="b4 w-full text-slider flex justify-between relative mt-4 top-4">
              {!hideNumbers &&
                Array(numTicks)
                  .fill(undefined)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="absolute flex-1"
                      style={{
                        transform: `translateX(-50%)`,
                        left: (i / (numTicks - 1)) * 100 + `%`,
                      }}
                    >
                      {labelPrefix}
                      {i * ((max - min) / (numTicks - 1)) + min}
                      {labelSuffix}
                    </span>
                  ))}
            </div>
          </div>
          <div className="ml-8 w-40">
            <Input
              id="range"
              label={name}
              value={Math.round(sliderValue)}
              placeholder="Min value"
              isReadOnly={isReadOnly}
              onChange={(e) => handleInputChange(e, "min")}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Slider;
