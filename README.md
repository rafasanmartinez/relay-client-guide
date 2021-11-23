# Relay Client Guide

The objective of this project is to go over the documentation of Relay and ilustrate it with practical cases for the lessons in the Relay documentation.

You can use this project by checking out the different tags that correspond to the respective lessons in the Relay site documentation.

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
- [presence-of-data](https://github.com/rafasanmartinez/relay-client-guide/tree/presence-of-data)
- [presence-of-data-2](https://github.com/rafasanmartinez/relay-client-guide/tree/presence-of-data-2)
- [pagination](https://github.com/rafasanmartinez/relay-client-guide/tree/pagination)
- [routing](https://github.com/rafasanmartinez/relay-client-guide/tree/routing)
- [routing-2](https://github.com/rafasanmartinez/relay-client-guide/tree/routing-2)


It will be interesting for you to inspect the internals of the `Store` by installing the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl) extension to follow these samples.

## Specific to this sample: mutations

This sample is an slight evolution of [routing-2](https://github.com/rafasanmartinez/relay-client-guide/tree/routing-2).

This evolution adds a mutation to the application. the mutation is in the `Issue.js` file. The mutation implemented adds a new comment to the list of coments of an issue. It uses `@appendEdge` to have relay to automatically update the store and have the new additioned comment to be added to tue user interface.

## Other reccomendations

In order to see what is going on with the relay store, you should to install the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl)

It will be very useful to see the [GitHub´s GraphQL API Reference](https://docs.github.com/en/graphql), specially the following entries:

- [Repository Object](https://docs.github.com/en/graphql/reference/objects#repository)
- [IssueConnection Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)
- [IssueEdge Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)
- [Issue Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)

You may also take advantage and watch in the code how you can use React hooks controlled inputs (see Mentions section below).

I reccomend to use the [Visual Extension for Flow](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) to make sure that you understand what is going on with with the Flow checks.

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
