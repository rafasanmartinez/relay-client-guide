import { useState } from "react";

/**
 * Hook to provide Control State for checkbox inputs.
 *
 * @param initialValue
 * @returns Control handlers for a form checkbox input
 */
const useCheckBoxInput = (initialValue) => {
  const [checked, setValue] = useState(initialValue);

  return {
    checked,
    setValue,
    reset: () => setValue(""),
    bind: {
      checked,
      onChange: (event) => {
        setValue(event.target.checked);
      },
    },
  };
};

export default useCheckBoxInput;
