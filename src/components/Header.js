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
  @media screen and (max-width: 600px) {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Wrap = styled.div`
  width: 100%;
  padding: 0 17px 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    padding-right: 14px;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 49px;
  font-weight: 700;
  @media screen and (max-width: 600px) {
    font-size: 45px;
  }
`;

const Image = styled.div`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background-color: red;
  @media screen and (max-width: 600px) {
    width: 44px;
    height: 44px;
  }
`;
