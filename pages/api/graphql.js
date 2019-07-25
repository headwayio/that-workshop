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
const avatarUrl = "https://api.adorable.io/avatars/64/";
const speakerData = [
  {
    id: 1,
    firstname: "Matt",
    lastname: "Reetz",
    title: "Software Engineer",
    company: "Headway",
    avatar: `${avatarUrl}matt`,
    biography: "Matt is a coding ninja.",
    email: "matt@headway.io"
  },
  {
    id: 2,
    firstname: "Tim",
    lastname: "Gremore",
    title: "Software Engineer",
    company: "Headway",
    avatar: `${avatarUrl}tim`,
    biography: "Tim is a coding wizard.",
    email: "tim@headway.io"
  }
];

const schema = gql`
  type Query {
    aboutMessage: String
    speakers: [Speaker]
  }

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
`;

const resolvers = {
  Query: {
    aboutMessage(parent, args, context) {
      return "THAT Conference was founded by this guy";
    },
    speakers(parent, args, context) {
      return speakerData;
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
