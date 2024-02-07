import React from "react";
import classNames from "classnames";

function FormFieldInput(props) {
  return (
    <div className="rounded w-9/12">
      <div
        className={classNames("ui", "input", {
          left: props.icon,
          icon: props.icon,
        })}
      >
        {props.icon ? <i className={classNames("icon", props.icon)}></i> : null}
        {props.children}
      </div>
    </div>
  );
}

export default FormFieldInput;
