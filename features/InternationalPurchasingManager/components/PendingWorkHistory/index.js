import React from "react";
import { PendingWorkHistoryStyled } from './styles';
import { Description } from "@material-ui/icons";
import TableLimenkaGeneral from "../../../../components/TableLimenkaGeneral/index.js";
import usePenddingShoping from "../../hooks/usePenddingShoping.js";
export default function PendingWorkHistory(orderSelected){
    
const {
tableData,
isFetchingPendings,
totalPendings,
paginationData
} = usePenddingShoping(orderSelected);

 return(
    <PendingWorkHistoryStyled>
        <div className="information">
            <div className="information__title">
                <Description className="icon"/>
                <h4>PENDIENTES</h4>
            </div>
            <div className="information__body">
            <TableLimenkaGeneral
            heads={tableData.heads}
            mainColumn={"Nombre evento"}
            typeTable="border"
            data={tableData.dataPendings}
            isLoading={isFetchingPendings}
            rowsLoader={totalPendings >= 20 ? 20 : totalPendings || 20}
            paginationData={{
                ...paginationData,
                total: totalPendings,
              }}
            />
            </div>
        </div>
    </PendingWorkHistoryStyled>
 );
}