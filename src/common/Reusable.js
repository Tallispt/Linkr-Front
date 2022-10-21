import styled from "styled-components";

export const Form = styled.form`
    align-items: center;

    background-color: #333333;

    display: flex;

    flex-direction: column;

    height: 100vh;

    justify-content: center;

    width: 40%;

    .field input, .btn button {
        border: none;

        border-radius: 6px;

        font-family: "Oswald";

        font-size: 27px;

        height: 65px;

        width: 429px;
    }

    .field input {
        background-color: #FFFFFF;

        color: #9F9F9F;

        margin-bottom: 13px;

        padding-left: 17px;
    }

    .btn button {
        background-color: #1877F2;

        color: #FFFFFF;
    }

    .message {
        margin-top: 22px;

    }
    .message a {
        color: #FFFFFF;
    }

    // Campos desabilitados
    .disabled {
        opacity: 0.7;
    }

    .disabled_button {
        opacity: 0.7;
    }
`;

export const Banner = styled.div`
    display: flex;

    height: 100vh;

    width: 100%;
`;

export const Content = styled.div`
    align-items: center;

    background-color: #151515;

    display: flex;

    flex-direction: column;

    height: 100%;

    justify-content: center;

    width: 60%;

    .text {
        margin-bottom: 250px;

        margin-right: 250px;
    }

    .text h1 {
        color: #FFFFFF;

        font-family: "Passion One";

        font-size: 106px;
    }

    .text p {
        color: #FFFFFF;

        font-family: "Oswald";

        font-size: 43px;

        font-weight: 700;
    }
`;