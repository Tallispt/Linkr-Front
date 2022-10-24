import { useEffect, useState, useContext } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { device } from "../common/breakpoint";
import UserContext from "../context/userContext";
import { getTimeline } from "../services/linkr";
import DeleteModal from "./DeleteModal";
import Post from "./Post";
import { PublishPost } from "./PublishPost";

export function Timeline() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState();
  const { refresh } = useContext(UserContext)

  useEffect(() => {
    setLoader(true);
    getTimeline()
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
  }, [refresh]);

  return (
    <TimelineContainer isModalVisible={isModalVisible}>
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
        ) : posts.length === 0 ? (
          <Message>There are no posts yet</Message>
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
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              setPostIdDelete={setPostIdDelete}
            />
          ))
        )}
      </PostsSection>
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
  // row-gap: 16px;
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
