# Relay Client Guide

The objective of this project is to go over the documentation of Relay and ilustrate it with practical cases for the lessons in the Relay documentation.

You can use this project by checking out the different tags that correspond to the respective lessons in the Relay site documentation.

I am purposedly not using [Flow](https://flow.org/) annotations, as they are used in the [Relay Documentation](https://relay.dev/docs/) in order that you can learn the concepts by working with a simpler code. I believe that starting to learn Relay without Flow will make a better introduction to the features for you.

The code will work well with or without Flow, but I must recognize that when integrated in a bigger team, or when your application gets more complex, using Flow can be worth the effort.

When reviewing or checking out this code, I would assume that you have already gone over the following tags:

- [getting-started](https://github.com/rafasanmartinez/relay-client-guide/tree/getting-started)
- [rendering-quieries](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-quieries)
- [rendering-fragments](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments)
- [rendering-fragments-2](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments-2)
- [rendering-fragments-3](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments-3)
- [variables](https://github.com/rafasanmartinez/relay-client-guide/tree/variables)
- [variables-2](https://github.com/rafasanmartinez/relay-client-guide/tree/variables-2)
- [suspense](https://github.com/rafasanmartinez/relay-client-guide/tree/suspense)

## Specific to this sample: error-boundaries

This sample is an evolution of [suspense](https://github.com/rafasanmartinez/relay-client-guide/tree/variables-2), where I deal with the error condition returned by the GitHub GraphQL API when the query sent produces an error object with an `EXCESIVE_PAGINATION` or a `NOT_FOUND` error type, and a `null` value for the `repository` object. You can see how the data returned by GitHub looks in the browser console by uncommenting the `console.log(jsonresponse);` line in `fetchGraphQL.js`.

Well, it all seems like this version of `Relay` does not pay attention to the `error` document returned by a GraphQL server within the data. `Relay` will only trigger an error that an `ErrorBoundary` component will trap when a throwed JS error occurs during the fetching and rendering process. Information of the type "Object Foo is not found", "Option Bar does not exist", "Excessive pagination" and so on, is expected to be returned by a GraphQL server as part of the regular data, and they state that the server should expose `union types` that sould return the expected datatype content (`Foo`) upon success, or an `Error` object with a meaningful message or a code upon error. This is stated in in the `Relay` documentation in the las section `Accessing errors in GraphQL Responses` of the [Error States with ErrorBoundaries](https://relay.dev/docs/guided-tour/rendering/error-states/) chapter.

There is some discussion about this question in [this issue](https://github.com/facebook/relay/issues/1913).

I am using the GitHub GraphQL server as the source of data for this project, and as you can see, this GraphQL server does not implement these kind of errors as `Relay` expects.

It means that when I provide query parameter values that produce one of these errors, the only information that I obtain from `Relay` is that the object expected is `null`. My decision at this point is to go ahead with this behavior and try to provide a way to deal with it, event though I assume that the information that I can provide to the user is not going to be as detailed as I would like it to be.

What I have done is to have the component `DataDisplay` in `App.js` to render a generic error message when it detects that the `repository`object is `null`.

This design produced the following behavior in `Relay`: after rendering this generic message, for some reason, the next time that the user clicks on `Submit`, I have to obtain the query from the network in the subsequent fetch,  or no data will be displayed. My solution to this has been to modify the fetching policy when this happens. I am not sure if this behavior is caused by is a bug or not, but that´s another discussion.

To wok around this issue, what I did is to have my `DataDisplay` component to notify to the parent `App` that it has to refresh the data from the network. See the following code fragments in `App.js` that implement this feature:

`App` component:

```
// Stores if query needs to be refreshed from the network after error
const [needsRefresh, setNeedsRefresh] = useState(false);
```
```
const fetchPolicy = needsRefresh ? 'network-only' : 'store-or-network';
loadQuery({ owner: owner, name: name, issuesFirst: parseInt(issuesFirst) }, { fetchPolicy: fetchPolicy });
```
```
<DataDisplay
    query={RepositoryNameQuery}
    queryReference={queryReference}
    issuesToDisplay={issuesRequested}
    setNeedsRefresh={setNeedsRefresh}
/>
```

`DataDisplay` component:

```
// The need to refresh from the netwotk gets passed to the parent component afer rendering
// You can give a try to comment this function and will find out that no more data gets
// displayed after an error occurs
useEffect(() => {
setNeedsRefresh(data.repository == null);
},[data.repository,setNeedsRefresh]);
```

It will be very useful to see the [GitHub´s GraphQL API Reference](https://docs.github.com/en/graphql), specially the following entries:

- [Repository Object](https://docs.github.com/en/graphql/reference/objects#repository)
- [IssueConnection Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)
- [IssueEdge Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)
- [Issue Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)

You may also take advantage and watch in the code how you can use React hooks controlled inputs (see Mentions section below).

## Configure and run this sample

This project connects to the Github GraphQL server. You can find information about it in the [Github GraphQL API](https://docs.github.com/es/graphql) site.

- Checkout the project and do `npm install` to install the required libraries.
- [Create a Personal Access Token in Github](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and store it in a safe place.
- Create a file in the root folder with the name `.env.local`
- Enter the following line in the `.env.local` file. This creates an environment variable that ls used later in `./src/fetchGraphQL.js`

```sh
REACT_APP_GITHUB_AUTH_TOKEN=(YOUR TOKEN)
```
- Do `npm run relay`
- Do `npm start`.

## Mentions

The helper function `userInput` comes from Evan Schultz in his [blog entry](https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/)
