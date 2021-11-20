// @flow

/**
 * Format date takes an ISO formatted data, as they are returned by the GitHub server, and transforms it to
 * display it in the locale format with hout,nminutes and seconds. Just the mimimum enough for the purposes
 * of this learning application.
 */
const formatDate = (isoDate: string): string => {
  const dateObj = new Date(Date.parse(isoDate));
  return dateObj.toLocaleString();
};

export default formatDate;
