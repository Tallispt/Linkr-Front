import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import { Form, Banner, Content } from "../../common/Reusable";

import UserContext from "../../context/User";

const Login = () => {
    const { setDataUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(null);
    const [ dataLogin, setDataLogin ] = useState({ email: "", password: "" });

    function timeInterval() {
        setLoading(false);
    }

    function signin(event) {

        event.preventDefault();

        setLoading(true);

        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const minSize = /[0-9a-zA-Z$*&@#]{8,}/;

        if(dataLogin.email === "" || dataLogin.password === "") {

            toast.warn("Fill in all fields!");
            setTimeout(timeInterval, 2000);
            return;

        }

        if(!dataLogin.email.match(regexEmail)) {

            toast.warn("Invalid email!");
            setTimeout(timeInterval, 3000);
            return;

        }

        if(!dataLogin.password.match(minSize)) {

            toast.warn("Your password must be at least 8 characters long!");
            setTimeout(timeInterval, 2000);
            return;

        }

        const URL = `${process.env.REACT_APP_API_BASE_URL}/signin`;

        const promise = axios.post(URL, dataLogin);

        promise.then(response => {

            const { data } = response;

            setDataUser({
                id: data.id,
                username: data.username,
                image: data.image,
                token: data.token
            });

            setLoading(false);

            localStorage.setItem("linkr", JSON.stringify(data.token));

            navigate("/");

        });

        promise.catch(error => {

            console.log(error);

            const { response } = error;

            if(response.data.message === "Senha inválida!") {

                toast.warn("Invalid password!");

            } else if(response.data.message === "E-mail não encontrado!") {

                toast.warn("User not found!");

            } else {

                toast.error("Error. Try again later!");

            }

            setLoading(false);

        })

    }

    return(
        <>
            <Banner>
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
                        <input type="email" name="email" id="email" placeholder="e-mail"
                            onChange={event => setDataLogin({...dataLogin, email: event.target.value})}
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled" : ""}

                        />
                    </div>
                    <div className="field">
                        <input type="password" name="password" id="password" placeholder="password" autoComplete="on"
                            onChange={event => setDataLogin({...dataLogin, password: event.target.value})}
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled" : ""}
                        />
                    </div>
                    <div className="btn">
                        <button type="submit"
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled_button" : ""}
                        >
                                {   loading && loading === true ?
                                                            <BeatLoader
                                                                color={"#FFFFFF"}
                                                                loading={loading}
                                                                cssOverride={""}
                                                                size={15}
                                                                aria-label="Loading Spinner"
                                                                data-testid="loader"
                                                            />
                                                        :
                                                            "Log In"}
                        </button>
                    </div>
                    <div className="message">
                        <Link to={"/sign-up"}>
                            First time? Create an account!
                        </Link>
                    </div>
                </Form>
            </Banner>
        </>
    )

};

export default Login;