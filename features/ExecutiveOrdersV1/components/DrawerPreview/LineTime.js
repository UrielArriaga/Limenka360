import { Pagination } from "@material-ui/lab";
import {
  Assignment,
  Call,
  Email,
  Schedule,
  WatchLater,
  WhatsApp,
} from "@material-ui/icons";
import { TimeLinePrewiewStyled, useStyles } from "./styles";
import dayjs from "dayjs";

const iconsActions = {
  Whatsapp: {
    icon: <WhatsApp />,
    color: "#fff",
    bgColor: "#25d366",
  },
  Cita: {
    icon: <WatchLater />,
    color: "#fff",
    bgColor: "#512da8",
  },
  "Seguimiento Automatico": {
    icon: <Schedule />,
    color: "#fff",
    bgColor: "#ff9800",
  },
  Tarea: {
    icon: <Assignment />,
    color: "#fff",
    bgColor: "#1976d2",
  },
  LLamada: {
    icon: <Call />,
    color: "#fff",
    bgColor: "#f44336",
  },
  Email: {
    icon: <Email />,
    color: "#fff",
    bgColor: "#6d4c41",
  },
};

export default function LineTime({ trackings = [], paginationDataTracks }) {
  const formatDate = (date) => dayjs(date).format("MMMM D, YYYY");
  return (
    <TimeLinePrewiewStyled>
      <div className="dividerchip">
        <div className="chip">Historial del prospecto</div>
      </div>
      <div className="timeLineContainer">
        {trackings.map((item, index) => {
          return (
            <div
              className="timeLineItem"
              key={index}
              onClick={() => {
                console.log(item.action);
              }}
            >
              <div className="line">
                <div
                  className="circle"
                  style={{
                    backgroundColor: iconsActions[item?.action?.name]?.bgColor,
                    color: iconsActions[item?.action?.name]?.color,
                  }}
                >
                  {iconsActions[item?.action?.name]?.icon || null}
                </div>
                <div className="line"></div>
              </div>
              <div className="cardcontent">
                <p className="titleaction">
                  {item?.phase?.name} - {formatDate(item.createdAt)}
                </p>
                <p className="txtcard reason">Asunto: {item.reason} </p>
                <p className="txtcard reason">
                  Observación: {item.observations}{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {paginationDataTracks && paginationDataTracks.total > 3 && (
          <Pagination
            variant="outlined"
            count={Math.ceil(
              paginationDataTracks.total / paginationDataTracks.limit
            )}
            onChange={(e, value) => paginationDataTracks.handlePage(value)}
            size="small"
            page={paginationDataTracks.page}
            color="primary"
          />
        )}
      </div>
    </TimeLinePrewiewStyled>
  );
}
