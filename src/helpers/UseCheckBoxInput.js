// @flow
import { useState } from "react";

/**
 * Hook to provide Control State for checkbox inputs.
 *
 * @param initialValue
 * @returns Control handlers for a form checkbox input
 */
const useCheckBoxInput = (initialValue, setContextFunction) => {
  const [checked, setValue] = useState(initialValue);

  return {
    checked,
    setValue,
    reset: () => setValue(""),
    bind: {
      checked,
      onChange: (event) => {
        const newValue = event.target.checked;
        setValue(newValue);
        if (setContextFunction) setContextFunction(newValue);
      },
    },
  };
};

export default useCheckBoxInput;
