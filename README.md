# Relay Client Guide

The objective of this project is to go over the documentation of Relay and ilustrate with practical cases the lessons in the Relay documentation.

You can use this project by checking out the different tags that correspond to the respective lessons in the Relay site documentation.

The code in the `App.js` and in the folder `scr\components` contain comments with the explanations that you need to better understand how it works.

I am purposedly not using [Flow](https://flow.org/) annotations, as they are used in the [Relay Documentation](https://relay.dev/docs/) in order that you can learn by working with a simpler code. I believe that starting to learn Relay without Flow will make a better introduction to the features for you.

The code will work well with or without Flow, but I must recognize that when integrated in a bigger team, or when your application gets more complex, using Flow can be worth the effort.

When reviewing or checking out this code, I would assume that you have already went over the following tags:

- [getting-started](https://github.com/rafasanmartinez/relay-client-guide/tree/getting-started)
- [rendering-quieries](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-quieries)https://relay.dev/docs/
- [rendering-fragments](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments)

## Specific to this sample

This sample is a slight evolution of [rendering-fragments](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments), but I have added a little bit of modularity to the code by separating the component that displays the Github repository header.

Just notice that the only remarkable change consists on modifying the name of the fragment, so it's name starts with the actual name of the module where it belongs to, as it is required by the Relay compiler.

## Configure and run this labeled sample: rendering-fragments-2

This project connects to the Github GraphQL server. You can find information about it in the [Github GraphQL API](https://docs.github.com/es/graphql) site.

- Checkout the project and do `npm install` to install the required libraries.
- [Create a Personal Access Token in Github](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and store it in a safe place.
- Create a file in the root folder with the name `.env.local`
- Enter the following line in the `.env.local` file. This creates an environment variable that ls used later in `./src/fetchGraphQL.js`

```sh
REACT_APP_GITHUB_AUTH_TOKEN=(YOUR TOKEN)
```

- Do `npm start`.
