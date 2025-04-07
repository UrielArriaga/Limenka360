import { ArrowForwardIos, Help } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toogleDialog,
  toogleOpenGroupDialog,
  toogleOpenNewGroupDialog,
} from "../../redux/slices/dialogSlice";
import { getDialogName } from "../../utils";

import { RouteHistoryStyled } from "./styles";

export default function RouteHistory({ route, parents }) {
  const dispatch = useDispatch();

  const getRoute = (parents, index) => {
    console.log(parents);
    let finalRoute = "";
    for (let i = 0; i < parents.length; i++) {
      const element = parents[i];
      if (parents.length === i) {
        finalRoute += `${element}`;
      } else {
        finalRoute += `${element}/`;
      }
    }

    console.log(finalRoute.toLowerCase());
  };
  return (
    <RouteHistoryStyled>
      <div className="routes">
        <div className="routes__principal">
          <p>{route}</p>
          <Help onClick={() => dispatch(toogleDialog(getDialogName(route)))} />
        </div>
        <div className="routes__history">
          {parents === null || parents !== undefined ? (
            <>
              {parents.map((item, index) => (
                <div
                  key={item}
                  onClick={() => getRoute(parents, index)}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p>{item}</p>
                  <ArrowForwardIos />
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </RouteHistoryStyled>
  );
}
