import React from "react";
import { useState } from "react";
import { api } from "../../services/api";
import usePagination from "../usePagination";
import { useEffect } from "react";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { initialEntitiesMap } from "../../BD/initialStates";

export default function useDashboardCharts(startDate, finishDate) {
  const defaultColors = ["#6ada7d", "#fa896b", "#5ea3cb", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"];

  const defaultColorsProducts = [
    "#024b7a",
    "#171717",
    "#7a30ab",
    "#e083fa",
    "#b5d63d",
    "#e7e34e",
    "#c02323",
    "#1bd4d4",
  ];

  const { company, groupId } = useSelector(userSelector);

  const [dataProducts, setDataProducts] = useState({
    chart: {
      labels: [],
      datasets: [
        {
          label: "# of Votes",
          data: [],
          backgroundColor: defaultColorsProducts,
        },
      ],
    },
    values: [],
    showSold: false,
    count: 1,
    isFetching: false,
  });

  const [dataCategories, setDataCategories] = useState({
    values: [],
    showSold: false,
    count: 1,
    isFetching: false,
    chart: {
      labels: [],
      datasets: [
        {
          label: "# of Votes",
          data: [],
          backgroundColor: defaultColorsProducts,
        },
      ],
    },
  });

  const [dataEntities, setDataEntities] = useState({
    values: [],
    showSold: false,
    typeview: "map",
    count: 1,
    isFetching: false,
    chart: {
      labels: [],
      datasets: [
        {
          label: "# of Votes",
          data: [],
          backgroundColor: defaultColorsProducts,
        },
      ],
    },
  });

  const [dataSales, setDataSales] = useState(JSON.parse(JSON.stringify(initialEntitiesMap)));

  const {
    page: pageCategories,
    limit: limitCategories,
    handlePageCategories,
  } = usePagination({ defaultLimit: 5, defaultPage: 1 });

  const {
    page: pageProducts,
    limit: limitProducts,
    handlePageProducts,
  } = usePagination({ defaultLimit: 5, defaultPage: 1 });

  const paginationEntites = usePagination({ defaultLimit: 5, defaultPage: 1 });

  useEffect(() => {
    getCategories();
  }, [pageCategories, startDate, finishDate, dataCategories.showSold]);

  useEffect(() => {
    getProducts();
  }, [startDate, finishDate, dataProducts.showSold]);

  useEffect(() => {
    getEntitiesAmounts();
  }, [dataEntities.showSold, paginationEntites.page, startDate, finishDate]);

  async function getCategories() {
    try {
      setDataCategories(prev => ({ ...prev, isFetching: true }));

      let query = {
        ejecutive: {
          groupId: groupId,
        },
        system: false,
        oportunity: {
          iscloseout: dataCategories.showSold,
          ...(dataCategories.showSold
            ? { soldat: { $gte: startDate, $lte: finishDate } }
            : { createdAt: { $gte: startDate, $lte: finishDate } }),
        },
      };

      let params = {
        where: JSON.stringify(query),
        order: "-totalAmount",
        count: 1,
        limit: limitCategories,
        skip: pageCategories,
      };

      let resData = (await api.get("dashboard/categoriesamount", { params })).data;

      let { data, values } = normalizeData(resData.results, defaultColors);

      setDataCategories(prev => ({
        ...prev,
        chart: {
          labels: data.labels,
          datasets: [
            {
              label: "# of Votes",
              data: data.datasets,
              backgroundColor: defaultColors,
            },
          ],
        },
        count: resData?.count,
        values,
        isFetching: false,
        res: resData.results,
      }));
    } catch (error) {
      console.log(error);
      setDataCategories(prev => ({ ...prev, isFetching: false }));
    }
  }

  async function getProducts() {
    try {
      setDataProducts(prev => ({ ...prev, isFetching: true }));

      const query = {
        totalAmount: { $gte: 1 },
        ejecutive: {
          groupId: groupId,
        },
        system: false,
        oportunity: {
          iscloseout: dataProducts.showSold,
          ...(dataProducts.showSold
            ? { soldat: { $gte: startDate, $lte: finishDate } }
            : { createdAt: { $gte: startDate, $lte: finishDate } }),
        },
      };

      const params = {
        where: query,
        order: "-totalAmount",
        limit: 10,
        skip: pageProducts,
        count: 1,
      };

      const respProducts = (await api.get("dashboard/productsalesamount", { params })).data;

      const { data, values } = normalizeData(respProducts.results, defaultColorsProducts, "prd");

      setDataProducts(prev => ({
        ...prev,
        chart: {
          labels: data.labels,
          datasets: [
            {
              label: "# of Votes",
              data: data.datasets,
              backgroundColor: defaultColorsProducts,
            },
          ],
        },
        values,
        count: respProducts?.count,
        isFetching: false,
        res: respProducts.results,
      }));
    } catch (error) {
      console.log(error);

      setDataProducts(prev => ({ ...prev, isFetching: false }));
    }
  }

  async function getEntitiesAmounts() {
    try {
      setDataEntities(prev => ({ ...prev, isFetching: true }));

      let query = {
        ejecutive: {
          groupId: groupId,
        },
        oportunity: {
          iscloseout: dataEntities.showSold,
          ...(dataProducts.showSold
            ? { soldat: { $gte: startDate, $lte: finishDate } }
            : { createdAt: { $gte: startDate, $lte: finishDate } }),
        },
      };
      let params = {
        where: JSON.stringify(query),
        limit: paginationEntites.limit,
        skip: paginationEntites.page,
        count: 1,
        order: "-totalAmount",
      };

      let response = await api.get("dashboard/entitysalesamount", { params });

      let { data, values } = normalizeData(response.data.results, defaultColorsProducts, "ens_t");

      setDataEntities(prev => ({
        ...prev,
        values: response.data.results,
        count: response.data.count,
        isFetching: false,
        chart: {
          labels: data.labels,
          datasets: [
            {
              label: "# of Votes",
              data: data.datasets,
              backgroundColor: defaultColorsProducts,
            },
          ],
        },
      }));

      if (response.data?.results?.length === 0) {
        setDataSales([
          ["Baja California", "mx-bc", 0],
          ["Baja California Sur", "mx-bs", 0],
          ["Sonora", "mx-so", 0],
          ["Colima", "mx-cl", 0],
          ["Nayarit", "mx-na", 0],
          ["Campeche", "mx-cm", 0],
          ["Quintana Roo", "mx-qr", 0],
          ["Estado de México", "mx-mx", 0],
          ["Morelos", "mx-mo", 0],
          ["Ciudad de México", "mx-cd", 0],
          ["Querétaro", "mx-qt", 0],
          ["Tabasco", "mx-tb", 0],
          ["Chiapas", "mx-cs", 0],
          ["Nuevo León", "mx-nl", 0],
          ["Sinaloa", "mx-si", 0],
          ["Chihuahua", "mx-ch", 0],
          ["Veracruz", "mx-ve", 0],
          ["Zacatecas", "mx-za", 0],
          ["Aguascalientes", "mx-ag", 0],
          ["Jalisco", "mx-ja", 0],
          ["Michoacán", "mx-mi", 0],
          ["Oaxaca", "mx-oa", 0],
          ["Puebla", "mx-pu", 0],
          ["Guerrero", "mx-gr", 0],
          ["Tlaxcala", "mx-tl", 0],
          ["Tamaulipas", "mx-tm", 0],
          ["Coahuila", "mx-co", 0],
          ["Yucatán", "mx-yu", 0],
          ["Durango", "mx-dg", 0],
          ["Guanajuato", "mx-gj", 0],
          ["San Luis Potosí", "mx-sl", 0],
          ["Hidalgo", "mx-hg", 0],
        ]);
      }

      console.log(response);
    } catch (error) {}
  }

  const updateEntity = entityToUpdate => {
    let newState = dataSales;

    newState.forEach(element => {
      if (element[0] === entityToUpdate.name) {
        element[2] = Number(entityToUpdate.totalAmount);
      }
    });

    setDataSales(newState);
  };

  // * Utils * //
  const cutName = name => {
    if (name && name.length > 10) {
      return `${name.slice(0, 10)}...`;
    }
    return name;
  };

  const normalizeData = (items = [], defaultColors = [], type = "def") => {
    let data = {
      labels: [],
      datasets: [],
    };

    let values = [];

    items.forEach((item, index) => {
      data.labels.push(type === "def" ? item.name : cutName(item.name));
      data.datasets.push(item.totalAmount);

      if (type == "ens_t") {
        updateEntity(item);
      }

      values.push({
        name: item.name,
        value: item.totalAmount,
        color: defaultColors[index],
      });
    });

    return {
      data,
      values,
    };
  };

  // * Events * //
  const handleSwtichRequest = (frm, value) => {
    console.log(frm);
    console.log(value);

    switch (frm) {
      case "prd":
        setDataProducts(prev => ({ ...prev, showSold: value }));
        break;
      case "ctr":
        setDataCategories(prev => ({ ...prev, showSold: value }));
        break;
      case "ens_t":
        setDataEntities(prev => ({ ...prev, showSold: value }));
        break;
      default:
        break;
    }
  };

  const handleChangeViewEntities = type => {
    setDataEntities(prev => ({ ...prev, typeview: type }));
  };

  return {
    getEntitiesAmounts,
    dataProducts,
    dataCategories,
    dataEntities,
    dataSales,
    paginationEntites,
    handleSwtichRequest,
    handleChangeViewEntities,
  };
}
