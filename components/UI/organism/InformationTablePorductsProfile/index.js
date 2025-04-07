import React, { useState } from "react";

import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
import { Edit } from "@material-ui/icons";
import TableLimenka from "../TableLimenka";
import { useEffect } from "react";
import { handleGlobalAlert } from "../../../../utils";
import { useDispatch } from "react-redux";
import { api } from "../../../../services/api";
import { normalizeTableDataProductShippingLogistic } from "../../../../utils/normalizeData";
import PaginationDirector from "../../molecules/PaginationTable";
import usePagination from "../../../../hooks/usePagination";
import ModifiPhaseShipping from "../../../ModalModifyPhaseShipping";
import useModal from "../../../../hooks/useModal";
export default function ProductsInformationProfile(props) {
  const { infoOrders, idShipping } = props;
  const { open: openPhaseProduct, toggleModal: togglePhaseProduct, closeModal: closeModalPhaseProduct } = useModal();
  const dispatch = useDispatch();
  const [productsShippings, setProductsShippings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [dataProducts, setDataProducts] = useState({});
  const { page, limit, handlePage } = usePagination({ defaultLimit: 10, defaultPage: 1 });

  useEffect(() => {
    if (idShipping) {
      getDataShippingsProduct();
    }
  }, [idShipping, page, refetch]);
  // productos por envio
  const getDataShippingsProduct = async () => {
    try {
      setIsFetching(true);
      let query = { shippingId: idShipping };
      const params = {
        where: JSON.stringify(query),
        include: "productsoportunity,productsoportunity.product,productphase,shipping,shipping.order,shippingphase",
        limit: limit,
        count: 1,
        skip: page,
      };
      let shipping = await api.get(`productsshippings`, { params });
      let newShipping = normalizeTableDataProductShippingLogistic(shipping.data.results);
      setProductsShippings(newShipping);
      setTotalProducts(shipping.data.count);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
      handleGlobalAlert("error", " ¡Error al cargar productos!", "basic", dispatch);
    }
  };
  const handleClickEditOrders = item => {
    setDataProducts(item?.itemBD);
    togglePhaseProduct();
  };

  return (
    <InfoStyled>
      <TableLimenka
        data={productsShippings}
        activeCheck
        primaryColor="#776ceb"
        secondaryColor="#dce1f6"
        heads={["codigo", "producto", "monto", "cantidad", "fase de producto", "fase de envio"]}
        id="tableProductsShipping"
        isFetching={isFetching}
        showActions
        // showGeneralActions
        actions={[
          {
            title: "Editar Fase de Envio",
            action: e => handleClickEditOrders(e),
            icon: <Edit />,
          },
        ]}
      />
      <PaginationDirector
        count={totalProducts}
        limit={limit}
        handlePage={handlePage}
        page={page}
        typeOfTitle="productos"
      />
      <ModifiPhaseShipping
        open={openPhaseProduct}
        dataShipping={dataProducts}
        close={closeModalPhaseProduct}
        setRefetchShipping={setRefetch}
        refetchShipping={refetch}
      />
    </InfoStyled>
  );
}
const InfoStyled = styled.div`
  overflow-x: hidden;
  .info_prospect {
    margin-bottom: 0px;
    .divider {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1.5px solid #f3f3f3;
    }
    .titleHead {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      display: flex;
      align-items: center;
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
    }
    .containerIcon {
      display: flex;

      align-items: center;
      font-size: 14px;
      font-weight: bold;
      svg {
        font-size: 25px;
        color: #66b271;
      }
      p {
        color: #0c203b;
      }
    }
    .title {
      color: #4f4f4f;
      font-size: 13px;
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 2px;
      height: 32px;
    }
    .data {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    .important {
      color: ${colors.bgDirector};
    }
    .capitalize {
      text-transform: capitalize;
    }
    .labels_container {
      margin-top: 4px;
      display: flex;
    }
  }
  .seemore {
    width: fit-content;
    color: ${colors.bgDirector};
    border-bottom: 1px solid transparent;
    transition: 0.2s;
    &:hover {
      border-bottom: 1px solid ${colors.bgDirector};
      cursor: pointer;
    }
  }
`;
const LabelContainer = styled.p`
  margin-right: 5px;
  border-radius: 5px;
  padding: 2px;
  font-size: 13px;
  border: 2px solid ${({ color }) => color};
  text-transform: capitalize;
  color: grey;
`;
const LindeDivider = styled.hr`
  width: 100%;
  border-top: 1px solid rgb(48, 63, 159);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 5px;
`;
