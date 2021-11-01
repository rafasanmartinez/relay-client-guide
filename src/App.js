// your-app-name/src/App.js
import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import graphql from "babel-plugin-relay/macro";
import {
  RelayEnvironmentProvider,
  useQueryLoader,
  usePreloadedQuery
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import ErrorBoundary from "./ErrorBoundary";
import useInput from "./helpers/UseInput";

import RepositoryHeader, { RepositoryHeaderGlimmer } from "./components/RepositoryHeader";
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
  const { value: fetchPolicy, bind: bindFetchPolicy } = useInput("store-or-network");

  // Stores the number of issues requested
  const [issuesRequested, setIssuesRequested] = useState(null);

  // Stores if query needs to be refreshed from the network after error
  // (I am not using it now in favor of user selection for ilustration of this sample purposes. You will see the warning in the browser console.)
  const [needsRefresh, setNeedsRefresh] = useState(false);


  // Define the query
  const RepositoryNameQuery = graphql`
    query AppRepositoryNameQuery(
      $owner: String!
      $name: String!
      $issuesFirst: Int
    ) {
      repository(owner: $owner, name: $name) {
        ...RepositoryHeader_repository
        ...IssuesList_repository @arguments(issuesNumber: $issuesFirst)
      }
    }
  `;

  // Obtain a Query Loader
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader(RepositoryNameQuery);

  // Handler function that triggers when the form gets submitted
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(fetchPolicy);

    // The fetch policy to use is the one selected by the user
    const fetchPolicyForQuery = fetchPolicy;

    // Set the fetch policy to discard the data in the store and get it again from the network if there was
    // a previous error fetching the data
    // Not i use for this sample in favor of user´s selection of policy
    //const fetchPolicy = needsRefresh ? 'network-only' : 'store-or-network';

    loadQuery({ owner: owner, name: name, issuesFirst: parseInt(issuesFirst) }, { fetchPolicy: fetchPolicyForQuery });

    // Set the number of issues requested to be displayed in the page
    setIssuesRequested(issuesFirst);
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
          <label style={{ marginRight: "10px" }}>Fetch Policy:</label>
          <select id="fetchPolicy" name="fetchPolicy" style={{ marginRight: "5px" }} {...bindFetchPolicy}>
            <option value="store-or-network">store-or-network</option>
            <option value="store-and-network">store-and-network</option>
            <option value="network-only">network-only</option>
            <option value="store-only">store-only</option>
          </select>
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
              issuesToDisplay={issuesRequested}
              setNeedsRefresh={setNeedsRefresh}
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
const DataDisplay = ({ query, queryReference, issuesToDisplay, setNeedsRefresh }) => {

  // Get the data from the prelosded query
  const data = usePreloadedQuery(query, queryReference);

  // The need to refresh from the netwotk gets passed to the parent component afer rendering
  // You can give a try to comment this function and will find out that no more data gets
  // displayed after an error occurs
  useEffect(() => {
    setNeedsRefresh(data.repository == null);
  }, [data.repository, setNeedsRefresh]);

  // 
  if (data.repository == null) {
    return (
      <div>There is not data for the repository with the parameters that you entered</div>
    )
  }

  return (
    <>
      <Suspense fallback={<RepositoryHeaderGlimmer />}>
        <RepositoryHeader data={data} />
      </Suspense>
      <IssuesList data={data} issuesToDisplay={issuesToDisplay} />
      <DisplayRawdata
        data={data}
        contentDescription="raw result of usePreloadedQuery() in the App Component"
      />
    </>
  )
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
