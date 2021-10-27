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

## Specific to this sample: rendering-fragments-3

This sample is an evolution of [rendering-fragments-2](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments-2), where I have added a demonstration on composition of fragments and how to build React components in parallel with them. 

The application display some data for the first ten of the closed issues in the Facebook´s GitHub´s relay repository.

Look specifically to the content of the comments in `src/components/IssuesList.js` to get a better understanding on the concepts demonstrated. 

It will be very useful to see the [GitHub´s GraphQL API Reference](https://docs.github.com/en/graphql), specially the following entries:

- [Repository Object](https://docs.github.com/en/graphql/reference/objects#repository)
- [IssueConnection Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)
- [IssueEdge Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)
- [Issue Object](https://docs.github.com/en/graphql/reference/objects#issueconnection)

Additionally, to avoid code redundancy, I have created a React component called `DisplayRawData` that generalizes the conditioned output of the raw data returned by the react hooks for disctinct components upon clicking a button.

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
