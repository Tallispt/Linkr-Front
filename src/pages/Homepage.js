import styled from "styled-components";
import { Timeline } from "../components/Timeline";
import { Header } from "../components/Header";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";
import TrendSideBar from "../components/TrendSideBar";



export function Homepage() {

  

  return (
    <>
      <Container>
        <Header />
        <MobileSearchBar placeholder={"Search for people and friends"} />
        <PageContent>
        <Timeline />
       <TrendSideBar />
       </PageContent>

      </Container>
    </>
  );
}
const PageContent = styled.div`
display: flex;
`
const Container = styled.main`
  margin-top: 72px;
`;
