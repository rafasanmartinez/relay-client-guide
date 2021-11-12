// @ flow

import React, { useContext } from "react";
import type { Node } from "react";
import AppContext from "../AppContext";

type Props = {
  children: Node,
};

/**
* This wrapper component will display it´s childrens if the context of the application´s `willDisplayRawData` argument is true
* and will return null if is false
 */
const RawData = ({ children }: Props): Node => {
  const { willDisplayRawData } = useContext(AppContext);
  if (!willDisplayRawData) return null;
  else return <div>{children}</div>;
};

export default RawData;
