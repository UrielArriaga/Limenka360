import { Button, Grid } from "@material-ui/core";
import { Assignment } from "@material-ui/icons";
import React, { useState } from "react";
import { FilesEditStyled } from "./styles";
import TableProducts from "./TableProducts";

import Joyride from "react-joyride";

export default function ProductsEdit({ productsData, productsControl, tourControl }) {
  const { results: products = [], count = 0 } = productsData;

  const { run, steps, stepIndex, setTourState, tourState } = tourControl;

  return (
    <FilesEditStyled>
      {/* <Joyride
        steps={steps}
        continuous
        showSkipButton
        beaconComponent={null}
        run={run}
        locale={{
          back: "Atrás",
          close: "Cerrar",
          last: "Finalizar",
          next: "Siguiente",
          open: "Abrir",
          skip: "Saltar",
        }}
        styles={{
          options: {
            arrowColor: "blue",

            primaryColor: "blue",
            textColor: "#000",
          },
        }}
        callback={data => {
          const { action, index, status, type } = data;

          if (["finished", "skipped"].includes(status)) {
            setTourState({ run: false, stepIndex: 0 });
          } else if (["step:after", "error:target_not_found"].includes(type)) {
            const nextStepIndex = index + (action === "prev" ? -1 : 1);

            if (index === 0) {
              setTimeout(() => {
                setTourState({ run: true });
              }, 400);
            } else if (index === 1) {
              setTourState({
                run: false,
                sidebarOpen: false,
                stepIndex: nextStepIndex,
              });

              setTimeout(() => {
                setTourState({ run: true });
              }, 400);
            } else if (index === 2 && action === "prev") {
              setTourState({
                run: false,
                sidebarOpen: true,
                stepIndex: nextStepIndex,
              });

              setTimeout(() => {
                setTourState({ run: true });
              }, 400);
            } else {
              setTourState({
                sidebarOpen: false,
                stepIndex: nextStepIndex,
              });
            }
          }
        }}
      /> */}

      {/* <button onClick={handleClickStart}>Start</button> */}

      <div className="sectionheader">
        {/* <pre>{JSON.stringify(tourState, null, 2)}</pre> */}
        {/* <Button
          onClick={() => {
            if (run === false) {
              setTourState({ run: true, stepIndex: 0 });
            }

            if (run === true && stepIndex === 0) {
              setTourState({ run: true, stepIndex: 1 });
            }
          }}
          style={{
            zIndex: 1000,
          }}
        >
          Click me
        </Button>

        <Button
          className="tour-btnpackagesssss"
          onClick={() => {
            setTourState({ ...tourState, run: true, stepIndex: 2 });
          }}
          style={{
            zIndex: 1000,
          }}
        >
          Click mecasc
        </Button>

        <Button
          className="tour-btnpackagesbs"
          onClick={() => {
            setTourState({ ...tourState, run: true, stepIndex: 2 });
          }}
          style={{
            zIndex: 1000,
          }}
        >
          Click me
        </Button> */}

        <h1 className="title">Productos del pedido</h1>
        <Assignment className="icon_primary" />
      </div>

      <TableProducts products={products} productsControl={productsControl} />
      <Grid className="container_form" container spacing={2}>
        {/* <pre>{JSON.stringify(productsData?.results, null, 2)}</pre> */}
      </Grid>
    </FilesEditStyled>
  );
}
