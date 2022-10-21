import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import { Form, Container, Content } from "../../common/Reusable";

const Registration = () => {

    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(null);
    const [ dataUser, setDataUser ] = useState({ email: "", password: "", confirmPassword: "", username: "", image: "" });

    function timeInterval() {
        setLoading(false);
    }

    function signup(event) {

        event.preventDefault();

        setLoading(true);

        if(dataUser.email === "" || dataUser.image === "" || dataUser.username === "" || dataUser.password === "")    {
            
            toast.warn("Fill in all fields!");
            setTimeout(timeInterval, 2000);
            return;
            
        }

        const URL = `${process.env.REACT_APP_API_BASE_URL}/signup`;

        const promise = axios.post(URL, dataUser);

        promise.then(response => {

            console.log(response);

            toast.success("Account created successfully!!");

            navigate("/");

        })
        promise.catch(error => {

            const { response } = error;

            if(response.data.message === "Usuário já cadastrado!") {

                toast.warn("Email entered already registered!");

            } else {
                toast.error("Error. Try again later!");
            }

            setLoading(false);
            
        })

    }

    return(
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
                <Form onSubmit={signup}>
                    <div className="field">
                        <input type="email" name="email" id="email" placeholder="e-mail"
                            onChange={event => setDataUser({...dataUser, email: event.target.value})}
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled" : ""}

                        />
                    </div>
                    <div className="field">
                        <input type="password" name="password" id="password" placeholder="password" autoComplete="on"
                            onChange={event => setDataUser({...dataUser, password: event.target.value})}
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled" : ""}
                        />
                    </div>
                    <div className="field">
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" autoComplete="on"
                            onChange={event => setDataUser({...dataUser, confirmPassword: event.target.value})}
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled" : ""}
                        />
                    </div>
                    <div className="field">
                        <input type="text" name="username" id="username" placeholder="username"
                            onChange={event => setDataUser({...dataUser, username: event.target.value})}
                            disabled={(loading && loading === true) ? true : false}
                            className={(loading && loading === true) ? "disabled" : ""}
                        />
                    </div>
                    <div className="field">
                        <input type="text" name="image" id="image" placeholder="picture url"
                            onChange={event => setDataUser({...dataUser, image: event.target.value})}
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
                                                            "Sign Up"}
                        </button>
                    </div>
                    <div className="message">
                        <Link to={"/"}>
                            Switch back to log in
                        </Link>
                    </div>
                </Form>
            </Container>
        </>
    )

};

export default Registration;