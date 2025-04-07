import React, { useEffect, useState } from "react";
import Head from "next/head";
import ActivitiesCompras from "../../features/ActivitiesCompras";
import CommoShoppingLayout from "../../layouts/CommoShoppingLayout";

const ActiCompras = () => {
  const [open, setOpen] = useState(false);

  return (
<CommoShoppingLayout role='director_compras'>
     
        <Head>
          <title>CRM JOBS - Actividades</title>
        </Head>

       
            <ActivitiesCompras />
        
     
    </CommoShoppingLayout>
  );
};

export default ActiCompras;
