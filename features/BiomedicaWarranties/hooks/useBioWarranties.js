import React, { useState, useEffect } from "react";
import usePagination from "../../../hooks/usePagination";
import ApiBioWarranties from "../services";
import dayjs from "dayjs";

function useBioWarranties(activeFilters) {
    const [keyword, setKeyword] = useState("");
    const request = new ApiBioWarranties();
    const handleOnChangeKeyWord = e => {
        setKeyword(e.target.value);
    };
    const deleteKeyWord = () => setKeyword("");
    const { page, handlePage, limit } = usePagination({ defaultLimit: 20, defaultPage: 1 });
    const [warranties, setWarranties] = useState({
        data: [],
        isFetching: false,
        total: 0,
    });
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [warrantySelected, setWarrantySelected] = useState(null)

    useEffect(() => {
        getWarranties();
    }, [keyword, activeFilters]);

    const buildQuery = () => {
        let query = {};
        query.belongto = 1;
        if (activeFilters.length > 0) {
            activeFilters.forEach(element => {
                if (element?.parent) {
                    switch (element?.parent) {
                        case "users":
                            query[element?.valuedb] = element?.value
                            break;
                        case "dates":
                            if (element.option.id == "range") {
                                query[element?.valuedb] = {
                                    $gte: element?.option?.value.startDate,
                                    $lte: element?.option?.value.endDate
                                }
                                return
                            }
                            query[element?.valuedb] = {
                                $gte: dayjs().startOf(element?.option?.id).format(),
                                $lte: dayjs().endOf(element?.option?.id).format()
                            }
                            break;
                    }
                }
            });
        }
        return query;
    };

    const getWarranties = async () => {
        try {
            setWarranties(prevState => ({ ...prevState, isFetching: true }));
            let query = {};
            query = buildQuery();
            if (keyword.length >= 3) {
                query.folio = {
                    $iRegexp: keyword.trim(),
                };
            }
            let response = await request.getWarranties(query);
            if (response.status == 200 || response.status == 201) {
                let { results, count } = response?.data;
                let Nomralize = results?.map(item => request.NormalizeData(item));
                setWarranties({ data: Nomralize, total: count, isFetching: false });
            }
        } catch (error) {
            console.log(error, "error garantias");
            setWarranties(prevState => ({ ...prevState, isFetching: false }));
        }
    };

    const handleOnClickRow = item => {
        setIsOpenPreview(true);
        setWarrantySelected(item);
    };

    let heads = [
        {
            headText: "Folio",
            headNormalize: "folio",
            orderby: null,
        },
        {
            headText: "Producto",
            headNormalize: "productname",
            orderby: null,
        },
        {
            headText: "Serial",
            headNormalize: "srialnumber",
            orderby: null,
        },
        {
            headText: "Estatus Garantía",
            headNormalize: "statuswarranty",
            orderby: null,
        },
        {
            headText: "Rason de la Garantía",
            headNormalize: "reasonwarranty",
            orderby: null,
        },
        {
            headText: "Almacen",
            headNormalize: "warehousename",
            orderby: null,
        },
        {
            headText: "Creado Por",
            headNormalize: "createdBy",
            orderby: null,
        },
    ];
    let actions = [
        {
            name: "Ver",
            action: e => {
                setIsOpenPreview(true);
                setWarrantySelected(e);
            },
        },
    ];
    const customColumns = {
        folio: {
            columname: "folio",
            component: item => {
                return (
                    <div className="TableName">
                        <p
                            className="name"
                            style={{
                                color: "#034D6F",
                                fontWeight: "bold",
                            }}
                        >
                            {item.folio}
                        </p>
                    </div>
                );
            },
        },

        statuspoo: {
            columname: "Estatus",
            component: item => {
                return (
                    <div
                        className="TableName"
                        style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: 15,
                            background: getColorStatusSHOPPINGORDER(item.statuspoo).bgColor,
                        }}
                    >
                        <p
                            className="name"
                            style={{
                                color: getColorStatusSHOPPINGORDER(item.statuspoo).color,
                            }}
                            onClick={() => { }}
                        >
                            {item.statuspoo}
                        </p>
                    </div>
                );
            },
        },
    };

    const refetchData = () => {
        getWarranties();
    };

    return {
        keyword,
        handleOnChangeKeyWord,
        deleteKeyWord,
        handleOnClickRow,
        paginationData: {
            page,
            limit,
            handlePage,
        },
        warranties,
        tableData: {
            heads,
            actions,
            customColumns,
        },
        setIsOpenPreview,
        isOpenPreview,
        refetchData,
        warrantySelected,
    };
}

export default useBioWarranties;