import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import { getTrends } from "../services/linkr";

export default function TrendSideBar() {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    getTrends()
      .then((res) => {
        setTrends(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const tagStyle = {
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <Sidebar>
      <div>
        <h2>trending</h2>
      </div>
      <Hashtags>
        {trends?.map((hashtag) => (
          <ReactTagify tagStyle={tagStyle}>
            <Link to={`/hashtag/${hashtag.name}`}>{`#${hashtag.name}`}</Link>
          </ReactTagify>
        ))}
      </Hashtags>
    </Sidebar>
  );
}
export const Sidebar = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  color: #ffffff;
  box-sizing: border-box;
  background-color: #171717;
  position: sticky;
  margin-left: 35px;
  top: 210px;
  h2 {
    width: 100%;
    padding: 10px;
    font-size: 27px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
  }
  div:first-child {
    height: 61px;
    border-bottom: 1px solid #484848;
    padding-left: 10px;
    display: flex;
    align-items: center;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
export const Hashtags = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 20px;
  line-height: 28px;
`;
