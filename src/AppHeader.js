// @flow

import React, { useState } from "react";
import type { Node } from "react";
import "./AppHeader.css";
import AppContext from "./AppContext";

type Props = {
  children?: Node,
};

const AppHeader = (props: Props): Node => {
  const [willDisplayRawData, setWillDisplayRawData] = useState(false);
  const [repositoryOwner, setRepositoryOwner] = useState("rafasanmartinez");
  const [repositoryName, setRepositoryName] = useState("csif-personal-server");
  const [dataLoaded, setDataLoaded] = useState(false);
  return (
    <div className="App-Header-Body">
      <div className="App-Header-Container">
        <h1>Github Issues Manager</h1>
      </div>
      <AppContext.Provider
        value={{
          willDisplayRawData: willDisplayRawData,
          setWillDisplayRawData: setWillDisplayRawData,
          repositoryOwner: repositoryOwner,
          setRepositoryOwner: setRepositoryOwner,
          repositoryName: repositoryName,
          setRepositoryName: setRepositoryName,
          dataLoaded: dataLoaded,
          setDataLoaded: setDataLoaded
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
};

export default AppHeader;
