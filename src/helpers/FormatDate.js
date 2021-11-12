// @flow

const formatDate = (isoDate : string) : string => {
    const dateObj = new Date(Date.parse(isoDate));
    console.log(dateObj.toLocaleString());
    return dateObj.toLocaleString();
}

export default formatDate;