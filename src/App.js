// your-app-name/src/App.js
import React, { Suspense } from "react";
import "./App.css";
import graphql from "babel-plugin-relay/macro";
import {
  RelayEnvironmentProvider,
  useQueryLoader,
  usePreloadedQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import ErrorBoundary from "./ErrorBoundary";
import useInput from "./helpers/UseInput";

import RepositoryHeader, {RepositoryHeaderGlimmer} from "./components/RepositoryHeader";
import IssuesList from "./components/IssuesList";
import DisplayRawdata from "./components/DisplayRawData";

/**
 * The application:
 *   - Displays a form to get the parameters from the user
 *   - Initiates a query object
 *   - Obtains a handle to load the Query with useQueryLoader
 *   - The query reference is an instance of the loaded query results after if it has been started to be loaded
 *   - When the user submits the data in the form, the application loads the query and display the data fetched.
 *   - If the query has been loaded already (queryReference==null), it displays:
 *      - A button for the user to dispose the query and start over again.
 *
 * Important: In order to display a fragment further down in a component, the query includes the name of the fragments with the spread `...`operator like:
 *
 * ```
 * ...RepositoryHeader_repository,
 * ...IssuesList_repository @arguments(issuesNumber: $issuesFirst)
 * ````
 * In this example, the `IssuesList_repository` fragment includes an argument `isuesNumber` that gets populated with the input
 * entered through the variable `$issuesFirst`
 * 
 * Additionally, the appplication includes the reference to the argument  the value of the parameter `issuesFirst` through the components hierarchy (see Relay last paragraph of the chapter).
 * The same job could be eventually done implementing a React Context.
 *
 * @returns Content of the application
 */
function App() {
  // State controllers for form inputs
  const { value: owner, bind: bindOwner } = useInput("facebook");
  const { value: name, bind: bindName } = useInput("relay");
  const { value: issuesFirst, bind: bindIssuesFirst } = useInput("10");

  // Define the query
  const RepositoryNameQuery = graphql`
    query AppRepositoryNameQuery(
      $owner: String!
      $name: String!
    ) {
      repository(owner: $owner, name: $name) {
        ...RepositoryHeader_repository
        ...IssuesList_repository
      }
    }
  `;
  // Obtain a Query Loader
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader(RepositoryNameQuery);

  // Handler function for the form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    loadQuery({ owner: owner, name: name});
  };

  return (
    <div className="App-Body">
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "5px" }}>
          <label style={{ marginRight: "10px" }}>
            Repository Owner:
            <input type="text" style={{ marginLeft: "5px" }} {...bindOwner} />
          </label>
          <label style={{ marginRight: "10px" }}>
            Repository Name:
            <input type="text" style={{ marginLeft: "5px" }} {...bindName} />
          </label>
          <label style={{ marginRight: "10px" }}>
            Issues to Display:
            <input
              type="text"
              style={{ marginLeft: "5px" }}
              {...bindIssuesFirst}
            />
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>

      {queryReference != null && (
        <>
          <button onClick={disposeQuery}>
            Click to hide the data and dispose the query.
          </button>
          <Suspense fallback={<div>'Loading repository data...'</div>}>
            <DataDisplay
              query={RepositoryNameQuery}
              queryReference={queryReference}
              issuesToDisplay={issuesFirst}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}

/**
 * This component accepts a query object and a query reference object described in the component App, and
 * call usePreloadedQuery to obtain the result of the data extracted when the outer component starts loading
 *
 * The result of loading the query contains both data and information that informs to Relay of how to deal with the
 * fragments included into the query. We have called to the constan that carries this information `data`, but as I said, it not
 * only carries pure data, but information that Relay will use to spread the fragments declared further in another component.
 *
 * In this case, we have added the component `RepositoryHeader` to display some general data from the GitHub repository.
 * Hence, we pass to the next component the `data` constant, which contains all the information that the component will
 * retuire to "spread" or "unfold" the fragment
 *
 * @param query Query object that describes the data that will be displayed
 * @param queryReference Reference to the loaded data by the outer component
 * @returns A component that displays the data extracted with the query
 */
const DataDisplay = ({ query, queryReference, issuesToDisplay }) => {
  const data = usePreloadedQuery(query, queryReference);
  return (
    <>
      <Suspense fallback={<RepositoryHeaderGlimmer/>}>
        <RepositoryHeader data={data} />
      </Suspense>
      <IssuesList parentData={data} issuesToDisplay={issuesToDisplay} />
      <DisplayRawdata
        data={data}
        contentDescription="raw result of usePreloadedQuery() in the App Component"
      />
    </>
  );
};

/**
 * Applies Relay Environment and Error Boundary
 * @returns Root element of the application
 */
function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
