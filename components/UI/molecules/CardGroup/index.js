import { PeopleAlt } from "@material-ui/icons";
import { formatNumber } from "../../../../utils";

export const CardGroup = ({ title, total, totalBefore }) => {
  let porcent = 0;
  let diference = 0;
  if (totalBefore) {
    diference = Number(total) - Number(totalBefore);
    porcent = (Number(diference) / Number(totalBefore)) * 100;
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
              <span className="total">Cantidad Anterior: {totalBefore}</span>
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
        <p className="total">{total}</p>
      </div>
      <div className="card__icon">
        <div className="showall">
          <p>Ver</p>
        </div>
        <div className="bg_icon">
          <PeopleAlt className="icon p" />
        </div>
      </div>
    </div>
  );
};
