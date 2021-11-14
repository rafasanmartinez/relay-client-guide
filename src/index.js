// @flow

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppHeader from "./AppHeader";
import reportWebVitals from "./reportWebVitals";
import {
  RelayEnvironmentProvider,
  useQueryLoader,
  usePreloadedQuery,
} from "react-relay/hooks";
import { makeRouteConfig, Route, createBrowserRouter } from "found";
import RelayEnvironment from "./RelayEnvironment";
import ErrorBoundary from "./ErrorBoundary";

const routeConfig = makeRouteConfig(
  <Route path="/" Component={AppHeader}>
    <Route Component={App} />
  </Route>
);

const BrowserRouter = createBrowserRouter({
  routeConfig,
  renderError: ({ error }) => {
    return <div>{error.status === 404 ? "Not found" : "Error"}</div>;
  },
});

/*
/**
 * Applies Relay Environment and Error Boundary
 * @returns Root element of the application
function AppRoot(): Node {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ErrorBoundary>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ErrorBoundary>
    </RelayEnvironmentProvider>
  );
}
*/
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
