import React, { useMemo } from "react";

import checkedIcon from "images/checkbox-checked.png";

import styles from "./index.module.css";

export const CheckBox = ({
  label,
  checked,
  attribute,
  onChange,
  disabled,
  className = "",
}) => {
  const id = useMemo(() => Math.random() / Math.random(), []);

  const handleChange = () => {
    onChange(attribute, !checked);
  };

  return (
    <div
      className={`flex items-center ${styles.checkboxContainer} ${className}`}
    >
      {checked && (
        <img
          className={styles.checkmarkIcon}
          alt="checked"
          src={checkedIcon}
          onClick={handleChange}
        />
      )}

      {!checked && (
        <div
          className={`${styles.checkmarkContainer} mr-4`}
          onClick={handleChange}
        />
      )}

      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>

      <input
        type="checkbox"
        id={id}
        onChange={handleChange}
        checked={checked}
        hidden
      />

      {disabled && <div className={styles.disabled} />}
    </div>
  );
};
