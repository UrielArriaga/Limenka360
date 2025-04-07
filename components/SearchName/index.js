import { colors } from "../../styles/global.styles";
import styled from "styled-components";
import { SearchOutlined } from "@material-ui/icons";
import { useState } from "react";

export default function SearchName({ placeholder, setName }) {
  const [preName, setPreName] = useState("");

  const handleKeyDown = e => {
    if (e.key === "Enter" && e.target.value) {
      setName(preName);
      setPreName("");
    }
  };

  return (
    <SearchContainer>
      <SearchInput>
        <SearchIcon />
        <input
          value={preName}
          onChange={e => setPreName(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={placeholder ? placeholder : "Ingresa el nombre"}
        />
      </SearchInput>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.div`
  position: relative;

  input {
    width: 100%;
    height: 40px;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    padding-left: 40px;

    &:focus {
      outline: 1px solid ${colors.primaryColor};
    }
  }
`;

const SearchIcon = styled(SearchOutlined)`
  position: absolute;
  top: 10px;
  left: 8px;
`;
