import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";

import QuotesTabulator from "../../components/UI/templates/QuotesTabulator";

export default function Tabulador() {
  const { roleId } = useSelector(userSelector);

  const renderContent = () => {
    let render = contentByRole.filter(item => item.identifier === roleId);
    if (render.length > 0) return render[0].content;
    return <></>;
  };

  return <>{renderContent()}</>;
}

const contentByRole = [
  {
    identifier: "ejecutivo",
    content: <QuotesTabulator />,
  },
  {
    identifier: "gerente",
    content: <QuotesTabulator />,
  },
];
