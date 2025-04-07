import React from "react";
import { SearchStyle } from "./style";
import { SearchOutlined } from "@material-ui/icons";

export default function SearchBox(props) {
  const { value, setValue, restorePage, placeholder } = props;
  const handleChange = e => {
    setValue({ ...value, search: false, keySearch: e.target.value, type: value.type });
  };
  const handleKeyDown = e => {
    if (e.key === "Enter" && e.target.value) {
      setValue({ ...value, search: true, keySearch: e.target.value, type: value.type });
      restorePage();
    }
  };

  return (
    <SearchStyle>
      <div className="search">
        <div className="inputicon">
          <SearchOutlined className="searchicon" />
          <input
            value={value?.keySearch}
            onChange={e => handleChange(e)}
            onKeyDown={e => handleKeyDown(e)}
            type="text"
            placeholder={placeholder ? placeholder : "Ingresa nombre o correo"}
          />
        </div>
      </div>
    </SearchStyle>
  );
}
