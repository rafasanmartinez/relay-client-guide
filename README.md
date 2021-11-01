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

It will be interesting for you to inspect the internals of the `Store` by installing the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl) extension to follow these samples.

## Specific to this sample: fetch-policies

This sample is an evolution of [error-boundaries](https://github.com/rafasanmartinez/relay-client-guide/tree/error-boundaries).

For this evolution, I have just added a I have an user selection input so the user can determine what will be the fetch policy to apply to the query.

I have removed the mechanism to force `network-only` upon error of the sample [error-boundaries](https://github.com/rafasanmartinez/relay-client-guide/tree/error-boundaries) so you can freely experiment with the effects of modifying the fetch policy.

There are a couple of experiments that you can do:

1. Run your first query using `store-only`. You will find that no data is displayed in the page. This makes sense, since there is nothing catched in the `Store` yet.
2. Then run a query using `store-or-netork` fetch policy. The first time that you do it, you will see the `Loading...` suspense fallback, since the query is going to the network to get the data.
3. Run the same query again. You will no see the suspense fallback, because the data is already catched in the `Store`.
4. Run the same query, but this time using `network-only`. This time, you will see the suspense fallback, because you are forcing the query to get the data from the network.
5. Play with entering entries that will produce an error (see sample [error-boundaries](https://github.com/rafasanmartinez/relay-client-guide/tree/error-boundaries)), and you will find that you will need to force `network-only` after entering a pagination(Issues to Display) bigger than 100 to see data again.
6. Run another query, and make sure that it has data for both the header and the issues list. Now, modify the number of issues to display, and set the getch policy to stoer-only. You will find that there are not issues to display. This is because there event though there is data in the `Store` for the repository header, there is not data in the `Store` yet for a `IssueConnection` object with the new parameters supplied.


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
