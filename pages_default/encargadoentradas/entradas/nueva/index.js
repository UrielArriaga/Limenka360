import React from "react";
import DirLogEntryNew from "../../../../features/DirLogEntryNew";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";

function NewEntry() {
  return (
    <CommonLogLayout role="encargadoentradas">
      <DirLogEntryNew />
    </CommonLogLayout>
  );
}

export default NewEntry;
