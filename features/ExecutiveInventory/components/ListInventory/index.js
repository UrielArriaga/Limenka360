import React, { useState } from "react";
import { LinearProgress } from "@material-ui/core";
import { InventorydStyled } from "./styles";
import { Pagination } from "@material-ui/lab";
import Head from "next/head";
import TableCustom from "../../../../components/TableCustom";
import { userSelector } from "../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../../utils";
import { useExecutiveInventario } from "../../hooks/useExecutiveInventario";
import Filters from "../Filters";

export default function ListInventory() {
    const [limit, setLimit] = useState(100);
    const [searchKey, setSearchKey] = useState("");
    const { roleId } = useSelector(userSelector);
    const [selectCategory, setSelectCategory] = useState("");
    const [selectBrand, setSelectBrand] = useState("");
    const paginasProducts = Math.ceil(totalProducts / limit);
    const { isLoading, dataProducts, totalProducts, productTable, handleActions, page, categories, brandsFilter, setFlag, flag } = useExecutiveInventario({
        limit, searchKey, selectCategory, selectBrand
    });

    const filteredProducts = productTable.filter(item => {
        const matchesSearchKey = item.name.toLowerCase().includes(searchKey.toLowerCase());
        const matchesCategory = selectCategory ? item.category?.id === selectCategory : true;
        const matchesBrand = selectBrand ? item.brand?.id === selectBrand : true;
        return matchesSearchKey && matchesCategory && matchesBrand;
    });

    const handleEdit = item => {
        let editStock = dataProducts.filter(i => i.id == item.id);
        setStockEdit(editStock[0]);
        setOpen(true);
    };

    const showTableProducts = () => {
        switch (roleId) {
            case "logistica":
                return (
                    <TableCustom
                        heads={["id", "código", "Producto", "Marca", "Categoría", "Precio unitario", "Stock"]}
                        data={filteredProducts}
                        identificador={"code"}
                        custom={false}
                        primaryColor={"#405189"}
                        secondaryColor={"#dce1f6"}
                        actionsPerItem={[{ title: "modificar", action: e => handleEdit(e) }]}
                    />
                );
            case "ejecutivo":
            case "gerente":
                return (
                    <table className="table">
                        <thead className="head">
                            <tr className="tr">
                                <th className="title fix code">
                                    <div className="ctr_title">
                                        <p>Codigo</p>
                                    </div>
                                </th>
                                <th className="title fixed ">
                                    <div className="ctr_title">
                                        <p>Producto</p>
                                    </div>
                                </th>
                                <th className="title">
                                    <div className="ctr_title">
                                        <p>Marca</p>
                                    </div>
                                </th>
                                <th className="title">
                                    <div className="ctr_title">
                                        <p>Categoria</p>
                                    </div>
                                </th>
                                <th className="title">
                                    <div className="ctr_title">
                                        <p>Precio Unitario</p>
                                    </div>
                                </th>
                                <th className="title">
                                    <div className="ctr_title">
                                        <p>Existencia</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="body">
                            {dataProducts
                                .filter((item) => {
                                    const matchesCategory = selectCategory ? item.category?.id === selectCategory : true;
                                    const matchesBrand = selectBrand ? item.brand?.id === selectBrand : true;
                                    const matchesSearchKey = item.name.toLowerCase().includes(searchKey.toLowerCase());
                                    return matchesCategory && matchesBrand && matchesSearchKey;
                                })
                                .map((item, index) => (
                                    <tr className={index % 2 === 0 ? "row" : "inpar row"} key={index}>
                                        <td className="data fixed">
                                            <p className="ctr_td">{item?.code}</p>
                                        </td>
                                        <td className="data">
                                            <p className="ctr_td">{item?.name}</p>
                                        </td>
                                        <td className="data">
                                            <p className="text">{item.brand?.name}</p>
                                        </td>
                                        <td className="data">
                                            <p className="text">{item.category?.name}</p>
                                        </td>
                                        <td className="data">
                                            <p className="text">{formatNumber(item?.callamount)}</p>
                                        </td>
                                        <td className="data">
                                            <p className="text">{item?.stock ?? 0}</p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                );
        }
    };

    return (
        <InventorydStyled>
            <Head>
                <title>Limenka 360 - Inventario</title>
            </Head>
            <div className="content_main">
                <div className="container">
                    <Filters
                        setSearchKey={setSearchKey}
                        setSelectCategory={setSelectCategory}
                        selectCategory={selectCategory}
                        setSelectBrand={setSelectBrand}
                        selectBrand={selectBrand}
                        categories={categories}
                        brandsFilter={brandsFilter}
                        flag={flag}
                        setFlag={setFlag}
                    />

                    {isLoading ? (
                        <div className="content_load">
                            <div className="content_load__img">
                                <img src="/load.png" />
                            </div>
                            <div className="content_loadtext">
                                <p>Cargando</p>
                                <LinearProgress color="primary" />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="content_table">{showTableProducts()}</div>
                            {filteredProducts.length > 0 && (
                                <div className="content_products">
                                    <div className="content_pagination">
                                        <p className="totalProducts">{`Total de Productos: ${totalProducts} Página: ${page} - ${Math.ceil(
                                            totalProducts / limit
                                        )}`}</p>
                                        <div className="content_products__tfooter__ctr_pagination__pagination">
                                            <Pagination
                                                style={{ display: "flex", justifyContent: "center" }}
                                                page={page}
                                                defaultPage={1}
                                                onChange={(event, value) => handleActions.handlePage(event, value)}
                                                shape="rounded"
                                                count={paginasProducts}
                                                color="primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </InventorydStyled>
    )
}