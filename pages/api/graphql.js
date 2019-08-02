const { ApolloServer, gql } = require("apollo-server-micro");

const schema = gql`
  type Query {
    aboutMessage: String
  }
`;

const resolvers = {
  Query: {
    aboutMessage(parent, args, context) {
      return 'THAT Conference was founded by this guy';
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
