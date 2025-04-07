import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DepAttendantServices } from "../services";
import { api } from "../../../services/api";
import dayjs from "dayjs";

const useDepAttendantRoute = handleOnChangeAddOrder => {
  const router = useRouter();
  const { userData } = useSelector(userSelector);

  const [orderSelected, setOrderSelected] = useState(null);
  const [productRute, setProdcutRute] = useState();
  const [productsModal, setProductsModal] = useState({
    results: [],
    isFetching: false,
    isError: false,
  });
  let warehouseorderId = router.query.warehouseorderId;
  let orderUrlId = router.query.orderId;
  const depAttendantservice = new DepAttendantServices();
  const [articlesData, setArticles] = useState({
    results: [],
    isFetching: false,
    isError: false,
  });
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const tasaImpuesto = 0.16;

  const calcularImporte = (precioUnitario, tasaImpuesto) => {
    const impuesto = precioUnitario * tasaImpuesto;
    const importeTotal = precioUnitario + impuesto;
    return importeTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  // * Fetch order by warehouseorderId

  useEffect(() => {
    const fetchWareHouse = async () => {
      try {
        let resData = (await depAttendantservice.getInventoryExitCompletWithAddressById(orderUrlId)).data;

        if (resData?.results?.length === 0) return;

        let inventoryExit = resData?.results[0];

        let respProduct = await fetchArticlesByIntentoryExit(inventoryExit.id);
        let products = respProduct.results || [];

        let normalizeProducts = products.map(item => {
          let { product } = item;      
          return {
            id: item?.serialnumber,
            code: product.code,
            name: product.name,
            marca: product.brand.name,
            Day: dayjs().format("DD/MM/YYYY"),
            productcan: "1" || "-",
            articleCant:  "1" || "-",
            articleunidad: "pzs",
            articledescripcion: product.name || "N/A",
            articulomaterial: product.material || "N/A",
            Embalaje: "N/A",
            weight: product.weight || 0,
            high: product.high || 0,
            long: product.long || 0,
            broad: product.broad || 0,
            Direcciones: inventoryExit.address || "N/A",
            NúmExt: inventoryExit.extnumber || "N/A",
            NúmInt: inventoryExit.intnumber || "N/A",
            Colonia: inventoryExit.colony || "N/A",
            Localidad: inventoryExit.locality || "N/A",
            Referencia: inventoryExit.reference || "N/A",
            Municipio: inventoryExit.municipality || "N/A",
            EstadoPais: inventoryExit.state || "N/A",
            cp: inventoryExit.cp || "N/A",
            precioU: product.callamount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || 0,
            Impuestos: ".16% ",
            import: calcularImporte(product.callamount, tasaImpuesto),
            total: "1234",
          };
        });
        setProdcutRute(normalizeProducts);
        inventoryExit.name = userData.name;
        inventoryExit.products = normalizeProducts;
        handleOnChangeAddOrder(true, { ...inventoryExit, isprimary: true });
      } catch (error) {
        console.log(error);
      }
    };

    if (orderUrlId) {
      fetchWareHouse();
    }
  }, []);

  const GetprodutinventoryExit = async inventoryExit => {
    try {
      if (inventoryExit?.results?.length === 0) return;

      setProductsModal({ results: [], isFetching: true, isError: false });
      let respProduct = await fetchArticlesByIntentoryExit(inventoryExit.id);
  
      let products = respProduct.results || [];
      let normalizeProducts = products?.map(item => {
        let { product } = item;
        return {
          id: item?.serialnumber,
          code: product.code,
          name: product.name,
          marca: product.brand.name,
          Day: dayjs().format("DD/MM/YYYY"),
          productcan: item.quantity || "-",
          articleCant: item.quantity || "-",
          articleunidad: "pzs",
          articledescripcion: product.name || "N/A",
          articulomaterial: product.material || "N/A",
          Embalaje: "N/A",
          weight: product.weight || 0,
          high: product.high || 0,
          long: product.long || 0,
          broad: product.broad || 0,
          Direcciones: inventoryExit.address || "N/A",
          NúmExt: inventoryExit.extnumber || "N/A",
          NúmInt: inventoryExit.intnumber || "N/A",
          Colonia: inventoryExit.colony || "N/A",
          Localidad: inventoryExit.locality || "N/A",
          Referencia: inventoryExit.reference || "N/A",
          Municipio: inventoryExit.municipality || "N/A",
          EstadoPais: inventoryExit.state || "N/A",
          cp: inventoryExit.cp || "N/A",
          precioU: product.callamount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") || 0,
          Impuestos: "16%",
          import: calcularImporte(product.callamount, tasaImpuesto),
          total: "123",
        };
      });

      inventoryExit.products = normalizeProducts;
       
      setProductsModal({ results: inventoryExit, isFetching: false, isError: false });
    } catch (error) {
      console.log(error, "error");
    }
  };

  // * Fetch orders by warehouseorderId
  useEffect(() => {
    const fetchOrdersToAdd = async () => {
      try {
        let query = {
          // warehouseorder: { warehouseId: userData?.warehouse?.id, id: { $ne: warehouseorderId } },
          inroute: false,
        };

        let resData = (await depAttendantservice.getInventoryExitCompletWithAddress(20, 1, "createdAt", query)).data;
        setOrders(resData.results || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (!warehouseorderId) return;

    fetchOrdersToAdd();
  }, [warehouseorderId]);

  const fetchArticlesByIntentoryExit = async inventoryexitParam => {
    try {
      let params = {
        include: "product,product.brand,product.category",
        join: "product,product.brand,product.category",
        where: {
          inventoryexitId: inventoryexitParam,
        },
      };

      let resp = await api.get("warehouseproducts", { params });

      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickSelectOrder = order => {
    setOrderSelected(order);
  };

  return {
    articlesData,
    orders,
    order,
    orderSelected,
    productRute,
    handleOnClickSelectOrder,
    GetprodutinventoryExit,
    productsModal,
  };
};

export default useDepAttendantRoute;
