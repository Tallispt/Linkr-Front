import styled from "styled-components";
import { PublishPost } from "./PublishPost";

export function Timeline() {
  return (
    <Container>
      <Title>timeline</Title>
      <PublishPost />
    </Container>
  );
}

const Container = styled.section`
  margin-top: 20px;
`;

const Title = styled.h1`
  margin-inline: auto;
  width: 90%;
  font-family: "Oswald";
  font-weight: bold;
  color: #ffffff;
  font-size: 31px;
`;
