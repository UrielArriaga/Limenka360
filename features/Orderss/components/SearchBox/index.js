import React from "react";
import { SearchStyle } from "./style";
import { Search, SearchOutlined } from "@material-ui/icons";
import { Input, Tooltip } from "@material-ui/core";

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
      <Input
        className="box_search"
        placeholder="Búsqueda por Folio"
        startAdornment={<Search />}
        value={value?.keySearch}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
        fullWidth
        disableUnderline
      />
    </SearchStyle>
  );
}
