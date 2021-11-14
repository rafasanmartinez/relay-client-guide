// @flow

const formatDate = (isoDate : string) : string => {
    const dateObj = new Date(Date.parse(isoDate));
    return dateObj.toLocaleString();
}

export default formatDate;