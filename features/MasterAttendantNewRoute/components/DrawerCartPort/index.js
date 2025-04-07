import React from "react";
import { ModalFileGenerateCartPortStyled } from "./styles";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";
import CartPortTemplate from "../../../../components/TemplatesAlmacen/CartPortTemplate";
import CartPortTemplateNew from "../../../../components/TemplatesAlmacen/CartPortTemplateNew";
import RemissionNote from "../../../../components/TemplatesAlmacen/remissionNote";
import SalidaGeneralForaneos from "../../../../components/TemplatesAlmacen/SalidaGeneralForaneos";
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
    isLoading,
    handleNext,
    handleBack,
    generatCartPort,
    handleOnChangeNameCartPort,
    handleOnChangeNameNoteRemision,
    handleOnChangeSalida,
    generateSalida,
    createDeliveryRoute,
    folioSerial,
  } = useCartPort(ordersToAdd, dataOrder, finalData, isPackage);

  const stepComponents = isPackage
    ? [
        {
          component: SalidaGeneralForaneos,
          name: nameSalida,
          handleChange: handleOnChangeSalida,
        },
      ]
    : [
        {
          component: CartPortTemplateNew,
          name: name,
          handleChange: handleOnChangeNameCartPort,
        },
        {
          component: RemissionNote,
          name: nameNoteRemission,
          handleChange: handleOnChangeNameNoteRemision,
        },
        {
          component: SalidaGeneralForaneos,
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
          <b className="text_input" onClick={() => console.log(ordersToAdd)}>
            Nombre del Archivo:{" "}
          </b>
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
          <h2
            onClick={() => {
              createDeliveryRoute(NormalizeData(driverSelect, dataOrder, productRute, ordersToAdd));
            }}
          >
            Generar Archivo
          </h2>
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
              disabled={isLoading}
              onClick={() =>
                isPackage || activeStep === steps.length - 1
                  ? isPackage
                    ? createDeliveryRoute(NormalizeData(driverSelect, dataOrder, productRute, ordersToAdd), true)
                    : createDeliveryRoute(NormalizeData(driverSelect, dataOrder, productRute, ordersToAdd), false)
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
