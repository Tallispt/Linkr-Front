import { useState } from "react";
import styled from "styled-components";
import { Timeline } from "../components/Timeline";
import { Header } from "../components/Header";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";

export function Homepage() {
  const [ alterIcon, setAlterIcon ] = useState(false);

  function handleIcon() {
    if(alterIcon === true) setAlterIcon(false);
  }

  return (
    <>
      <Overlap onClick={handleIcon}>
        <Container>
          <Header alterIcon={alterIcon} setAlterIcon={setAlterIcon}/>
          <MobileSearchBar placeholder={"Search for people and friends"} />
          <Timeline />
        </Container>
      </Overlap>
    </>
  );
}

const Container = styled.main`
  margin-top: 72px;
`;

const Overlap = styled.div`
  min-height: 100vh;

  z-index: 10;
`;