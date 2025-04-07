import React from "react";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";
import MasterNewExit from "../../../../features/MasterNewExit";


function NewEntry() {
  return (
    <CommonLogLayout role="master_almacen">
     <MasterNewExit/>
    </CommonLogLayout>
  );
}

export default NewEntry;
