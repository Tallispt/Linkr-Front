import { useEffect, useState, useContext } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { BsArrowCounterclockwise } from "react-icons/bs";
import useInterval from "use-interval";
import { device } from "../common/breakpoint";
import UserContext from "../context/userContext";
import {
  getFollowers,
  getNewPosts,
  getTime,
  getTimeline,
} from "../services/linkr";
import Modal from "./Modal";
import Post from "./Post";
import { PublishPost } from "./PublishPost";
import InfiniteScroll from "react-infinite-scroller";


export function Timeline() {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("repostType");
  const [postId, setPostId] = useState();
  const { refresh, setRefresh } = useContext(UserContext);
  const [cut, setCut] = useState(0);
  const [areMorePosts, setAreMorePosts] = useState(true);

  const [numberOfNewposts, setNumberOfNewposts] = useState(0);

  const [lastPostsUpdate, setLastPostsUpdate] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    setNumberOfNewposts(0);
    setLoader(true);
    setAreMorePosts(true); 
    const fetchData = async () => {
      try {
        const timelineData = (await getTimeline(0)).data;
        const followersData = (await getFollowers()).data;
        const time = (await getTime()).data;
        setLastPostsUpdate(time);
        setPosts(timelineData);
        setFollowers(followersData);
        setLoader(false);
        setCut(timelineData.length);
        if (timelineData.length === 0) {
          setAreMorePosts(false);
        }
      } catch (error) {
        console.log(error.message);
        setAreMorePosts(false);
        setLoader(false);
        setError(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      }
    };

    fetchData();
  }, [refresh]);

  async function morePosts() {
    try {
      const newData = (await getTimeline(cut)).data;
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

  useInterval(async () => {
    try {
      const time = (await getTime()).data;
      setLastPostsUpdate(time);
      const newData = (await getNewPosts(lastPostsUpdate)).data;
      console.log(newData.length);
      setNumberOfNewposts((num)=>{return num + newData.length});
      setCut((newcut) =>{return newcut+ newData.length});
      console.log(newData);
      console.log(cut);
      console.log(lastPostsUpdate);
    } catch (error) {
      console.log(error.message);
    }
  }, 15000);

  return (
    <TimelineContainer>
      <TimelineTitle>timeline</TimelineTitle>
      <PublishPost />
      <InfiniteScroll
        pageStart={0}
        loadMore={morePosts}
        hasMore={areMorePosts}
        loader={<Warning key={0}>Loading more posts...</Warning>}
      >
        <PostsSection>
          {numberOfNewposts === 0 ? (
            ""
          ) : (
            <WarningNewPosts
              onClick={() => {
                setRefresh(!refresh);
                setNumberOfNewposts(0);
              }}
            >
              {numberOfNewposts} new posts, load more!
              <BsArrowCounterclockwise color="#FFFFFF" />
            </WarningNewPosts>
          )}
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
          ) : posts.length === 0 && followers.length === 0 ? (
            <Message>
              You don't follow anyone yet. Search for new friends!
            </Message>
          ) : posts.length === 0 && followers.length !== 0 ? (
            <Message>No posts found from your friends.</Message>
          ) : (
            posts.map((value, index) => (
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
  );
}

export const TimelineContainer = styled.section`
  margin-top: 53px;
  width: 611px;
  margin-bottom: 20px;

  @media screen and (${device.tablet}) {
    width: 100vw;
  }
`;

export const TimelineTitle = styled.h1`
  margin-inline: auto;
  font-family: "Oswald";
  font-weight: 700;
  color: #ffffff;
  font-size: 43px;
  @media screen and (${device.tablet}) {
    font-size: 33px;
    padding-left: 17px;
  }
`;

export const PostsSection = styled.section`
  margin-top: 29px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  @media screen and (${device.tablet}) {
    margin-top: 16px;
  }
`;

export const Message = styled.h6`
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
  max-width: 300px;
`;
const Warning = styled.div`
  color: white;
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
`;

const WarningNewPosts = styled.div`
  height: 61px;
  width: 100%;
  left: 241px;
  top: 481px;
  border-radius: 16px;
  background-color: #1877f2;
  box-shadow: 0px 4px 4px 0px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 16px;
`;
