// @flow
import './DisplayRawData.css';
import React, { useState } from "react";
import type { Node } from "react";
import RawData from "./RawData";

/**
 * This React component displays the content of a Javascript object when the user clicks on a button
 * The component is displayed only when the context allow to do so depending on the context, represented by the
 * component `RawData`
 *
 * @param data {mixed} The data to display as a JavaScript object
 * @param contentDescription {string} Description of the data that will be displayed in the switch button
 * @returns The component´s output
 */

type Props = {|
  data: mixed,
  contentDescription: string,
|};

const DisplayRawdata = ({ data, contentDescription }: Props): Node => {
  const [state, setState] = useState(false);
  const buttonText = state
    ? `Hide ${contentDescription}`
    : `See ${contentDescription}`;

  return (
    <RawData>
      <div className="DisplayRawdata-Button-Wrapper">
        <button onClick={() => setState(!state)}>{buttonText}</button>
      </div>
      {state ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : null}
    </RawData>
  );
};

export default DisplayRawdata;
