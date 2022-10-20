import styled from "styled-components";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <HeaderBox>
      <Wrap>
        <Title>linkr</Title>
        <SearchBar placeholder={"Search for people"} />
        <Image></Image>
      </Wrap>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  font-family: "Passion One";
  height: 72px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 45px;
`;

const Image = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: red;
`;
