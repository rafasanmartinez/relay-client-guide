# Relay Client Sample

The objective of this project is to go over the documentation of Relay and ilustrate with examples that work for the lessons in the [Relay](https://relay.dev/) documentation.

You can use this project by checking out with git the different tags that should correspond to the respective lessons in the [Relay](https://relay.dev/) documentation.

## getting-started

This app displays a GraphQL query following instructions in the GettinStarted -> Step-By-Step guide of the [Relay](https://relay.dev/) documentation site.

I have logged in the the results of the calls  `loadQuery` and `usePreloadedquery`. You can find these logs in `App.js`. It is worth for you to take a look to the content of these result objects in the browser console (F12) when you run the application. It will be useful to understand further lessons.

## Configure and run this labeled sample: getting-started

This project connects to the Github GraphQL server. You can find information about it in the [Github GraphQL API](https://docs.github.com/es/graphql) site.

- Checkout the project and do `npm install` to install the required libraries.
- [Create a Personal Access Token in Github](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and store it in a safe place.
- Create a file in the root folder with the name `.env.local`
- Enter the following line in the `.env.local` file. This creates an environment variable that ls used later in `./src/fetchGraphQL.js`

```sh
REACT_APP_GITHUB_AUTH_TOKEN=(YOUR TOKEN)
```

- Do `npm start`.

