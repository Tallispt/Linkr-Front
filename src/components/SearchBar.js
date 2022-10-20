import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { getUsersBySearch } from "../services/linkr";

export function SearchBar({ placeholder, data }) {
  const [search, setSearch] = useState([]);

  async function getDataSearch(e) {
    const searchWord = e.target.value;
    if (searchWord.length < 3) return setSearch([]);
    try {
      const data = (await getUsersBySearch(searchWord)).data;
      setSearch(data);
    } catch (error) {
      setSearch([]);
    }
  }

  return (
    <ContainerSearch>
      <SearchInputs>
        <DebounceInput
          type="text"
          placeholder={placeholder}
          minLength={3}
          debounceTimeout={350}
          onChange={getDataSearch}
        />
        <SearchIcon>
          <BsSearch />
        </SearchIcon>
      </SearchInputs>
      {search.length !== 0 && (
        <DataResult>
          {search.map((user, i) => (
            <a key={i} href="/">
              <img src={user.image} alt={user.username} />
              <p>{user.username}</p>
            </a>
          ))}
        </DataResult>
      )}
    </ContainerSearch>
  );
}

const ContainerSearch = styled.div`
  font-family: "Lato";
  position: relative;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const SearchInputs = styled.div`
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  align-items: center;

  input {
    padding: 12px 0px 12px 16px;
    width: 513px;
    height: 17px;
    border: none;
    border-radius: 8px;
    font-size: 16px;

    @media screen and (max-width: 1000px) {
      width: 413px;
    }

    @media screen and (max-width: 800px) {
      width: 284px;
    }
  }
  input::placeholder {
    color: #c6c6c6;
    font-size: 16px;
  }

  input:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  width: 50px;
  height: 45px;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const DataResult = styled.section`
  width: 579px;
  min-height: 120px;
  background-color: #e7e7e7;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  top: 43px;
  border-radius: 0px 8px;

  @media screen and (max-width: 1000px) {
    width: 479px;
  }

  @media screen and (max-width: 800px) {
    width: 350px;
  }

  a {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: #515151;
    font-weight: 400;
    font-size: 19px;
    text-decoration: none;
  }

  a p {
    margin-left: 10px;
  }

  a img {
    margin-left: 20px;
    margin-right: 6px;
    border-radius: 50%;
    width: 39px;
    height: 39px;
  }
`;
