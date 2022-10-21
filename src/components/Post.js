import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { ReactTagify } from "react-tagify";
import mql from "@microlink/mql";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post({
  id,
  username,
  image,
  link,
  description,
  likes,
  hashtags
}) {
  const [metadata, setMetadata] = useState({});

  useEffect(
    () =>
      async function getMetadata() {
        const { data } = await mql(link, { meta: "true" });
        setMetadata(data);
      },
    [link]
  );

  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <Container>
      <LeftWrapper>
        <img src={image} alt="" />
        <LikeWrapper>
          <FiHeart />
          <p>
            {likes.length > 1
              ? `${likes.length} likes`
              : `${likes.length} like`}
          </p>
        </LikeWrapper>
      </LeftWrapper>
      <ContentWrapper>
        <h2>{username}</h2>
        <p>{description}</p>
        {hashtags.map((hashtag)=>(
        <ReactTagify tagStyle={tagStyle}>
        <Link to ={'/home/'}><p>{"#"+`${hashtag}`}</p></Link>
        </ReactTagify>))}
        <a href={link} target="_blank" rel="noreferrer">
          <div>
            <h1>{metadata.title}</h1>
            <span>{metadata.description}</span>
            <h4>{metadata.url}</h4>
          </div>
          <img src={metadata.image?.url} alt="" />
        </a>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 276px;
  padding: 17px 21px 20px 18px;
  display: flex;
  background-color: #171717;
  border-radius: 16px;
  @media screen and (max-width: 600px) {
    min-height: 232px;
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
  @media screen and (max-width: 600px) {
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
  }
  @media screen and (max-width: 600px) {
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
  h2 {
    font-size: 19px;
    color: #ffffff;
    margin-bottom: 8px;
  }
  p {
    font-size: 17px;
    color: #b7b7b7;
  }
  > a {
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
  }
  img {
    position: absolute;
    top: -1px;
    right: -1px;
    width: 155px;
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

  @media screen and (max-width: 600px) {
    margin-left: 14px;
    width: calc(100% - 40px);
    h2 {
      font-size: 17px;
    }
    p {
      font-size: 15px;
    }
    > a {
      width: 90%;
      padding: 8px 122px 8px 11px;
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
      min-height: 115px;
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
      width: 40%;
      height: calc(100% + 2px);
    }
  }
`;
