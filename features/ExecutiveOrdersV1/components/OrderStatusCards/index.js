import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import { userSelector } from "../../../../redux/slices/userSlice";
import { ApiServiceExOr } from "../../service";
import { CheckCircle, Whatshot, Cancel, Block, Edit } from "@material-ui/icons";
import { LinearProgress } from "@material-ui/core";

const OrderStatusCards = () => {
  const { id_user } = useSelector(userSelector);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const request = new ApiServiceExOr();

  const getIconForStatus = (statusName, color) => {
    const iconStyle = {
      marginRight: "6px",
      fontSize: "1em",
      color: color,
    };

    switch (statusName) {
      case "Aprobado":
        return <CheckCircle style={iconStyle} />;
      case "Pendiente de aprobación":
        return <Whatshot style={iconStyle} />;
      case "Cancelado":
        return <Cancel style={iconStyle} />;
      case "Edicion de datos":
        return <Edit style={iconStyle} />;
      case "Rechazado":
        return <Block style={iconStyle} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchStatusOrders = async () => {
      try {
        setLoading(true);
        const query = { ejecutivo: { id: id_user } };
        const response = await request.getStatusOrders(query);
        if (Array.isArray(response)) {
          setStatuses(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setStatuses(response.data);
        } else {
          setStatuses([]);
        }
      } catch (error) {
        console.error("Error al obtener los estados de los pedidos:", error);
        setStatuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusOrders();
  }, [id_user]);

  return (
    <div
      style={{
        marginBottom: "-5px",
        display: "flex",
        gap: "5px",
        paddingLeft: "15px",
      }}
    >
      {loading && <LinearProgress style={{ marginBottom: "10px" }} />}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {!loading && statuses.length === 0 && (
          <p>No hay estados de pedidos disponibles.</p>
        )}

        {statuses.map((statusInfo) => {
          const colorInfo = getColorStatusOrder(statusInfo.name);
          const icon = getIconForStatus(statusInfo.name, colorInfo.bgColor);

          return (
            <div
              key={statusInfo.id}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#1F232A",
                color:"#f7f7f7",
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                fontSize: "13px",
                padding: "6px 10px",
                borderLeft: `6px solid ${colorInfo.bgColor}`,
              }}
            >
              {icon}
              <span>
                {statusInfo.name}: <b>{statusInfo.countorders}</b>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusCards;
