import React, { useEffect, useState, useRef } from "react";
import { Search, Close } from "@material-ui/icons";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import styled from "styled-components";
import { zIndexNavbar } from "../../styles/global.styles";

export default function SearchBarLogistica() {
  const [searchBy, setSearchBy] = useState("order");
  const [keySearch, setKeySearch] = useState("");
  const [dataSuggest, setDataSuggest] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const searchContainerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (keySearch.length >= 3) handleGetData();
  }, [keySearch]);

  useEffect(() => {
    console.log("valor showSuggest:", showSuggest);
  }, [showSuggest]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGetData = async () => {
    try {
      let route;
      let query = {};
      switch (searchBy) {
        case "order":
          route = "orders";
          query.folio = { iRegexp: keySearch.toLowerCase() };
          break;
        case "inventary":
          route = "products";
          query.name = { iRegexp: keySearch.toLowerCase() };
          break;
        case "wharehouseproducts":
          route = "wharehouseproducts";
          query.product = { name: { iRegexp: keySearch.toLowerCase() } };
          break;
        default:
          return;
      }

      const params = {
        where: JSON.stringify(query),
        limit: 5,
        order: searchBy === "order" ? "folio" : "name",
        ...(searchBy === "wharehouseproducts" && { include: "product" }),
      };

      const response = await api.get(route, { params });
      setDataSuggest(response.data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchBySelect = e => {
    setSearchBy(e.target.value);
    setKeySearch("");
    setDataSuggest([]);
  };

  // const handleSelectSuggest = data => {
  //   console.log(data.folio);
  //   setShowSuggest(false);
  // };

  const handleSelectSuggest = data => {
    console.log(searchBy);
    if (searchBy == "order") {
      router.push(`/directorlogistica/pedidos/${data.folio}`);
    }
  };

  const renderSuggest = data => {
    return (
      <SuggestItem className={searchBy} onClick={() => handleSelectSuggest(data)}>
        {searchBy === "order" ? (
          <>
            {data.folio} <span className="status">Estatus: {data.exitstatus}</span>
          </>
        ) : (
          <>
            {data.name} <span className="code">Código: {data.code}</span>
            {searchBy === "wharehouseproducts" && <span className="stock">Stock: {data.stock}</span>}
          </>
        )}
      </SuggestItem>
    );
  };

  return (
    <SearchBarContainer>
      <SearchBox>
        <Select onChange={handleSearchBySelect} value={searchBy}>
          <option value="order">Pedido</option>
          <option value="inventary">Inventario</option>
          <option value="wharehouseproducts">Productos</option>
        </Select>
        <SearchContainer ref={searchContainerRef}>
          <SearchInput
            placeholder={searchBy === "order" ? "Buscar por Folio" : "Buscar Nombre del Producto"}
            type="text"
            onChange={e => setKeySearch(e.target.value)}
            onClick={() => setShowSuggest(true)}
            value={keySearch}
          />
          {showSuggest && (
            <Suggestions>
              <HeadSuggestions>
                <TitleSuggest>
                  Sugerencias de la Búsqueda <Search />
                </TitleSuggest>
                <CloseButton onClick={() => setShowSuggest(false)} />
              </HeadSuggestions>
              {dataSuggest.length === 0 ? (
                <EmptyTitle>Sin Sugerencias</EmptyTitle>
              ) : (
                dataSuggest.map((item, index) => <div key={index}>{renderSuggest(item)}</div>)
              )}
            </Suggestions>
          )}
        </SearchContainer>
      </SearchBox>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #efefef;
`;

const SearchBox = styled.div`
  width: 500px;
  display: flex;
  height: 30px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  padding: 1px;
  margin: 0 0 0 10px;
`;

const Select = styled.select`
  margin-right: 4px;
  outline: none;
  border: 1px solid #fff;
`;

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 12px;
  padding: 5px;
`;

const Suggestions = styled.div`
  padding: 0 5px;
  margin-top: 10px;
  background-color: #fff;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 10px;
  width: calc(100% - 10px);
  z-index: ${zIndexNavbar};
`;

const HeadSuggestions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
`;

const TitleSuggest = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: grey;
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  svg {
    font-size: 15px;
    margin-bottom: -4px;
    margin-left: 4px;
  }
`;

const CloseButton = styled(Close)`
  border-radius: 5px;
  color: red;
  font-size: 15px;
  cursor: pointer;
`;

const EmptyTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: grey;
  margin-bottom: 5px;
  padding: 5px;
`;

const SuggestItem = styled.p`
  padding: 5px;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: #d9d9d9;
  }

  &.product,
  &.order {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-weight: 500;
  }

  &.product .code,
  &.order .status {
    color: grey;
    font-weight: 500;
  }
`;
