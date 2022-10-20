import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { ReactTagify } from "react-tagify";
import mql from "@microlink/mql";
import { useEffect, useState } from "react";

export default function Post({
  id,
  username,
  image,
  link,
  description,
  likes,
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
  console.log(metadata);

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
        <ReactTagify tagStyle={tagStyle}>
          <p>{description}</p>
        </ReactTagify>
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
    width: 503px;
    height: 155px;
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
      width: 300px;
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
    height: 155px;
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
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
