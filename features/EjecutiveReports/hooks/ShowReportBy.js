// import React, { useEffect } from "react";
// import { useRouter } from "next/router";
// import ByPhases from "../../components/UI/templates/ByPhases";
// import ByEntities from "../../components/UI/templates/ByEntities";
// import ReportsByOrigins from "../../components/UI/templates/ReportsByOrigins";

// const router = useRouter();
  
//     useEffect(() => {
//       console.log("Router:", router.query);
//     }, []);
  
//     //Colocar aquí el template, dependiendo del tipo de reporte
//    export const showReportBy = reportType => {
//       switch (reportType) {
//         case "phases":
//           return <ByPhases ejecutiveID={router.query.id} />;
//         case "entities":
//           return <ByEntities ejecutiveID={router.query.id} />;
//         case "origines":
//           return <ReportsByOrigins ejecutiveID={router.query.id} />;
  
          
//         default:
//           return <p>{reportType} en construcción</p>;
//       }
//     };