# Relay Client Guide

The objective of this project is to go over the documentation of Relay and ilustrate with practical cases the lessons in the Relay documentation.

You can use this project by checking out the different tags that correspond to the respective lessons in the Relay site documentation.

The code in the `App.js` and in the folder `scr\components` file contains comments with the explanations that you need to better understand how to make it to work.

When reviewing or checking out this code, I would assume that you have already went over the following tags:

- [getting-started](https://github.com/rafasanmartinez/relay-client-guide/tree/getting-started)
- [rendering-quieries](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-quieries)
- [rendering-fragments](https://github.com/rafasanmartinez/relay-client-guide/tree/rendering-fragments)

## Specific to this sample

This sample is a slight evolution of `rendering-samples`, where we have added some modularity to the code by separating a component that displays the github repository header. Just notice how we had to modify the name of the fragment that it displays, so it starts with the name of the module to which it belongs to.


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
