// @flow

import React from "react";
import type { Node } from "react";

type Props = any;

const Issue = (props: Props): Node => {
  console.log("Entering in Issue. Props:")
  console.log(props);
  return <div>Here an issue</div>;
};

export default Issue;
