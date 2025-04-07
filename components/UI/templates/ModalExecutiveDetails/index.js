import { Close } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { DialogContainer } from "./styles";

export default function ModalExecutiveDetails({ open, setOpen, executive }) {
  const { id_user } = useSelector(userSelector);
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [prospects, setProspects] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [oportunities, setOportunities] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [payments, setPayments] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [customers, setCustomers] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [totalSales, setTotalSales] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [dataGraph, setDataGraph] = useState(undefined);
  const [reportType, setReportType] = useState("sales");

  const handleClose = () => setOpen(!open);

  return (
    <DialogContainer fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <div className="header">
        <p className="executivename">Ejecutivo: {executive.fullname}</p>
        <Close onClick={() => handleClose()} />
      </div>
    </DialogContainer>
  );
}
