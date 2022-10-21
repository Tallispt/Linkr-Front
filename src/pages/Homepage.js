import { useContext } from "react";
import styled from "styled-components";
import { Timeline } from "../components/Timeline";
import { Header } from "../components/Header";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";

import UserContext from "../context/User";

export function Homepage() {
  const { dataUser } = useContext(UserContext);

  return (
    <>
      <Container>
        <Header />
        <MobileSearchBar placeholder={"Search for people and friends"} />
        <Timeline />
      </Container>
    </>
  );
}

const Container = styled.main`
  margin-top: 72px;
`;
