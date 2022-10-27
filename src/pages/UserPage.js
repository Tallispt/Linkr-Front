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
import { getUserPosts, follow, unfollow } from "../services/linkr";
import DeleteModal from "../components/DeleteModal";
import UserContext from "../context/userContext";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { verifyFollower } from "../services/linkr";

export default function UserPage() {
  const { refresh } = useContext(UserContext);

  const { id } = useParams();

  async function VerifyFollower(id) {
    try {
        const response = (await verifyFollower()).data;

        const { followers_id } = response;

        if(followers_id.includes(Number(id))) return setFollowOrUnfollow(true);
        else return setFollowOrUnfollow(false);
    
    } catch (error) {
    
        console.log(error);
    
    }
  };

  useEffect(() => {
    VerifyFollower(id);
    setLoadingPage(false);
    setLoading(false);
  }, [id]);

  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState();
  const [ followOrUnfollow, setFollowOrUnfollow ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ loadingPage, setLoadingPage ] = useState(true);
  
  const [alterIcon, setAlterIcon] = useState(false);

  function handleIcon() {
    if (alterIcon === true) setAlterIcon(false);
  }

  /*
    function timeInterval() {
      setLoading(false);
    }
  */

  async function handleFollow() {
    const body = { id: id }

    setLoading(true);

    if(followOrUnfollow) {

      try {

        const data = (await unfollow(body)).data;

        toast.warn(data.message);

        setLoading(false);

        // setTimeout(timeInterval, 2000);

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

        // setTimeout(timeInterval, 2000);

        setFollowOrUnfollow(true)
        
      } catch (error) {
        
        const { response } = error;

        toast.error(response.data.message);

        setLoading(false);

      }
    }
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
  }, [id, refresh]);

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
                              userId={value.user_id}
                              image={value.image}
                              link={value.link}
                              description={value.description}
                              likes={value.likes}
                              hashtags={value.hashtags}
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
                    <TrendSideBar />
                  </PageContent>
        }
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