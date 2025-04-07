import { Comment, InsertDriveFile, RemoveRedEye } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

import RecentActivities from "../../molecules/RecentActivities";
import useFetch from "../../../../hooks/useFetch";
import MessageEmpty from "../MessageEmpty";
import dayjs from "dayjs";
export default function ResumeExecutivePage({ startDate, finishDate, executive, periodDate, refetchData }) {
  const generateQuery = () => {
    console.log("executive", executive);
    let query = {
      ejecutiveId: executive.id,
      createdAt: {
        $gte: dayjs().startOf("day").format(),
        $lte: dayjs().endOf("day").format(),
      },
    };
    return {
      order: "-createdAt",
      count: 1,
      all: 1,
      include: "ejecutive",
      where: JSON.stringify(query),
    };
  };

  const { response, isFetching } = useFetch({
    path: "activities",
    condition: true,
    refetch: refetchData,
    params: generateQuery(),
    activeTime: true,
    timeRequest: 300000,
  });

  const handleOpenActivity = user => {
    console.log(user);
  };

  const handleAction = user => {
    console.log("Click on action");
  };

  return (
    <ResumeExecutivePageStyled>
      <h3>Resumen de Ejecutivo</h3>
      {/* <div className="card">
        <div className="count  icon_eye ">
          <p>{countNoViewed}</p>
        </div>
        <p>Prospectos No Visualizados</p>
      </div> */}

      {/* <div className="card">
        <div className="count icon_tracking ">
          <p>{countNoTracking}</p>
        </div>
        <p>Prospectos sin seguimiento</p>
      </div> */}

      {/* <div className="card">
        <div className="count icon_quote ">
          <p>{countQuotes}</p>
        </div>
        <p>Cotizaciones</p>
      </div> */}

      {/* <div className="card"> */}
      <div className="wrapper">
        {response.results.length === 0 ? (
          <MessageEmpty
            title={"Resumen de las metas"}
            subtitle={"No hay registros disponibles"}
            description={"Monitore los avances de tus grupos"}
            actionText={"Revisar ejecutivo para saber sus actividades"}
            action={handleAction}
          />
        ) : (
          <RecentActivities activitiesList={response.results} showInfo={true} handleOpenActivity={handleOpenActivity} />
        )}
      </div>
      {/* </div> */}

      {/* <div className="card">
        <div className="count icon_pendings ">
          <p>{countNoTracking}</p>
        </div>
        <p>Pendientes</p>
      </div>

      <div className="card">
        <div className="count icon_tocomplet ">
          <p>{countNoTracking}</p>
        </div>
        <p>Pendientes por completar</p>
      </div> */}
      {/* <div className="card">
        <Comment className="icon_tracking" />
        <p>Prospectos sin seguimiento</p>
        <div className="count">{countNoTracking}</div>
      </div>
      <div className="card">
        <InsertDriveFile className="icon_quote" />

        <p>Cotizaciones</p>

        <p className="count">{countQuotes}</p>
      </div>

      <div className="card">
        <p>Clientes</p>
        <p>{countClisnts}</p>
      </div> */}
    </ResumeExecutivePageStyled>
  );
}

const ResumeExecutivePageStyled = styled.div`
  padding: 10px;
  height: 50vh;
  border-radius: 8px;
  /* border: 1px solid #000; */
  background-color: #ffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  h3 {
    margin-bottom: 20px;
  }
  .wrapper {
    height: 90%;
    overflow: auto;
  }
  .card {
    border-radius: 8px;
    padding: 2px;
    height: 90%;
    /* margin-bottom: 10px; */
    /* display: flex; */

    /* svg {
      margin-right: 10px;
      font-size: 30px;
    } */
  }

  .icon_eye {
    background-color: #f4403b;
    /* background-color: #f4403b;
    padding: 10px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    color: #fff;
    font-weight: bold; */
  }
  .count {
    /* background-color: #f4403b; */
    padding: 10px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    color: #fff;
    font-weight: bold;
  }
  .icon_tracking {
    background-color: #fd7289;
  }

  .icon_quote {
    background-color: #872195;
  }
  .icon_pendings {
    background-color: #f9a825;
  }
  .icon_tocomplet {
    background-color: #536dfe;
  }
`;

// <button
//         onClick={async () => {
//           try {
//             let query = {
//               // isclient: false,
//               // isoportunity: false,
//               // discarted: false,
//               // viewed: false,
//             };

//             // query.createdAt = {
//             //   $gte: startDate,
//             //   $lte: finishDate,
//             // };

//             // query.ejecutive = {
//             //   id: executive.id,
//             // };

//             let params = {
//               // limit: 0,
//               count: 1,
//               where: JSON.stringify(query),
//             };

//             api
//               .get("prospects", { params })
//               .then(res => {
//                 console.log(res);
//               })
//               .catch(err => {
//                 console.log(err);
//               });
//           } catch (error) {}
//         }}
//       >
//         click me to test
//       </button>
