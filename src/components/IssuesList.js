import { useFragment, usePaginationFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DisplayRawdata from "./DisplayRawData";
import RawData from "./RawData";
import { useCallback } from "react";
import "./IssuesList.css";
import { Link } from "found";
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
  const {
    data,
    hasNext,
    hasPrevious,
    isLoadingNext,
    isLoadingPrevious,
    loadNext,
    loadPrevious,
    refetch,
  } = response;

  /*
  console.log("Reponse from pagination:")
  console.log(response);
  console.log("Issues List Fragment Data:");
  console.log(data);
  */

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          marginTop: "10px",
        }}
      >
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
              onClick={loadMore}
            >
              Load More
            </button>
          </div>
        </div>
        {data.issues.edges.map((data) => {
          /*
          console.log("Issue data in map");
          console.log(data);
          */
          return (
            <div
              key={data.cursor}
              style={{
                border: "1px solid black",
                marginTop: "5px",
                padding: "5px",
              }}
            >
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
 * information described in the upper paragraph, used by Relay can do it´s magic and and spread the details of the fragment into the constant `fragmentData`
 *
 * @param data The information with the result of the loaded query, to be used by the component to spread the fragment
 * @returns The resulted React component content
 */
const IssueRow = ({ parentData }) => {
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
  /*
  console.log("Parent Data:");
  console.log(parentData);
  console.log("Issue Row data");
  console.log(fragmentData);
  */
  return (
    <div className="Issue-Cell">
      <div className="title">
        <Link to={"/" + fragmentData.number}>{fragmentData.title}</Link>
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
