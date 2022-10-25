import { useEffect, useState, useContext } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { device } from "../common/breakpoint";
import UserContext from "../context/userContext";
import { getFollowers, getTimeline } from "../services/linkr";
import Modal from "./Modal";
import Post from "./Post";
import { PublishPost } from "./PublishPost";

export function Timeline() {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('repostType')
  const [postId, setPostId] = useState();
  const { refresh } = useContext(UserContext);

  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      try {
        const timelineData = (await getTimeline()).data;
        const followersData = (await getFollowers()).data;
        setPosts(timelineData);
        setFollowers(followersData);

        setLoader(false);
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

  return (
    <TimelineContainer >
      <TimelineTitle>timeline</TimelineTitle>
      <PublishPost />
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
      {
        isModalVisible ?
          <Modal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            postId={postId}
            setPostId={setPostId}
            modalType={modalType}
          /> :
          <></>
      }
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
