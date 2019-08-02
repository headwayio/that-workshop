import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import withData from "../../lib/apollo";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const Speaker = () => {
  const {
    speaker: {
      firstname,
      lastname,
      speakerId,
      avatar,
      biography,
      email,
      title,
      company
    }
  } = {
    speaker: {
      firstname: '',
      lastname: '',
      speakerId: '1',
      avatar: null,
      biography: '',
      email: '',
      title: '',
      company: '',
    }
  };

  return (
    <Layout>
      <Card>
        <CardBody>
          <CardImg src={avatar} alt="Speaker Image" className="cardImage" />
        </CardBody>
        <CardBody>
          <CardTitle> {`${firstname} ${lastname} - ${speakerId}`}</CardTitle>
          <CardSubtitle>{`${company} - ${title}`}</CardSubtitle>
          <CardSubtitle>{email}</CardSubtitle>
        </CardBody>
        <CardBody>
          <CardText>{biography}</CardText>
        </CardBody>
      </Card>
      <style jsx global>{`
        .cardImage {
          width: 40px;
        }
      `}</style>
    </Layout>
  );
};

export default withData(Speaker);
