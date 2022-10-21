import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { getTimeline } from "../services/linkr";
import DeleteModal from "./DeleteModal";
import Post from "./Post";
import { PublishPost } from "./PublishPost";

export function Timeline() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState()

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
    <Container isModalVisible={isModalVisible}>
      <Title>timeline</Title>
      <PublishPost refresh={refresh} setRefresh={setRefresh} />
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
              image={value.image}
              link={value.link}
              description={value.description}
              likes={value.likes}
              refresh={refresh}
              setRefresh={setRefresh}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              setPostIdDelete={setPostIdDelete}
            />
          ))
        )}
      </PostsSection>
      {isModalVisible
        ? <DeleteModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          postIdDelete={postIdDelete}
          setPostIdDelete={setPostIdDelete}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        : <></>}
    </Container>
  );
}

const Container = styled.section`
  margin-top: 20px;
  width: 611px;
  /* pointer-events: ${props => props.isModalVisible ? 'none' : 'inherit'}; */

  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const Title = styled.h1`
  margin-inline: auto;
  font-family: "Oswald";
  font-weight: 700;
  color: #ffffff;
  font-size: 43px;
  @media screen and (max-width: 600px) {
    font-size: 33px;
    padding-left: 17px;
  }
`;

const PostsSection = styled.section`
  margin-top: 29px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  @media screen and (max-width: 600px) {
    margin-top: 16px;
  }
`;

const Message = styled.h6`
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
  max-width: 300px;
`;
