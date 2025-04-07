import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { toogleDrawer, useExecutives } from "../../redux/slices/ejecutivosSlice";

export default function Notifications() {
  const { executives, isFetching, isOpenDrawer, totalExecutives } = useSelector(useExecutives);
  const dispatch = useDispatch();

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"right"} open={isOpenDrawer} onClose={() => dispatch(toogleDrawer())}>
          <DrawerContent>
            <div className="drwaeruser_header">
              <p className="title">Ejecutivos ({totalExecutives})</p>
            </div>
            {isFetching ? null : (
              <div>
                {executives.map((item, index) => {
                  return <ItemUser key={item.id} item={item} />;
                })}
              </div>
            )}
          </DrawerContent>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

import styled from "styled-components";
import { Check, FiberManualRecord } from "@material-ui/icons";
import ItemUser from "../UI/organism/ItemUser";
import { colors } from "../../styles/global.styles";
const DrawerContent = styled.div`
  width: 300px;

  .drwaeruser_header {
    background-color: ${colors.primaryColor};
    padding: 10px;
    margin-bottom: 10px;
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
