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
  type Speaker {
    id: ID!
    firstname: String!
    lastname: String!
    title: String!
    company: String!
    avatar: String!
    biography: String!
    email: String!
  }

  type Event {
    id: ID!
    title: String!
    description: String
    start: String
    hours: Float
    speakers: [Speaker]
  }

  type Query {
    aboutMessage: String
    speakers: [Speaker]
    speaker(id: ID!): Speaker
    events: [Event]
    event(id: ID!): Event
  }
`;

const resolvers = {
  Query: {
    aboutMessage: () => "THAT Conference was founded by this guy",
    speakers: () => dbHelper.findAll("speakers"),
    speaker: (_parent, { id }) => dbHelper.findOne("speakers", id),
    events: () => dbHelper.findAll("events"),
    event: (_parent, { id }) => dbHelper.findOne("events", id),
  },
};

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
