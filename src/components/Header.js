import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { DesktopSearchBar } from "./SearchBar/DesktopSearchBar";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function Header({ alterIcon, setAlterIcon }) {
  const user = JSON.parse(localStorage.getItem("linkr"));

  const navigate = useNavigate();

  function handleIcon() {
    if(alterIcon === true) setAlterIcon(false);
  }

  function logout() {
    localStorage.removeItem("linkr");

    navigate("/");
  }

  return (
    <>
      <HeaderBox>
        <Wrap>
          <Link to="/timeline">
            <Title>linkr</Title>
          </Link>
          <DesktopSearchBar placeholder={"Search for people"} />
          <ActiveLogoutContainer>
            {
              alterIcon ? 
                <IoIosArrowUp className="activeCursor" color="#FFFFFF" size={35} onClick={() => {setAlterIcon(!alterIcon)}} /> : 
                <IoIosArrowDown className="activeCursor" color="#FFFFFF" size={35} onClick={() => {setAlterIcon(!alterIcon)}}/>
            }
            <Image src={user.image} alt="Profile image" onClick={() => {setAlterIcon(!alterIcon)}} />
          </ActiveLogoutContainer>
          {alterIcon && <LogoutContainer onClick={handleIcon}><span onClick={logout}>Logout</span></LogoutContainer>}
        </Wrap>
      </HeaderBox>
    </>
  );
}

const HeaderBox = styled.header`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
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

const ActiveLogoutContainer = styled.div`
  align-items: center;

  display: flex;

  gap: 10px;

  .activeCursor {
    cursor: pointer;
  }
`;

const LogoutContainer = styled.div`
  background: #171717;

  border-radius: 0px 0px 20px 20px;

  color: #FFFFFF;

  font-family: 'Lato';

  font-weight: 700;

  font-size: 15px;

  height: 47px;

  line-height: 47px;

  position: absolute;

  right: -15px;

  text-align: center;

  top: 70px;

  width: 150px;

  z-index: 10;

  span, p {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    width: 44px;
    height: 44px;
  }
`;
