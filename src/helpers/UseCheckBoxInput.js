// @flow
import { useState } from "react";

/**
 * Hook to provide Control State for checkbox inputs.
 *
 * @param initialValue
 * @param setContextFunction A callback function that the user can provide to maintain the status of a context in the application
 * @returns Control handlers for a form checkbox input
 */

type BindOutput = {|
  checked: string | boolean,
  onChange: (...args: Array<any>) => any,
|};

type Output = {|
  checked: string | boolean,
  setValue: (...args: Array<any>) => any,
  reset: (...args: Array<any>) => any,
  bind: BindOutput,
|};

const useCheckBoxInput = (
  initialValue: boolean,
  setContextFunction: (...args: Array<any>) => any
): Output => {
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
