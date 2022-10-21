import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { editPostDescription } from "../services/linkr";

const EditableInput = ({ id, isEditing, setIsEditing, description, setRefresh, refresh }) => {
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
            type="text"
            ref={inputRef}
            value={inputText}
            onKeyDown={event => handleKeyDown(event)}
            onChange={event => setInputText(event.target.value)}
        />
    )
}

const EditInput = styled.textarea`
    font-family: 'Lato';
  background: #FFFFFF;
  word-break: break-word;
  border-radius: 7px;
  border: none;
  width: 100%;
  min-height: fit-content;
  height: auto;
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