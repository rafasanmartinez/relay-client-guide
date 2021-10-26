# Relay Client Sample

The objective of this project is to go over the documentation of Relay and ilustrate with practical cases the lessons in the Relay documentation.

You can use this project by checking out the different tags that correspond to the respective lessons in the Relay site documentation.

## Configure and run this labeled sample: rendering-queries

This project connects to the Github GraphQL server. You can find information about it in the [Github GraphQL API](https://docs.github.com/es/graphql) site.

- Checkout the project and do `npm install` to install the required libraries.
- [Create a Personal Access Token in Github](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) and store it in a safe place.
- Create a file in the root folder with the name `.env.local`
- Enter the following line in the `.env.local` file. This creates an environment variable that ls used later in `./src/fetchGraphQL.js`

```sh
REACT_APP_GITHUB_AUTH_TOKEN=(YOUR TOKEN)
```

- Do `npm start`.
