import "./IssuesList.css";
import React, { useContext, useCallback } from "react";
import { useFragment, usePaginationFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DisplayRawdata from "./DisplayRawData";
import RawData from "./RawData";
import { Link } from "found";
import AppContext from "../AppContext";
//import { usePaginationFragment } from "react-relay/hooks";

/**
 * This component displays a list of the issues in the  Repository given the result of a loaded query, that contains
 * information about how to spread the fragment that contains the data pertained to it.
 *
 * The component calls to useFragment with the graphql compiled literal that describes the fragment, and the piece of the data into the query that contains the
 * information described in the upper paragraph, used by Relay can do it´s magic and and spread the details of the fragment into the constant `fragmentData`
 *
 * Additionally, the fragment contains a child fragment, `IssuesList_issue`. Calling `useFragment` for this fragment also prepares it to be spreaded in the child component `IssueRow`. Not only that,
 * but each element of a list gets transformed using `map` to be displayed, and therefore each member of the list will be spreaded within it´s own instance of `IssueRow`.
 *
 * Also note that the `IssueRow` component is enclosed into a `div` that contains the attibute `key` to follow React´s best practices.
 *
 * @param data The information with the result of the loaded query, to be used by the component to spread the fragment
 * @returns The resulted React component content
 */
const IssuesList = ({ parentData, issuesToDisplay }) => {
  const response = usePaginationFragment(
    graphql`
      fragment IssuesList_repository on Repository
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "IssuesPaginationQuery") {
        issues(
          orderBy: { field: CREATED_AT, direction: ASC }
          states: CLOSED
          after: $cursor
          first: $count
        ) @connection(key: "Issues_issues") {
          edges {
            __id
            node {
              ...IssuesListItem_issue
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    `,
    parentData.repository
  );
  const { data, hasNext, isLoadingNext, loadNext } = response;

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <>
      <div>
        <div className="Issues-List-Header">
          <div className="fragment">
            <span className="title">
              Total Closed Issues: {data.issues.totalCount}
            </span>
          </div>
          <div className="filler" />
          <div className="fragment">
            <button
              name="load more issues"
              type="button"
              className="issues-load-more"
              disabled={!hasNext ? "disabled" : ""}
              onClick={loadMore}
            >
              {!isLoadingNext ? "Load More" : "Loading next 10..."}
            </button>
          </div>
        </div>
        {data.issues.edges.map((data) => {
          return (
            <div key={data.cursor} className="Issue-Cell-Container">
              <RawData>
                <div>Issue ID : {data.__id}</div>
                <div>Cursor : {data.cursor}</div>
              </RawData>
              <IssueRow parentData={data.node} />
            </div>
          );
        })}
      </div>
      <DisplayRawdata
        data={data}
        contentDescription="raw result of useFragment() in issueslist"
      />
    </>
  );
};

/**
 * This component displays a row that contains data about a Github Repository Issue. The node structure that gets spreaded belongs to, or composes an instance
 * of the type [IssueEdge](https://docs.github.com/en/graphql/reference/objects#issueedge).
 *
 * The component calls fo useFragment with the graphql compiled literal that describes the fragment, and the piece of the data into the query that contains the
 * information described in the upper paragraph, used by Relay can do it´s magic and and spread the details of the fragment into the constant `fragmentData`.
 *
 * Additionally, the user can click on the name of an issue, and it will take him/her to the Issue page. You do that usinf the `Link` component. This component redurects the application
 * to the path `pathname: "/" + fragmentData.id` where `fragmentData.id` turns to get populated with the Issue id. It also establishes the state of the path `Location` with the values of the
 * name and owner of the repository, that are obtained from the application context. You have to do this when you have to query for data whose parameters you do not want to pass through the path
 *
 * @param data The information with the result of the loaded query, to be used by the component to spread the fragment
 * @returns The resulted React component content
 */
const IssueRow = ({ parentData }) => {
  const { repositoryOwner, repositoryName } = useContext(AppContext);
  const fragmentData = useFragment(
    graphql`
      fragment IssuesListItem_issue on Issue {
        id
        title
        createdAt
        number
      }
    `,
    parentData
  );
  return (
    <div className="Issue-Cell">
      <div className="title">
        <Link
          to={{
            pathname: "/" + fragmentData.id,
            state: {
              repositoryOwner: repositoryOwner,
              repositoryName: repositoryName,
            },
          }}
        >
          {fragmentData.title}
        </Link>
        <span className="number"></span>
      </div>
      <div className="secondary">
        {"#" + fragmentData.number + " "}created at: {fragmentData.createdAt}
      </div>
      <DisplayRawdata
        data={fragmentData}
        contentDescription="raw result of useFragment() in IssueRow"
      />
    </div>
  );
};

export default IssuesList;
