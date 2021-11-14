// @flow
import React from "react";
import './AppHeader.css';

const AppHeader = (props) => {
  return (
    <div className="App-Body">
      <div className="App-Header">
        <h1>Github Issues Manager</h1>
      </div>
      {props.children}
    </div>
  );
};

export default AppHeader;
