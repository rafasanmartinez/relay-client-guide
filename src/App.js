// your-app-name/src/App.js
import React, {Suspense} from 'react';
import './App.css';
//import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  useQueryLoader,
  usePreloadedQuery
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import ErrorBoundary from './ErrorBoundary';

/**
 * The application:
 *   - Initiates a query object
 *   - Obtains a handle to load the Query with useQueryLoader
 *   - The query reference is an instance of the loade query results after if it has been started to be loaded
 *   - If the query has not been loaded yet (queryReference==null), it displays a button for the user to load the query
 *   - Af the query has been loaded already (queryReference==null), it displays:
 *      - A button for the user to dispose the query and start over again, and
 *      - A DataDisplay component that will display the result of the query by providing to it the query object itself ples the instance of the loaded query results
 * @returns Content of the application
 */
function App() {

  // Define a query
  const RepositoryNameQuery = graphql`
query AppRepositoryNameQuery {
  repository(owner: "facebook", name: "relay") {
    name
    nameWithOwner
    createdAt
    issues(orderBy:{field:CREATED_AT,direction:DESC},states:CLOSED,first:10){
      edges
      {
        cursor
        node {
          id
          title
          createdAt
        }
      }
      nodes {
        id
        title
        createdAt
      }
      pageInfo{
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
}
`;

  const [
    queryReference,
    loadQuery,
    disposeQuery,
  ] = useQueryLoader(
    RepositoryNameQuery
  );

  if (queryReference == null) {
    return (
      <button onClick={() => loadQuery({})}>Click to reveal the data </button>
    );
  }
  else {
    return (
      <>
        <button onClick={disposeQuery}>
          Click to hide the name and dispose the query.
        </button>
        <Suspense fallback={'Loading...'}>
          <DataDisplay query={RepositoryNameQuery} queryReference={queryReference} />
        </Suspense>
      </>
    );
  }
}


/**
 * This component accepts a query object and a query reference object described in the component App, and 
 * call usePreloadedQuery to obtain the result of the data extracted when the outer component starts loading
 * @param query Query object that describes the data that will be displayed
 * @param queryReference Reference to the loaded data by the outer component
 * @returns A component that dieplays the data extracted with the query
 */
const DataDisplay = ({ query, queryReference }) => {

  const data = usePreloadedQuery(query, queryReference);
  return (
    <div className="App-Body">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )

}

/**
 * Applies Relay Envisonment and Error Boundary
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