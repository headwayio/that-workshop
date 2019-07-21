import "bootstrap/dist/css/bootstrap.css";
import { Jumbotron, Button } from "reactstrap";
import Layout from '../components/Layout';

const index = () =>
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
      <p className="lead">
        Engage with true practitioners, thought leaders and entrepreneurs
        while enjoying the perks of summer camp at a giant waterpark. Join us
        and become part of THAT family.
      </p>
      <hr className="my-2" />
      <img
        src="/static/clark.png"
        alt="Image of Clark Sell"
        className="image image-rounded"
      />
      <p className="lead">
        <Button color="primary">Learn More</Button>
      </p>
    </Jumbotron>
  </Layout>

export default index;
