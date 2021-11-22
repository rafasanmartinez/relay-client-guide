// @flow
import { useState } from "react";

/**
 * Hook to provide Control State for Forms inputs.
 * Credits for Evan Schultz in his [blog entry](https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/)
 *
 * @param initialValue Initial Value to store
 * @param setContextFunction A callback function that the user can provide to maintain the status of a context in the application
 * @returns Control handlers for a form input
 */

type BindOutput = {|
  value: string,
  onChange: (...args: Array<any>) => any,
|};

type Output = {|
  value: string,
  setValue: (...args: Array<any>) => any,
  reset: (...args: Array<any>) => any,
  bind: BindOutput,
|};

const useInput = (initialValue :string, setContextFunction?: (...args: Array<any>) => any) : Output=> {
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
