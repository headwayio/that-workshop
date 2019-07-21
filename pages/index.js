import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Jumbotron, Button } from "reactstrap";
import withData from "../lib/apollo";
import Layout from "../components/Layout";

const GET_ABOUT_MESSAGE = gql`
  query aboutMessage {
    aboutMessage
  }
`;

const index = () => {
  const { data: { aboutMessage = "" } = {} } = useQuery(GET_ABOUT_MESSAGE, {});
  return (
    <Layout>
      <Jumbotron className="mb-0">
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">
          THAT Conference is the "Summer Camp for Geeks" that combines
          technology, networking, social events and exposure in an
          inspirational, family friendly environment at the The Kalahari Resort
          in Wisconsin Dells. Over four days, folks of diverse technology
          backgrounds and expertise levels gather to take advantage of multiple
          learning mediums to maximize one’s community and career advancements.
        </p>
        <p class="lead">
          Engage with true practitioners, thought leaders and entrepreneurs
          while enjoying the perks of summer camp at a giant waterpark. Join us
          and become part of THAT family.
        </p>
        <hr className="my-2" />
        <p>{aboutMessage}</p>
        <img
          src="/static/clark.png"
          alt="Image of Clark Sell"
          className="image image-rounded"
        />
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
      <style jsx>{`
        .image-rounded {
          margin-bottom: 16px;
          border-radius: 16px;
        }

        .image {
          width: 512px;
          max-width: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default withData(index);
