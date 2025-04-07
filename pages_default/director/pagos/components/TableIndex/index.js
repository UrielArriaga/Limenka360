import { Tooltip } from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import dayjs from "dayjs";
import { TableDataId } from "../../../../../styles/Director/pagos";

export default function TableIndex({
  item,
  itemData,
  isPar,
  isNew,
  openPreview,
  setData,
  setDrawerHead,
  setOptionSelected,
  option,
}) {
  const onClickName = async () => {
    console.log("itemData:", itemData);
    setOptionSelected(option);
    setData(() => ({
      itemBD: {
        ...itemData.itemBD.oportunity.prospect,
        entity: itemData.drawer.entity,
        ejecutive: itemData.drawer.ejecutive,
        prospectId: itemData.itemBD.oportunity?.prospect?.id,
      },
      id: itemData.itemBD.oportunityId,
    }));
    setDrawerHead("Prospecto");
    openPreview();
  };

  return (
    <TableDataId className={`column_id ${isPar ? "isPar" : ""} ${isNew ? "isNew" : ""}`}>
      <div className="content">
        <div className="content__flex">
          <div className="content__more"></div>

          <Tooltip title="Abrir Vista Previa">
            <p onClick={onClickName} className="name">
              {item}
            </p>
          </Tooltip>

          <div className="icon-bg">
            <OpenInNew className="openprospect" onClick={onClickName} />
          </div>
        </div>

        <div className="content__more">
          <p className="txt-lastracking">
            Ultimo seguimiento{" "}
            <span>{itemData?.lastTrackingDate ? dayjs(itemData?.lastTrackingDate).fromNow() : "-"} </span>
          </p>

          <p className="txt-createdAt">
            Creado el <span>{dayjs(itemData?.createdAt).format("DD/MM/YYYY")} </span>
          </p>

          <p className="txt-group">
            Grupo: <span>{itemData.drawer.ejecutive?.group.name} </span>
          </p>
        </div>
      </div>
    </TableDataId>
  );
}
