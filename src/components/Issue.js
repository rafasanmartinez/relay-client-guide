// @flow

import "./Issue.css";
import React, { Suspense, useCallback } from "react";
import type { Node } from "react";
import graphql from "babel-plugin-relay/macro";
import {
  usePreloadedQuery,
  loadQuery,
  usePaginationFragment,
  useMutation,
} from "react-relay";

import RelayEnvironment from "../RelayEnvironment";

import IssueQuery from "./__generated__/IssueQuery.graphql";
import type {
  IssueQueryVariables,
  IssueQueryResponse,
} from "./__generated__/IssueQuery.graphql";

//import CommentsFragment from "./__generated__/IssueComments_issue.graphql";
import type { IssueComments_issue$data } from "./__generated__/IssueComments_issue.graphql";

import AddCommentMutation from "./__generated__/IssueAddCommentMutation.graphql";
import type { IssueAddCommentMutationVariables } from "./__generated__/IssueAddCommentMutation.graphql";

import DisplayRawData from "./DisplayRawData";
import RawData from "./RawData";

import formatDate from "../helpers/FormatDate";
import stringer from "../helpers/Stringer";
import coalesce from "../helpers/Coalesce";
import useInput from "../helpers/UseInput";

/**
 * This is the main query for the component. It queries for both the current issue node and for some field values of the repository
 * As you can see, I am not storing the value returned un a variable by graphql because I can get it from the default export of the relay generated file.
 * I do this for demonstration purposes becaulse I could perfectly store the result of the `grapql` call as I do below with the fragment. The good news about
 * this is that you can use the query anywhere in the application although it was not required this time.
 */
graphql`
  query IssueQuery($owner: String!, $name: String!, $issueId: ID!) {
    repository(owner: $owner, name: $name) {
      nameWithOwner
      createdAt
    }
    issue: node(id: $issueId) {
      ... on Issue {
        title
        number
        id
        createdAt
        ...IssueComments_issue
        body
        bodyHTML
        bodyText
        author {
          login
        }
      }
    }
  }
`;

/**
 * This is a fragment that will unfold the comments in this page
 */
const CommentsFragment = graphql`
  fragment IssueComments_issue on Issue
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 10 }
  )
  @refetchable(queryName: "IssueCommentsPaginationQuery") {
    comments(
      first: $count
      orderBy: { field: UPDATED_AT, direction: ASC }
      after: $cursor
    ) @connection(key: "Comments_comments") {
      __id
      edges {
        cursor
        node {
          author {
            login
          }
          publishedAt
          bodyText
          body
          bodyHTML
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

/**
 * This is the Mutation, which includes @appendEdge, which will have relay to update the store
 * when the mutation occurs
 */
graphql`
  mutation IssueAddCommentMutation(
    $input: AddCommentInput!
    $connections: [ID!]!
  ) {
    addComment(input: $input) {
      clientMutationId
      commentEdge @appendEdge(connections: $connections) {
        cursor
        node {
          author {
            login
          }
          publishedAt
          id
          body
        }
      }
      subject {
        id
      }
    }
  }
