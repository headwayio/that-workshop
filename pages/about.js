import "bootstrap/dist/css/bootstrap.css";
import { Jumbotron, Button } from "reactstrap";
import Layout from '../components/Layout';

const About = () =>
  <Layout>
    <Jumbotron className="mb-0">
      <h1>THAT CONFERENCE</h1>
      <p>We're glad you're here! If we can be of assistance, please contact us at:</p>
      <ul>
        <li>Matt Reetz: matt@headway.io</li>
        <li>Tim Gremore: tim@headway.io</li>
      </ul>
    </Jumbotron>
  </Layout>;

export default About;
