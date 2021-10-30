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

This sample is a copy of [suspense](https://github.com/rafasanmartinez/relay-client-guide/tree/variables-2) with onlly one difference. I have added an object state variable with the number of issue records to display to avoid the issues list header to get update with every modification of the form field.

The reason for not modifying the project at this point is that the application already

In this sample, I have added a possible way of reusing code when building a glimmer for the `RepositoryHeader`component, and I have surrounded such component with `<Suspense>`. The user of the application will not notice any difference with the previous sample, becasue once the query is loaded, the `RepositoryHeader` component displays almost instantaneously.

The application will display some data for the closed issues in the GitHub repository chosen by the user.

If you run the application and you enter input for looking for a repository that does not exists in GitHub, the application will not display meaningful messages. This is an expected beavior. I will provide error control and control of empty results further down in this series.

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
