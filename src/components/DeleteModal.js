import { useContext, useState } from "react";
import styled from "styled-components";
import { HashLoader } from "react-spinners";

import { deletePost } from "../services/linkr";
import { device } from "../common/breakpoint";
import UserContext from "../context/userContext";

const DeleteModal = ({
  isModalVisible,
  setIsModalVisible,
  postIdDelete,
  setPostIdDelete
}) => {
  const { refresh, setRefresh } = useContext(UserContext)
  const [isLoading, setIsEditing] = useState(false);

  async function confirmDeletePost() {
    setIsEditing(!isLoading);
    try {
      await deletePost(postIdDelete);
      setIsEditing(!isLoading);
      setPostIdDelete(undefined);
      setIsModalVisible(!isModalVisible);
      setRefresh(!refresh);
    } catch (error) {
      setIsModalVisible(!isModalVisible);
      alert("Post could not be deleted");
    }
  }

  return (
    <Container>
      <div>
        {isLoading ? (
          <HashLoader color="#FFFFFF" size={100} />
        ) : (
          <>
            <h2>Are you sure you want to delete this post?</h2>
            <span>
              <button
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#1877F2",
                }}
                onClick={() => setIsModalVisible(!isModalVisible)}
              >
                No, go back
              </button>
              <button
                style={{
                  backgroundColor: "#1877F2",
                  color: "#FFFFFF",
                }}
                onClick={confirmDeletePost}
              >
                Yes, delete it
              </button>
            </span>
          </>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  display: flex;
  background-color: #ffffff;
  color: #1877f2;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);

  div {
    display: flex;
    flex-direction: column;
    padding: 38px 0;
    gap: 40px;
    align-items: center;
    justify-content: center;
    width: 597px;
    height: 262px;
    background: #333333;
    border-radius: 50px;
  }

  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #ffffff;
    max-width: 400px;
  }

  span {
    display: flex;
    gap: 27px;
  }

  button {
    width: 134px;
    height: 37px;
    border: none;
    border-radius: 5px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    cursor: pointer;
  }

  @media screen and (${device.laptop}) {
    width: 100%;
    div {
      margin: 30px;
      gap: 20px;
    }
    h2 {
      font-size: 1.6rem;
      min-width: 300px;
    }
    span {
      flex-direction: column;
      gap: 15px;
    }
    button {
      width: 200px;
      height: 50px;
    }
  }
`;

export default DeleteModal;
