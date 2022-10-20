import styled from "styled-components";

export function Header() {
  return (
    <HeaderBox>
      <Wrap>
        <Title>linkr</Title>
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
  width: 100%;
  padding: 0 17px 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 49px;
  font-weight: 700;
`;

const Image = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: red;
`;
