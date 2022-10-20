import { useState } from "react";
import styled from "styled-components";
import { newPost } from "../services/linkr";

export function PublishPost() {
  const [postBody, setPostBody] = useState({
    link: "",
    description: "",
  });

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  async function sendForm(e) {
    e.preventDefault();
    setLoading(!loading);

    try {
      await newPost(postBody);
      setLoading(false);
      setPostBody({
        link: "",
        description: "",
      });
    } catch (error) {
      setError({
        isError: true,
        message: "There was an error publishing your link.",
      });
      setLoading(false);
    }
  }

  function handleInput(e) {
    const value = e.target.value;
    setPostBody({ ...postBody, [e.target.name]: value });
  }

  return (
    <Container>
      <ContentBox>
        <Title>What are you going to share today?</Title>
        <Box>
          <Image></Image>
          <Form onSubmit={sendForm}>
            <input
              disabled={loading}
              type="text"
              name="link"
              value={postBody.link}
              onChange={handleInput}
              placeholder="http://"
              required
            />
            <input
              disabled={loading}
              type="text"
              name="description"
              value={postBody.description}
              onChange={handleInput}
              placeholder="Awesome article about #javascript"
            />
            {error.isError ? <h4>{error.message}</h4> : <></>}
            <Wrap>
              <Button disabled={loading} type="submit">
                {loading ? "Publishing..." : "Publish"}
              </Button>
            </Wrap>
          </Form>
        </Box>
      </ContentBox>
    </Container>
  );
}

const Container = styled.section`
  font-family: "Lato";
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 16px;
  margin-inline: auto;

  @media screen and (max-width: 420px) {
    width: 100vw;
    min-height: 190px;
  }

  @media screen and (min-width: 600px) {
    width: 611px;
  }

  @media screen and (max-width: 600px) {
    border-radius: 0;
  }
`;

const Box = styled.div`
  display: flex;
`;

const ContentBox = styled.div`
  padding: 20px;

  @media screen and (max-width: 600px) {
    padding: 14px;
  }
`;

const Title = styled.h1`
  text-align: left;
  color: #707070;
  margin-bottom: 10px;
  margin-left: 55px;
  font-size: 20px;

  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 17px;
    margin-left: 0px;
  }
`;

const Image = styled.div`
  margin-top: -30px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: red;
  margin-right: 15px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    font-size: 15px;
    border: none;
    border-radius: 5px;
    background-color: #efefef;
    height: 40px;
    padding-left: 8px;
  }

  input:nth-child(2) {
    margin-top: 5px;
    height: 67px;
  }

  h4 {
    font-size: 15px;
    color: red;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 10px;
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    input:nth-child(2) {
      height: 57px;
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Button = styled.button`
  font-family: "Lato";
  margin-top: 8px;
  height: 31px;
  width: 112px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 500;
  background-color: ${(props) => (props.disabled ? "#87b8f8" : "#1877F2")};

  @media screen and (max-width: 600px) {
    height: 22px;
  }
`;
