import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";

const GET_EVENTS = gql`
  query {
    events {
      id
      title
      description
    }
  }
`;

const Schedule = () => {
  const { data: { events = [] } = {}, error } = useQuery(GET_EVENTS);

  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <h1 className="title">Schedule</h1>
      <ListGroup>
        {events.map(event => {
          return (
            <ListGroupItem className="justify-content-between">
              <Media>
                <Media left href={`event/${event.id}`} />
                <Media body>
                  <Media heading>{event.title}</Media>
                  {event.description}
                </Media>
              </Media>
            </ListGroupItem>
          );
        })}
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
