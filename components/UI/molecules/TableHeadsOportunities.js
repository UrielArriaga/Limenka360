import { Checkbox, FormControlLabel } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, SettingsOutlined } from "@material-ui/icons";
import React from "react";

export default function TableHeadsOportunities(props) {
  const { keyStorage, data, selectmultiple, headsCell, custom, itemsSelect, order, handleChangeOrder, orderBy, setheadersActives, setopenSettings, openSettings, identificador } = props;
  return (
    <thead className="ctr_table__head">
      <tr className="ctr_table__head__tr">
        {headsCell.map((item, index) => {
          if (item.identifier == identificador) {
            return (
              <th className="title checkbox" key={index}>
                {selectmultiple ? (
                  itemsSelect.length > 0 && itemsSelect.length < data.length ? (
                    <FormControlLabel control={<Checkbox checked={data.length !== itemsSelect.length ? true : false} indeterminate size="small" onChange={(e) => setitemsSelect([])} />} />
                  ) : (
                    <FormControlLabel control={<Checkbox checked={data.length == itemsSelect.length ? true : false} size="small" onChange={(e) => checkedItemAll(e.target.checked)} />} />
                  )
                ) : null}

                <div className="ctr_title" onClick={() => order && handleChangeOrder(item.text)}>
                  <p>{item.text}</p>
                </div>
              </th>
            );
          }
        })}
        {headsCell.map((item, index) => {
          if (item.show && item.identifier !== identificador) {
            return (
              <th className={item.identifier == identificador ? "title checkbox" : "title"} key={index}>
                {item.identifier == identificador && (
                  <FormControlLabel control={<Checkbox checked={data.length == itemsSelect.length ? true : false} size="small" onChange={(e) => checkedItemAll(e.target.checked)} />} />
                )}
                <div className="ctr_title" onClick={() => order && handleChangeOrder(item.text)}>
                  <p>{item.text}</p>
                  {order ? orderBy == "-" + item.text ? <ArrowDropUp /> : <ArrowDropDown className={orderBy == item.text ? "active" : "order"} /> : null}
                </div>
              </th>
            );
          }
        })}
        <th className="title configuration">
          {custom ? (
            <SettingsOutlined
              onClick={() => {
                let headersStorage = localStorage.getItem(keyStorage);
                setheadersActives(JSON.parse(headersStorage));
                setopenSettings(!openSettings);
              }}
            />
          ) : null}
        </th>
      </tr>
    </thead>
  );
}
