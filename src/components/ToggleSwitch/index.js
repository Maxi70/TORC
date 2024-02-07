import React from "react";
import classNames from "classnames";
import styles from "./ToggleSwitch.module.css";

/**
 * A simple toggle switch.
 * Inspiration from https://www.sitepoint.com/react-toggle-switch-reusable-component/
 *
 * @param {() => void} onChange
 * @returns {JSX.Element}
 */
const ToggleSwitch = ({ onChange, name = "toggle" }) => {
  const [on, setOn] = React.useState(false);
  return (
    <div
      className={classNames(
        styles.toggleSwitchContainer,
        "flex items-center justify-center select-none"
      )}
    >
      <input
        className="hidden"
        type="checkbox"
        checked={on}
        onChange={() => {
          onChange();
          setOn(!on);
        }}
        name={name}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
