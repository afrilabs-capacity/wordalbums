import { useEffect } from "react";
export default function TextArea({
  placeholder,
  handleChange,
  classes,
  disabled,
  value,
}) {
  if (value) {
    return (
      <textarea
        rows="4"
        class={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes} `}
        onChange={(e) => handleChange && handleChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
      ></textarea>
    );
  } else {
    return (
      <textarea
        rows="4"
        class={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes} `}
        onChange={(e) => handleChange && handleChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      ></textarea>
    );
  }
}
