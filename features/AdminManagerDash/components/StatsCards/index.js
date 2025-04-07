import { AttachMoney, Block, CalendarToday, MonetizationOn } from "@material-ui/icons";
import React from "react";
import { Card, Container } from "./styles";
import { Skeleton } from "@material-ui/lab";

const StatsCards = ({ counters, isFechingCounter }) => {
  return (
    <Container>
      <Card borderColor="#2196F3">
        <div className="icono">
          <AttachMoney style={{ color: "#2196F3" }} />
        </div>
        {isFechingCounter ? (
          <div className="skeleton">
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" width="40%" height="20px" />
          </div>
        ) : (
          <div>
            <p className="title">Total Pedidos</p>
            <h4>{counters.all}</h4>
          </div>
        )}
      </Card>

      <Card borderColor="#4CAF50">
        <div className="icono">
          <MonetizationOn style={{ color: "#4CAF50" }} />
        </div>
        {isFechingCounter ? (
          <div className="skeleton">
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" width="40%" height="20px" />
          </div>
        ) : (
          <div>
            <p className="title">Aprobados</p>
            <h4>{counters?.approve}</h4>
          </div>
        )}
      </Card>

      <Card borderColor="#FF5722">
        <div className="icono">
          <Block style={{ color: "#FF5722" }} />
        </div>
        {isFechingCounter ? (
          <div className="skeleton">
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" width="40%" height="20px" />
          </div>
        ) : (
          <div>
            <p className="title">Rechazados</p>
            <h4>{counters?.denied}</h4>
          </div>
        )}
      </Card>

      <Card borderColor="#ffbb40de">
        <div className="icono">
          <CalendarToday style={{ color: "#ffbb40de" }} />
        </div>
        {isFechingCounter ? (
          <div className="skeleton">
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" width="40%" height="20px" />
          </div>
        ) : (
          <div>
            <p className="title">Pendientes</p>
            <h4>{counters?.pending}</h4>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default StatsCards;
