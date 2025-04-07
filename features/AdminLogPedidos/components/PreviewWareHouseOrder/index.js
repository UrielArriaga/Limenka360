import { IconButton } from "@material-ui/core";
import { ArrowBackIos, Edit } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useModal from "../../../../hooks/useModal";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import ModalWereHoseCount from "./ModalWereHoseCount";
import { Dot, LoaderWrapper, PreviewOrderStyled } from "./styles";
import { ModalUpdateWarehouse } from "./ModalUpdateWarehouse";

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
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedWarehouseOrder, setSelectedWarehouseOrder] = useState(null);

  if (isFetchingOrder) {
    return (
      <LoaderWrapper>
        <Dot />
        <Dot />
        <Dot />
      </LoaderWrapper>
    );
  }
  
  const groupedByWarehouseName = warehouseorders?.reduce((acc, obj) => {
    const warehouseName = obj.warehouse?.name;
    if (!acc[warehouseName]) {
      acc[warehouseName] = [];
    }
    acc[warehouseName].push(obj);
    return acc;
  }, {});

  const GroupByWarehouse = () => {
    const lengthGroupName = Object.keys(groupedByWarehouseName);
    const lengthGroupValues = Object.values(groupedByWarehouseName);

    for (let i = 0; i < lengthGroupName?.length; i++) {
      return (
        <div key={i}>
          <div className={`tablerow  `} onClick={() => {}}>
            <div className="tablecell code">{lengthGroupName[i]}</div>
            <div className="tablecell">{lengthGroupValues[i]?.length}</div>
            <div className="tablecell">
              <div
                style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: 15,
                  background: getColorStatusOrder(lengthGroupValues[i][0]?.statuswho).bgColor,
                  color: getColorStatusOrder(lengthGroupValues[i][0]?.statuswho).color,
                }}
              >
                {lengthGroupValues[i][0]?.statuswho == "pedido nuevo" ? "Asignado" : lengthGroupValues[i][0]?.statuswho}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

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
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {/*GroupByWarehouse()*/}
                {warehouseorders.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={`tablerow  `} onClick={() => {}}>
                        <div className="tablecell code">
                          <p>{item.warehouse?.name}</p>
                        </div>

                        <div className="tablecell">
                          <p>{item.totalorder}</p>
                        </div>

                        <div className="tablecell">
                          <div
                            style={{
                              display: "inline-block",
                              padding: "2px 10px",
                              borderRadius: 15,
                              background: getColorStatusOrder(item.statuswho).bgColor,
                              color: getColorStatusOrder(item.statuswho).color,
                            }}
                          >
                            <p>{item.statuswho == "pedido nuevo" ? "Asignado" : item.statuswho}</p>
                          </div>
                        </div>
                        <div className="tablecell">
                          <div
                            className="contentpreview__address--action"
                            onClick={() => {
                              setSelectedWarehouseOrder(item);
                              setUpdateModalOpen(true);
                            }}
                          >
                            <Edit className="icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
      <ModalUpdateWarehouse
        open={updateModalOpen}
        handleClose={() => {
          setUpdateModalOpen(false);
          setSelectedWarehouseOrder(null);
        }}
        warehouseOrder={selectedWarehouseOrder}
        onUpdate={() => {
          handleOnClickViewProduct(null);
        }}
      />
    </PreviewOrderStyled>
  );
}
