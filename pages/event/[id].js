import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withData from "../../lib/apollo";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const GET_EVENT = gql`
  query event($id: ID!) {
    event(id: $id) {
      id
      title
      description
      start
      hours
      speakers {
        id
        firstname
        lastname
        avatar
        biography
      }
    }
  }
`;

const Event = () => {
  const {
    query: { id }
  } = useRouter();

  const { data, error } = useQuery(GET_EVENT, {
    variables: { id }
  });

  if (!data || !data.event || error) return null;

  const {
    event: { title, description, start, hours, speakers }
  } = data;

  return (
    <Layout>
      <Card>
        <CardBody>
          <CardTitle> {title}</CardTitle>
          <CardSubtitle>{new Date(start).toLocaleString()}</CardSubtitle>
        </CardBody>
        <CardBody>
          <CardText>{description}</CardText>
          <CardText>{`${hours} hours`}</CardText>
        </CardBody>
        <CardBody>
          <CardTitle> Speakers</CardTitle>
          <CardSubtitle>
            {speakers
              .map(speaker => `${speaker.firstname} ${speaker.lastname}`)
              .join(", ")}
          </CardSubtitle>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default withData(Event);
