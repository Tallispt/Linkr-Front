import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/userContext";
import { editPostDescription, handleTextAreaHeight } from "../services/linkr";

const EditableInput = ({
    id,
    isEditing,
    setIsEditing,
    description
}) => {
    const { refresh, setRefresh } = useContext(UserContext)
    const [inputText, setInputText] = useState(description);
    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing,]);

    async function handleKeyDown(event) {
        if (event.key === 'Enter') {
            if (inputText.trim() === "") return setIsEditing(!isEditing)

            const body = {
                description: inputText
            }
            try {
                await editPostDescription({ body, id })
            } catch (error) {
                alert('Description could not be edited')
            }
            setRefresh(!refresh)
        }
        if (event.key === 'Escape') {
            setIsEditing(!isEditing)
        }
    }


    return (
        <EditInput
            ref={inputRef}
            value={inputText}
            onKeyDown={event => handleKeyDown(event)}
            onChange={event => {
                setInputText(event.target.value)
                handleTextAreaHeight(event, '30px')
            }}
            onFocus={event => handleTextAreaHeight(event, '30px')}
            maxLength="500"
        ></EditInput>
    )
}

const EditInput = styled.textarea`
    font-family: 'Lato';
    background: #FFFFFF;
    border-radius: 7px;
    border: none;
    overflow: hidden;
    resize: both;
    max-width: 100%;
    min-height: 30px;
    padding: 8px 10px;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    color: #171717;
    resize: none;

  :focus {
    outline: none;
  }

`

export default EditableInput