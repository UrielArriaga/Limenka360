import { Button } from "@material-ui/core";
import React from "react";
import { DialogCompleteApproved } from "./style";
import { Warning } from "@material-ui/icons";
import Select from "react-select";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function ModalCanceledOrder({
  open,
  handletoogle,
  orderSelectedData,
  handleOnChangeReason,
  reasonSelected,
  handleOnClickReject,
  isSaving,
}) {

  const { orderrejected } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  return (
    <DialogCompleteApproved onClose={handletoogle} open={open}>
      <div className="title">
        <Warning className="title__icon" />
        <p>¿Estás Seguro de esto?</p>
      </div>

      <div className="description">
        <p className="description__message">
          El pedido con folio <span>{orderSelectedData?.folio}</span> sera marcado como CANCELADO
        </p>

        <div className="description__options">
          <Select
            maxMenuHeight={220}
            placeholder="Selecciona una opción"
            options={orderrejected.results}
            isLoading={orderrejected.isFetching}
            getOptionValue={option => `${option.id}`}
            getOptionLabel={option => `${option.reason}`}
            onMenuOpen={() => getCatalogBy("orderrejected")}
            onChange={handleOnChangeReason}
            value={reasonSelected}
          />
        </div>
      </div>

      <div className="actions">
        <Button
          className={`actions__cancel ${"disabled"}`}
          onClick={handletoogle}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={`actions__approved ${"disabled"}`}
          onClick={handleOnClickReject}
          disabled={isSaving}
        >
          Aceptar
        </Button>
      </div>
    </DialogCompleteApproved>
  );
}
