import { useEffect } from "react";
import { commonSelector, getCities } from "../../redux/slices/commonSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DataFilters() {
  const { cities } = useSelector(commonSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    let params = {};
    dispatch(getCities({ params }));
  }, []);

  const datesOptions = [
    {
      id: "day",
      name: "Hoy",
      toChip: "Hoy",
    },
    {
      id: "week",
      name: "Semanal",
      toChip: "Semanal",
    },
    {
      id: "month",
      name: "Mensual",
      toChip: "Mensual",
    },
    {
      id: "range",
      name: "Rango de Fechas",
      toChip: "Rango de Fechas",
    },
  ];

  const filtersOptions = [
    {
      label: "Fecha de Creación",
      value: "dates",
      valuedb: "createdAt",
      custom: true,
      customOptions: datesOptions
    },
    {
      label: "Fecha de Actualización",
      value: "dates",
      valuedb: "updatedAt",
      custom: true,
      customOptions: datesOptions
    },
    {
      label: "Fecha de Demostracion",
      value: "dates",
      valuedb: "date",
      custom: true,
      customOptions: datesOptions
    },
    {
      label: "Por Estado",
      value: "entities",
      valuedb: "address",
      custom: false,
      customOptions: [],
    },
    // {
    //   label: "Por Ciudad",
    //   value: "cities",
    //   valuedb: "address",
    //   custom: true,
    //   customOptions: cities,
    // },
  ];

  return {
    filtersOptions,
  };
}
