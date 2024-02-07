import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import "./index.css";

export default function PhoneField({ value, placeholder, label }) {
  const inputStyle = {
    border: "solid 2px black",
    padding: "1rem 2rem 1rem 6rem",
    marginTop: "0.75rem",
    marginBottom: "0.75rem",
    borderRadius: "0.25rem",
    background: "white",
    height: "3.5rem",
    width: "100%",
    fontFamily: "Rubik",
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "-0.5px",
  };
  return (
    <div className="relative w-full">
      <label
        className={`b4-bold z-[2] block text-black pb-1 pr-2 absolute top-[-10px] bg-white`}
      >
        {label}
      </label>
      <PhoneInput
        value={value}
        buttonClass="phoneBtn"
        inputStyle={inputStyle}
        country="us"
        inputProps={{
          id: "phone",
        }}
        countryCodeEditable={false}
        placeholder={placeholder}
      />
    </div>
  );
}
