import { ArrowBackRounded } from "@material-ui/icons";
import React from "react";

export default function TitlePage() {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
      <button
        onClick={() => window.history.back()}
        style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#0d47a1", color: "#fff", cursor: "pointer" }}
      >
        <ArrowBackRounded />
      </button>
      <h2 style={{ marginLeft: "10px" }}>Mi cuenta</h2>
    </div>
  );
}
