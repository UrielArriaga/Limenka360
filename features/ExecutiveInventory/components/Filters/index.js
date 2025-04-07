import React, { useState } from "react";
import { Grid, TextField, Tooltip } from "@material-ui/core";
import { Cached, ShoppingBasket, SearchOutlined, FilterList } from "@material-ui/icons";
import Select from "react-select"
import { toUpperCaseChart } from "../../../../utils";
import { useExecutiveInventario } from "../../hooks/useExecutiveInventario";


const Filters = ({ setSearchKey, selectCategory, setSelectCategory, selectBrand, setSelectBrand, categories, brandsFilter, setFlag, flag }) => {
    const [limit, setLimit] = useState(100);
    const [nameProduct, setNameproduct] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const { totalProducts } = useExecutiveInventario({ limit });

    return (
        <>
            <Grid container className="header">
                <Grid item md={6} sm={6} xs={12} className="header__text">
                    <ShoppingBasket className="header__icon" />
                    <p className="header__title">Inventario</p>
                    <p className="header__totals">({`${totalProducts} Productos`})</p>
                    <Tooltip arrow title="Recargar" placement="right">
                        <Cached className="reload" onClick={() => setFlag((prev) => !prev)} />
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid className="content_data">
                <div className="content_data__filter">
                    <TextField
                        variant="outlined"
                        placeholder="Ingresa Nombre de producto"
                        type="search"
                        size="small"
                        className="inputText"
                        value={nameProduct}
                        onChange={e => {
                            setNameproduct(e.target.value);
                            setSearchKey(e.target.value);
                            if (e.target.value == "") {
                                setFlag(!flag);
                            }
                        }}
                        label={nameProduct !== "" && "Buscar producto"}
                        onKeyDown={e => {
                            if (e.key === "Enter" && e.target.value.length > 0) {
                                setSearchKey(e.target.value);
                                setFlag(!flag);
                            }
                        }}
                    />
                    <SearchOutlined className="search" />
                    <div className="filter" onClick={() => setShowFilter(!showFilter)}>
                        <FilterList />
                        Filtros
                    </div>
                </div>
                {showFilter && (
                    <div className="content_filter">
                        <Grid item xs={12} md={2}>
                            <Select
                                placeholder="Selecciona una categoria"
                                className="select"
                                isClearable={true}
                                options={categories}
                                value={categories.find((cat) => cat.id === selectCategory) || null}
                                onChange={(selectedOption) => {
                                    setSelectCategory(selectedOption ? selectedOption.id : "");
                                }}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => toUpperCaseChart(option.name)}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Select
                                placeholder="Selecciona una marca"
                                className="select"
                                isClearable={true}
                                options={brandsFilter}
                                value={brandsFilter.find((brand) => brand.id === selectBrand) || null}
                                onChange={(selectedOption) => {
                                    setSelectBrand(selectedOption ? selectedOption.id : "");
                                }}
                                getOptionValue={(option) => option.id}
                                getOptionLabel={(option) => toUpperCaseChart(option.name)}
                            />
                        </Grid>
                    </div>
                )}
            </Grid>
        </>
    );
}
export default Filters;