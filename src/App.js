// @flow

import "./App.css";
import React, { Suspense, useContext, useState, useEffect } from "react";
import type { Node } from "react";
import graphql from "babel-plugin-relay/macro";
import { useQueryLoader, usePreloadedQuery } from "react-relay/hooks";
import useInput from "./helpers/UseInput";
import useCheckBoxInput from "./helpers/UseCheckBoxInput";
import RepositoryHeader, {
  RepositoryHeaderGlimmer,
} from "./components/RepositoryHeader";
import IssuesList from "./components/IssuesList";
import DisplayRawdata from "./components/DisplayRawData";
import RawData from "./components/RawData";
import AppContext from "./AppContext";

/**
 * The application:
 *   - Displays a form to get the parameters from the user
 *   - Initiates a query object
 *   - Obtains a handle to load the Query with useQueryLoader
 *   - The query reference is an instance of the loaded query results after if it has been started to be loaded
 *   - When the user submits the data in the form, the application loads the query and display the data fetched.
 *   - The list displayed uses pagination, in the sense that initially, it loads the first 10 issues of the repository. WHen the user clicks on the button `Load More`, the application adds to the list 10 more issues, and so on.
 *
 * Important: In order to display a fragment further down in a component, the query includes the name of the fragments with the spread `...`operator like:
 *
 *
 * @returns Content of the application
 */
type Props = any;

function App(props: Props): Node {
  const {
    willDisplayRawData: ctxWillDisplayRawData,
    setWillDisplayRawData: ctxSetWillDisplayRawData,
    repositoryOwner: ctxRepositoryOwner,
    setRepositoryOwner: ctxSetRepositoryOwner,
    repositoryName: ctxRepositoryName,
    setRepositoryName: ctxSetRepositoryName,
    dataLoaded: ctxDataLoaded,
    setDataLoaded: ctxSetDataloaded,
  } = useContext(AppContext);

  const [dataLoaded, setDataLoaded] = useState(ctxDataLoaded);

  const { value: owner, bind: bindOwner } = useInput(
    ctxRepositoryOwner,
    ctxSetRepositoryOwner
  );
  const { value: name, bind: bindName } = useInput(
    ctxRepositoryName,
    ctxSetRepositoryName
  );
  const { checked: willDisplayRawData, bind: bindWillDisplayRawData } =
    useCheckBoxInput(ctxWillDisplayRawData, ctxSetWillDisplayRawData);

  props.match.location.state = {
    willDisplayRawData: willDisplayRawData,
    owner: owner,
  };

  // Define the query
  const RepositoryNameQuery = graphql`
    query AppRepositoryNameQuery($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        ...RepositoryHeader_repository
        ...IssuesList_repository
      }
    }
  `;

  // Obtain a Query Loader
  const [queryReference, loadQuery, disposeQuery] =
    useQueryLoader(RepositoryNameQuery);

  // Prepare variables for the query
  const variables = {
    owner: owner,
    name: name,
  };

  // Handler function that triggers when the form gets submitted
  const handleSubmit = (evt) => {
    evt.preventDefault();
    loadQuery(variables);
    setDataLoaded(true);
    ctxSetDataloaded(true);
  };

  useEffect(() => {
    if (dataLoaded && !queryReference) {
      loadQuery(variables);
    }
  });

  return (
    <div className="App-Container">
      <div className="App-Body">
        <form onSubmit={handleSubmit} className="App-Form">
          <div className="Form-Line">
            <div className="Form-Line-Section">
              <label>
                Repository Owner:
                <input type="text" {...bindOwner} />
              </label>
              <label>
                Repository Name:
                <input type="text" {...bindName} />
              </label>
              <input type="submit" value="Submit" />
            </div>
            <div className="Form-Line-Section">
              <div className="filler" />
              <label>
                Display Raw Data:
                <input type="checkbox" {...bindWillDisplayRawData} />
              </label>
            </div>
          </div>
        </form>

        {queryReference != null && (
          <>
            <RawData>
              <div>
                <button onClick={disposeQuery}>
                  Click to hide the data and dispose the query.
                </button>
              </div>
            </RawData>
            <Suspense fallback={<div>'Loading repository data...'</div>}>
              <DataDisplay
                query={RepositoryNameQuery}
                queryReference={queryReference}
              />
            </Suspense>
          </>
        )}
      </div>
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

const DataDisplay = ({ query, queryReference }) => {
  // Get the data from the prelosded query
  const data = usePreloadedQuery(query, queryReference);

  if (data.repository == null) {
    return (
      <div>
        There is not data for the repository with the parameters that you
        entered
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<RepositoryHeaderGlimmer />}>
        <RepositoryHeader data={data} />
      </Suspense>
      <IssuesList parentData={data} />
      <DisplayRawdata
        data={data}
        contentDescription="raw result of usePreloadedQuery() in the App Component"
      />
    </>
  );
};

export default App;
