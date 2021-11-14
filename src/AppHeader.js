// @flow

import React from 'react';
import type { Node } from "react";
import "./AppHeader.css";

type Props  = {
    children? : Node
};

const AppHeader = (props: Props): Node => {
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
