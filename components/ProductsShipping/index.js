import React, { useState, useEffect } from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { ArrowBack, ArrowForward, Cached, CheckCircle } from "@material-ui/icons";
import { ProductsStyle } from "./style";
import LoaderPreview from "../LoaderPreviews";
import { api } from "../../services/api";
import { formatNumber } from "../../utils";
import useModal from "../../hooks/useModal";
import ModifiPhaseProduct from "../UI/organism/ModalModifyPhaseProduct";
import ModifiPhaseShipping from "../ModalModifyPhaseShipping";

export default function ProductsShipping(props) {
  const { open: openPhaseProduct, toggleModal: togglePhaseProduct, closeModal: closeModalPhaseProduct } = useModal();
  const { open: openPhaseShipping, toggleModal: togglePhaseShipping, closeModal: closeModalPhaseShipping } = useModal();
  const { typeOrder, dataIdShipping, isShipping } = props;
  const [isLoader, setIsLoader] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [dataProducts, setDataProducts] = useState({});
  const [dataShipping, setDataShiping] = useState({});
  const [page, setPage] = useState(1);
  //   const limit = 2;
  //   const countPages = Math.ceil(totalProducts / limit);

  //limitar a una petición
  useEffect(() => {
    if (dataIdShipping) {
      getProducts();
    }
  }, [page, refetch, dataIdShipping]);

  const getProducts = async () => {
    setIsLoader(true);
    try {
      let query = {
        shippingId: dataIdShipping,
      };
      let params = {
        where: JSON.stringify(query),
        order: "-createdAt",
        include: "productsoportunity,productsoportunity.product,productphase,shipping,shipping.order,shippingphase",
        limit: 1000,
        count: 1,
        skip: page,
      };
      if (typeOrder) {
        let response = await api.get(`productsshippings`, { params });
        setTotalProducts(response.data.count);
        setProducts(response.data.results);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };

  const handleClickEditOrders = item => {
    setDataProducts(item);
    togglePhaseProduct();
  };

  const handleClickEditOrdersPhaseShipping = item => {
    if (item) {
      setDataShiping(item);
      togglePhaseShipping();
    }
  };
  const thereIs = data => {
    if (data) {
      return <p>{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };
  return (
    <ProductsStyle>
      <p className="title_Products">
        Productos de envio <Cached className="icon_title" onClick={() => setRefetch(!refetch)} />
      </p>
      {isLoader ? (
        <LoaderPreview />
      ) : (
        <>
          <div className="ctr_gridProduct">
            {products.map((item, index) => (
              <div key={index} style={{ padding: 5 }}>
                <div className="target_shippingProduct">
                  <span className="span">Producto</span>
                  <Tooltip title={item?.productsoportunity?.product?.name}>
                    <p className="productName">{item?.productsoportunity?.product?.name}</p>
                  </Tooltip>
                  <span className="span">Monto</span>
                  <p>
                    {item?.productsoportunity?.newprice === 0
                      ? formatNumber(item?.productsoportunity?.product?.callamount)
                      : formatNumber(item?.productsoportunity?.newprice)}
                  </p>
                  <span className="span">Cantidad</span>
                  {thereIs(item?.productsoportunity?.quantity)}
                  <span className="span">Fase de Producto</span>
                  <div className="phase">
                    {thereIs(item?.productphase?.name)}
                    {item?.productphase?.name === "Entregado" && <CheckCircle />}
                  </div>
                  {isShipping === "compras" && (
                    <Button
                      className="EditButton"
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleClickEditOrders(item)}
                    >
                      Editar Fase Producto
                    </Button>
                  )}
                  {isShipping === "logistica" && (
                    <>
                      <span className="span">Fase de Envio</span>
                      <div className="phase">
                        {thereIs(item?.shippingphase?.name)}
                        {item?.shippingphase?.name === "Entregado" && <CheckCircle />}
                      </div>

                      <Button
                        className="EditButton"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleClickEditOrdersPhaseShipping(item)}
                      >
                        Editar Fase de Envio
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="pagination">
            <p className="title_count">
              Total de Productos: <span className="count">{totalProducts}</span>
            </p>
            <div className="navigation_buttons">
              <p className="pagesCount">
                Página {page} de {countPages}
              </p>
              <IconButton className="btBack" disabled={page <= 1 && true} onClick={() => setPage(page - 1)}>
                <ArrowBack />
              </IconButton>
              <IconButton
                className="btNext"
                disabled={page >= countPages ? true : false}
                onClick={() => setPage(page + 1)}
              >
                <ArrowForward />
              </IconButton>
            </div>
          </div> */}
        </>
      )}
      <ModifiPhaseProduct
        open={openPhaseProduct}
        dataShipping={dataProducts}
        close={closeModalPhaseProduct}
        setRefetchShipping={setRefetch}
        refetchShipping={refetch}
      />

      <ModifiPhaseShipping
        open={openPhaseShipping}
        dataShipping={dataShipping}
        close={closeModalPhaseShipping}
        setRefetchShipping={setRefetch}
        refetchShipping={refetch}
      />
    </ProductsStyle>
  );
}
