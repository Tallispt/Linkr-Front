import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../context/userContext";
import { commentOnPost, handleTextAreaHeight } from "../services/linkr";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Comments = ({ id, comments, postUser, showComments }) => {
  const { refresh, setRefresh } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [following, setFollowing] = useState([]);

  const user = JSON.parse(localStorage.getItem("linkr"));

  async function handleSubmit() {
    const body = { comment };
    try {
      await commentOnPost({ body, id });
    } catch (error) {
      alert("Comment could not be posted");
    }
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await handleSubmit();
      setRefresh(!refresh);
    }
  }

  return (
    <Wrapper showComments={showComments}>
      {comments.map((value) => (
        <Comment key={value.id}>
          <img src={value.image} alt="" />
          <div>
            <h1>
              {value.username}{" "}
              <span>
                {value.username === postUser
                  ? "• post's author"
                  : following.includes(value.username)
                  ? "• following"
                  : ""}
              </span>
            </h1>
            <p>{value.comment}</p>
          </div>
        </Comment>
      ))}
      <div>
        <img src={user.image} alt="" />
        <InputWrapper>
          <CommentInput
            placeholder="write a comment..."
            value={comment}
            onKeyDown={(event) => handleKeyDown(event)}
            onChange={(event) => {
              setComment(event.target.value);
              handleTextAreaHeight(event);
            }}
            maxLength="255"
          />
          <PaperPlane onClick={handleSubmit} />
        </InputWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 82px;
  background-color: #1e1e1e;
  padding: 0 20px 22px 20px;
  border-radius: 16px;
  ${(props) => !props.showComments && "display: none;"}
  > div {
    padding-right: 3px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 14px;
    column-gap: 14px;
    div {
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  > div:last-child {
    padding-top: 19px;
  }
  img {
    margin-left: 5px;
    width: 39px;
    height: 39px;
    border-radius: 50%;
  }
`;

const Comment = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #353535;
  p {
    font-size: 14px;
    color: #acacac;
  }
  h1 {
    font-size: 14px;
    font-weight: 700;
    color: #f3f3f3;
    span {
      font-weight: 400;
      color: #565656;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CommentInput = styled.textarea`
  font-family: "Lato";
  width: 100%;
  height: 39px;
  background: #252525;
  border-radius: 8px;
  resize: none;
  padding: 11px 55px 11px 15px;
  overflow: hidden;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #acacac;
  border: none;

  ::placeholder {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
  }

  :focus {
    outline: none;
  }
`;

const PaperPlane = styled(IoPaperPlaneOutline)`
  color: #f3f3f3;
  font-size: 22px;
  position: absolute;
  top: 10px;
  right: 16.5px;
  cursor: pointer;
`;

export default Comments;
