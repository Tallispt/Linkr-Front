import styled from "styled-components";

export const Form = styled.form`
    align-items: center;

    background-color: #333333;

    display: flex;

    flex-direction: column;

    height: 100vh;

    width: 40%;

    .field:nth-child(1) {
        margin-top: 26%;
    }

    .field, .btn {
        align-items: center;

        display: flex;

        justify-content: center;

        width: 100%;
    }

    .field input, .btn button {
        border: none;

        border-radius: 6px;

        font-family: "Oswald";

        font-size: 27px;

        height: 65px;

        width: 80%;
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

        font-size: 22px;

        text-decoration: underline;
    }

    // Campos desabilitados
    .disabled {
        opacity: 0.7;
    }

    .disabled_button {
        opacity: 0.7;
    }

    @media screen and (max-width: 900px) {
        height: 70vh;

        justify-content: flex-start;

        width: 100%;

        .field:nth-child(1) {
            margin-top: 8%;
        }

        .field input, .btn button {
            font-size: 22px;

            height: 55px;

            width: 80%;
        }

        .message {
            margin-top: 21px;
        }

        .message a {
            font-size: 17px;
        }
    }
`;

export const Container = styled.div`
    display: flex;

    height: 100vh;

    width: 100%;

    @media screen and (max-width: 900px) {
        flex-direction: column
    }
`;

export const Content = styled.div`
    align-items: center;

    background-color: #151515;

    display: flex;

    flex-direction: column;

    height: 100%;

    width: 60%;

    .text {
        margin-top: 18%;

        width: 80%;
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

    @media screen and (max-width: 900px) {
        height: 30vh;

        justify-content: center;

        width: 100%;

        .text {
            line-height: 34px;

            margin-top: 5%;

            text-align: center;

            width: auto;
        }

        .text h1 {
            font-size: 76px;

            padding-bottom: 12px;
        }

        .text p {
            font-size: 23px;
        }
    }
`;