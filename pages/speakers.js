import { useState } from "react";
import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media, Input, Button } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import withData from "../lib/apollo";
import Link from "next/link";

const GET_SPEAKERS = gql`
  query speakers($filter: String) {
    speakers(filter: $filter) {
      id
      firstname
      lastname
      avatar
      biography
    }
  }
`;

const CREATE_SPEAKER = gql`
  mutation create($speaker: SpeakerInput!) {
    createSpeaker(speaker: $speaker) {
      firstname
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
  const [filter, setFilter] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const { data: { speakers = [] } = {}, error } = useQuery(GET_SPEAKERS, {
    variables: { filter }
  });
  const [createSpeaker] = useMutation(CREATE_SPEAKER);
  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      <h1 className="title">Speakers</h1>
      <Input
        className="search"
        placeholder="Search"
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
      <ListGroup>
        {speakers.map(speaker => {
          return (
            <ListGroupItem action className="justify-content-between">
              <SpeakerLink speaker={speaker} />
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <Input
        className="search"
        placeholder="first name"
        onChange={e => {
          setFirstName(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          createSpeaker({
            variables: {
              speaker: {
                firstname: firstName,
                lastname: "Reetz",
                title: "Software Engineer",
                company: "Headway",
                avatar: `https://api.adorable.io/avatars/64/${firstName}`,
                biography: "Matt is a coding ninja.",
                email: "matt@headway.io"
              }
            }
          });
        }}
      >
        Create
      </Button>
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
