import { useState } from "react";

/**
 * This React component displays the content of a Javascript object when the user clicks on a button
 *
 * @param data The data to display as a JavaScript object
 * @param contentDescription Description of the data that will be displayed in the switch button
 * @returns The component´s output
 */
const DisplayRawdata = ({ data, contentDescription }) => {
  const [state, setState] = useState(false);
  const buttonText = state
    ? `Hide ${contentDescription}`
    : `See ${contentDescription}`;

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setState(!state)}>{buttonText}</button>
      </div>
      {state ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : null}
    </>
  );
};

export default DisplayRawdata;
