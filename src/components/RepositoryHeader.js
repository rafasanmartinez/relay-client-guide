import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import DisplayRawdata from "./DisplayRawData";
import "./RepositoryHeader.css";
import formatDate from "../helpers/FormatDate"
/**
 * This component displays general information about a Github Repository given the result of a loaded query, that contains
 * information about how to spread the fragment that contains the data pertained to it.
 *
 * The component calls fo useFragment with the graphql compiled literal that describes the fragment, and the piece of the data into the query that contains the
 * information described in the upper paragraph, used by Relay can do it´s magic and and spread the details of the fragment into the constant `fragmentData`
 *
 * @param data The information with the result of the loaded query, to be used by the component to spread the fragment
 * @returns The resulted React component content
 */
const RepositoryHeader = ({ data }) => {
  const fragmentData = useFragment(
    graphql`
      fragment RepositoryHeader_repository on Repository {
        __typename
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

  return (
    <RepositoryHeaderFrame>
      <div className="Repository-Header-Row">
        <div className="Repository-Header-Fragment">
          <span className="label">Owner:</span>
          <span>{fragmentData.owner.login}</span>
        </div>
        <div className="Repository-Header-Fragment">
          <span className="label">Repository:</span>
          <span>{fragmentData.name}</span>
        </div>
        <div className="Repository-Header-Fragment">
          <span className="label">Created at:</span>
          <span>{formatDate(fragmentData.createdAt)}</span>
        </div>
      </div>
      <DisplayRawdata
        data={fragmentData}
        contentDescription="raw result of useFragment() in header"
      />
    </RepositoryHeaderFrame>
  );
};

const RepositoryHeaderFrame = ({ children }) => {
  return <div className="Repository-Header-Frame">{children}</div>;
};

const RepositoryHeaderGlimmer = () => {
  return <RepositoryHeaderFrame />;
};

export default RepositoryHeader;
export { RepositoryHeaderGlimmer };
