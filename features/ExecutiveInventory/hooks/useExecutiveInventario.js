import { useEffect, useState } from "react";
import InventaryService from "../services";

export const useExecutiveInventario = ({ limit, searchKey, selectCategory, selectBrand }) => {
    const [flag, setFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [brandsFilter, setBrandsFilter] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [productTable, setProductTable] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const brands = await InventaryService.getBrands();
                setBrandsFilter(brands);
                const categories = await InventaryService.getCategory();
                setCategories(categories);
                const { data, count } = await InventaryService.getProducts({
                    page,
                    limit,
                    searchKey,
                    selectCategory,
                    selectBrand
                });
                setDataProducts(data);
                setTotalProducts(count);
                setProductTable(data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, limit, searchKey, selectCategory, selectBrand, flag]);

    const handleActions = {
        handlePage: (event, value) => {
            setPage(value);
            setFlag(!flag);
        },
        handleClose: () => setOpen(false), 
    };

    return {
        isLoading,
        categories,
        brandsFilter,
        dataProducts,
        totalProducts,
        productTable,
        handleActions,
        flag,
        setFlag,
        page,
        setPage
    };
};