# Relay Client Guide

The objective of this project is to go over the documentation of Relay and ilustrate it with practical cases for the lessons in the Relay documentation.

You can use this project by checking out the different tags that correspond to the respective lessons in the Relay site documentation.

I am starting to introduce [Flow](https://flow.org/) annotations, as the application gains in complexity, and after having spending some time learning it, it seems like a good tool to get a better grasp to the application. I am not too good yet to use the Relay generated types, but i expect to be using them in the near future.

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
- [presence-of-data](https://github.com/rafasanmartinez/relay-client-guide/tree/presence-of-data)
- [presence-of-data-2](https://github.com/rafasanmartinez/relay-client-guide/tree/presence-of-data-2)

It will be interesting for you to inspect the internals of the `Store` by installing the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl) extension to follow these samples.

## Specific to this sample: pagination

This sample is an evolution of [presence-of-data-2](https://github.com/rafasanmartinez/relay-client-guide/tree/presence-of-data-2).

There are a number of things that have been added to this evolution:

- Pagination: I have added a simple pagination. Initially, it loads the first 10 issues of the repository. WHen the user clicks on the button `Load More`, the application adds to the list 10 more issues, and so on.
- Raw Data: I have made possible to see or not see the raw data and buttons creating a context for that purpose.
- Apperance: I have made some appearance improvements just using some css.
- Retention: I have eliminated the `{gcReleaseBufferSize:0}` tor React to retain queries as it does by default


In order to see what is going on with the relay store, you should to install the [Relay Developer Tools](https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl)

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
