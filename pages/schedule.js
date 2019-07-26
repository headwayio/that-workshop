import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";
import Link from "next/link";

const GET_EVENTS = gql`
  query {
    events {
      id
      title
      description
    }
  }
`;

const EventLink = ({ event: { id, title, description } }) => (
  <ListGroupItem action className="justify-content-between">
    <Link href="/event/[id]" as={`/event/${id}`}>
      <Media body>
        <Media heading>{title}</Media>
        {description}
      </Media>
    </Link>
  </ListGroupItem>
);

const Schedule = () => {
  const { data: { events = [] } = {}, error } = useQuery(GET_EVENTS);

  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <h1 className="title">Schedule</h1>
      <ListGroup>
        {events.map(event => (
          <EventLink event={event} />
        ))}
      </ListGroup>
      <style jsx global>{`
        .title {
          margin: 16px;
        }
      `}</style>
    </Layout>
  );
};

export default withData(Schedule);
