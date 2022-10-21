import { useNavigate } from "react-router-dom";

export default function PrivatePage({ children }) {
  const authorization = JSON.parse(localStorage.getItem("linkr"));
  const navigate = useNavigate();

  if (authorization) {
    return <>{children}</>;
  } else {
    navigate("/");
  }
}

const userIsLogged = () => {
  const authorization = JSON.parse(localStorage.getItem("linkr"));
  if (authorization) {
    return true;
  }
  return false;
};

export { userIsLogged };
