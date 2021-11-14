import { useState } from "react";

/**
 * Hook to provide Control State for Forms inputs.
 * Credits for Evan Schultz in his [blog entry](https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/)
 *
 * @param initialValue
 * @returns Control handlers for a form input
 */
const useInput = (initialValue, setContextFunction) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (setContextFunction) setContextFunction(newValue);
      },
    },
  };
};

export default useInput;
