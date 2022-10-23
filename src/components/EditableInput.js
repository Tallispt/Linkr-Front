import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { editPostDescription } from "../services/linkr";

const EditableInput = ({
    id,
    isEditing,
    setIsEditing,
    description,
    setRefresh,
    refresh
}) => {
    const [inputText, setInputText] = useState(description);
    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing,]);

    function handleTextAreaHeight(event) {
        event.target.style.height = 'inherit';
        const height = event.target.scrollHeight
        event.target.style.height = `${height}px`;
    }

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
                handleTextAreaHeight(event)
            }}
            onFocus={event => handleTextAreaHeight(event)}
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