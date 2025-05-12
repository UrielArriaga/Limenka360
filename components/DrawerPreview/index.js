import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { Drawer } from "@material-ui/core";

export default function PreviewCuote({ open, setOpen, oportunitySelect: oportunityData }) {
  return (
    <Preview open={open} anchor="left" onClose={() => setOpen(!open)}>
      <Grid item xs={12} md={12} className="preview__pdf">
        {oportunityData === undefined ? (
          <div className="body_empty">
            <div className="message_ctr">
              <img src="/empty_table.svg" />
              <p>No hay datos</p>
            </div>
          </div>
        ) : (
          <>
            {oportunityData.map((item, index) => {
              return item?.quoteurl ? (
                <iframe key={index} src={item?.quoteurl} width="100%" height="100%" />
              ) : (
                <div key={index}>No hay Archivo disponible</div> // O cualquier mensaje o componente alternativo
              );
            })}
          </>
        )}
      </Grid>
    </Preview>
  );
}

const Preview = styled(Drawer)`
  margin: 0;
  min-width: 500px;

  .preview__pdf {
    display: flex;
    min-width: 500px;
  }
`;
