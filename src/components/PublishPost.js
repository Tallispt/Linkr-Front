import styled from "styled-components";

export function PublishPost() {
  return (
    <Container>
      <Title>What are you goin to share today?</Title>
    </Container>
  );
}

const Container = styled.section`
  margin-top: 20px;
  width: 100vw;
  height: 190px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  text-align: center;
`;
