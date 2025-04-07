import React, { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import dayjs from "dayjs";
import { RequestDataCategories } from "../services";

function useSearchCategories(setShowUpload, setValue, handleCloseEdit, setShowDelete, handleCloseDelete, open) {
  let heads = [
    {
      headText: "Categoria",
      headNormalize: "Categoria",
      orderby: "-name",
    },
    {
      headText: "Fecha",
      headNormalize: "createdAt",
      orderby: "-createdAt",
    },
    {
      headText: "Ultima Modificacion",
      headNormalize: "updatedAt",
      orderby: "-updatedAt",
    },
  ];

  let actions = [
    {
      name: "Modificar",
      action: e => {
        setSelectItemCategory(e);
        setShowUpload(true);
        setName(e.name);
        setValue("name", e.name);
      },
    },
    {
      name: "Eliminar",
      action: e => {
        setShowDelete(true);
        setSelectItemCategory(e);
      },
    },
  ];

  const customColumns = {
    Categoria: {
      columname: "Categoria",
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

  const [keyWord, setKeyWord] = useState("");
  const handleChangeWord = e => setKeyWord(e.target.value);
  const handleDeleteWord = () => setKeyWord("");
  const [dataCategories, setDataCategories] = useState({
    data: [],
    fetching: false,
    countCategories: 0,
  });
  const [limit] = useState(15);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("createdAt");
  const { showAlertError, showAlertSucces } = useAlertToast();

  const [refetch, setRefetch] = useState(false);
  const [selectItemCategory, setSelectItemCategory] = useState({});
  const [name, setName] = useState("");
  const request = new RequestDataCategories();

  useEffect(() => {
    getDataCategories();
  }, [orderBy, page, keyWord, refetch]);

  const getDataCategories = async () => {
    try {
      setDataCategories({ ...dataCategories, fetching: true });
      let query = {};
      if (keyWord.length >= 3) {
        query.name = {
          iRegexp: keyWord,
        };
        setPage(1);
      }
      let params = {
        where: JSON.stringify(query),
        count: 1,
        order: orderBy,
        limit: limit,
        skip: page,
      };

      let responseData = await request.getCategories(params);
      let { count, results } = responseData.data;
      let normalizeData = normalizeDataCategories(results);
      setDataCategories({ data: normalizeData, countCategories: count, fetching: false });
    } catch (error) {
      setDataCategories({ ...dataCategories, fetching: false });
      console.log(error, " Error");
      showAlertError("Ocurrio un error al traer las categorias");
    }
  };

  const normalizeDataCategories = results => {
    let normalizeData = results.map(item => {
      return {
        id: item.id,
        name: item?.name ? item?.name : "N/A",
        createdAt: dayjs(item.createdAt).format("D,MMMM  YYYY	"),
        updatedAt: dayjs(item.updatedAt).format("D,MMMM  YYYY	"),
      };
    });

    return normalizeData;
  };

  const resetForm = () => {
    setValue("name", "");
    setName("");
  };

  const refreshData = () => setRefetch(!refetch);

  const handleUpdateCategory = async formData => {
    let body = {};
    body.name = formData.name;
    try {
      let responsePut = await request.putCategories(selectItemCategory.id, body);
      if (responsePut.status == 201 || responsePut.status == 200) {
        showAlertSucces("Se actualizo correctamente");
        setRefetch(!refetch);
        resetForm();
        handleCloseEdit();
      }
    } catch (error) {
      console.log("Error put category: ", error);
      showAlertError("Error, algo ocurrio al actualizar la categoria");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      let responseDelete = await request.deleteCategories(selectItemCategory.id);
      if (responseDelete.status == 200 || responseDelete.status == 201) {
        showAlertSucces("Se elimino la categoria con exito");
        handleCloseDelete();
        setRefetch(!refetch);
      }
    } catch (error) {
      console.log("Error al eliminar categoria: ", error);
      showAlertError("Error al eliminar la categoria");
    }
  };

  const handlePage = value => setPage(value);

  return {
    keyWord,
    handleChangeWord,
    handleDeleteWord,
    tableData: {
      data: dataCategories,
      heads,
      actions,
      customColumns,
    },
    orderBy,
    setOrderBy,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    dataToUpload: {
      name,
      setName,
    },
    handleUpdateCategory,
    refreshData,
    handleDeleteCategory,
    selectItemCategory,
  };
}

export default useSearchCategories;
