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

  input SpeakerInput {
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
    events(filter: String): [Event]
    event(id: ID!): Event
  }

  type Mutation {
    createSpeaker(speaker: SpeakerInput!): Speaker
  }
`;

const speakersForEvent = event => {
  const allSpeakers = dbHelper.findAll("speakers");
  return event.speakerIds.map(id =>
    allSpeakers.find(speaker => speaker.id === id)
  );
};

const resolvers = {
  Query: {
    aboutMessage: () => "THAT Conference was founded by this guy",
    speakers: () => dbHelper.findAll("speakers"),
    speaker: (_parent, { id }) => dbHelper.findOne("speakers", id),
    events: (_parent, { filter }) => {
      const allEvents = dbHelper.findAll("events");
      if (!filter || filter === "") return allEvents;

      const eventsWithSpeakers = allEvents.map(event => ({
        ...event,
        speakers: speakersForEvent(event)
      }));

      const filtered = eventsWithSpeakers.filter(event => {
        const speakers = event.speakers
          .map(
            speaker =>
              `${speaker.firstname}${speaker.lastname}${speaker.biography}`
          )
          .join();

        const searchString = [event.title, event.description, speakers]
          .join()
          .replace(/\s/g, "")
          .toLowerCase();

          const filterString = filter.replace(/\s/g, "").toLowerCase();

        return searchString.includes(filterString);
      });

      return filtered;
    },
    event: (_parent, { id }) => dbHelper.findOne("events", id)
  },
  Mutation: {
    createSpeaker: (_parent, { speaker }) =>
      dbHelper.create("speakers", speaker)
  },
  Event: {
    speakers: event => speakersForEvent(event)
  }
};

const apolloServer = new ApolloServer({ typeDefs: schema, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
