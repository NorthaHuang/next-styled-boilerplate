import { GetServerSideProps, NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
  launch: {
    mission: string;
    site: string;
    timestamp: number;
    rocket: string;
  };
}

const IndexPage: NextPage<Props> = ({ launch }) => {
  const date = new Date(launch.timestamp);
  return (
    <main>
      <h1>
        Next SpaceX Launch:
        {launch.mission}
      </h1>
      <p>
        {launch.rocket}
        <span>will take off from</span>
        {launch.site}
        {date.toDateString()}
      </p>
      <Container>
        <Row>
          <Col>
            <h1>Hello Bootstrap!</h1>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches/next');
  const nextLaunch = await response.json();
  return {
    props: {
      launch: {
        mission: nextLaunch.mission_name,
        site: nextLaunch.launch_site.site_name_long,
        timestamp: nextLaunch.launch_date_unix * 1000,
        rocket: nextLaunch.rocket.rocket_name,
      },
    },
  };
};