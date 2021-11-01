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
- [error-boundaries](https://github.com/rafasanmartinez/relay-client-guide/tree/error-boundaries)
- [fetch-policies](https://github.com/rafasanmartinez/relay-client-guide/tree/fetch-policies)


It will be interesting for you to inspect the internals of the `Store` by installing the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl) extension to follow these samples.

## Specific to this sample: presence-of-data

This sample is an evolution of [fetch-policies](https://github.com/rafasanmartinez/relay-client-guide/tree/fetch-policies).

For this evolution, I have just added the parameter  `{gcReleaseBufferSize:0}` to the instantiation of the `Store` in the file `RelayEnvironment.js`.

```
// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource(),{gcReleaseBufferSize:0}),
});
```

The purpose of this demonstration is to help you to experiment with the React's Garbage Collection configuration, concretely by playing with the parameter mentioned above. I have set the parameter value to 0, in order to prevent the garbage collector to retain the information of in the release buffer.

In order to see what is going on with the relay store, you should to install the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl)

Try the sample, and execute the query with Relay Developer Tools opened in the Store tab.

<img src="/readme-images/InitialExecution.png?raw=true">

Run the query hitting the `Submit`button. The store gets populated with data of the loaded query.

<img src="/readme-images/Execution.png?raw=true">

Click the button `Click to hide the data and dispose the query` and you can see that the data in the store has dissapeared.

<img src="/readme-images/AfterQueryDisposal.png?raw=true">

Now is your turn to play with the `gcReleaseBufferSize` parameter and the fetch policies.

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
