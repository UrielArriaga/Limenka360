import React from "react";
import styled from "styled-components";
import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import useFetch from "../../../../hooks/useFetch";

export default function ResumeDirector() {
  const { groupSelected } = useSelector(dashboardDirectorSelector);
  const { startDateGlobal, finishDateGlobal } = useSelector(dashboardDirectorSelector);

  const generateQueryProspects = (startDateGlobal, finishDateGlobal, groupSelected) => {
    let query = {
      isclient: false,
      isoportunity: false,
    };
    let queryBefore = {};
    query.createdAt = {
      $gte: startDateGlobal,
      $lte: finishDateGlobal,
    };

    queryBefore.createdAt = {
      $gte: dayjs(startDateGlobal).subtract(1, "month").format(),
      $lte: dayjs(finishDateGlobal).subtract(1, "month").format(),
    };

    query.ejecutive = {
      groupId: groupSelected?.id,
    };

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(queryBefore),
      countcustomdate: 1,
    };
    return params;
  };
  const genereateQueryOportuniteis = (startDateGlobal, finishDateGlobal, groupSelected) => {
    let query = {
      isoportunity: true,
      isclient: false,
    };
    let queryBefore = {};
    query.oportunityAt = {
      $gte: startDateGlobal,
      $lte: finishDateGlobal,
    };
    queryBefore.oportunityAt = {
      $gte: dayjs(startDateGlobal).subtract(1, "month").format(),
      $lte: dayjs(finishDateGlobal).subtract(1, "month").format(),
    };
    query.ejecutive = {
      groupId: groupSelected?.id,
    };
    let params = {
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(queryBefore),
      countcustomdate: 1,
      limit: 0,
      count: 1,
    };

    return params;
  };

  const { data: dataProspectos } = useFetch({
    path: "prospects",
    params: generateQueryProspects(startDateGlobal, finishDateGlobal, groupSelected),
    condition: groupSelected,
    refetch: groupSelected,
  });

  const { data: dataOportunities } = useFetch({
    path: "prospects",
    params: genereateQueryOportuniteis(startDateGlobal, finishDateGlobal, groupSelected),
    condition: groupSelected,
    refetch: groupSelected,
  });

  if (!groupSelected) {
    return (
      <ResumeDirectorStyled>
        <h3>Resumen de Grupo</h3>
        <div className="noselected">
          <div className="message">Selecciona un grupo para ver sus datos</div>
        </div>
      </ResumeDirectorStyled>
    );
  }
  return (
    <ResumeDirectorStyled>
      <h3>Resumen de Grupo</h3>
      <p className="groupName">Grupo : {groupSelected.name}</p>

      <div className="cards">
        <div className="card p">
          <p className="titlecard">Prospectos</p>
          <p className="count">{dataProspectos.count}</p>
        </div>

        <div className="card o">
          <p className="titlecard">Oportunidades</p>
          <p className="count">{dataOportunities.count}</p>
        </div>

        <div className="card c">
          <p className="titlecard">Clientes</p>
          <p className="count">{dataProspectos.count}</p>
        </div>
      </div>
    </ResumeDirectorStyled>
  );
}

const ResumeDirectorStyled = styled.div`
  background-color: #fff;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  height: 100%;
  padding: 10px;

  .noselected {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #757575;
    font-size: 20px;
  }

  .groupName {
    margin-top: 20px;
    text-align: center;
    color: #616161;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .cards {
    .card {
      background-color: #ffff;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      margin-bottom: 10px;
      border-radius: 8px;
      padding: 10px;
      color: #fff;
      font-weight: bold;
    }

    .p {
      background-color: #44c8e1;
    }
    .o {
      background-color: #88c72e;
    }
    .c {
      background-color: #6b34bb;
    }
  }
`;
