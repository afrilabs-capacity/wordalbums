import { useEffect } from "react";
export default function TextNumberField({
  placeholder,
  handleChange,
  classes,
  value,
  key,
}) {
  return (
    <input
      type="text"
      maxLength={9}
      pattern="[+-]?\d+(?:[.,]\d+)?"
      readonly
      className={` form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${classes}`}
      id="exampleFormControlInput1"
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChange && handleChange(e.target.value)}
    />
  );
}
