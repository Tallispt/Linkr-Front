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
import Modal from "../components/Modal";
import { getUserPosts, follow, unfollow } from "../services/linkr";
import UserContext from "../context/userContext";
import InfiniteScroll from 'react-infinite-scroller';
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { verifyFollowers } from "../services/linkr";

let userId;

export default function UserPage() {

  const { refresh } = useContext(UserContext);
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postId, setPostId] = useState();
  const [modalType, setModalType] = useState('repostType')
  const [followOrUnfollow, setFollowOrUnfollow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [alterIcon, setAlterIcon] = useState(false);
  const [cut, setCut] = useState(0);
  const [areMorePosts, setAreMorePosts] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    VerifyFollower(id);
    setLoadingPage(false);
    setLoading(false);
    userId = JSON.parse(localStorage.getItem("linkr")).id;
  }, [id]);

  useEffect(() => {
    setLoader(true);
    getUserPosts(id, cut)
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

  async function VerifyFollower(id) {
    try {
      const response = (await verifyFollowers()).data;

      const { followers_id } = response;

      if (followers_id.includes(Number(id))) return setFollowOrUnfollow(true);
      else return setFollowOrUnfollow(false);

    } catch (error) {

      console.log(error);

    }
  };

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  async function handleFollow() {
    const body = { id: id }
    setLoading(true);

    if (followOrUnfollow) {

      try {

        const data = (await unfollow(body)).data;

        toast.warn(data.message);

        setLoading(false);

        setFollowOrUnfollow(false);

      } catch (error) {

        const { response } = error;

        toast.error(response.data.message);

        setLoading(false);

      }

    } else {

      try {

        const data = (await follow(body)).data;

        toast.success(data.message);

        setLoading(false);

        setFollowOrUnfollow(true)

      } catch (error) {

        const { response } = error;

        toast.error(response.data.message);

        setLoading(false);

      }
    }
  }

  async function morePosts() {

    try {
      const newData = (await getUserPosts(id, cut)).data;
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
        {
          loadingPage && loadingPage === true ?
            <Loader>
              <ClipLoader
                color={"#FFFFFF"}
                loading={loadingPage}
                cssOverride={""}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Loader>
            :
            <PageContent>
              <TimelineContainer isModalVisible={isModalVisible}>
                <UserTitle>
                  <div className="infoUser">
                    <img src={user.image} alt="" />
                    <span>{user.username}'s posts</span>
                  </div>
                  {
                    userId === Number(id) ?
                      ""
                      :
                      followOrUnfollow ?
                        <button
                          className={`unfollow ${loading && loading === true ? "disabled_button" : ""}`}
                          onClick={handleFollow}
                          disabled={loading && loading === true ? true : false}
                        >
                          {loading && loading === true ? (
                            <BeatLoader
                              color={"#1877F2"}
                              loading={loading}
                              cssOverride={""}
                              size={10}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            "Unfollow"
                          )}
                        </button>
                        :
                        <button
                          className={`follow ${loading && loading === true ? "disabled_button" : ""}`}
                          onClick={handleFollow}
                          disabled={loading && loading === true ? true : false}
                        >
                          {loading && loading === true ? (
                            <BeatLoader
                              color={"#FFFFFF"}
                              loading={loading}
                              cssOverride={""}
                              size={10}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            "Follow"
                          )}
                        </button>
                  }
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
                    ) : user.posts?.length === 0 ? (
                      <Message>There are no posts yet</Message>
                    ) : (
                      user.posts?.map((value) => (
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
        }
      </MainWrapper>
    </Overlap >
  );
}

const MainWrapper = styled.main`
  margin-top: 72px;
`;

const UserTitle = styled(TimelineTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 41px;
  width: 937px;
  .infoUser {
    align-items: center;
    
    display: flex;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 20px;
    margin-right: 18px;
  }
  .follow, .unfollow {
    width: 112px;
    height: 31px;
    border-radius: 5px;
    border: none;
    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }
  .unfollow {
    background-color: #FFFFFF;
    color: #1877F2;
  }
  .follow {
    background-color: #1877F2;
    color: #FFFFFF;
  }
  // Campos desabilitados
  .disabled_button {
    opacity: 0.7;
  }
  @media screen and (${device.laptop}) {
    width: 100%;

    button {
      margin-right: 18px;
    }
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

const Loader = styled.div`
  width: 937px;
  height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (${device.laptop}) {
    width: 100%;
  }
`;
