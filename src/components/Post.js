import { useEffect, useState } from "react";
import styled from "styled-components";
import mql from "@microlink/mql";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { TiPencil } from "react-icons/ti";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { ReactTagify } from "react-tagify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoChatbubblesOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { TbRepeat } from "react-icons/tb"
import EditableInput from "./EditableInput";
import { dislikePost, likePost } from "../services/linkr";
import { device } from "../common/breakpoint";
import Comments from "./Comments";

export default function Post({
  id,
  username,
  userId,
  image,
  link,
  description,
  hashtags,
  likes,
  comments,
  repostsNumber,
  sharedById,
  sharedByUsername,
  setModalType,
  isModalVisible,
  setIsModalVisible,
  setPostId,
}) {
  const user = JSON.parse(localStorage.getItem("linkr"));

  const [metadata, setMetadata] = useState({});
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const descriptionWords = description.split(" ");

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
    <PostWrapper>
      {
        sharedById
          ? <RepostTopWrapper>
            <TbRepeat />
            Reposted by
            {
              sharedById === userId
                ? <strong>you</strong>
                : <Link to={`/user/${sharedById}`}>
                  <strong>{sharedByUsername}</strong>
                </Link>
            }
          </RepostTopWrapper>
          : null
      }
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
          <CommentWrapper onClick={() => setShowComments(!showComments)}>
            <div >
              <IoChatbubblesOutline />
              <IoEllipsisHorizontal />
            </div>
            <p>
              {comments.length > 1
                ? `${comments.length} comments`
                : `${comments.length} comment`}
            </p>
          </CommentWrapper>
          <RepostWrapper >
            <TbRepeat
              cursor="pointer"
              onClick={() => {
                setPostId(id)
                setModalType('repostType')
                setIsModalVisible(!isModalVisible)
              }}
            />
            <p>{repostsNumber > 1
              ? `${repostsNumber} re-posts`
              : `${repostsNumber} re-post`
            }</p>
          </RepostWrapper>
        </LeftWrapper>
        <ContentWrapper>
          <TopWrapper user={user.username} username={username}>
            <Link to={`/user/${userId}`}>
              <h2>{username}</h2>
            </Link>
            <span>
              <TiPencil onClick={() => setIsEditing(!isEditing)} />
              <RiDeleteBin7Fill
                onClick={() => {
                  setPostId(id)
                  setModalType('deleteType')
                  setIsModalVisible(!isModalVisible);
                }}
              />
            </span>
          </TopWrapper>
          {!isEditing ? (
            <p>
              {descriptionWords.map((word, i) => {
                if (hashtags.includes(word.slice(1))) {
                  return (
                    <ReactTagify key={i} tagStyle={tagStyle}>
                      <Link to={`/hashtag/${word.slice(1)}`}>{`${word}`}</Link>
                    </ReactTagify>
                  );
                } else return <span key={i}>{`${word} `}</span>;
              })}
            </p>
          ) : (
            <EditableInput
              id={id}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              description={description}
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
      <Comments
        id={id}
        comments={comments}
        postUser={username}
        showComments={showComments}
      />
    </PostWrapper >
  );
}

const PostWrapper = styled.div`
  width: 100%;
  min-height: 240px;
  border-radius: 16px;
  background-color: #1e1e1e;
  
  strong {
    color: #FFFFFF;
    margin-left: 0.18rem;
    font-weight: bold;
  }

  @media screen and (${device.tablet}) {
    min-height: 200px;
    border-radius: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 240px;
  padding: 17px 21px 20px 0px;
  display: flex;
  background-color: #171717;
  border-radius: 16px;
  .tooltip {
    font-weight: 700;
  }
  @media screen and (${device.tablet}) {
    min-height: 200px;
    border-radius: 0;
    padding: 9px 18px 15px 0px;
  }
`;

const LeftWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 86px;
  max-width: 86px;
  gap: 15px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 19px;
  }
  @media screen and (${device.tablet}) {
    min-width: 68px;
    max-width: 68px;
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

const CommentWrapper = styled(LikeWrapper)`
  div {
    position: relative;
    cursor: pointer;
  }
  svg {
    font-size: 22px;
    transform: scaleX(-1);
  }
  svg:nth-child(2) {
    font-size: 7.5px;
    position: absolute;
    top: 5px;
    left: 6px;
  }
`;

const RepostWrapper = styled(LikeWrapper)``

const RepostTopWrapper = styled.div`
  color: #FFFFFF;
  padding: 10px 13px;

  svg {
    margin-right: 0.5rem;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-word;
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
    margin-top: 12px;
    width: 100%;
    height: 12px;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (${device.tablet}) {
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
    display: ${props => props.user === props.username ? 'flex' : 'none'};
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
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
    div:first-child {
      width: 60%;
    }
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
