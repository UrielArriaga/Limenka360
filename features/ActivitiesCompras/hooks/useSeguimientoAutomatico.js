import { useState, useEffect } from "react";
import { ActividadesComprasServices } from "../service/index";
import dayjs from "dayjs";
import usePagination from "../../../hooks/usePagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

export default function useActividadesCompras(activeFilters,role) {
  const actividadesComprasService = new ActividadesComprasServices();
  const [actividades, setActividades] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [totalActividades, setTotalActividades] = useState();
  const [keyword, setKeyword] = useState("");

  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const {id_user } = useSelector(userSelector);

  const heads = [
    { headText: "Fecha", headNormalize: "fecha" },
    { headText: "Creado Por", headNormalize: "fullname" },
    { headText: "Razon", headNormalize: "reason" },
    { headText: "Observaciones", headNormalize: "observaciones" },
  ];

  useEffect(() => {
    getActividades();
    console.log("id_user", role);
  }, [page, activeFilters, keyword]);
  
  const getActividades = async () => {
    try {
      setIsFetchingData(true);
      let query = {

      };
      query = buildQuery();

      if (keyword.length > 3) {
        query.reason = {
          $iRegexp: keyword,
        };
      }
      const response = await actividadesComprasService.getProducts(limit, page, query);
      const res = response.data.results;
      const normalizeData = res.map(item => actividadesComprasService.normalizeDataActividadesCompras(item));
  
      setActividades(normalizeData);
      setTotalActividades(response.data.count);
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
      console.error('Error:', error);
    }
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const deleteKeyWord = () => {
    setKeyword("");
  };
 const buildQuery = () => {
    let query = {};
    if (role?.role === "gestor_de_compras_int" || role?.role === "compras") {
      query.createdbyId = id_user;
    }
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "users":
              query[element?.valuedb] = element?.value
              break;
            case "typesentries":
              query[element.valuedb] = element.value;
              break;
            case "dates":
              if (element.option.id === "range") {
                query[element.valuedb] = {
                  $gte: element.option?.value?.startDate,
                  $lt: element.option?.value?.endDate,
                };
                return;
              }

              query[element.valuedb] = {
                $gte: dayjs().startOf(element?.option?.id).format(),
                $lt: dayjs().endOf(element?.option?.id).format(),
              };

              break;
          }
        }
      });
    }

    return query;
  };
 

  const refetchData = () => {
    getActividades();
  };

  return {

    actividades,
    totalActividades,
    isFetchingData,
    handlePage,
    page,
    limit,
    heads,
    keyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
  };
}
