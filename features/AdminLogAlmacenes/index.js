import { Search } from "@material-ui/icons";
import React, { useEffect } from "react";
import TableLimenkaGeneral from "../../components/TableLimenkaGeneral";
import Filters from "./components/Filters";
import PreviewOutPut from "./components/PreviewOutPut";
import { DirLogAlmacenesStyled } from "./styles";
import useDirLogAlmacenes from "./hooks/useDirLogAlmacenes";

export default function AdminLogAlmacenes() {
  const {
    isOpenPreview,
    totalResults,
    tableData,
    handleOnClickRow,
    wareHouseSelected,
    setIsOpenPreview,
    page,
    limit,
    handlePage,
    handlePagination,
    setWareHouseSelected,
    keyword,
    handleOnChangeKeyWord
  } = useDirLogAlmacenes();

  useEffect(() => {
    console.log("totalResults", totalResults, limit, Math.ceil(totalResults / limit));
  }, [totalResults]);

  return (
    <DirLogAlmacenesStyled>
      <div className="main">
        <div className="header">
          <div className="header__title">
            <h4>
              Almacenes <span>{totalResults}</span>
            </h4>
          </div>

          <div className="header__filters">
            <div className="inputContainer">
              <Search className="inputContainer__icon" />

              <input
                value={keyword}
                onChange={e => handleOnChangeKeyWord(e)}
                className="inputContainer__input"
                placeholder="Buscar por nombre de almacen"
              />

              {"asdasdas" > 3 && (
                <IconButton className="inputContainer__clean" onClick={() => deleteKeyWord()}>
                  <Close />
                </IconButton>
              )}
            </div>

            {/* <Filters
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            handleOnChangeFilter={handleOnChangeFilter}
            /> */}
          </div>
        </div>

        {isOpenPreview ? (
          <PreviewOutPut
            wareHouseSelected={wareHouseSelected}
            setIsOpenPreview={setIsOpenPreview}
            listData={tableData.data}
            page={page}
            limit={limit}
            handlePage={handlePagination}
            count={totalResults}
            setWareHouseSelected={setWareHouseSelected}
          />
        ) : (
          <TableLimenkaGeneral
            onRowClick={item => handleOnClickRow(item)}
            isSelectable={true}
            mainColumn={"Fecha"}
            heads={tableData.heads}
            data={tableData.data}
            typeTable="border"

            // isLoading={isFetchingData}
            // actions={tableData.actions}
            // data={tableData.data}
            // customColumns={tableData.customColumns}
            // typeTable="border"
            // orderBy={orderBy}
            // setOrderBy={setOrderBy}
            // paginationData={{
            //   ...paginationData,
            //   total: totalOrders,
            // }}
          />
        )}
      </div>
    </DirLogAlmacenesStyled>
  );
}
