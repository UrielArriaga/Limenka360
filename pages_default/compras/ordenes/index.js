import Head from "next/head";
import MainLayout from "../../../components/MainLayout";
import styled from "styled-components";
import { Add, BookRounded, Cached} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Button, LinearProgress, Tooltip, Box } from "@material-ui/core";
import { useRouter } from "next/router";

import { api } from "../../../services/api";
import { Pagination } from "@mui/material";
import { normalizeTablePushOrders } from "../../../utils/normalizeData";
import Filters from "../../../components/Filters";
import DataOrder from "../../../components/DataOrder";
import { CommonFiltersContext } from "../../../context/commonFiltersContext";
import Chips from "../../../components/ChipsFilters";
import SearchBox from "../../../components/SearchBox";
import DrawerPurchasingOrder from "../../../components/DrawerPurchasingOrder";
import TableComponent from "../../../components/TableOrders";

export default function OrdersPurchases() {
  const head = ["id", "proveedor", "condicion", "telefono", "observaciones", "metodo de entrega", "fecha de creacion"];
  const headsHidden = ["condicion", "telefono", "observaciones", "metodo de entrega", "fecha de creacion"];
  const [flag, setFlag] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();
  const [productsTable, setProductsTable] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState({ search: false, keySearch: "", type: "inQuery" });
  const [limit] = useState(10);
  const [order, setOrder] = useState("createdAt");
  const [ASC, setASC] = useState("");
  const { purchasesPurchaseOrders: options } = useContext(CommonFiltersContext);
  const [filters, setFilters] = useState([]);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);

  //**Drawer */
  const [open, setOpen] = useState(false);
  const [dataDrawerPreviewOrder, setDataDrawerPreviewOrder] = useState({});

  const paginasProducts = Math.ceil(totalOrders / limit);
  const handleRefetch = () => setFlag(!flag);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    getPushOrders();
  }, [page, flag, limit, order, ASC, readyLocalStorage]);

  const getLocalStorage = () => {
    let filtersOportunity = localStorage.getItem("filtersOrders_pushorder");
    if (filtersOportunity) {
      let formatFilters = JSON.parse(filtersOportunity);
      setFilters(formatFilters);
    }
    let asc = localStorage.getItem("orderCompras_ascPushorder");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    let orderby = localStorage.getItem("orderCompras_orderPushorder");
    if (orderby) {
      setOrder(JSON.parse(orderby));
    }
    setReadyLocalStorage(true);
  };
  const getPushOrders = async () => {
    try {
      setisLoading(true);
      let query = {};

      if (searchKey !== "") {
        query.provider = { companyname: `${searchKey}` };
      }

      let params = {
        include: "taxinformation,provider",
        skip: page,
        count: 1,
        limit: limit,
        join: "provider",
        where: generateQuery(),
        order: ASC ? order : `-${order}`,
      };

      let response = await api.get(`purchaseorders`, { params });
      
      setTotalOrders(response.data.count);
      let newOrder = normalizeTablePushOrders(response.data.results);
      saveDataLocalStorage(ASC, "pushorderCompras_asc", "orderCompras_ascPushorder");
      saveDataLocalStorage(order, "pushorderCompras_order", "orderCompras_orderPushorder");
      saveDataLocalStorage(filters, "pushfiltersOrders_pushorder", "filtersOrders_pushorder");
      setProductsTable(newOrder);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  const generateQuery = () => {
    let query = {};

    for (let i = 0; i < filters?.length; i++) {
      const currentQuery = filters[i];
      switch (currentQuery.id) {
        case "keySearch":
          let key = currentQuery.value;

          if (key) {
            if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(key.trim())) {
              query.phone = { $iRegexp: `${key.trim()}` };
            } else {
              query.provider = { fullname: `${key.trim()}` };
            }
          }

          break;

        default:
          if (currentQuery.typeof === "date") {
            query[currentQuery.id] = { $gte: currentQuery.value[0], $lte: currentQuery.value[1] };
          } else {
            query[currentQuery.id] = {
              between: currentQuery.value,
            };
          }
          break;
      }
    }

    return JSON.stringify(query);
  };
  const saveDataLocalStorage = (value, type, key) => {
    switch (type) {
      case "keyword":
        localStorage.setItem(key, value);
        break;

      case "query":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };
  const handlePage = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };
  const toggleFlag = () => {
    if (page > 1) setPage(1);
  };

  //*Drawer

  const handleOpenDrawer = (eve, show) => {
    if (show) {
      setDataDrawerPreviewOrder(eve);
      setOpen(show);
    } else {
      router.push({
        pathname: "../compras/ordenes/order",
        query: {
          id: eve?.id,
        },
      });
    }
  };

  const handleCloseDrawer = () => {
    setDataDrawerPreviewOrder({});
    setOpen(false);
  };

  return (
    <MainLayout>
      <OrdersStyled>
        <Head>
          <title>CRM JOBS - Productos</title>
        </Head>
        <div className="main">
          <div className="ctr_products">
            <div className="head">
              <div className="head__title">
                <h1>Ordenes de compra</h1>
                <p className="total">
                  <BookRounded />
                  {`${totalOrders} Ordenes`}
                  <Tooltip arrow title="Recargar" placement="right">
                    <Cached className="reload" onClick={() => setFlag(!flag)} />
                  </Tooltip>
                </p>
              </div>
              <Button variant="contained" className="btn_add" onClick={() => router.push("../compras/ordenes/nuevo")}>
                <Add />
                <p>Agregar Orden</p>
              </Button>
            </div>
            <SearchBox value={searchKey} setValue={setSearchKey} restorePage={toggleFlag} />
            <Box display="flex" justifyContent="flex-end" alignItems="center" marginBottom={5}>
              <DataOrder
                falling={ASC}
                setFalling={setASC}
                order={order}
                setOrder={setOrder}
                addOptions={[
                  { label: "Fecha Creación ", value: "createdAt" },
                  { label: "Fecha Actualización", value: "updatedAt" },
                ]}
                addOptionsOrderBy={[
                  { label: "Descendente", value: "-" },
                  { label: "Ascendente ", value: "" },
                ]}
              />
              <div className="filters">
                <Filters
                  options={options.optionsFilters}
                  keySearchValue={searchKey}
                  refetch={handleRefetch}
                  filters={filters}
                  setFilters={setFilters}
                  restorePage={toggleFlag}
                />
              </div>
            </Box>

            <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} notDelete={null} />

            {isLoading && (
              <div className="ctr_load">
                <div className="ctr_load__img">
                  <img src="/load.png" />
                </div>
                <div className="ctr_load__load">
                  <p>Cargando</p>
                  <LinearProgress color="primary" />
                </div>
              </div>
            )}
            {!isLoading && (
              <>
                <TableComponent
                  data={productsTable}
                  id="Proveedor"
                  discartedTable={isLoading}
                  heads={head}
                  secondaryColor="#dce1f6"
                  primaryColor="#405189"
                  handleClickName={(item, e) => handleOpenDrawer(item, e)}
                  headsHidden={headsHidden}
                />
                {productsTable?.length > 0 && (
                  <div className="ctr_products__tfooter">
                    <div className="ctr_products__tfooter__ctr_button"></div>
                    <div className="ctr_products__tfooter__ctr_pagination">
                      <p className="totalProducts">{`Total de Productos: ${totalOrders} Página: ${page} - ${Math.ceil(
                        totalOrders / limit
                      )}`}</p>
                      <div className="ctr_products__tfooter__ctr_pagination__pagination">
                        <Pagination
                          style={{ display: "flex", justifyContent: "center" }}
                          page={page}
                          defaultPage={1}
                          onChange={handlePage}
                          shape="rounded"
                          count={paginasProducts}
                          color="primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <DrawerPurchasingOrder show={open} closeDrawer={handleCloseDrawer} dataOrder={dataDrawerPreviewOrder} />
      </OrdersStyled>
    </MainLayout>
  );
}

const OrdersStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__title {
      font-size: 14px;
      margin-bottom: 10px;
      h1 {
        margin-bottom: 8px;
      }
      .total {
        display: flex;
        align-items: center;
        font-weight: 500;
        svg {
          font-size: 14px;
          margin-right: 5px;
          color: #103c82;
        }
        .reload {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .btn_add {
      padding: 10px 15px;
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      border-radius: 10px;
      svg {
        width: 15px;
        height: 15px;
        /* font-size: 25px; */
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 2px;
        margin-right: 5px;
      }
    }
  }
  .main {
    width: calc(100%);
    height: calc(100vh - 60px);
    overflow-y: auto;
  }

  .filters_chip {
    height: 30px;
    margin-bottom: 10px;
    .chip {
      text-transform: capitalize;
      margin-right: 5px;
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  .ctr_products {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    &__tfooter {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      &__ctr_button {
        margin-top: 10px;
        margin-bottom: 10px;
        .add_buton {
          text-transform: capitalize;
          background-color: #405189;
        }
      }
      &__ctr_pagination {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &__pagination {
          display: flex;
          align-items: center;
        }
      }
      .totalProducts {
        font-weight: 500;
        color: #495057;
      }
      button.MuiButtonBase-root.MuiPaginationItem-root.MuiPaginationItem-page.MuiPaginationItem-rounded.MuiPaginationItem-textPrimary.Mui-selected {
        background-color: #0f3e7d;
      }
    }
  }
  .ctr_drawer {
    background-color: #0c203b;
  }
`;
