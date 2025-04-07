import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import EditOrderAdministration from "../../../components/UI/templates/EditOrderAdministration";
// import EditOrder from "../../../features/ExecutiveEditOrder";
import EditOrder from "../../../components/UI/templates/EditOrder";
import ExecutiveEditOrderV2 from "../../../features/ExecutiveEditOrderV2";

export default function EditarPedido() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData, id_user, company, groupId, roleId } = useSelector(userSelector);
  // const idOrder = router.query.pe;
  // const idOportunitie = router.query.op;

  const renderContent = () => {
    switch (roleId) {
      case "administracion":
        return <EditOrderAdministration />;
      default:
        return <EditOrder />;
    }
  };

  return (
    <>
      <ExecutiveEditOrderV2 />
    </>
  );
}
