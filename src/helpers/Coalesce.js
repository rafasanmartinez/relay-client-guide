// @flow
import type { Arguments } from "./HelperTypes";
import stringer from "./Stringer";

/**
 * Coalesce takes an undetermined number of arguments, and returns the first one for which the result of calling `stringer` is not an empty string.
 * The name 'coalesce' is inspired on the name of the MS T-SQL function of the same name.
 */
const coalesce = (...a: Arguments): string => {
  for (let index = 0; index < a.length; index++) {
    const element = stringer(a[index]);
    if (element !== "") return element;
  }
  return "";
};

export default coalesce;
