// @flow
import { createContext } from "react";

/**
 * AppContext is created as a context to report the following data to the components:
 * willDisplayRawData : If the user wishes to display raw data for the application
 */
const AppContext: React$Context<{
  willDisplayRawData: boolean,
  setWillDisplayRawData: (...args: Array<any>) => any,
  repositoryOwner: string,
  setRepositoryOwner: (...args: Array<any>) => any,
  repositoryName: string,
  setRepositoryName: (...args: Array<any>) => any,
  dataLoaded: boolean,
  setDataLoaded: (...args: Array<any>) => any,
}> = createContext({
  willDisplayRawData: true,
  setWillDisplayRawData: () => {},
  repositoryOwner: "",
  setRepositoryOwner: () => {},
  repositoryName: "",
  setRepositoryName: () => {},
  dataLoaded: false,
  setDataLoaded: () => {},
});

export default AppContext;
