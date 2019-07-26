import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";
import Link from "next/link";

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

const SpeakerLink = ({
  speaker: { id, firstname, lastname, avatar, biography }
}) => (
    <Link href="/speaker/[id]" as={`/speaker/${id}`}>
      <Media>
        <Media left>
          <Media
            object
            src={avatar}
            className="avatar"
            alt="Generic placeholder image"
          />
        </Media>
        <Media body>
          <Media heading>{`${firstname} ${lastname}`}</Media>
          {biography}
        </Media>
      </Media>
    </Link>
);

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
            <ListGroupItem action className="justify-content-between">
              <SpeakerLink speaker={speaker} />
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
