// your-app-name/src/App.js
import React, { Suspense } from 'react';
import './App.css';
//import fetchGraphQL from './fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  useQueryLoader,
  usePreloadedQuery,
  useFragment
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
 * 
 * Important: In order to display a fragment further down in a component, the query includes the name of the fragment with the spread `...`operator like:
 * 
 * ```
 * ...AppRepositoryHeader_repository
 * ````
 * 
 * Relay knows how to deal with this fragment as they are used in the components of the app
 * @returns Content of the application
 */
function App() {

  // Define a query
  const RepositoryNameQuery = graphql`
query AppRepositoryNameQuery {
  repository(owner: "facebook", name: "relay") {
    ...AppRepositoryHeader_repository
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
const DataDisplay = ({ query, queryReference }) => {

  const data = usePreloadedQuery(query, queryReference);
  return (
    <div className="App-Body">
      <RepositoryHeader data={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )

}

/**
 * This component displays general information about a Github Repository given the result of a loaded query, that contains 
 * information about how to spread the fragment that contains the data pertained to it.
 * 
 * The component calls fo useFragment with the graphql compiled literal that describes the fragment, and the piece of the data into the query that contains the 
 * information described in the upper paragraph, used by Relay can do it´s magic and and spread the details of the fragment into the constant `fragmentData`
 *  
 * @param data The information with the result of the loaded query, to be used by the component to spread the fragment 
 * @returns A React component that displays general information (owner, name, etc.) about a Github Repository
 */
const RepositoryHeader = ({ data }) => {

  const fragmentData = useFragment(
    graphql`
      fragment AppRepositoryHeader_repository on Repository {
        owner {
          login
          }
        name
        nameWithOwner
        createdAt
      }
    `,
    data.repository
  );

  console.log(fragmentData); 
  
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <div>Owner: <span>{fragmentData.owner.login}</span> </div>
      <div>Repository: <span>{fragmentData.name}</span></div>
      <div>Name with Owner: <span>{fragmentData.nameWithOwner}</span></div>
      <div>Created at: <span>{fragmentData.createdAt}</span></div>
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