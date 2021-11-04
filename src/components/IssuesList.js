import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import DisplayRawdata from "./DisplayRawData";

/**
 * This component displays a list of the issues in the  Repository given the result of a loaded query, that contains
 * information about how to spread the fragment that contains the data pertained to it.
 *
 * The component calls fo useFragment with the graphql compiled literal that describes the fragment, and the piece of the data into the query that contains the
 * information described in the upper paragraph, used by Relay can do it´s magic and and spread the details of the fragment into the constant `fragmentData`
 *
 * The fragment gets a defined parameter `issuesNumber`that will be populated in the query. This argument describes how many issues will be displayed
 *
 * Additionally, the fragment contains a child fragment, `IssuesList_issue`. Calling `useFragment` for this fragment also prepares it to be spreaded in the child component `IssueRow`. Not only that,
 * but each element of a list gets transformed using `map` to be displayed, and therefore each member of the list will be spreaded within it´s own instance of `IssueRow`.
 *
 * Also note that the `IssueRow` component is enclosed into a `div` that contains the attibute `key` to follow React´s best practices.
 *
 * @param data The information with the result of the loaded query, to be used by the component to spread the fragment
 * @returns The resulted React component content
 */
const IssuesList = ({ data, issuesToDisplay }) => {
  const fragmentData = useFragment(
    graphql`
      fragment IssuesList_repository on Repository
      @argumentDefinitions(issuesNumber: { type: Int, defaultValue: 10 }) {
        issues(
          orderBy: { field: CREATED_AT, direction: ASC }
          states: CLOSED
          first: $issuesNumber
        ) {
          edges {
            cursor
            ...IssuesList_issue
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
    data.repository
  );

  if (fragmentData.issues == null) {
    return <div>There is not data for the issues of this repository</div>;
  }

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        <div>
          <strong>
            Total Closed Issues (showing first {issuesToDisplay}):{" "}
            {fragmentData.issues.totalCount}
          </strong>
        </div>
        {fragmentData.issues.edges.map((data) => (
          <div
            key={data.cursor}
            style={{
              border: "1px solid black",
              marginTop: "5px",
              padding: "5px",
            }}
          >
            <IssueRow data={data} />
          </div>
        ))}
      </div>
      <DisplayRawdata
        data={fragmentData}
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
const IssueRow = ({ data }) => {
  const fragmentData = useFragment(
    graphql`
      fragment IssuesList_issue on IssueEdge {
        node {
          id
          title
          createdAt
        }
      }
    `,
    data
  );

  return (
    <>
      <div>Issue title: {fragmentData.node.title}</div>
      <div>Created at: {fragmentData.node.createdAt}</div>
      <DisplayRawdata
        data={fragmentData}
        contentDescription="raw result of useFragment() in IssueRow"
      />
    </>
  );
};

export default IssuesList;
