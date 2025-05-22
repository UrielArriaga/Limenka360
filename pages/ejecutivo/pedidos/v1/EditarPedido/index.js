import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../../redux/slices/userSlice";
import EditOrderAdministration from "../../../../../components/UI/templates/EditOrderAdministration";
import EditOrder from "../../../../../components/UI/templates/EditOrder";
import ExecutiveEditOrderV2 from "../../../../../features/ExecutiveEditOrderV2";

export default function EditarPedido() {
  const { roleId } = useSelector(userSelector);

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
