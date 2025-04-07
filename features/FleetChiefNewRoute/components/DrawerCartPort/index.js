import React from "react";
import { ModalFileGenerateCartPortStyled } from "./styles";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";
import CartPortTemplate from "../../../../components/TemplatesAlmacen/CartPortTemplate";
import RemissionNote from "../../../../components/TemplatesAlmacen/remissionNote";
import SalidaGeneral from "../../../../components/TemplatesAlmacen/SalidaGeneral";
import useCartPort from "../../hooks/useCartPort";

const DrawerCartPort = ({
  dataOrder,
  open,
  onClose = () => {},
  finalData = null,
  driverSelect = [],
  productRute = null,
  ordersToAdd = null,
  isPackage,
}) => {
  const {
    name,
    steps,
    NormalizeData,
    nameNoteRemission,
    nameSalida,
    activeStep,
    newProducts,
    handleNext,
    handleBack,
    generatCartPort,
    handleOnChangeNameCartPort,
    handleOnChangeNameNoteRemision,
    handleOnChangeSalida,
    generateSalida,
  } = useCartPort(ordersToAdd, dataOrder, finalData, isPackage);

  const stepComponents = isPackage
    ? [
        {
          component: SalidaGeneral,
          name: nameSalida,
          handleChange: handleOnChangeSalida,
        },
      ]
    : [
        {
          component: CartPortTemplate,
          name: name,
          handleChange: handleOnChangeNameCartPort,
        },
        {
          component: RemissionNote,
          name: nameNoteRemission,
          handleChange: handleOnChangeNameNoteRemision,
        },
        {
          component: SalidaGeneral,
          name: nameSalida,
          handleChange: handleOnChangeSalida,
        },
      ];

  const renderStepContent = step => {
    const { component: Component, name, handleChange } = stepComponents[step];
    return (
      <>
        <Component data={NormalizeData(driverSelect, dataOrder, productRute, newProducts)} />
        <div className="input_name">
          <b className="text_input" onClick={() => console.log(ordersToAdd)}>Nombre del Archivo: </b>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            className="inputWarranty"
            placeholder="Nombre del Archivo"
          />
        </div>
      </>
    );
  };

  return (
    <ModalFileGenerateCartPortStyled
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="containermodal">
        <div className="headermodal">
          <h2>Generar Archivo</h2>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="bodymodal">
          <div className="previw">{renderStepContent(activeStep)}</div>
          <div className="back_next">
            {!isPackage && activeStep > 0 && (
              <Button onClick={handleBack} className="back">
                Atrás
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                isPackage || activeStep === steps.length - 1
                  ? isPackage
                    ? generateSalida(NormalizeData(driverSelect, dataOrder, productRute, ordersToAdd))
                    : generatCartPort(NormalizeData(driverSelect, dataOrder, productRute, ordersToAdd))
                  : handleNext()
              }
              className={isPackage || activeStep === steps.length - 1 ? "button-generate" : "next"}
            >
              {isPackage || activeStep === steps.length - 1 ? "Generar y guardar en archivos de producto" : "Siguiente"}
            </Button>
          </div>
        </div>
      </div>
    </ModalFileGenerateCartPortStyled>
  );
};

export default DrawerCartPort;
