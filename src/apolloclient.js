import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';


const uploadLink = createUploadLink({
  uri: "https://marketingtoolapidev.crestclimbers.com/graphql/", // Change to your actual backend URL
  headers: {
    "Apollo-Require-Preflight": "true",
    "GraphQL-Preflight": "true",
  },
});

const Client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

export default Client;