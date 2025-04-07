import React, { useState } from "react";
import { TableSerialStyled } from "./styles";
import LoaderTable from "../UI/molecules/LoaderTable";
import { formatDate, formatHour } from "../../utils";
import { EmojiPeople, VerifiedUser, Build } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import ModalTrainings from "../ModalTrainings";
import ModalWarranty from "../ModalWarranties";
import ModalInstallations from "../ModalInstallations";

function TableProductsSerials({ serials = {} , orderInfo}) {
  const heads = ["fecha de creación", "serial", "Producto", "almacen","acciones"];
  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };

  const [selectedSerial, setSelectedSerial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const [selectedWarrantySerial, setSelectedWarrantySerial] = useState(null);
  const [installationModalOpen, setInstallationModalOpen] = useState(false);
  const [selectedInstallationSerial, setSelectedInstallationSerial] = useState(null);
  const handleOpenModal = (item) => {
    setSelectedSerial(item);
    setModalOpen(true);
  };
  const handleOpenWarrantyModal = (item) => {
    setSelectedWarrantySerial(item);
    setWarrantyModalOpen(true);
  };
  const handleOpenInstallationModal = (item) => {
    setSelectedInstallationSerial(item);
    setInstallationModalOpen(true);
  }

  return (
    <TableSerialStyled>
      <div className="table">
        {serials?.isFetching && <LoaderTable />}
        <ModalTrainings
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedItem={selectedSerial}
          addresssId={orderInfo?.address?.id}
        />
        <ModalWarranty
          warrantyModalOpen={warrantyModalOpen}
          onCloseWarranty={() => setWarrantyModalOpen(false)}
          orderSelected={selectedWarrantySerial}
        />
        <ModalInstallations
          installationModalOpen={installationModalOpen}
          onCloseInstallation={() => setInstallationModalOpen(false)}
          orderrSelected={selectedInstallationSerial}
          addreesssId={orderInfo?.address?.id}
        />
        <table className="ctr_table">
          <thead className="ctr_table__head">
            <tr className="ctr_table__head__tr">
              {heads.map((item, index) => (
                <th key={index} className={`title ${item == "fecha de creación" && "checkbox"}`}>
                  <div className="ctr_title">
                    <p>{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {!serials?.isFetching && serials?.total > 0 ? (
            <tbody className="ctr_table__body">
              {serials?.data?.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed">
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.createdAt)}, ${formatHour(item?.createdAt)}`}</span>
                      </p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.serialnumber || "N/A"}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.product?.name}</p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item?.warehouseorder?.warehouse?.name} </p>
                    </td>
                    <td className="data">
                    <p className="ctr_td actions">
                        <Tooltip title="Solicitar Capacitación" arrow>
                          <button className="icon-button-person" onClick={() => handleOpenModal(item)}>
                            <EmojiPeople fontSize="small" />
                          </button>
                        </Tooltip>
                        
                        <Tooltip title="Solicitar Garantía" arrow>
                          <button className="icon-button-money" onClick={() => handleOpenWarrantyModal(item)}>
                            <VerifiedUser fontSize="small" />
                          </button>
                        </Tooltip>

                        <Tooltip title="Solicitar Instalación" arrow>
                          <button className="icon-button-build" onClick={() => handleOpenInstallationModal(item)} >
                            <Build fontSize="small" />
                          </button>
                        </Tooltip>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div className="body_empty">
              <div className="message_ctr">
                <img src="/empty_table.svg" />
                <p>Aun no hay datos</p>
              </div>
            </div>
          )}
        </table>
      </div>
    </TableSerialStyled>
  );
}

export default TableProductsSerials;
