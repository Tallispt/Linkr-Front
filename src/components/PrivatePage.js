import { Navigate } from "react-router-dom";

export default function PrivatePage({ children }) {
  const authorization = JSON.parse(localStorage.getItem("linkr"));

  if (authorization) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
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
