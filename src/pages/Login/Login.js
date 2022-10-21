import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import BeatLoader from "react-spinners/BeatLoader";

import { Form, Container, Content } from "../../common/Reusable";
import { signIn } from "../../services/linkr";
import UserContext from "../../context/userContext";
import { userIsLogged } from "../../components/PrivatePage";

const Login = () => {
  const navigate = useNavigate();
  const { setDataUser } = useContext(UserContext);
  const [loading, setLoading] = useState(null);
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    if (userIsLogged()) {
      return navigate("/timeline");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function timeInterval() {
    setLoading(!loading);
  }

  async function signin(event) {
    event.preventDefault();

    setLoading(true);

    if (dataLogin.email === "" || dataLogin.password === "") {
      toast.warn("Fill in all fields!");
      setTimeout(timeInterval, 2000);
      return;
    }

    try {
      const data = (await signIn(dataLogin)).data;

      const JSONauth = JSON.stringify({
        token: data.token,
        image: data.image,
      });
      localStorage.setItem("linkr", JSONauth);

      setDataUser({
        id: data.id,
        username: data.username,
        image: data.image,
        token: data.token,
      });
      setLoading(false);
      navigate("/timeline");
    } catch (error) {
      console.log(error);
      toast.error("Error. Try again later!");
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <Content>
          <div className="text">
            <h1>linkr</h1>
            <p>
              save, share and discoverb <br />
              the best lins on the web
            </p>
          </div>
        </Content>
        <Form onSubmit={signin}>
          <div className="field">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e-mail"
              onChange={(event) =>
                setDataLogin({ ...dataLogin, email: event.target.value })
              }
              disabled={loading && loading === true ? true : false}
              className={loading && loading === true ? "disabled" : ""}
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              autoComplete="on"
              onChange={(event) =>
                setDataLogin({ ...dataLogin, password: event.target.value })
              }
              disabled={loading && loading === true ? true : false}
              className={loading && loading === true ? "disabled" : ""}
            />
          </div>
          <div className="btn">
            <button
              type="submit"
              disabled={loading && loading === true ? true : false}
              className={loading && loading === true ? "disabled_button" : ""}
            >
              {loading && loading === true ? (
                <BeatLoader
                  color={"#FFFFFF"}
                  loading={loading}
                  cssOverride={""}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Log In"
              )}
            </button>
          </div>
          <div className="message">
            <Link to={"/sign-up"}>First time? Create an account!</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
