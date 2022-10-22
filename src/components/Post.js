import { useEffect, useState } from "react";
import styled from "styled-components";
import mql from "@microlink/mql";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { TiPencil } from "react-icons/ti";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ReactTagify } from "react-tagify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import EditableInput from "./EditableInput";
import { dislikePost, likePost } from "../services/linkr";
import { device } from "../common/breakpoint";

export default function Post({
  id,
  username,
  userId,
  image,
  link,
  description,
  hashtags,
  likes,
  refresh,
  setRefresh,
  isModalVisible,
  setIsModalVisible,
  setPostIdDelete,
}) {
  const user = JSON.parse(localStorage.getItem("linkr"));

  const [metadata, setMetadata] = useState({});
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userLiked = likes.filter((like) => like === user.username).length;
  useEffect(() => {
    if (userLiked > 0) {
      setLike(true);
    }
    const getMetadata = async () => {
      const { data } = await mql(link, { meta: "true" });
      setMetadata(data);
    };
    getMetadata();
  }, [link, userLiked]);

  let tooltip;

  switch (true) {
    case likeCount === 0:
      tooltip = "Nobody has ";
      break;
    case like && likeCount === 1:
      tooltip = "You ";
      break;
    case like && likeCount > 1:
      tooltip = `You, ${likes[0] === user.username ? likes[1] : likes[0]} `;
      break;
    case !like && likeCount === 1:
      tooltip = `${likes[0]} `;
      break;
    case !like && likeCount > 1:
      tooltip = `${likes[0]}, ${likes[1]} `;
      break;
    default:
      return;
  }

  tooltip +=
    likeCount > 2
      ? likeCount > 3
        ? `and ${likeCount - 2} other people `
        : "and 1 other person "
      : "";
  tooltip += "liked this post";

  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  async function LikeOrDislikePost(option) {
    if (option === "like" && disabled === false) {
      setDisabled(true);
      setLike(true);
      try {
        await likePost({ postId: id });
        setDisabled(false);
      } catch (error) {
        setDisabled(false);
        console.log(error);
      }
    }
    if (option === "dislike" && disabled === false) {
      setDisabled(true);
      setLike(false);
      try {
        await dislikePost({ postId: id });
        setDisabled(false);
      } catch (error) {
        setDisabled(false);
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <LeftWrapper>
        <Link to={`/user/${userId}`}>
          <img src={image} alt="" />
        </Link>
        <LikeWrapper>
          {like ? (
            <AiFillHeart
              cursor="pointer"
              size={30}
              color="#AC0000"
              onClick={() => {
                LikeOrDislikePost("dislike");
                setLikeCount(likeCount - 1);
              }}
            />
          ) : (
            <AiOutlineHeart
              cursor="pointer"
              size={30}
              onClick={() => {
                LikeOrDislikePost("like");
                setLikeCount(likeCount + 1);
              }}
            />
          )}
          <p data-for="like" data-tip={tooltip}>
            {likes.length > 1 ? `${likeCount} likes` : `${likeCount} like`}
          </p>
        </LikeWrapper>
        <ReactTooltip
          id="like"
          place="bottom"
          type="light"
          effect="solid"
          textColor="#505050"
          multiline={true}
          className="tooltip"
        />
      </LeftWrapper>
      <ContentWrapper>
        <TopWrapper>
          <Link to={`/user/${userId}`}>
            <h2>{username}</h2>
          </Link>
          <span>
            {user.username === username ? (
              <>
                <TiPencil onClick={() => setIsEditing(!isEditing)} />
                <RiDeleteBin7Fill
                  onClick={() => {
                    setIsModalVisible(!isModalVisible);
                    setPostIdDelete(id);
                  }}
                />
              </>
            ) : (
              <></>
            )}
          </span>
        </TopWrapper>
        {!isEditing ? (
          <p>{description} {hashtags?.map((hashtag)=>(
            <ReactTagify tagStyle={tagStyle}>
           <Link to={`/hashtag/${hashtag}`}>
             {`#${hashtag}`}
             </Link>
            </ReactTagify>))}</p>
        ) : (
          <EditableInput
            id={id}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            description={description}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        <MetadataWrapper href={link} target="_blank" rel="noreferrer">
          <div>
            <h1>{metadata.title}</h1>
            <span>{metadata.description}</span>
            <h4>{metadata.url}</h4>
          </div>
          <ImageContainer>
            <img src={metadata.image?.url} alt="" />
          </ImageContainer>
        </MetadataWrapper>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 240px;
  padding: 17px 21px 20px 18px;
  display: flex;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 16px;
  .tooltip {
    font-weight: 700;
  }
  @media screen and (${device.tablet}) {
    min-height: 200px;
    border-radius: 0;
    padding: 9px 18px 15px 15px;
  }
`;

const LeftWrapper = styled.div`
  height: 100%;
  width: 50px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 19px;
  }
  @media screen and (${device.tablet}) {
    width: 40px;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 17px;
    }
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  svg {
    font-size: 20px;
    margin-bottom: 4px;
  }
  p {
    font-size: 11px;
    cursor: pointer;
  }
  @media screen and (${device.tablet}) {
    svg {
      font-size: 17px;
      margin-bottom: 12px;
    }
    p {
      font-size: 9px;
    }
  }
`;

const ContentWrapper = styled.div`
  margin-left: 18px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 8px;
  }
  p {
    font-size: 17px;
    color: #b7b7b7;
  }
  img {
    object-fit: cover;
    height: 100%;
    border-radius: 0px 11px 11px 0px;
  }
  h1 {
    font-size: 16px;
    color: #cecece;
  }
  h4 {
    font-size: 11px;
    color: #cecece;
    margin-top: 13px;
    width: 60%;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (${device.tablet}) {
    margin-left: 14px;
    width: calc(100% - 40px);
    p {
      font-size: 15px;
    }
    h1 {
      font-size: 11px;
    }
    h4 {
      font-size: 9px;
      margin-top: 4px;
      max-width: 100px;
    }
    img {
      /* width: 40%;
      height: calc(100% + 2px); */
    }
  }
`;

const TopWrapper = styled.span`
  color: #ffffff;
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 8px;
  }

  span {
    display: flex;
    gap: 0.5rem;
    font-size: 20px;
  }
  svg {
    cursor: pointer;
  }

  @media screen and (${device.tablet}) {
    h2 {
      font-size: 17px;
    }
  }
`;

const MetadataWrapper = styled.a`
  margin-top: 13px;
  max-width: 503px;
  min-height: 155px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  padding: 25px 182px 23px 19px;
  position: relative;

  span {
    font-size: 11px;
    color: #9b9595;
    height: 50px;
    width: 60%;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (${device.tablet}) {
    width: 100%;
    padding: 8px 122px 8px 11px;
    /* min-height: 115px; */
    span {
      font-size: 9px;
      height: 60px;
      max-width: 150px;
      min-width: 110px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 155px;
  height: calc(100% + 2px);
  border-radius: 0px 11px 11px 0px;

  @media screen and (${device.tablet}) {
    width: 40%;
    height: calc(100% + 2px);
  }
`;
