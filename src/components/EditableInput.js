import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { editPostDescription } from "../services/linkr";

const EditableInput = ({ id, isEditing, setIsEditing, description, setRefresh, refresh }) => {
    const [inputText, setInputText] = useState("");
    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing]);

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
            placeholder={description}
            onKeyDown={event => handleKeyDown(event)}
            onChange={event => setInputText(event.target.value)}
        />
    )
}

const EditInput = styled.input`
  background: #FFFFFF;
  display: inline-block;
  border-radius: 7px;
  border: none;
  width: 100%;
  height: fit-content;
  padding: 8px 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #171717;

  ::placeholder {
    color: #4C4C4C;
  }
  :focus {
    outline: none;
  }

`

export default EditableInput