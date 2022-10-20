import styled from "styled-components";
import { Timeline } from "../components/Timeline";
import { Header } from "../components/Header";

export function Homepage() {
  return (
    <>
      <Container>
        <Header />
        <Timeline />
      </Container>
    </>
  );
}

const Container = styled.main`
  margin-top: 72px;
`;
