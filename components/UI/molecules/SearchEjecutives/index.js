import { CircularProgress } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { api } from "../../../../services/api";
import ListSuggestions from "../../atoms/ListSuggestions";
import LoaderSuggestions from "../../atoms/LoaderSuggestions";
import { Layout } from "./styles";

export default function SearchEjecutives() {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [data, setData] = useState(EJECUTIVES);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [disableOnBlur, setDisableOnBlur] = useState(false);

  const handleOnFocusInput = (e) => {
    setIsFocused(true);

    if (keyword.length > 3) {
      setShowSuggestions(true);
      //   handleRequestEjecutives();
    }

    if (keyword.length == 0) {
      setShowSuggestions(false);
      setData([]);
    }
  };

  const handleOnBlurInput = (e) => {
    if (disableOnBlur == false) {
      setIsFocused(false);
      setShowSuggestions(false);
    }
  };

  const handleRequestEjecutives = async () => {
    try {
      setIsLoading(true);
      let where = {
        or: [
          { email: { regexp: `${keyword.toLocaleLowerCase()}` } },
          { name: { regexp: `${keyword.toLocaleLowerCase()}` } },
        ],
      };

      let params = { where: where, keys: "email" };
      const responseEjecutives = await api.get("ejecutives", { params });
      setData(responseEjecutives.data?.results);
      console.log(responseEjecutives);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeInput = (e) => {
    let value = e.target.value;
    console.log(value);

    setKeyword(value);

    if (value.length > 3) {
      setShowSuggestions(true);
      handleRequestEjecutives();
    }

    if (value.length == 0) {
      setShowSuggestions(false);
      setData([]);
    }
  };

  const handleOnClickItem = (item) => {
    console.log(item);
    setIsFocused(false);
    setShowSuggestions(false);
  };

  return (
    <Layout isFocused={isFocused}>
      <div className="input-container">
        <input
          onChange={(e) => handleOnChangeInput(e)}
          autoFocus={false}
          value={keyword}
          onBlur={(e) => handleOnBlurInput(e)}
          onFocus={(e) => handleOnFocusInput(e)}
          ref={inputRef}
          type="text"
          placeholder="Buscar ejecutivos"
        />

        {showSuggestions && (
          <div
            className="suggestions"
            onMouseEnter={() => setDisableOnBlur(true)}
            onMouseLeave={() => setDisableOnBlur(false)}
          >
            {isLoading && <LoaderSuggestions />}
            {!isLoading && <ListSuggestions data={data} handleOnClickItem={handleOnClickItem} />}
          </div>
        )}

        {/* <button>Buscar</button> */}
      </div>
    </Layout>
  );
}

const EJECUTIVES = [
  {
    id: "62dIYoY5ADPjThnHctAWIG1Y",
    name: "ejecutivo uriel",
    lastname: "arriaga",
    email: "urielarriaga.1998@executive.com",
    phone: "5525668573",
    optionalphone: "",
    password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
    isonline: false,
    photo: "",
    isactive: true,
    username: "UAZE",
    oportcount: 64,
    isverified: true,
    title: "ing.",
    createdAt: "2022-09-01T15:25:39.424Z",
    updatedAt: "2022-11-11T17:13:36.381Z",
    roleId: "62d94hH7xnfeqrfYLLDSKAtR",
    groupId: "62djqtmbXxhqx70ksMpspJ22",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  },
  {
    id: "62dIYoY5ADPjThnHctAWIG1D",
    name: "ejecutivo uriel",
    lastname: "arriaga",
    email: "urielarriaga.1998@executive.com",
    phone: "5525668573",
    optionalphone: "",
    password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
    isonline: false,
    photo: "",
    isactive: true,
    username: "UAZE",
    oportcount: 64,
    isverified: true,
    title: "ing.",
    createdAt: "2022-09-01T15:25:39.424Z",
    updatedAt: "2022-11-11T17:13:36.381Z",
    roleId: "62d94hH7xnfeqrfYLLDSKAtR",
    groupId: "62djqtmbXxhqx70ksMpspJ22",
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
  },
];
