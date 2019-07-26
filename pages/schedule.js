import { useState } from "react";
import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media, Input } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";
import Link from "next/link";

const GET_EVENTS = gql`
  query events($filter: String) {
    events(filter: $filter) {
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
  const [filter, setFilter] = useState(null);

  const { data: { events = [] } = {}, error } = useQuery(GET_EVENTS, {
    variables: { filter }
  });

  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <h1 className="title">Schedule</h1>
      <Input
        className="search"
        placeholder="Search"
        onChange={e => {
          setFilter(e.target.value)
        }}
      />
      <ListGroup>
        {events.map(event => (
          <EventLink event={event} />
        ))}
      </ListGroup>
      <style jsx global>{`
        .title {
          margin: 16px;
        }
        .search {
          margin: 16px;
          width: 220px;
        }
      `}</style>
    </Layout>
  );
};

export default withData(Schedule);
