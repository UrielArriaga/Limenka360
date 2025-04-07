import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicaInventory from "../../../features/BiomedicaInventory";

export default function Reparaciones() {
  return (
    <CommonLogLayout role={"areabiomedica"}>
    <BiomedicaInventory/>
    </CommonLogLayout>
  );
}

