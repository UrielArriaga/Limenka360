import styled from "styled-components";

export const selectStylePArent = {
  control: (base, state) => ({
    ...base,
    height: 32,
    minHeight: 32,
    fontSize: 12,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    backgroundColor: "#f8fafc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,
    color: "#1e3a47",
    borderRadius: "4px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 35,
    minHeight: 35,
    fontSize: 12,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    backgroundColor: "#f8fafc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,
    backgroundColor: "#1e3a47",
    color: "#fff",
    borderRadius: "4px",
    marginTop: 0,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};

export const FiltersStyled = styled.div`
    display: flex;
    /* margin-bottom: 20px; */
    align-items: center;
    z-index: 1;
  
    /* background-color: red; */
    padding: 2px;
  
    .btnFilter {
      background-color: #039be5;
      /* border-radius: 10%; */
  
      /* padding: 8px 8px; */
      margin-right: 5px;
      /* margin-right: 20px; */
      color: #fff;
      font-size: 11px;
  
      &:hover {
        background-color: #039be5;
      }
  
      .iconName {
        font-size: 12px;
        margin-right: 10px;
      }
  
      .icon {
        font-size: 19px;
      }
    }
  
    .hidecontent {
      display: none;
  
      align-items: center;
      transition: 0.2s;
      p {
        font-size: 20px;
        font-weight: bold;
        margin-right: 20px;
      }
    }
  
    .showcontent {
      display: flex;
    }
  
    .reactSelect {
      width: 200px;
      margin-right: 10px;
      /* margin-right: 20px; */
    }
  `;
