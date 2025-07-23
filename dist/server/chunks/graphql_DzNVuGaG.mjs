import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://cms.acmemarketing.us/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    // You can add authentication headers here if your GraphQL endpoint requires them
    // For now, we'll assume it's public or handled by other means
  },
});

export { graphQLClient as g };
