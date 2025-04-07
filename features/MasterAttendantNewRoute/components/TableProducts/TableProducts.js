import React from "react";
import styles from "./TableProducts.module.css";
import { IconButton } from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

const TableProducts = ({ data, handleOpenDrawer, readTemplate }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>S/N</th>
          <th className={styles.th}>Codigo</th>
          <th className={styles.th}>Producto</th>
          <th className={styles.th}>Templates</th>
          <th className={styles.th}>Acciones</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map(p => (
          <tr className={styles.tr} key={p.id}>
            <td className={styles.td}>{p.serialnumber}</td>
            <td className={styles.td}>{p.product.code}</td>
            <td className={styles.td}>{p.product.name}</td>
            <td className={styles.td}>{readTemplate(p.serialnumber)} </td>
            <td className={styles.td}>
              <IconButton onClick={() => handleOpenDrawer(p.serialnumber, p)}>
                <NoteAddIcon className={styles.icon} />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableProducts;
