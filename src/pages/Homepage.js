import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Timeline } from "../components/Timeline";
import { Header } from "../components/Header";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";
import TrendSideBar from "../components/TrendSideBar";
import UserContext from "../context/userContext";
import { verifyFollowers } from "../services/linkr";
export function Homepage() {
  const [alterIcon, setAlterIcon] = useState(false);

  const { setFollowing, following } = useContext(UserContext);

  useEffect(() => {
    (async() => {
        try {
          const response = (await verifyFollowers()).data;

          const { followers_id } = response;

          setFollowing([...followers_id])
      
      } catch (error) {
      
          console.log(error);
      
      }
    })();
  }, [setFollowing]);

  console.log(following);

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  return (
    <>
      <Overlap onClick={handleIcon}>
        <Container>
          <Header alterIcon={alterIcon} setAlterIcon={setAlterIcon} />
          <MobileSearchBar />
          <PageContent>
            <Timeline />
            <TrendSideBar />
          </PageContent>
        </Container>
      </Overlap>
    </>
  );
}
const PageContent = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);
`;
const Container = styled.main`
  margin-top: 72px;
`;

const Overlap = styled.div`
  min-height: calc(100vh - 72px);

  z-index: 10;
`;
