import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { device } from "../common/breakpoint";
import { Header } from "../components/Header";
import Post from "../components/Post";
import { MobileSearchBar } from "../components/SearchBar/MobileSearchBar";
import {
  Message,
  PostsSection,
  TimelineContainer,
  TimelineTitle,
} from "../components/Timeline";
import { getUserPosts } from "../services/linkr";

export default function UserPage() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const { id } = useParams();

  const [alterIcon, setAlterIcon] = useState(false);

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  useEffect(() => {
    setLoader(true);
    getUserPosts(id)
      .then((res) => {
        setUser(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
        setError(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [id]);

  return (
    <Overlap onClick={handleIcon}>
      <MainWrapper>
        <Header alterIcon={alterIcon} setAlterIcon={setAlterIcon} />
        <MobileSearchBar />
        <TimelineContainer>
          <UserTitle>
            <img src={user.image} alt="" />
            <span>{user.username}'s posts</span>
          </UserTitle>
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
            ) : user.posts?.length === 0 ? (
              <Message>There are no posts yet</Message>
            ) : (
              user.posts?.map((value) => (
                <Post
                  key={value.id}
                  id={value.id}
                  username={value.username}
                  user_id={value.user_id}
                  image={value.image}
                  link={value.link}
                  description={value.description}
                  likes={value.likes}
                />
              ))
            )}
          </PostsSection>
        </TimelineContainer>
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
  margin-top: 40px;
  margin-bottom: 48px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
    margin-right: 18px;
  }
  @media screen and (${device.laptop}) {
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
