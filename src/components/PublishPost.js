import styled from "styled-components";

export function PublishPost() {
  return (
    <Container>
      <Title>What are you goin to share today?</Title>
    </Container>
  );
}

const Container = styled.section`
  margin-top: 48px;
  width: 611px;
  height: 209px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  text-align: center;
`;
