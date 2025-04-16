import React from "react";
import { LastPendingsStyled } from "./styled";
import dayjs from "dayjs";
import { Phone } from "@material-ui/icons";

let duummyOportunities = [
  {
    id: 1,
    description: "Oportunidad 1",
    pendingstype: { name: "Tipo 1" },
    date_from: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    description: "Oportunidad 2",
    pendingstype: { name: "Tipo 2" },
    date_from: "2023-10-02T12:00:00Z",
  },
];

export default function BestOportunities({
  pendingsData = { pendings: duummyOportunities, isFetching: false },
}) {
  console.log(pendingsData);
  return (
    <LastPendingsStyled>
      <h4>Oportunidades</h4>

      {pendingsData.pendings.map((pending, index) => {
        return (
          <div
            key={pending.id}
            className={`item-pending  item-pending-${index}`}
          >
            <div className="col-1">
              <Phone />
            </div>

            <div className="col-2">
              <p>{pending.description}</p>
              <p>{pending?.pendingstype?.name}</p>

              <div className="date">
                <p>{dayjs(pending?.date_from).format("MMMM D, YYYY h:mm A	")}</p>
              </div>
            </div>
          </div>
        );
      })}
    </LastPendingsStyled>
  );
}
