import { useEffect, useState, useContext } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { device } from "../common/breakpoint";
import UserContext from "../context/userContext";
import { getFollowers, getTimeline } from "../services/linkr";
import DeleteModal from "./DeleteModal";
import Post from "./Post";
import { PublishPost } from "./PublishPost";
import InfiniteScroll from 'react-infinite-scroller';

export function Timeline() {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState();
  const { refresh } = useContext(UserContext);
  const [cut, setCut] = useState(0);
  const [areMorePosts, setAreMorePosts] = useState(true);


  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      try {
        
        const timelineData = (await getTimeline(0)).data;
        const followersData = (await getFollowers()).data;
        setPosts(timelineData);
        setFollowers(followersData);
        setLoader(false);
        setCut(cut + timelineData.length);
        if (timelineData.length === 0) {
          setAreMorePosts(false);
      }
      
      } catch (error) {
        console.log(error.message);

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

  return (
    <TimelineContainer isModalVisible={isModalVisible}>
      <TimelineTitle>timeline</TimelineTitle>
      <PublishPost />
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
        ) : posts.length === 0 && followers.length === 0 ? (
          <Message>
            You don't follow anyone yet. Search for new friends!
          </Message>
        ) : posts.length === 0 && followers.length !== 0 ? (
          <Message>No posts found from your friends.</Message>
        ) : (
          posts.map((value) => (
            <Post
              key={value.id}
              id={value.id}
              username={value.username}
              userId={value.user_id}
              image={value.image}
              link={value.link}
              description={value.description}
              hashtags={value.hashtags}
              likes={value.likes}
              comments={value.comments}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              setPostIdDelete={setPostIdDelete}
            />
          ))
        )}
        
      </PostsSection></InfiniteScroll>
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