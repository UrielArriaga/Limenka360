import { Grow } from "@material-ui/core";
import { colorCheck, colorCheckChange, peso } from "../../utils";

const Table = ({
  dataPayments,
  modifiedPayments,
  calculateTotalModifiedPayments,
  calculateTotalComissionModifiedPayments,
  formatDate,
  justAHitch,
  handleChangeModifiedPayments,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Num.</th>
          <th>Pago</th>
          <th>Comisión</th>
          <th>Fecha</th>
          <th>Comentario</th>
          <th>Estado</th>
          <th>Enganche</th>
        </tr>
      </thead>
      <tbody>
        {modifiedPayments &&
          modifiedPayments.map((pay, i) => (
            <Grow in={true} key={i}>
              <tr key={i}>
                <td>
                  <div className={"data"}>{i + 1}</div>
                </td>
                <td>
                  <input
                    className={colorCheckChange(pay.payment, dataPayments[i]?.payment)}
                    type="number"
                    name="payment"
                    value={pay.payment}
                    onChange={e => handleChangeModifiedPayments(e, i)}
                  />
                </td>
                <td>
                  <input
                    className={colorCheckChange(pay.comission, dataPayments[i]?.comission)}
                    type="number"
                    name="comission"
                    value={pay.comission}
                    onChange={e => handleChangeModifiedPayments(e, i)}
                  />
                </td>
                <td>
                  <input
                    className={colorCheckChange(formatDate(pay.date), formatDate(dataPayments[i]?.date))}
                    type="date"
                    name="date"
                    value={formatDate(pay.date)}
                    onChange={e => handleChangeModifiedPayments(e, i)}
                  />
                </td>
                <td>
                  <input
                    className={colorCheckChange(pay.observations, dataPayments[i]?.observations)}
                    name="observations"
                    value={pay.observations}
                    onChange={e => handleChangeModifiedPayments(e, i)}
                  />
                </td>
                <td>
                  <select
                    className={colorCheckChange(pay.ispaid, dataPayments[i]?.ispaid)}
                    name="ispaid"
                    value={pay.ispaid}
                    onChange={e => handleChangeModifiedPayments(e, i)}
                  >
                    <option value="false">Pendiente</option>
                    <option value="true">Pagado</option>
                  </select>
                </td>
                <td>
                  <select
                    className={colorCheckChange(pay.downpayment, dataPayments[i]?.downpayment)}
                    name="downpayment"
                    value={pay.downpayment}
                    onChange={e => justAHitch(e, i)}
                  >
                    {i == 0 && <option value="true">Si</option>}
                    <option value="false">No</option>
                  </select>
                </td>
              </tr>
            </Grow>
          ))}
        <tr>
          <td>
            <p className="total">Total:</p>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div
              className={colorCheck(
                calculateTotalModifiedPayments(modifiedPayments),
                dataPayments[0]?.oportunity?.amount
              )}
            >
              <p>{calculateTotalModifiedPayments(modifiedPayments)}</p>
            </div>
          </td>
          <td>
            <div
              className={colorCheck(
                calculateTotalComissionModifiedPayments(modifiedPayments),
                dataPayments[0]?.oportunity?.comission
              )}
            >
              <p>{calculateTotalComissionModifiedPayments(modifiedPayments)}</p>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <p className="total">Total Esperado:</p>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <div className="data">{peso(dataPayments[0]?.oportunity?.amount)}</div>
          </td>
          <td>
            <div className="data">{peso(dataPayments[0]?.oportunity?.comission)}</div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
