import React from "react";
import DirLogEntryNew from "../../../../features/DirLogEntryNew";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";

function NewEntry() {
  return (
    <CommonLogLayout role="master_almacen">
      <DirLogEntryNew />
    </CommonLogLayout>
  );
}

export default NewEntry;
