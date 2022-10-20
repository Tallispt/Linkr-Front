import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { ReactTagify } from "react-tagify";

export default function Post({
  id,
  username,
  image,
  link,
  description,
  likes,
}) {
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
`;
