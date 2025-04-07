import React, { useEffect, useState } from "react";
import { ProvidersServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { useRouter } from "next/router";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import useModal from "../../../hooks/useModal";
export default function useDirLogProviders(activeFilters, isAdmin = false, toggleModaEdit, openEdit, setProviderEdit) {
  const providersServicess = new ProvidersServices();
  const { showAlertError } = useAlertToast();
  const { page, limit, handlePage, setPage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-companyname");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [providerSelected, setProviderSelected] = useState(null);
  const router = useRouter();
  const [dataProviders, setDataProviders] = useState({
    data: [],
    isFetching: false,
    count: 0,
  });
  const { open: openConfirmDelete, toggleModal: handleToggleDelete } = useModal();
  const [providerSelectedDelete, setProviderSelectedDelete] = useState(null);
  const { open: openView, toggleModal: toggleModalView } = useModal();

  let actions = [
    {
      name: "Ver",
      icon: <Visibility />,
      action: e => {
        toggleModalView(true);
        setProviderSelected(e);
      },
    },
    {
      name: "Editar",
      icon: <Edit />,
      action: e => {
        toggleModaEdit();
        setProviderEdit(e);
      },
    },
  ];

  useEffect(() => {
    if (openEdit == false) getData();
  }, [page, orderBy, activeFilters, keyword, openEdit]);

  const getData = async () => {
    try {
      setDataProviders({ ...dataProviders, isFetching: true });

      let query = {};

      if (keyword.length > 3) {
        query.companyname = {
          $iRegexp: keyword.trim(),
        };
        setPage(1);
      }

      const response = await providersServicess.geProviders(limit, page, orderBy, query);
      let { results, count } = response?.data;
      let normalizeData = results.map(item => providersServicess.normalizeDataProviders(item));
      setDataProviders({ ...dataProviders, isFetching: false, count: count, data: normalizeData });
    } catch (error) {
      setDataProviders({ ...dataProviders, isFetching: false });
      showAlertError("Error al mostrar proveedores");
      console.log(error);
    }
  };

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setProviderSelected(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => setKeyword("");

  const refetchData = () => getData();

  return {
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleOnClickRow,
    handleOnClickClosePreview,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    providerSelected,
    refetchData,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data: dataProviders,
      customColumns,
    },
    router,
    openConfirmDelete,
    handleToggleDelete,
    providerSelectedDelete,
    toggleModalView,
    openView,
  };
}

let heads = [
  {
    headText: "Empresa",
    headNormalize: "name",
    orderby: "-companyname",
  },
  {
    headText: "RFC",
    headNormalize: "rfc",
    orderby: null,
  },
  {
    headText: "Contacto",
    headNormalize: "fullname",
    orderby: null,
  },
  {
    headText: "Correo",
    headNormalize: "email",
    orderby: null,
  },
  {
    headText: "Telefono",
    headNormalize: "phone",
    orderby: null,
  },
];

const customColumns = {
  name: {
    columname: "Empresa",
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
            {item.name}
          </p>
        </div>
      );
    },
  },
};
