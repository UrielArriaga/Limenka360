import { Close } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleDialog, toogleOpenGroupDialog } from "../../redux/slices/dialogSlice";
import { getDialogName } from "../../utils";
import { DialogInfoStyled } from "./styles";

export default function DialogInfo({ title, route }) {
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.dialog.imports);

  if (showDialog === false) return null;
  return (
    <DialogInfoStyled>
      <div className="header">
        <h3>{title}</h3>
        <Close onClick={() => dispatch(toogleDialog(getDialogName(route)))} />
      </div>

      <div className="body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia pariatur consequuntur est quos distinctio hic, fugit rerum
          tempore dolorum quia doloremque cupiditate, deleniti atque nihil explicabo recusandae quibusdam! Cum.
        </p>
      </div>
    </DialogInfoStyled>
  );
}
