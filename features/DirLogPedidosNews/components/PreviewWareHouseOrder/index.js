import { IconButton } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { useRouter } from "next/router";
import React from "react";
import useModal from "../../../../hooks/useModal";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import ModalWereHoseCount from "./ModalWereHoseCount";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";

export default function PreviewWareHouseOrder({
  isFetchingOrder,
  orderSelectedData,
  productsData,
  actionsPedido,
  statesPedido,
  handleOnClickViewProduct,
  warehouseorders = [],
}) {
  const { productOportunitySelected, wereHouseSelected } = statesPedido;

  const { open, toggleModal } = useModal();

  const router = useRouter();

  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }

  return (
    <PreviewOrderStyled>
      <div className="headerpreview">
        <div className="row">
          <IconButton onClick={() => handleOnClickViewProduct(null)}>
            <ArrowBackIos />
          </IconButton>
          <p className="concept" onClick={() => router.push(`./pedidos/${orderSelectedData?.id}`)}>
            Lista de Asignaciones
          </p>
        </div>
      </div>

      <div className="contentpreview">
        <h4>Almacenes asignados </h4>

        <div className="contentpreview__containerTable">
          <div className="contentpreview__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Almacen</p>
                </div>

                <div className="tablehead">
                  <p>Cantidad Asignadas</p>
                </div>

                <div className="tablehead">
                  <p>Estatus</p>
                </div>
              </div>

              <div className="tablebody">
                {warehouseorders.map((warehouseOrder, index) => (
                  <div key={index}>
                    <div className={`tablerow  `} onClick={() => {}}>
                      <div className="tablecell code">{warehouseOrder?.warehouse?.name}</div>

                      <div className="tablecell">{warehouseOrder?.totalassing}</div>
                      <div className="tablecell">
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: 15,
                            background: getColorStatusOrder(warehouseOrder?.statuswho).bgColor,
                            color: getColorStatusOrder(warehouseOrder?.statuswho).color,
                          }}
                        >
                          {warehouseOrder?.statuswho == "pedido nuevo" ? "Asignado" : warehouseOrder?.statuswho}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalWereHoseCount
        open={open}
        handletoogle={toggleModal}
        productOportunitySelected={productOportunitySelected}
        wereHouseSelected={wereHouseSelected}
        actionsPedido={actionsPedido}
      />
    </PreviewOrderStyled>
  );
}
