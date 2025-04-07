import React from "react";
import { EmptyStyle } from "./style";

export default function EmptyData() {
  return (
    <EmptyStyle>
      <div className="empty">
        <img src="/empty_table.svg" className="empty__image" />
        <p className="empty__title">Sin resultados</p>
      </div>
    </EmptyStyle>
  );
}
