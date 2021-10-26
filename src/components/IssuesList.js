import { useFragment } from "react-relay";
import graphql from 'babel-plugin-relay/macro';
import { useState } from "react";

const IssuesList = ({ data }) => {

    const [state, setState] = useState(false);
    const buttonText = state ? 'Hide raw result of useFragment() in issueslist' : 'See raw result of useFragment() in issueslist';

    const fragmentData = useFragment(
        graphql`
        fragment IssuesList_repository on Repository {
            issues(orderBy:{field:CREATED_AT,direction:ASC},states:CLOSED,first:10)
            {
                edges
                {
                    cursor
                    node {
                    id
                    title
                    createdAt
                    }
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
      `,
        data.repository
    );

    return (
        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
            <div><strong>Total Closed Issues (showing first 10): {fragmentData.issues.totalCount}</strong></div>
            <div><button onClick={() => setState(!state)}>{buttonText}</button></div>
            {state ?
                (<div><pre>{JSON.stringify(fragmentData, null, 2)}</pre></div>) :
                (null)
            }
        </div>
    );
}

export default IssuesList;