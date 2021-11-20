// @flow

import type { Argument } from "./HelperTypes";

/**
 * the `stringer` function just takes care of converting every string, number or boolean who has a value into a string,
 * and if the value is undefined, or null, it just return an empty string. I had to put this together to provide some
 * check control for undefineds when using `Flow` to check the types of the values returned by the calls to the Relay library.
 */
const stringer = (a: Argument): string => {
  if (typeof a === "string") return a;
  else if (typeof a === "number" || typeof a === "boolean") return a.toString();
  else if (typeof a === "undefined") return "";
  else return "";
};

export default stringer;