`;

/**
 * This function takes care of loading the query from the store or the network. It is exported to be called in the `index.js` file by the router.
 * Since I am using flow, and I am exporing the fuction, and I am using `Flow`, I have to provide a type for the parameters and the result.
 * The function accepts the variables to be sent to the `loadQuery`. This forces me to format the variables object appropriately when the function is called by the router.
 * See that in the `index.js` file.
 */
const getIssueData = (variables: IssueQueryVariables): mixed => {
  const result = loadQuery(RelayEnvironment, IssueQuery, variables);
  return result;
};

/**
 * IssueRoot is the component returned by default by this module. The component takes care of displaying the `Issue`, by wrapping it up into a `Suspense` component.
 */
const IssueRoot = (props: any): Node => (
  <Suspense fallback={<div>'Loading Issue data...'</div>}>
    <Issue {...props} />
  </Suspense>
);

/**
 * Issue is the component that displays an issue in the page. It uses the preloaded query `IssueQuery` imported from generated file, as explained below.
 * `props.data`comes from all the information that comes from the router. Precisely, the data incoming through this argument is the result that the `Route` component provides
 * when it runs the `getissueData` provided above.
 *
 * It is worth to note that this component **obtains all what it needs to display from the `props.data` argument**, and it lets the routing components to take care of deciding
 * what are the values that will be pased to the query that will provide such data. Again, take a look at `index.js` to see how we are dealing with all of that.
 *
 * The component displays the issue title and number and the it displays what repository it belongs to. This last item is the reason for requesting repository data in the query.
 *
 * Then, in order to mimic the `GitHub` site behavior, it displays the description of the issue made by the creator as if it was the first comment to the issue. In order to provide reusability
 * of the presentation, I have created the components  `IssueCommentFromAuthor`, `IssueComment`, `IssueCommentDisplay`.
 *
 * Then, it displays the `CommentsList` which spreads the rest of the comments from the fragment.
 *
 * Finally, it displays the raw data obtained by the call to `usePreloadedQuery` using the `DisplayRawData` component.
 *
 * You will see that this component and others are making use of the functions `stringer` and  `coalesce` that I have put together to alleviate the work
 * of checking for `undefined` data to which you get forced with the use of `Flow`.
 */
const Issue = (props: any): Node => {
  const data: IssueQueryResponse = usePreloadedQuery(IssueQuery, props.data);
  const issueId = data.issue?.id;
  if (!issueId) return null;

  return (
    <div className="Issue-Container">
      <div className="Issue-Body">
        <div className="title">
          <span>{stringer(data.issue?.title) + " "}</span>
          <span className="number">{"#" + stringer(data.issue?.number)}</span>
        </div>
        <div className="secondary">
          {"Issue from " +
            stringer(data.repository?.nameWithOwner) +
            " - created at " +
            formatDate(stringer(data.repository?.createdAt))}
        </div>
        <IssueCommentFromAuthor data={data.issue} />
        <CommentsList parentData={data} issueId={issueId} />
        <DisplayRawData
          data={data}
          contentDescription="raw result of usePreloadedQuery() in Issue"
        />
      </div>
    </div>
  );
};

/**
 * The following three components perform the reutilization of `IssueCommentDisplay` as described above
 */
const IssueCommentFromAuthor = (props: any): Node => {
  return (
    <IssueCommentDisplay
      author={props.data.author?.login}
      date={props.data.createdAt}
      body={props.data.body}
    />
  );
};

const IssueComment = (props: any): Node => {
  return (
    <IssueCommentDisplay
      author={props.data.author?.login}
      date={props.data.publishedAt}
      body={props.data.body}
    />
  );
};

const IssueCommentDisplay = ({ author, date, body }): Node => {
  return (
    <div className="Issue-Comment">
      <div className="author">
        <strong>{stringer(author)}</strong>
        <span>{" commented at " + formatDate(stringer(date))}</span>
      </div>
      <div>{coalesce(body, "No description provided for this issue")}</div>
    </div>
  );
};

/**
 * CommentsList unwraps the `Issuecomments_issue` fragment. As it can be seen, I am checking on the type of the response by using the Relay generated types, and it forces me
 * to check for `undefiled` and null values tough all the component.
 */

type Props = {
  parentData: IssueQueryResponse,
  issueId: string,
};

const CommentsList = (props: Props) => {
  // Control state of new comment input
  const { value: comment, bind: bindComment } = useInput("");

  // Retrieve comments list from the store
  const response = usePaginationFragment(
    CommentsFragment,
    props.parentData.issue
  );
  const { data: fragmentData, hasNext, isLoadingNext, loadNext } = response;

  // Prepare mutation to be commited
  const [commit, isInFlight] = useMutation(AddCommentMutation);

  const loadMore = useCallback(() => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(10);
  }, [isLoadingNext, loadNext]);

  // Define function to commit the addition of the comment. The variables requires the recently obtained
  // connection id
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Obtain connection id for appending it to the store upon addition of the new comment (by using @appendEdge)
    const connectionId = fragmentData?.comments?.__id;
    if (!connectionId) return null;

    // Populate variables to be sent to the mutation
    const variables: IssueAddCommentMutationVariables = {
      input: {
        body: comment,
        subjectId: props.issueId,
      },
      connections: [connectionId],
    };
    commit({
      variables: variables,
      onCompleted: (response) => console.log(response)
      
    });

  };

  if (!fragmentData) return null;
  const data: IssueComments_issue$data = fragmentData;
  const edges = data.comments.edges;

  if (!edges) return <div>{"No comments were retrieved"}</div>;

  return (
    <>
      <div className="Issues-Comment-Header">
        <button
          name="load more issues"
          type="button"
          className="comments-load-more"
          disabled={!hasNext ? "disabled" : ""}
          onClick={loadMore}
        >
          {!isLoadingNext ? "Load More" : "Loading next 10..."}
        </button>
        <div className="filler" />
      </div>
      {edges.map((data) => {
        if (!data) return <div>{"Comment is invalid"}</div>;
        return (
          <div key={data.cursor}>
            <IssueComment data={data.node} />
            <RawData>
              <div>Cursor : {stringer(JSON.stringify(data.node))}</div>
            </RawData>
          </div>
        );
      })}
      <div className="Comment-Form-Container">
        <form onSubmit={handleSubmit} className="Comment-Form">
          <div className="form-line">
            <div>Leave a Comment</div>
          </div>
          <div className="form-line">
            <textarea {...bindComment} />
          </div>
          <div className="form-line">
            <input
              type="submit"
              value={isInFlight ? "Updating..." : "Submit"}
            />
          </div>
        </form>
      </div>
      <DisplayRawData
        data={response}
        contentDescription="raw result of useFragment() in Issue"
      />
    </>
  );
};

/**
 * I export the `IssueRoot` wrapper, but I use in the `Router` with the name `Issue`. (See that in `index.js`)
 */
export default IssueRoot;

/**
 * Finally, I export `IssueQuery` and `getIssueData` so it can be used by the router
 */
export { IssueQuery, getIssueData };
