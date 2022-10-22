import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { Header } from "../components/Header";
import Post from "../components/Post";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";
import {
  Message,
  PostsSection,
  TimelineContainer,
  TimelineTitle,
} from "../components/Timeline";
import { getHashtagsPosts } from "../services/linkr";
import TrendSideBar from "../components/TrendSideBar";

export default function HashtagPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const { hashtag } = useParams();

  const [alterIcon, setAlterIcon] = useState(false);

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  useEffect(() => {
    setLoader(true);
    getHashtagsPosts(hashtag)
      .then((res) => {
        setPosts(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
        setError(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [hashtag]);

  return (
    <Overlap onClick={handleIcon}>
      <MainWrapper>
        <Header alterIcon={alterIcon} setAlterIcon={setAlterIcon} />
        <MobileSearchBar />
        <PageContent>
          <TimelineContainer>
            <HashtagTitle>
              <span>{"#" + hashtag}</span>
            </HashtagTitle>
            <PostsSection>
              {loader ? (
                <>
                  <HashLoader
                    color="#ffffff"
                    loading={loader}
                    cssOverride={true}
                    size={50}
                  />
                  <Message>Loading</Message>
                </>
              ) : error ? (
                <Message>{error}</Message>
              ) : posts?.length === 0 ? (
                <Message>There are no posts yet</Message>
              ) : (
                posts?.map((value) => (
                  <Post
                    key={value.id}
                    id={value.id}
                    username={value.username}
                    userId={value.user_id}
                    image={value.image}
                    link={value.link}
                    description={value.description}
                    likes={value.likes}
                    hashtags={value.hashtags}
                  />
                ))
              )}
            </PostsSection>
          </TimelineContainer>
          <TrendSideBar />
        </PageContent>
      </MainWrapper>
    </Overlap>
  );
}

const MainWrapper = styled.main`
  margin-top: 72px;
`;

const HashtagTitle = styled(TimelineTitle)`
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const Overlap = styled.div`
  min-height: calc(100vh - 72px);

  z-index: 10;
`;
const PageContent = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);
`;
