import { SearchOutlined } from "@material-ui/icons";
import { useState } from "react";

export default function SearchProspects({ setValue }) {
    const [inputValue, setInputValue] = useState("");
  
    const handleChange = e => {
      setInputValue(e.target.value);
    };
  
    const handleKeyDown = e => {
      if (e.key === "Enter" && !e.target.value.trim() == "") {
        setValue({ search: true, keySearch: e.target.value });
      }
    };
  
    return (
      <div className="search">
        <div className="inputicon">
          <SearchOutlined className="searchicon" />
          <input
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Ingresa nombre de prospecto"
          />
        </div>
      </div>
    );
  }