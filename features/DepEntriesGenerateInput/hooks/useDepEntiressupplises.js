import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { api } from "../../../services/api";

export default function useDepEntiressupplises() {
  const router = useRouter();
  const [entriesProduct, setEntriesProduct] = useState(false);
  const [orderSelectedLocal, setOrderSelectedLocal] = useState(null);
  const [pickupOrder, setPickupOrder] = useState();

  // TODO  SOLO INTERNACIONALES TIENEN EL NS DEL PROVEEDOR

  const [isInternational, setIsInternational] = useState(false);

  const [dataSupplies, setDataSupplies] = useState({
    results: [],
    isFetching: false,
    isError: false,
  });
  useEffect(() => {
    const storedSupplies = localStorage.getItem("suppliesData");
    if (storedSupplies) {
      try {
        const parsedSupplies = JSON.parse(storedSupplies);
        let expandedSupplies = [];

        parsedSupplies.forEach(supply => {
          for (let i = 0; i < (supply.quantity || 1); i++) {
            expandedSupplies.push({
              code: supply.code || "Sin code",
              name: supply.product || "Sin nombre",
              serialnumber: "",
            });
          }
        });

        // setDataSupplies({ results: expandedSupplies, isFetching: false, isError: false });
      } catch (error) {
        console.error("Error al parsear desde localStorage", error);
        // setDataSupplies({ results: [], isFetching: false, isError: true });
      }
    }
  }, []);

  const Addprodcut = async item => {
    setEntriesProduct(false);
    try {
      let data = {
        folio: item.folio,
        deliverydate: dayjs().format(),
        observations: item.observations,
        orderId: pickupOrder?.orderId,
        pickupId: pickupOrder?.pickupId,
        warehouseproducts: item.warehouseproducts,
      };

      let addResps = await api.post(`inventoryentries/manual`, data);
      setEntriesProduct(false);
      getSupplises();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query?.pickupId) {
      // fetchWarehouseproductssupplies();

      fetchPickupsPurchaseOrders();
    }
  }, [router.query?.pickupId]);

  const fetchPickupsPurchaseOrders = async () => {
    try {
      let params = {
        where: {
          pickupId: router.query?.pickupId,
        },
        include: "purchaseorder",
      };
      let pickuppurchaseorders = await api.get("pickuppurchaseorder", {
        params,
      });

      console.log(pickuppurchaseorders);

      let purchaseordersids = pickuppurchaseorders.data.results.map(item => item.purchaseorderId);

      if (pickuppurchaseorders.data.results.length > 0) {
        if (pickuppurchaseorders.data.results[0].purchaseorder?.national === false) {
          setIsInternational(true);

          fetchWarehouseproductssupplies(purchaseordersids);
        } else {
          const storedSupplies = localStorage.getItem("suppliesData");
          if (storedSupplies) {
            try {
              const parsedSupplies = JSON.parse(storedSupplies);
              let expandedSupplies = [];

              parsedSupplies.forEach(supply => {
                for (let i = 0; i < (supply.quantity || 1); i++) {
                  expandedSupplies.push({
                    code: supply.code || "Sin code",
                    name: supply.product || "Sin nombre",
                    serialnumber: "",
                  });
                }
              });

              // setDataSupplies({ results: expandedSupplies, isFetching: false, isError: false });
            } catch (error) {
              console.error("Error al parsear desde localStorage", error);
              // setDataSupplies({ results: [], isFetching: false, isError: true });
            }
          }
        }
      }
    } catch (error) {}
  };

  const fetchWarehouseproductssupplies = async purchaseordersids => {
    try {
      // let params = {
      //   where: {
      //     pickupId: router.query?.pickupId,
      //   },
      //   include: "purchaseorder",
      // };
      // let pickuppurchaseorders = await api.get("pickuppurchaseorder", {
      //   params,
      // });

      // console.log(pickuppurchaseorders);

      // if (pickuppurchaseorders.data.results.length > 0) {
      //   if (pickuppurchaseorders.data.results[0].purchaseorder?.national === false) {
      //     setIsInternational(false);
      //   }
      // }

      // let purchaseordersids = pickuppurchaseorders.data.results.map(item => item.purchaseorderId);

      let paramssp = {
        where: {
          purchaseorderId: {
            $in: purchaseordersids,
          },
        },
        include: "supply,supply.product",
      };
      let whsupplies = await api.get("supplieswarehouseproducts", {
        params: paramssp,
      });

      setDataSupplies({
        results: whsupplies.data.results?.map((item, index) => {
          return {
            ...item,
            id: index,
            code: item.supply?.product?.code,
            name: item.supply?.product?.name,
            serialnumber: item?.serialnumber,
          };
        }),
        isFetching: false,
        isError: false,
      });

      console.log(purchaseordersids);
      console.log(whsupplies);
      // let whsupplies = await api.get("")
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dataSupplies,
    setDataSupplies,
    Addprodcut,
    entriesProduct,
    setEntriesProduct,
    orderSelectedLocal,
    setOrderSelectedLocal,
    isInternational,
  };
}
