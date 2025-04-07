import React, { useContext, useEffect, useState } from "react";
import { OrdersServices } from "../services";
import { getColorStatusOrder } from "../../../utils/DirLog";
import usePagination from "../../../hooks/usePagination";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useModal from "../../../hooks/useModal";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useSalesPayments(activeFilters) {
  const ordersService = new OrdersServices();
  const { showAlertError, showAlertSucces } = useAlertToast();
  const { open, toggleModal } = useModal();
  const { id_user } = useSelector(userSelector);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-approvedAt");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [salesPayments, setSalesPayments] = useState({
    data: [],
    total: 0,
    isfetching: false,
  });
  const [dataOportunity, setDataOportunity] = useState({
    data:[],
    isfetching:false
  });
  const [selectedPay, setSelectedPay] = useState(null);

  useEffect(() => {
    getSalesPayments();
  }, [page, keyword, activeFilters]);

  useEffect(()=>{
    getOportunity();
  },[selectedPay])

  const structureDate = element => {
    if (element.option.id === "range") {
      return {
        $gte: element.option?.value?.startDate,
        $lt: element.option?.value?.endDate,
      };
    }
    return {
      $gte: dayjs().startOf(element?.option?.id).format(),
      $lt: dayjs().endOf(element?.option?.id).format(),
    };
  };

  const buildQuery = () => {
    let query = {};
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element?.parent) {
          switch (element?.parent) {
            case "dates":
              let value = structureDate(element);
              query[element.valuedb] = value;
              break;

            case "datesSale":
              let valuedate = structureDate(element);
              query[element.valuedb] = valuedate;
              break;
            case "ispaid":
              query[element.valuedb] = element.value;
            default:
              break;
          }
        }
      });
    }
    return query;
  };

  const getSalesPayments = async () => {
    try {
      let query = {};
      query = buildQuery();

      if (keyword.length > 3) {
        query.oportunity = {
          prospect: {
            fullname: {
              iRegexp: keyword.trim(),
            },
          },
        };
      }
      setSalesPayments(prevState => ({ ...prevState, isfetching: true }));
      let response = await ordersService.getSalesPayments(query, page, limit);
      if (response.status == 200 || response.status == 201) {
        let { results, count } = response?.data;
        let normalize = results?.map(item => ordersService.normalizeSales(item));
        setSalesPayments({ isfetching: false, total: count, data: normalize });
      }
    } catch (error) {
      console.log(error);
      setSalesPayments(prevState => ({ ...prevState, isfetching: false }));
    }
  };

  const getOportunity = async () => {
    try {
      setDataOportunity(prevState => ({...prevState, isfetching:true}));
      let response = await ordersService.getOportunity(selectedPay?.data?.oportunityId);
      if(response.status == 200 || response.status == 201){
        setDataOportunity({data:response?.data?.results, isfetching:false});
      }
    } catch (error) {
      console.log(error);
      setDataOportunity(prevState => ({...prevState, isfetching:false}));
    }
  }

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setSelectedPay(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => setKeyword("");

  const refetchData = () => getSalesPayments();

  let actions = [
    {
      name: "Ver",
      action: e => {
        console.log(e);
        setIsOpenPreview(true);
        setSelectedPay(e);
      },
    },
  ];

 const refresh = () => getSalesPayments();

  return {
    isOpenPreview,
    keyword,
    orderBy,
    tableData: {
      headsPayments,
      actions,
      customColumns,
    },

    paginationData: {
      handlePage,
      page,
      limit,
    },
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,

    salesPayments,
    refetchData,
    selectedPay,
    open,
    toggleModal,
    refresh,
    dataOportunity,
    setSelectedPay
  };
}

let headsPayments = [
  {
    headText: "Nombre",
    headNormalize: "name",
    orderby: null,
  },
  {
    headText: "Comision",
    headNormalize: "comission",
    orderby: null,
  },
  {
    headText: "Monto",
    headNormalize: "monto",
    orderby: null,
  },
  {
    headText: "Pagado",
    headNormalize: "pagado",
    orderby: null,
  },
  {
    headText: "Fecha Limite",
    headNormalize: "datelimit",
    orderby: null,
  },
  {
    headText: "Expirado",
    headNormalize: "expired",
    orderby: null,
  },
  {
    headText: "Se Vendio En",
    headNormalize: "sellingin",
    orderby: null,
  },
];

const customColumns = {
  Folio: {
    columname: "Nombre",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            style={{
              color: "#034D6F",
              fontWeight: "bold",
            }}
            onClick={() => {}}
          >
            {item?.name}
          </p>
        </div>
      );
    },
  },
};
