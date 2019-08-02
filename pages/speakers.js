import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";

const Speakers = () => {
  return (
    <Layout>
      <h1 className="title">Speakers</h1>
      <ListGroup>
        {[].map(speaker => {
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

export default Speakers;
