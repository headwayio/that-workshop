import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";

const scheduleItems = [
];

const Schedule = () => {
  return (
    <Layout>
      <h1 className="title">Schedule</h1>
      <ListGroup>
        {scheduleItems.map(schedule => {
          return (
            <ListGroupItem className="justify-content-between">
              <Media>
                <Media left href={`schedule/${schedule.id}`} />
                <Media body>
                  <Media heading>{schedule.title}</Media>
                  {schedule.description}
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
      `}</style>
    </Layout>
  );
};

export default Schedule;
