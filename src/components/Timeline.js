import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTimeline } from "../services/linkr";
import { PublishPost } from "./PublishPost";

export function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTimeline()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(posts);

  return (
    <Container>
      <Title>timeline</Title>
      <PublishPost />
    </Container>
  );
}

const Container = styled.section`
  margin-top: 20px;
  width: 611px;
`;

const Title = styled.h1`
  margin-inline: auto;
  font-family: "Oswald";
  font-weight: 700;
  color: #ffffff;
  font-size: 43px;
`;
