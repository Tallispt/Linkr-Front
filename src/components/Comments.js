import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../context/userContext"
import { commentOnPost, handleTextAreaHeight } from "../services/linkr"
import { IoPaperPlaneOutline } from "react-icons/io5"

const Comments = ({ id }) => {
    const { refresh, setRefresh } = useContext(UserContext)
    const [comment, setComment] = useState('')

    async function handleSubmit() {
        const body = { comment }
        try {
            await commentOnPost({ body, id })
        } catch (error) {
            alert('Comment could not be posted')
        }
    }

    async function handleKeyDown(event) {
        if (event.key === 'Enter') {
            await handleSubmit()
            setRefresh(!refresh)
        }
    }

    return (
        <Wrapper style={{ position: "relative" }}>
            <CommentInput
                placeholder="write a comment..."
                value={comment}
                onKeyDown={event => handleKeyDown(event)}
                onChange={event => {
                    setComment(event.target.value)
                    handleTextAreaHeight(event)
                }}
                maxLength="255"
            />
            <PaperPlane
                onClick={handleSubmit}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
position: relative;
width: 100%;
`

const CommentInput = styled.textarea`
    font-family: 'Lato';
    width: 100%;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    resize: none;
    padding: 11px 55px 11px 15px;
    overflow: hidden;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #ACACAC;
    border: none;


::placeholder {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
    }

    :focus {
    outline: none;
  }
`

const PaperPlane = styled(IoPaperPlaneOutline)`
    color: #F3F3F3;
    font-size: 22px;
    position: absolute;
    top: 10px;
    right: 16.5px;
    cursor: pointer;
`

export default Comments