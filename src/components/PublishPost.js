import { useState } from "react";
import styled from "styled-components";
import { device } from "../common/breakpoint";
import { newPost } from "../services/linkr";

export function PublishPost({ refresh, setRefresh }) {
  const user = JSON.parse(localStorage.getItem("linkr"));

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
    setError({
      isError: false,
      message: "",
    });
    setLoading(!loading);

    try {
      await newPost(postBody);
      setLoading(false);
      setPostBody({
        link: "",
        description: "",
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
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

  function handleDescriptionSize(e) {
    const height = e.target.scrollHeight
    e.target.style.height = `${height}px`;
  }

  return (
    <Container>
      <ContentBox>
        <Title>What are you going to share today?</Title>
        <Box>
          <Image src={user.image} alt="Profile image" />
          <Form onSubmit={e => {
            sendForm(e)
            e.target.children[1].style.height = '66px'
          }}>
            <input
              disabled={loading}
              type="text"
              name="link"
              value={postBody.link}
              onChange={handleInput}
              placeholder="http://"
              required
            />
            <Input
              disabled={loading}
              type="text"
              name="description"
              value={postBody.description}
              onChange={e => {
                handleInput(e)
                handleDescriptionSize(e)
              }}
              placeholder="Awesome article about #javascript"
              maxLength="500"
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
  margin-top: 43px;
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

  @media screen and (${device.laptop}) {
    border-radius: 0;
  }
`;

const Box = styled.div`
  display: flex;
`;

const ContentBox = styled.div`
  padding: 20px;

  @media screen and (${device.laptop}) {
    padding: 14px;
  }
`;

const Title = styled.h1`
  text-align: left;
  color: #707070;
  margin-bottom: 10px;
  margin-left: 60px;
  font-size: 20px;

  @media screen and (${device.laptop}) {
    text-align: center;
    font-size: 17px;
    margin-left: 0px;
  }
`;

const Image = styled.img`
  margin-top: -30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;

  @media screen and (${device.laptop}) {
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

  input::placeholder{
      font-family: 'Lato';
      font-weight: 300;
      color: #949494;
    }

  h4 {
    font-size: 15px;
    color: red;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 10px;
    text-align: center;
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

  @media screen and (${device.laptop}) {
    height: 22px;
  }
`;

const Input = styled.textarea`
    font-family: 'Lato';
    overflow: hidden;
    resize: none;
    margin-top: 5px;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    background-color: #efefef;
    height: 66px;
    padding: 8px;

    ::placeholder{
      font-family: 'Lato';
      font-weight: 300;
      color: #949494;
    }

    @media screen and (${device.laptop}) {
      height: 57px;
  }
`