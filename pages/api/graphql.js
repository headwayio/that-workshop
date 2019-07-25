const { ApolloServer, gql } = require("apollo-server-micro");
const low = require("lowdb");
const uuidv4 = require("uuid");
const os = require("os");
const fs = require("fs");
const FileSync = require("lowdb/adapters/FileSync");
const database = require("../../db.js");

const filePath = os.tmpdir() + "/database.json";
fs.writeFileSync(filePath, JSON.stringify(database()));
const adapter = new FileSync(filePath);
const db = low(adapter);

const dbHelper = {
  findAll: type => db.get(type).value(),
  findOne: (type, id) =>
    db
      .get(type)
      .find({ id })
      .value(),
  create: (type, values) => {
    const id = uuidv4();
    db.get(type)
      .push({ ...values, id })
      .write();
    return dbHelper.findOne(type, id);
  }
};

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
