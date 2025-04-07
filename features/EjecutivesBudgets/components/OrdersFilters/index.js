import { withStyles, Switch } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";

const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
    "&$checked + $track": {
      backgroundColor: colors.primaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function OrderFilterBudgets({ ASC, setASC, orderby, setOrderby }) {
  return (
    <div className="contentOrders">
      <div>
        <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
        <select
          className="order-select"
          onChange={e => setOrderby(e.target.value)}
          value={orderby}
          name=""
          id=""
          style={{ marginRight: 5 }}
        >
          <option value="createdAt" name="Fecha de creacion">
            Fecha de creacion
          </option>

          <option value="updatedAt" name="Fecha de actualizacion">
            Fecha de actualizacion
          </option>
        </select>
      </div>

      <div className="orderAsc">
        <p style={{ fontSize: 11 }}>Ascendente</p>

        <PurpleSwitch
          checked={ASC}
          onChange={e => {
            setASC(e.target.checked);
          }}
          name="checkedC"
        />

        <p style={{ fontSize: 11 }}>Descendente</p>
      </div>
    </div>
  );
}
