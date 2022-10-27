import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { device } from "../common/breakpoint";
import { Header } from "../components/Header";
import Post from "../components/Post";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";
import TrendSideBar from "../components/TrendSideBar";
import {
  Message,
  PostsSection,
  TimelineContainer,
  TimelineTitle,
} from "../components/Timeline";
import { getUserPosts } from "../services/linkr";
import DeleteModal from "../components/DeleteModal";
import UserContext from "../context/userContext";
import InfiniteScroll from 'react-infinite-scroller';




export default function UserPage() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState();

  const { refresh } = useContext(UserContext);

  const { id } = useParams();

  const [alterIcon, setAlterIcon] = useState(false);
  const [cut, setCut] = useState(0);
  const [areMorePosts, setAreMorePosts] = useState(true);
  const [posts, setPosts] = useState([]);

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  useEffect(() => {
    setLoader(true);
    getUserPosts(id,cut)
      .then((res) => {
        setUser(res.data);
        setPosts(res.data.posts);
        setLoader(false);
        setCut(cut + res.data.posts.length);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
        setError(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [id, refresh]);

  async function morePosts() {
  
    try {
      const newData = (await  getUserPosts(id,cut)).data;
      setLoader(false);

      setPosts([...posts, ...newData.posts]);
      
        if (newData.posts.length === 0) {
          setAreMorePosts(false);
      }
      setCut(cut + newData.posts.length);
      console.log(cut);
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
          <TimelineContainer isModalVisible={isModalVisible}>
            <UserTitle>
              <img src={user.image} alt="" />
              <span>{user.username}'s posts</span>
            </UserTitle>
            <InfiniteScroll
              pageStart={0}
              loadMore={morePosts}
               hasMore={areMorePosts}
                loader={<Warning key={0}>Loading more posts...</Warning>}>
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
                    comments={value.comments}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    setPostIdDelete={setPostIdDelete}
                  />
                ))
              )}
            </PostsSection>
            </InfiniteScroll>
            {isModalVisible ? (
              <DeleteModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                postIdDelete={postIdDelete}
                setPostIdDelete={setPostIdDelete}
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

const UserTitle = styled(TimelineTitle)`
  display: flex;
  align-items: center;
  margin-bottom: 41px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
    margin-right: 18px;
  }
  @media screen and (${device.tablet}) {
    margin-top: 10px;
    margin-bottom: 20px;
    img {
      width: 40px;
      height: 40px;
      margin-left: 0;
      margin-right: 14px;
    }
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