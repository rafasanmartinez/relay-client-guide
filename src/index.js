// @flow

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppHeader from "./AppHeader";
import Issue, { getIssueData } from "./components/Issue";
import reportWebVitals from "./reportWebVitals";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { makeRouteConfig, Route, createBrowserRouter } from "found";
import RelayEnvironment from "./RelayEnvironment";
import ErrorBoundary from "./ErrorBoundary";

/**
 * This module contains the configuration of the application routing. I use `Found` as the routing software. (See README.md to find where this library is)
 */

/**
 * In this call to `makeRouteConfig` where I prepare the routes. There are two routes:
 *
 *  Route "/" This is the main page, and it will display the header and the issuse list.
 *  Route "/:id" This is the issue page, whiere tie issue will be displayed.
 *
 *  Particulary, the second route uses the argument getData, and calls to the imported `getIssueData` from the module `Issue` to request the data from the GitHub server.
 *  Since this relays on the location state, if this URL is entered from out of the application, it will drop erroe becasue not location stat has been established by the
 *  `Link` component (see `IssueList.js`). This is well known, and I am aware that I do not need so much ado to get the repository data, because it exists as a descendant of
 *  Issue. Ths use of the location state, the react context and the query in `Issue.js` that request data from the issue and the repository are made just for demonstration purposes.
 */
const routeConfig = makeRouteConfig(
  <Route path="/" Component={AppHeader}>
    <Route Component={App} />
    <Route
      path="/:id"
      Component={Issue}
      getData={({ params, location }) => {
        const result = getIssueData({
          owner: location.state.repositoryOwner,
          name: location.state.repositoryName,
          issueId: params.id,
        });
        return result;
      }}
    />
  </Route>
);

const BrowserRouter = createBrowserRouter({
  routeConfig,
  renderError: ({ error }) => {
    return <div>{error.status === 404 ? "Not found" : "Error"}</div>;
  },
});

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ErrorBoundary>
        <BrowserRouter />
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
