import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay/hooks';
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
        fragment RepositoryHeader_repository on Repository {
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

export default RepositoryHeader;