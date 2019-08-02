import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";

const GET_SPEAKERS = gql`
  query speakers {
    speakers {
      id
      firstname
      lastname
      avatar
      biography
    }
  }
`;

const Speakers = () => {
  const { data: { speakers = [] } = {}, error } = useQuery(GET_SPEAKERS);

  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <h1 className="title">Speakers</h1>
      <ListGroup>
        {speakers.map(speaker => {
          return (
            <ListGroupItem className="justify-content-between">
              <Media>
                <Media left href={`speakers/${speaker.id}`}>
                  <Media
                    object
                    src={speaker.avatar}
                    className="avatar"
                    alt="Generic placeholder image"
                  />
                </Media>
                <Media body>
                  <Media heading>
                    {`${speaker.firstname} ${speaker.lastname}`}
                  </Media>
                  {speaker.biography}
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
        .avatar {
          border-radius: 33%;
          margin-right: 16px;
        }
      `}</style>
    </Layout>
  );
};

export default withData(Speakers);
