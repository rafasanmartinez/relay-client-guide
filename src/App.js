// your-app-name/src/App.js
import React from 'react';
import './App.css';
//import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import ErrorBoundary from './ErrorBoundary';

const { Suspense } = React;

// Define a query
const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery {
    repository(owner: "rafasanmartinez", name: "csif-personal-server") {
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


// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
});
console.log(preloadedQuery);

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function App(props) {
  const data = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery);
  console.log(data);
  return (
    <div className="App-Body">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props) {
  return (

    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <ErrorBoundary>
          <App preloadedQuery={preloadedQuery} />
        </ErrorBoundary>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;