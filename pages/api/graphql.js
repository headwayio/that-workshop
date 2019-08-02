const { ApolloServer, gql } = require("apollo-server-micro");

const schema = gql`
  type Query {
    aboutMessage: String
  }
`;

const resolvers = {
  Query: {
  }
};

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
