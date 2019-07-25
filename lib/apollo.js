import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const config = {
  link: new HttpLink({
    uri: `${process.env.BASE_URL}/api/graphql`
  })
};

export default withData(config);
