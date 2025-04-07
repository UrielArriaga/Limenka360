import React, { useState } from "react";
import DirectorLayout from "../../../../layouts/DirectorLayout";
import { PaymentStyle } from "../../../../styles/Director/pagos";
import HeadPayment from "../components/HeadPayment";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "../../../../services/api";
import InfoPayments from "../components/InfoPayments";
import useModal from "../../../../hooks/useModal";
import DirectorDrawerForPayments from "../../../../components/DirectorDrawerForPayments";
import { normalizePayments } from "../../../../utils/utils_payments";
import { Skeleton } from "@material-ui/lab";
import PaymentCalendar from "../../../../components/UI/organism/PaymentCalendar";

export default function index() {
  const router = useRouter();
  const oportunityId = router.query.o;
  const [count, setCount] = useState(0);
  const { open, toggleModal } = useModal();
  const [paymentsTable, setPaymentsTable] = useState();
  const [dataOportunity, setDataOportunity] = useState();
  const [optionSelected, setOptionSelected] = useState();
  const [drawerHead, setDrawerHead] = useState();
  const [isRefetch, setIsRefetch] = useState(false);
  const [payments, setPayments] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPayments();
  }, [isRefetch]);

  const getPayments = async () => {
    setIsLoading(true);
    let params = {
      count: "1",
      where: {
        oportunityId: oportunityId,
      },
      order: 'date',
      join: "oportunity,oportunity.prospect,oportunity.phase",
      include: "oportunity,oportunity.prospect,oportunity.phase",
    };

    const { data } = await api.get(`/salespayments`, { params });

    setPayments(data.results);

    //Elimina los id repetidos
    const uniqueArrEntityId = [...new Set(data.results.map(item => item.oportunity?.prospect.entityId))];
    const uniqueArrEjecutiveId = [...new Set(data.results.map(item => item.oportunity?.prospect.ejecutiveId))];

    const [entityResponse, ejecutiveResponse] = await Promise.all([
      api.get(`/entities/`, { params: { where: { id: uniqueArrEntityId } } }),
      api.get(`/ejecutives/`, { params: { include: "group", where: { id: uniqueArrEjecutiveId } } }),
    ]);

    setCount(data.count);
    setPaymentsTable(normalizePayments(data.results, entityResponse.data.results, ejecutiveResponse.data.results));
    setIsLoading(false);
  };

  return (
    <DirectorLayout>
      <PaymentStyle>
        <HeadPayment title={"Editar Pagos"} count={count} getPayments={getPayments} back={true} recharge={isRefetch} />
        <InfoPayments
          info={paymentsTable}
          setDataOportunity={setDataOportunity}
          toggleModal={toggleModal}
          setOptionSelected={setOptionSelected}
          setDrawerHead={setDrawerHead}
        />
        {!isLoading ? (
          payments && <PaymentCalendar dataPayments={payments} isRefetch={isRefetch} setIsRefetch={setIsRefetch} />
        ) : (
          <Skeleton variant="rect" height={380} />
        )}
        <DirectorDrawerForPayments
          isOpen={open}
          close={toggleModal}
          oportunity={dataOportunity}
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
          drawerHead={drawerHead}
        />
      </PaymentStyle>
    </DirectorLayout>
  );
}
