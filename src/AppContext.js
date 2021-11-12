// @flow
import { createContext } from "react";

/**
 * AppContext is created as a context to report the following data to the components:
 * willDisplayRawData : If the user wishes to displa y raw data for the application
 */
const AppContext: React$Context<{ willDisplayRawData: boolean }> =
  createContext({ willDisplayRawData: true });
export default AppContext;
