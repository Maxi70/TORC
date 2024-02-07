import classNames from "classnames";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import "./index.css";

export default function CustomInput({
  isTextarea,
  onChange,
  social,
  socialBypass,
  isWizard,
  autoResize,
  bigTextArea,
  notWizard,
  capped,
  className = "",
  readyOnly = false,
  type,
  ...props
}) {
  const handleChange = (event) => {
    if (readyOnly) return;

    const updatedText = event.target.value;
    if (capped && updatedText.length > capped) return;
    if (notWizard) {
      onChange(updatedText);
    } else {
      onChange(props.attribute, updatedText);
    }
    if (autoResize) {
      const scrollHeight = event.target.scrollHeight;
      if (event.target.offsetHeight < scrollHeight) {
        event.target.style.height = `${event.target.scrollHeight}px`;
      }
    }
  };

  const handlePhoneChange = (value) => {
    if (readyOnly || (capped && value.length > capped)) return;

    if (notWizard) {
      onChange(value);
    } else {
      onChange(props.attribute, value);
    }
  };

  const wizardInput = {
    border: "solid 2px transparent",
    padding: "1rem 2rem",
    marginTop: "0.75rem",
    marginBottom: "0.75rem",
    borderRadius: isTextarea ? "1rem" : "80px",
    backgroundOrigin: "border-box",
    backgroundClip: "padding-box, border-box",
    boxsizing: "border-box",
    height: isTextarea ? (bigTextArea ? "200px" : "100px") : "auto",
  };

  const updateTextAreaOnLoad = () => {
    if (!autoResize) return;
    const ele = document.querySelector(".autoResize");
    const height = ele?.getBoundingClientRect()?.height ?? 0;
    const scrollHeight = ele?.scrollHeight ?? 0;
    if (height < scrollHeight) {
      ele.style.height = `${scrollHeight}px`;
    }
  };

  if (isTextarea) {
    return (
      <textarea
        className={classNames(
          "w-full block h-24 border-2 border-black p-2 rounded-xs",
          autoResize && "overflow-hidden autoResize",
          className
        )}
        {...props}
        onChange={(() => {
          updateTextAreaOnLoad();
          return handleChange;
        })()}
        value={props.value ? props.value : ""}
      />
    );
  }

  if (type === "tel") {
    return (
      <PhoneInput
        value={props.value || ""}
        onChange={handlePhoneChange}
        buttonClass="phoneButton"
        inputStyle={
          isWizard && {
            ...wizardInput,
            paddingLeft: "calc(3rem + 40px)",
          }
        }
        containerStyle={{
          marginTop: wizardInput.marginTop,
          marginBottom: wizardInput.marginBottom,
        }}
        country="us"
        countryCodeEditable={false}
      />
    );
  }

  return (
    <input
      type={type || "text"}
      className={classNames(
        "textinput w-full block pl-12",
        social && "social",
        autoResize && "overflow-hidden",
        className
      )}
      {...props}
      onChange={socialBypass ? onChange : handleChange}
      value={props.value ? props.value : ""}
      style={isWizard && wizardInput}
    />
  );
}
