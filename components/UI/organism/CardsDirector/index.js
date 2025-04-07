import { Tooltip } from "@material-ui/core";
import { PeopleAlt } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import RequestDirectorDashboard from "../../../../services/director_dashboard";
import { formatNumber } from "../../../../utils";
import { CardsLayout, Container } from "./styles";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
export default function CardsDirector({ startDate, finishDate }) {
  const router = useRouter();
  const apiDirector = new RequestDirectorDashboard(startDate, finishDate);
  const beforeDateStart = dayjs(startDate).subtract(1, "month").format();
  const beforeDateFinish = dayjs(beforeDateStart).endOf("month").format();
  const [isFetching, setIsFetching] = useState(false);
  const { total: totalSalesAmount, setTotals: setTotalSalesAmount } = useCard();
  const { total: totalSalesAmountBefore, setTotals: setTotalSalesAmountBefore } = useCard();
  const { total: totalProspects, setTotals: setTotalProspects } = useCard();
  const { total: totalAmountOportunitiesBefore, setTotals: setTotalAmountOportuntiesBefore } = useCard();
  const { total: totalAmountOportunities, setTotals: setTotalAmountOportunties } = useCard();
  const { total: totalAmountQuotesBefore, setTotals: setTotalAmountQuotesBefore } = useCard();
  const { total: totalAmountQuotes, setTotals: setTotalAmountQuotes } = useCard();
  const { total: totalPendingQuotesBefore, setTotals: setTotalPendingQuotesBefore } = useCard();
  const { total: totalPendingQuotes, setTotals: setTotalPendingQuotes } = useCard();

  useEffect(() => {
    getDataCards();
  }, [startDate, finishDate]);

  const handleViewSellsDirector = title => {
    switch (title) {
      case "Monto Vendido":
        return router.push("/director/ventas");
      case "Monto Pagado":
        return router.push("/director/pagos");
      case "Monto a Cobrar":
        return router.push("/director/pagos");
      case "Monto Cotizado":
        return router.push("/director/oportunidades");
    }
  };

  const getDataCards = async () => {
    try {
      setIsFetching(true);
      let responseBefore = await apiDirector.getSales(beforeDateStart, beforeDateFinish);
      let response = await apiDirector.getSales(startDate, finishDate);
      let totalBefore = responseBefore.data.results[0].totalAmount;
      let total = response.data.results[0].totalAmount;
      setTotalSalesAmountBefore({ total: totalBefore });
      setTotalSalesAmount({ total });

      let resQuotesBefore = await apiDirector.getQuotesAmountBy(beforeDateStart, beforeDateFinish);
      let resQuotes = await apiDirector.getQuotesAmountBy(startDate, finishDate);

      setTotalAmountQuotesBefore({ total: resQuotesBefore.data.totalAmount });
      setTotalAmountQuotes({ total: resQuotes.data.totalAmount });

      setTotalPendingQuotesBefore({ total: resQuotesBefore.data.totalAmountCustom });
      setTotalPendingQuotes({ total: resQuotes.data.totalAmountCustom });

      let resOportunitiesAmountBefore = await apiDirector.getTotalAmountOportunities(beforeDateStart, beforeDateFinish);
      let resOportunitiesAmount = await apiDirector.getTotalAmountOportunities(startDate, finishDate);
      let totalAmountOportunitiesBefore = resOportunitiesAmountBefore.data.results[0].totalAmount;
      let totalAmountOportunities = resOportunitiesAmount.data.results[0].totalAmount;
      setTotalAmountOportuntiesBefore({ total: totalAmountOportunitiesBefore });
      setTotalAmountOportunties({ total: totalAmountOportunities });
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const CardDirector = ({ title, total, totalBefore, isFetching }) => {
    let porcent = 0;
    let diference = 0;
    if (totalBefore) {
      diference = Number(total) - Number(totalBefore);
      porcent = (Number(diference) / Number(totalBefore)) * 100;
    }
    const formatTitle = item => {
      switch (item) {
        case "Monto Vendido":
          return "Ver todas las ventas";

        case "Monto Pagado":
          return "Ver todos los pagos";

        case "Monto a Cobrar":
          return "Ver todos los Pagos";
        case "Monto Cotizado":
          return "Ver todos las Cotizaciones";

        default:
          break;
      }
    };
    if (isFetching) {
      return (
        <div className="card">
          <div className="card__title">
            <div className="namecard">
              <p>{title}</p>
            </div>
          </div>
          <Box display="flex" flexDirection="column">
            <p style={{ color: "#9e9e9e", fontSize: 12 }}>Obteniendo datos....</p>
            <p style={{ color: "#9e9e9e", fontSize: 12 }}>Esto puede demorar un momento</p>
          </Box>
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card__title">
          <div className="namecard">
            <p>{title}</p>
          </div>
          <div className={`percentage  ${porcent < 0 ? "negativePercentage" : "positivePercentage"}`}>
            <p>
              {porcent > 0 && "+"}
              {porcent.toFixed(0)}%
              <span className="tooltip">
                <span className="total">Cantidad Anterior: {formatNumber(totalBefore)}</span>
                <span className="totalDiference">
                  Diferencia:
                  <span className={`data ${diference < 0 ? "negative" : "positive"}`}>
                    {diference > 0 && "+"}
                    {formatNumber(diference)}
                  </span>
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className="card__centercontent">
          <p className="total">{formatNumber(total)}</p>
        </div>
        <div className="card__icon">
          <div
            className="showall"
            onClick={() => {
              handleViewSellsDirector(title);
            }}
          >
            <p>{formatTitle(title)}</p>
          </div>
          <div className="bg_icon">
            <PeopleAlt className="icon p" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <CardsLayout>
        <CardDirector
          title={"Monto Vendido"}
          total={totalSalesAmount.total}
          totalBefore={totalSalesAmountBefore.total}
          isFetching={isFetching}
        />
        <CardDirector
          title={"Monto Pagado"}
          total={totalAmountQuotes.total}
          totalBefore={totalAmountQuotesBefore.total}
          isFetching={isFetching}
        />
        <CardDirector
          title={"Monto a Cobrar"}
          total={totalPendingQuotes.total}
          totalBefore={totalPendingQuotesBefore.total}
          isFetching={isFetching}
        />
        <CardDirector
          title={"Monto Cotizado"}
          total={totalAmountOportunities.total}
          totalBefore={totalAmountOportunitiesBefore.total}
          isFetching={isFetching}
        />

        {/* <div className="card">
          <div className="card_title">Ventas</div>
          <p>{formatNumber(totalSalesAmount.total)}</p>
        </div>
        <div className="card">
          <div className="card_title">Prospectos</div>
          <p>{formatNumberNoSymbol(totalProspects.total)}</p>
        </div>
        <div className="card">
          <div className="card_title">Cotizado</div>
          <p>{formatNumber(totalAmountOportunities.total)}</p>
        </div>

        <div className="card">
          <div className="card_title">Cuentas Por Cobrar</div>
          <p>{formatNumber(totalPendingQuotes.total)}</p>
        </div> */}
      </CardsLayout>
    </Container>
  );
}

const useCard = () => {
  const [total, setTotals] = useState({
    isLoading: true,
    total: 0,
    totalbefore: 0,
    percentage: 0,
  });

  return {
    total,
    setTotals,
  };
};
