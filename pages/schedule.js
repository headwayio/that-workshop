import Layout from "../components/Layout";
import { ListGroup, ListGroupItem, Media } from "reactstrap";

const scheduleItems = [
  {
    id: "1",
    title: "Conference Kickoff",
    location: "Room 1",
    description: "Conference Welcoming Party. Drinks and Food will be served.",
    start: "2019-08-23T08:00:00.000Z",
    end: "2019-08-23T18:00:00.000Z"
  },
  {
    id: "2",
    title: "Goodbye Conference",
    location: "Room 2",
    description: "Farewell. Hope you learned something.",
    start: "2019-08-24T08:00:00.000Z",
    end: "2019-08-24T18:00:00.000Z"
  }
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
