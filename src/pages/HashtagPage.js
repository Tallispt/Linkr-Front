import { useEffect, useState, useContext } from "react";
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
import Modal from "../components/Modal";
import UserContext from "../context/userContext";
import InfiniteScroll from 'react-infinite-scroller';
import { verifyFollowers } from "../services/linkr";

export default function HashtagPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postId, setPostId] = useState();
  const [modalType, setModalType] = useState('repostType')

  const { hashtag } = useParams();
  const { refresh, setFollowing, following } = useContext(UserContext);


  useEffect(() => {
    (async () => {
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

  const [alterIcon, setAlterIcon] = useState(false);
  const [cut, setCut] = useState(0);
  const [areMorePosts, setAreMorePosts] = useState(true);

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  useEffect(() => {
    setLoader(true);
    getHashtagsPosts(hashtag, cut)
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
  }, [hashtag, refresh]);
  async function morePosts() {

    try {
      const newData = (await getHashtagsPosts(hashtag, cut)).data;
      setLoader(false);

      setPosts([...posts, ...newData]);
      console.log(cut);
      if (newData.length === 0) {
        setAreMorePosts(false);
      }
      setCut(cut + newData.length);
    } catch (error) {
      console.log(error.message);

      setLoader(false);
      setError(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }


  }

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
            <InfiniteScroll
              pageStart={0}
              loadMore={morePosts}
              hasMore={areMorePosts}
              loader={<Warning key={0}>Loading more posts...</Warning>}
            >
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
                  posts?.map((value, index) => (
                    <Post
                      key={index}
                      id={value.id}
                      username={value.username}
                      userId={value.user_id}
                      image={value.image}
                      link={value.link}
                      description={value.description}
                      hashtags={value.hashtags}
                      likes={value.likes}
                      comments={value.comments}
                      repostsNumber={value.repost_count}
                      sharedById={value.shared_by_id}
                      sharedByUsername={value.shared_by_username}
                      setModalType={setModalType}
                      isModalVisible={isModalVisible}
                      setIsModalVisible={setIsModalVisible}
                      setPostId={setPostId}
                    />
                  ))
                )}
              </PostsSection>
            </InfiniteScroll>
            {isModalVisible ? (
              <Modal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                postId={postId}
                setPostId={setPostId}
                modalType={modalType}
              />
            ) : (
              <></>
            )}
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
const Warning = styled.div`
    color:white;
    width: 100%;
    margin-bottom: 200px;    
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Lato;
    font-size: 22px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.05em;
`