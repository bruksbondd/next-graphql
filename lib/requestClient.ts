import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(
  'https://swivelt.mintsplash.net/graphql',
  {
    fetch,
  },
);
