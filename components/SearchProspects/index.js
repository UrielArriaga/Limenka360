import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "./styles";
import { api } from "../../services/api";
import { Person } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import LoaderSearchProspects from "../LoaderSearchProspects";
import SearchProspectsNotFound from "../SearchProspectsNotFound";
import ListSearch from "../ListSearch";

export default function SearchProspects() {
  const { id_user } = useSelector(userSelector);
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [disableOnBlur, setDisableOnBlur] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const router = useRouter();

  const handleRequestProspect = async value => {
    try {
      setIsLoading(true);
      let query = {};
      query.ejecutiveId = id_user;

      if (value.includes("@")) {
        // console.log("es correo");
        query.email = { iRegexp: `${value.trim().toLocaleLowerCase()}` };
      } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value.trim())) {
        query.phone = { iRegexp: `${value.trim().toLocaleLowerCase()}` };
      } else {
        // console.log("nombre normal");
        query.fullname = { iRegexp: `${value.toLocaleLowerCase()}` };
      }
      let params = {
        where: JSON.stringify(query),
        order: `${"-createdAt"}`,
      };
      const responseProspect = await api.get("prospects", { params });
      setData(responseProspect.data?.results);
      console.log("datos", data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnChangeInput = e => {
    let value = e.target.value;
    setKeyword(value);
    if (value.length > 3) {
      setShowSuggestions(true);
      handleRequestProspect(e.target.value);
    }
    if (value.length == 0) {
      setShowSuggestions(false);
      setData([]);
    }
  };
  const handleOnBlurInput = e => {
    if (disableOnBlur == false) {
      setIsFocused(false);
      setShowSuggestions(false);
    }
  };
  const handleOnFocusInput = e => {
    setIsFocused(true);
    if (keyword.length > 3) {
      setShowSuggestions(true);
      handleRequestProspect(e.target.value);
    }
    if (keyword.length == 0) {
      setShowSuggestions(false);
      setData([]);
    }
  };

  const handleOnClickItem = item => {
    if (item?.isoportunity == false && item?.isclient == false) {
      router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: item.id } });
    }
    if (item?.isoportunity == true && item?.isclient == false) {
      router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: item?.id } });
    }
    if (item?.isoportunity == true && item?.isclient == true) {
      router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: item?.id } });
    }
    if (item?.isclient == true && item?.isoportunity == true) {
      router.push({ pathname: "/clientes/[prospecto]", query: { prospecto: item.id } });
    }
    if (item?.isclient == true && item?.isoportunity == false) {
      router.push({ pathname: "/clientes/[prospecto]", query: { prospecto: item.id } });
    }
  };

  const handleKeyDown = e => {
    const { key } = e;
    let nextIndexCount = 0;
    if (key == "ArrowDown") {
      nextIndexCount = (focusedIndex + 1) % data.length;
    }
    if (key == "ArrowUp") {
      nextIndexCount = (focusedIndex + data.length - 1) % data.length;
    }
    if (key == "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }
    setFocusedIndex(nextIndexCount);
  };

  const handleSelection = selectedIndex => {
    const selectedItemProspects = data[selectedIndex];
    if (!selectedItemProspects) return resetSearchComplete();
    handleOnClickItem(selectedItemProspects);
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  return (
    <Layout isFocused={isFocused}>
      <div
        className="input-container"
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={e => {
          handleKeyDown(e);
        }}
      >
        <div className="inputIcon">
          <Person className="iconSearch" />
          <input
            onChange={e => {
              handleOnChangeInput(e);
            }}
            value={keyword}
            onBlur={e => handleOnBlurInput(e)}
            onFocus={e => handleOnFocusInput(e)}
            placeholder="Buscar Prospectos, Oportunidades o Clientes"
          />
        </div>
        {showSuggestions && (
          <div
            className="suggestions"
            onMouseEnter={() => setDisableOnBlur(true)}
            onMouseLeave={() => setDisableOnBlur(false)}
          >
            {isLoading && <LoaderSearchProspects />}
            {!isLoading && <>{data?.length === 0 && <SearchProspectsNotFound keyword={keyword} />}</>}
            {!isLoading && <ListSearch focusedIndex={focusedIndex} data={data} handleOnClickItem={handleOnClickItem} />}
          </div>
        )}
      </div>
    </Layout>
  );
}
