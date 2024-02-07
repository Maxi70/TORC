import { forwardRef, useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import Input from "./Input";

const clamp = (x, min, max) => Math.min(max, Math.max(min, x));

const RangeSlider = forwardRef(
  (
    {
      name,
      control,
      min,
      max,
      numTicks,
      labelPrefix = ``,
      labelSuffix = ``,
      isReadOnly,
    },
    ref
  ) => {
    const {
      field: { onChange, value },
    } = useController({ name, control });
    const innerRef = useRef(null);
    const [range, setRange] = useState([value?.[0] || min, value?.[1] || max]);
    const [isMovingMin, setIsMovingMin] = useState(false);
    const [isMovingMax, setIsMovingMax] = useState(false);

    const prevXPos = useRef(null);

    useEffect(() => {
      const onPointerMove = (evt) => {
        if (!innerRef.current) return;
        if (evt.buttons !== 1) return;
        if (isMovingMin || isMovingMax) evt.preventDefault();

        const mouseMovement = prevXPos.current
          ? evt.clientX - prevXPos.current
          : 0;
        const divWidth = innerRef.current.getBoundingClientRect().width;
        setRange((range) => {
          if (isMovingMin) {
            const newRange = [
              clamp(
                range[0] + (mouseMovement / divWidth) * (max - min),
                min,
                max
              ),
              range[1],
            ];
            onChange(
              [...newRange]
                .map((value) => Math.round(value))
                .sort((a, b) => a - b)
            );

            return newRange;
          } else if (isMovingMax) {
            const newRange = [
              range[0],
              clamp(
                range[1] + (mouseMovement / divWidth) * (max - min),
                min,
                max
              ),
            ];
            onChange(
              [...newRange]
                .map((value) => Math.round(value))
                .sort((a, b) => a - b)
            );

            return newRange;
          }
          return range;
        });

        prevXPos.current = evt.clientX;
      };

      if (!isReadOnly) {
        window.addEventListener(`pointermove`, onPointerMove);
        return () =>
          void window.removeEventListener(`pointermove`, onPointerMove);
      }
    }, [min, max, onChange, isMovingMin, isMovingMax, isReadOnly]);

    useEffect(() => {
      const onPointerUp = (evt) => {
        evt.preventDefault();
        setIsMovingMin(false);
        setIsMovingMax(false);
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

    const minPercent = ((Math.round(range[0]) - min) / (max - min)) * 100;
    const maxPercent = ((Math.round(range[1]) - min) / (max - min)) * 100;

    function displayRange() {
      const [min, max] = range;
      const displayMin = Math.round(min);
      const displayMax = Math.round(max);

      if (displayMin === displayMax) {
        return `${labelPrefix}${Math.round(Math.min(...range))}`;
      }

      return `${labelPrefix}${Math.round(
        Math.min(...range)
      )} ${labelSuffix} - ${labelPrefix}${Math.round(Math.max(...range))}`;
    }

    function getRoundedRange() {
      const [min, max] = range;

      return { min: Math.round(min), max: Math.round(max) };
    }

    function handleInputChange({ target: { value } }, direction) {
      const isValueValid = !isNaN(+value) && value >= min && value <= max;

      if (isValueValid) {
        setRange((range) => {
          let newRange = [...range];

          switch (direction) {
            case "min": {
              newRange = [value, newRange[1]];

              break;
            }

            default: {
              newRange = [newRange[0], value];

              break;
            }
          }

          onChange(
            [...newRange]
              .map((value) => Math.round(value))
              .sort((a, b) => a - b)
          );

          return newRange;
        });
      }
    }

    return (
      <div>
        <div className="flex items-end justify-between">
          <Input
            className="mr-5 w-20"
            value={getRoundedRange().min}
            placeholder="Min value"
            onChange={(e) => handleInputChange(e, "min")}
          />

          <div className="w-full">
            <div
              ref={ref}
              className="w-full h-4 relative rounded p-0.5"
              style={{
                background: `linear-gradient(to right, #83D9BB, #F4D675)`,
              }}
            >
              <div ref={innerRef} className="w-full h-full rounded bg-white">
                <div
                  className="w-full h-full rounded"
                  style={{
                    background: `linear-gradient(to right, #83D9BB, #F4D675)`,
                    clipPath: `polygon(${minPercent}% 0%, ${maxPercent}% 0%, ${maxPercent}% 100%, ${minPercent}% 100%)`,
                  }}
                />
                <div
                  className="absolute border border-black p-0.5 rounded"
                  style={{
                    top: `50%`,
                    left: minPercent + `%`,
                    transform: `translate(-50%, -50%)`,
                    touchAction: `none`,
                    cursor: isMovingMin || isMovingMax ? `grabbing` : `grab`,
                  }}
                  onPointerDown={(evt) => {
                    evt.preventDefault();
                    setIsMovingMin(true);
                  }}
                >
                  <div className="w-6 h-6 rounded bg-black" />
                </div>
                <div
                  className="absolute border border-black p-0.5 rounded"
                  style={{
                    top: `50%`,
                    left: maxPercent + `%`,
                    transform: `translate(-50%, -50%)`,
                    touchAction: `none`,
                    cursor: isMovingMin || isMovingMax ? `grabbing` : `grab`,
                  }}
                  onPointerDown={(evt) => {
                    evt.preventDefault();
                    setIsMovingMax(true);
                  }}
                >
                  <div className="w-6 h-6 rounded bg-black" />
                </div>
              </div>
            </div>

            <div className="w-full relative mt-2 top-4">
              {Array(numTicks)
                .fill(undefined)
                .map((_, i) => (
                  <span
                    key={i + "11233we"}
                    className="absolute w-max"
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

          <Input
            className="ml-5 w-20"
            value={getRoundedRange().max}
            placeholder="Max value"
            onChange={(e) => handleInputChange(e, "max")}
          />
        </div>

        <span className="inline-block mt-12">{displayRange()}</span>
      </div>
    );
  }
);

export default RangeSlider;
