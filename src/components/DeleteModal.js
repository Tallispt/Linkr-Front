import styled from "styled-components"
import { deletePost } from "../services/linkr"

const DeleteModal = ({
    isModalVisible,
    setIsModalVisible,
    postIdDelete,
    setPostIdDelete,
    refresh,
    setRefresh
}) => {

    function confirmDeletePost() {
        deletePost(postIdDelete)
        setPostIdDelete(undefined)
        setIsModalVisible(!isModalVisible)
        setRefresh(!refresh)
    }

    return (
        <Container>
            <div>
                <h2>Are you sure you want to delete this post?</h2>
                <span>
                    <button
                        style={{
                            backgroundColor: '#FFFFFF',
                            color: '#1877F2'
                        }}
                        onClick={() => setIsModalVisible(!isModalVisible)}
                    >No, go back</button>
                    <button
                        style={{
                            backgroundColor: '#1877F2',
                            color: '#FFFFFF'
                        }}
                        onClick={confirmDeletePost}
                    >Yes, delete it</button>
                </span>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    display: flex;        background-color: #FFFFFF;
        color: #1877F2;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9);
    
    div {
        display: flex;
        flex-direction: column;
        padding: 38px 0;
        gap: 40px;
        align-items: center;
        width: 597px;
        height: 262px;
        background: #333333;
        border-radius: 50px;
    }
    
    h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
        max-width: 400px;
    }

    span {
        display: flex;
        gap: 27px
    }

    button {
        width: 134px;
        height: 37px;
        border: none;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        cursor: pointer;
    }
`

export default DeleteModal