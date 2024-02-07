import React, { useEffect } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";

/**
 * Hook that alerts clicks outside of the passed ref
 * stolen from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
function useOutsideClick(buttonRef, tooltipRef, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        // alert("You clicked outside of me!");
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, tooltipRef, callback]);
}

export default function Tooltip({ children, className = "" }) {
  const [open, setOpen] = React.useState(false);
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);

  const buttonRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  useOutsideClick(buttonRef, tooltipRef, () => open && setOpen(false));

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    // TODO: offset a bit to the right
  });

  return (
    <>
      <div ref={buttonRef} className={classNames("flex", className)}>
        <button
          type="button"
          className={classNames(styles.tooltipBtn)}
          ref={setReferenceElement}
          // Without the window.scrollBy, the tooltip seems to be positioned
          // wrongly in the edit profile page. Hence scrolling by the least amount possible
          // to correctly position the tooltip
          onClick={() => {
            setOpen((prev) => !prev);
            window.scrollBy(0, 1);
          }}
          onKeyDown={(e) => e.key === "Enter" && setOpen((prev) => !prev)}
        />
      </div>
      <div
        ref={tooltipRef}
        className={classNames(!open ? "hidden" : "visible")}
      >
        <div
          ref={setPopperElement}
          style={styles.popper}
          className={classNames(
            styles.tooltipContainer,
            `bg-white shadow border-gray-400 border-2 py-3 px-5`
          )}
          {...attributes.popper}
        >
          {children}
        </div>
      </div>
    </>
  );
}
