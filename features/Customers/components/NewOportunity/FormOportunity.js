import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";
import { colors } from "../../../../styles/global.styles";
import {
  Box,
  Button,
  Fade,
  Grid,
  Slider,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Hidden,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useForm, Controller } from "react-hook-form";
import {
  Add,
  ErrorRounded,
  LocalShipping,
  Lock,
  LockOpen,
  ExpandMore,
  DateRange,
  Settings
} from "@material-ui/icons";
import ModalExtraProduct from "../../../../components/ModalExtraProduct";
import { SortableTable } from "../../../../components/UI/atoms/SortableTable";
import { quotesSelector } from "../../../../redux/slices/quotesSlice";
import { formatNumber } from "../../../../utils";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import DrawerCotizacion from "../../../../components/DrawerCotizacion";

// Clave para el LocalStorage
const FORM_STORAGE_KEY = "oportunityFormData";

export default function FormOportunity({ prospectSelected, onSubmit }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { saveError } = useSaveError();

  const { getCatalogBy } = useGlobalCommons();
  // const { socket, online } = useContext(SocketContext);
  // const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compañia", "admin"]);
  const [Alert, setAlert] = useState({
    severity: null,
    show: null,
    message: "",
    type: null,
  });
  // * sidebar estado
  const [open, setOpen] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [openModalExtraProduct, setOpenModalExtraProduct] = useState(false);
  const [phases, setPhases] = useState([]);
  const [producto, setProducto] = useState([]);
  const [discountsEjecutive, setDiscountsEjecutive] = useState([]);
  const [templatesObservations, setTemplatesObservations] = useState([]);
  const [amountProduct, setAmountProduct] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(null);
  const [totalPieces, setTotalPieces] = useState(null);
  const [priceUnit, setPriceUnit] = useState(null);
  const [totalFinal, setTotalFinal] = useState(null);
  const [showDrawer, setshowDrawer] = useState(false);
  const { productSelect, productsSelected: products } = useSelector(quotesSelector);
  // const { userData, id_user, company: id_companys, groupId } = useSelector(userSelector);
  const [openDrawerDiscounts, setOpenDrawerDiscounts] = useState(false);
  const [refetchDiscounts, setRefetchDiscounts] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [isLoadingDataRequest, setIsLoadingRequestData] = useState(false);
  const [requestAprobate, setRequestAprobate] = useState(false);
  const [disabledButtonsOnSave, setDisabledButtonsOnSave] = useState(false);
  const [totalIVA, setTotalIVA] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [disableAddDiscount, setDisableAddDiscount] = useState(0);
  // const { photo } = useSelector(companySelector);
  const { clientTypes } = useSelector(commonSelector);
  const [observations, setObservations] = useState("");
  const [concept, setConcept] = useState(undefined);
  const [prospect, setProspect] = useState({});
  const [bodyRequest, setBodyRequest] = useState({});
  const [openPdf, setOpenPdf] = useState(false);
  // const [dataPreview, setDataPreview] = useState(initialDataPreview);
  const [totalWithoutShipping, setTotalWithoutShipping] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscountProducts, setTotalDiscountProducts] = useState(0);
  const [isCreatingOportunity, setIsCreatingOportunity] = useState(false);
  const [templateSelected, setTemplateSelected] = useState(0);
  const [totalAmout, setTotalAmout] = useState(0);
  const [totalAmoutSub, setTotalAmoutSub] = useState(0);
  const [finalTotalAmount, setFinalTotalAmount] = useState(0);
  const [finalTotalExtraCpst, setFinalTotalExtraCpst] = useState(0);
  const [emailUpdate, setMailupdate] = useState("");
  const [openDiscount, setOpenDiscount] = useState(false);
  const defaultCommision = 3;
  const [validClientType, setValidClientType] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phase: { id: 1, name: "Cotizado" },
      quantity: 0,
      amount: " ",
      clientType: null,
      closeDate: "",
      observations: "",
      certeza: 0,
      discounted: 0,
    },
  });

  // Sort the array by applying drag
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(setArrayProducts(arrayMoveImmutable(products, oldIndex, newIndex)));
  };

  // Cargar datos del LocalStorage al montar el componente
  useEffect(() => {
    const savedFormData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        reset(parsedData);
      } catch (error) {
        console.error("Error al parsear datos del formulario:", error);
        localStorage.removeItem(FORM_STORAGE_KEY);
      }
    }
  }, [reset]);

  // Guardar datos en LocalStorage cuando cambien
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Limpiar el LocalStorage cuando se envíe el formulario
  const handleFormSubmit = (data) => {
    if (onSubmit) onSubmit(data);
    console.log("Formulario enviado:", data);
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  // Limpiar el formulario y el LocalStorage
  const handleClearForm = () => {
    reset({
      phase: { id: 1, name: "Cotizado" },
      clientType: null,
      closeDate: "",
      observations: "",
      certeza: 0,
      discounted: 0,
    });
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  const handleOnClickOpenProducts = (item) => {
    setshowDrawer(true);
  };

  const handleOnClickCloseProducts = () => {
    setshowDrawer(false);
    // Los datos ya se guardan automáticamente por el efecto de watch
  };

  const handleOnClickOpenPreview = (item) => setOpenPdf(true);

  const handleTemplatesObservations = (item) => {
    if (item !== null) {
      setValue("observations", item.data);
    } else {
      setValue("observations", "");
    }
  };

  const handleClickRequestDiscount = () => {
    setRequestAprobate(!requestAprobate);
  };

  const alertDiscount = (porcentDiscount, discountAprobate) => {
    if (porcentDiscount >= 4 && discountAprobate === false) {
      return true;
    } else {
      return false;
    }
  };

  const [extraProductSelected, setExtraProductSelected] = useState({});
  const [isEditingExtraProduct, setIsEditingExtraProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  const ShowAlert = ({ info }) => {
    return <span className="requiredAlert">{info}</span>;
  };
  const checkIfExistDiscount = item => {
    let exist = item.filter((item, index) => item.discount !== 0);

    if (exist.length >= 1) {
      return true;
    }

    return false;
  };

  return (
    <FormStyled onSubmit={handleSubmit(handleFormSubmit)}>
      <InfoProspectStyled container spacing={2}>

        {/* Primera fila: Folio, Cantidad, Monto */}
        <Grid container item xs={12} spacing={2}>
          {/* Folio */}
          <Grid item xs={12} md={4}>
            <label className="item">
              Folio <strong>*</strong>
            </label>
            <div className="point" />
            <input
              disabled
              autoComplete="off"
              {...register("concept", { required: false })}
              defaultValue={"Folio"}
              name="concept"
              id="title"
              type="text"
              placeholder="Ingrese el nombre"
              className="inputItemData disabled"
            />
          </Grid>

          {/* Cantidad de productos */}
          <Grid item xs={12} md={4}>
            <label className="item">Cantidad de Productos</label>
            <div className="point" />
            <input
              disabled
              autoComplete="off"
              {...register("quantity", { required: true })}
              name="quantity"
              id="quantity"
              type="number"
              className="inputItemData disabled"
              readOnly={true}
            />
          </Grid>

          {/* Monto total */}
          <Grid item xs={12} md={4}>
            <label className="item">
              Monto Total <strong>*</strong>
            </label>
            <div className="point" />
            <div className="inputWithAdornment">
              <span className="adornment">$</span>
              <input
                disabled
                className="inputItemData inputAmount disabled"
                {...register("amount", {
                  required: true,
                })}
                name="amount"
                id="amount"
                type="text"
                autoComplete="off"
              />
            </div>
          </Grid>
        </Grid>

        {/* Segunda fila: Tipo Cliente, Certeza, Fecha */}
        <Grid container item xs={12} spacing={2}>
          {/* Tipo de Cliente */}
          <Grid item xs={12} md={4}>
            <label className="item">
              Tipo de Cliente <strong>*</strong>
            </label>
            <div className="point" />
            <Controller
              name="clientType"
              control={control}
              rules={{ required: "Este campo es obligatorio" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onMenuOpen={() => getCatalogBy("clientTypes")}
                  classNamePrefix="select"
                  className="select_data"
                  placeholder="Selecciona una Opción"
                  options={clientTypes?.results}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  isLoading={clientTypes?.isFetching}
                  noOptionsMessage={() => "Sin Opciones"}
                  loadingMessage={() => "Cargando Opciones"}
                />
              )}
            />
            {errors.clientType && (
              <p className="error">{errors.clientType.message}</p>
            )}
          </Grid>

          {/* Certeza */}
          <Grid item xs={12} md={4}>
            <LabelStyled>
              Certeza <strong>*</strong>
            </LabelStyled>
            <div className="point" />
            <Controller
              name="certeza"
              control={control}
              rules={{
                required: "La certeza es obligatoria",
                validate: (value) => value > 0 || "La certeza debe ser mayor a 0%"
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '5px' }}>
                    <Slider
                      {...field}
                      value={field.value || 0}
                      onChange={(e, newValue) => field.onChange(newValue)}
                      aria-labelledby="certeza-slider"
                      step={10}
                      min={0}
                      max={100}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      valueLabelComponent={(props) => (
                        <ValueLabelStyled {...props}>
                          {props.children}
                        </ValueLabelStyled>
                      )}
                      style={{ flexGrow: 1 }}
                    />
                    <span style={{ fontSize: '12px', color: '#666', minWidth: '25px' }}>{field.value || 0}%</span>
                  </div>
                  {error && <ErrorStyled style={{ marginTop: '11px' }}>{error.message}</ErrorStyled>}
                </>
              )}
            />
          </Grid>

          {/* Fecha de Cierre */}
          <Grid item xs={12} md={4}>
            <label className="item">
              Fecha de Cierre <strong>*</strong>
            </label>
            <div className="point" />
            <div className="datePickerContainer">
              <input
                type="date"
                {...register("closeDate", { required: "Campo requerido" })}
                className="inputItemData dateInput"
                id="closeDate"
              />
              <label htmlFor="closeDate" className="datePickerLabel">
                <DateRange className="dateIcon" />
              </label>
            </div>
            {errors.closeDate && (
              <p className="error">{errors.closeDate.message}</p>
            )}
          </Grid>
        </Grid>

        {/* Configuración Avanzada */}
        <Grid item xs={12}>
          <div className="point" />
          <AccordionStyled defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Settings className="accordion-icon" />
              <Typography className="accordion-title">Configuración Avanzada</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} alignItems="flex-end">
                {/* Fase (oculta pero presente en el código) */}
                <Hidden>
                  <Controller
                    name="phase"
                    control={control}
                    defaultValue={{ id: 1, name: "Cotizado" }}
                    render={({ field }) => <input type="hidden" {...field} />}
                  />
                </Hidden>

                {/* Comisión % */}
                <Grid item xs={6} md={4}>
                  <label className="item">Comisión</label>
                  <div className="point" />
                  <div className="inputWithAdornment">
                    <input
                      defaultValue={defaultCommision}
                      className="inputItemData inputAmount"
                      autoComplete="off"
                      readOnly
                    />
                    <span className="adornment">%</span>
                  </div>
                </Grid>

                {/* Comisión $ */}
                <Grid item xs={6} md={4}>
                  <div className="inputWithAdornment">
                    <input
                      className="inputItemData inputAmount"
                      {...register("commission", {
                        required: true,
                      })}
                      name="commission"
                      id="commission"
                      type="number"
                      placeholder="Total Comisión"
                      disabled
                      autoComplete="off"
                    />
                    <span className="adornment">$</span>
                  </div>
                </Grid>

                {/* Descuento */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center">
                    <label className="item">Descuento</label>
                    <Tooltip title="Solicitar Permiso si el Descuento es Mayor al Permitido">
                      {requestAprobate === true ? (
                        <LockOpen className="lockIcon permit" onClick={() => handleClickRequestDiscount()} />
                      ) : (
                        <Lock className="lockIcon denied" onClick={() => handleClickRequestDiscount()} />
                      )}
                    </Tooltip>
                  </Box>
                  <div className="point" />
                  <div className="inputWithAdornment">
                    <Tooltip
                      title={`${disableAddDiscount ? "Descuento General no Permitido" : "Ingresa descuento de 5% o 10%"}`}
                    >
                      <input
                        max={3}
                        {...register("discounted")}
                        name="discounted"
                        className="inputItemData inputAmount"
                        placeholder="Ingresa Descuento"
                        autoComplete="off"
                        type="number"
                      />
                    </Tooltip>
                    <span className="adornment">%</span>
                  </div>
                </Grid>

                <div>
                  <Fade in={alertDiscount(watch("discounted"), requestAprobate)}>
                    <div className="alertRequest">
                      <ErrorRounded className="alertRequest__icon" />
                      <p className="alertRequest__title">Se requiere permiso para aplicar este Descuento</p>
                    </div>
                  </Fade>
                </div>
              </Grid>
            </AccordionDetails>
          </AccordionStyled>
        </Grid>

        {/* Observaciones */}
        <Grid item xs={12}>
          <label className="item">Observaciones</label>
          <div className="point" />

          {/* Selector de plantillas */}
          <Grid className="inputWithMargin" xs={12}>
            <Select
              placeholder="Selecciona una plantilla"
              options={templatesObservations}
              onChange={handleTemplatesObservations}
              isClearable={true}
              maxMenuHeight={190}
              classNamePrefix="select"
              className="select_data selectObservations"
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name}`}
            />
          </Grid>

          {/* Área de texto */}
          <Grid className="inputWithMargin" xs={12}>
            <textarea
              autoComplete="off"
              {...register("observations")}
              name="observations"
              id="observations"
              placeholder="Ingrese observaciones o elija una plantilla"
              className="textArea inputItemData"
              rows={4}
            />
          </Grid>
        </Grid>

        {/* Acciones */}
        <Grid item xs={12}>
          <ActionsContainer>
            <Button
              className="btn_extraproduct"
              startIcon={<LocalShipping />}
              variant="contained"
              onClick={() => setOpenModalExtraProduct(true)}
            >
              Agregar Envío
            </Button>

            <Button
              startIcon={<Add />}
              variant="contained"
              className="btn_add"
              onClick={() => handleOnClickOpenProducts()}
            >
              Agregar Producto
            </Button>
          </ActionsContainer>
        </Grid>

        <TableProducts>
          <SortableTable styleClass={"ctr_table"} onSortEnd={onSortEnd}>
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                <th className="title fix ">
                  <div className="ctr_title">
                    <p>Codigo</p>
                  </div>
                </th>
                <th className="title fixed">
                  <div className="ctr_title">
                    <p>Producto</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Cantidad</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Precio Unitario</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Descuento</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Iva</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Monto Total</p>
                  </div>
                </th>

                <th className="title">
                  <div className="ctr_title">
                    <p>Observaciones</p>
                  </div>
                </th>

                <th className="title fixedlast">
                  <div className="ctr_title"></div>
                </th>
              </tr>
            </thead>

            <tbody className="ctr_table__body">
              {products.map((item, index) => (
                <tr className={index % 2 == 0 ? "row" : "inpar row"} key={index}>
                  <td className="data fixed">
                    <p className="text">{item.code}</p>
                  </td>
                  <td className="data ">
                    {item?.customproduct === true ? (
                      <p className="ctr_td">
                        {item.name} {item?.shownote && item?.note}{" "}
                        <span
                          style={{
                            fontSize: 10,
                            color: "gray",
                          }}
                        >
                          (Este producto no afecta la comision )
                        </span>
                      </p>
                    ) : (
                      <p className="ctr_td">{item.name}</p>
                    )}
                  </td>
                  <td className="data">
                    <p className="text">{item.quantity}</p>
                  </td>
                  <td className="data">{formatNumber(item.callamount)}</td>
                  <td className="data">{formatNumber(item.discount)}</td>
                  <td className="data">{formatNumber(item.iva)}</td>
                  <td className="data">{formatNumber(item.total)}</td>
                  <td className="data">
                    <p>{item.deliveryTime}</p>
                    <p>{item.info}</p>
                  </td>
                  <td className="data fixedlast">
                    <div className="ctr_options__item">
                      <Box display={"flex"}>
                        <Tooltip title={"Eliminar" + " " + item.code}>
                          <Delete onClick={() => deleteItem(item, index)} />
                        </Tooltip>

                        <Tooltip title={"Editar" + " " + item.code}>
                          <Edit onClick={() => handleSelectProduct(item)} />
                        </Tooltip>
                      </Box>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </SortableTable>

          {products == 0 && <div className="notFound">Aun no hay Productos a cotizar</div>}

          <div className="totalcontainer">
            <div className="totalcontainer__items">
              <div className="totalcontainer__item">
                <div className="text bold">
                  <p>Sub Total</p>
                </div>
                <div className="value bold">
                  <p>{formatNumber(totalAmoutSub)}</p>
                </div>
              </div>
              <div className="totalcontainer__item">
                <div className="text ">
                  <p>Iva</p>
                </div>
                <div className="value">
                  <p>{formatNumber(totalIVA)}</p>
                </div>
              </div>

              <div className="totalcontainer__item">
                <div className="text ">
                  <p>Descuento</p>
                </div>
                <div className="value">
                  <p>-{formatNumber(totalDiscount)}</p>
                </div>
              </div>

              <div className="totalcontainer__item">
                <div className="text bold">
                  <p>Total</p>
                </div>
                <div className="value bold">
                  <p>{formatNumber(finalTotalAmount + finalTotalExtraCpst)}</p>
                </div>
              </div>
            </div>
          </div>
        </TableProducts>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearForm}
            style={{ marginRight: '16px' }}
          >
            Limpiar Formulario
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Guardar Oportunidad
          </Button>
        </Grid>
      </InfoProspectStyled>
      <ModalExtraProduct
        itemSelected={extraProductSelected}
        setItemSelected={setExtraProductSelected}
        isEditing={isEditingExtraProduct}
        setIsEditing={setIsEditingExtraProduct}
        setOpen={setOpenModalExtraProduct}
        open={openModalExtraProduct}
      />
      <DrawerCotizacion
        width={"60%"}
        show={showDrawer}
        producto={producto}
        setProducto={setProducto}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        ShowAlert={ShowAlert}
        totalPieces={totalPieces}
        discountTotal={discountTotal}
        totalFinal={totalFinal}
        priceUnit={priceUnit}
        setAlert={setAlert}
        openDiscount={openDiscount}
        setOpenDiscount={setOpenDiscount}
      ></DrawerCotizacion>
    </FormStyled>

  );
}

// Componentes estilizados

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const AccordionStyled = styled(Accordion)`
  background-color: #f9f9f9 !important;
  box-shadow: none !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;

  &:before {
    display: none;
  }

  .accordion-icon {
    color: ${colors.primaryColor};
    margin-right: 8px;
    font-size: 20px;
    transition: transform 0.3s ease-in-out;
  }

  /* Animación cuando el acordión está expandido */
  .Mui-expanded .accordion-icon {
    transform: rotate(90deg);
  }

  .accordion-title {
    font-weight: 600;
    color: ${colors.primaryColor};
    font-size: 14px;
  }

  .MuiAccordionSummary-root {
    min-height: 48px;
    padding: 0 16px;
    border-radius: 8px !important;
    
    /* Animación más suave para el icono de expansión */
    .MuiAccordionSummary-expandIcon {
      transition: transform 0.3s ease-in-out;
    }
  }

  .MuiAccordionDetails-root {
    padding: 16px;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    border-radius: 0 0 8px 8px;
  }
`;

const LabelStyled = styled.label`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
`;

const ValueLabelStyled = styled.div`
  background-color: ${colors.primaryColor};
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
`;

const ErrorStyled = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const FormStyled = styled.form`
  width: 100%;
  font-size: 14px;
  padding: 20px;
`;

const InfoProspectStyled = styled(Grid)`
  font-size: 14px;

  label.item {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    display: block;
    font-size: 14px;
  }

  .point {
    height: 2px;
    background-color: ${colors.primaryColor};
    width: 30px;
    margin-bottom: 10px;
  }

  .inputItemData {
    background-color: #f9f9f9;
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 12px 10px;
    width: 100%;
    font-size: 14px;
    height: 40px;
    box-sizing: border-box;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${colors.primaryColor};
      box-shadow: 0 0 0 2px rgba(120, 90, 248, 0.25);
    }
  }
  
  .inputAmount {
    padding-left: 30px;
  }

  .textArea {
    width: 100%;
    min-height: 100px;
    outline: none;
    padding: 12px 10px;
    background-color: #f9f9f9;
    border: 1px solid #ced4da;
    border-radius: 5px;
    resize: vertical;
    font-size: 14px;
    font-family: inherit;
    box-sizing: border-box;
    resize: none;
    
    &:focus {
      border-color: ${colors.primaryColor};
      box-shadow: 0 0 0 2px rgba(120, 90, 248, 0.25);
    }
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 4px;
  }

  .select_data {
    width: 100%;
    font-size: 14px;
    cursor: pointer;
    
    /* Contenedor principal */
    & > div {
      min-height: 40px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #ced4da;
      background-color: #f9f9f9;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      cursor: pointer; /* Agregado cursor pointer */
      
      &:hover {
        border-color: #b1b8c0;
        cursor: pointer; /* Asegurar cursor pointer en hover */
      }
      
      /* Cuando está enfocado */
      &[class*="-focus"] {
        border-color: ${colors.primaryColor};
        box-shadow: 0 0 0 2px rgba(120, 90, 248, 0.25);
      }
    }
  }

  .disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }

  .inputWithAdornment {
    position: relative;
    display: flex;
    align-items: center;
    
    .adornment {
      position: absolute;
      left: 10px;
      color: #495057;
      font-size: 14px;
      font-weight: 500;
      z-index: 1;
      padding-right: 8px;
      height: 60%;
      display: flex;
      align-items: center;
      z-index: 0;
    }
  }

  .containerCommision {
    display: flex;
    gap: 10px;
    
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  .inputWithMargin {
    margin-bottom: 15px;
  }

  .lockIcon {
    margin-left: 5px;
    margin-top: -5px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }

  .btn_add {
    padding: 10px 16px;
    text-transform: capitalize;
    background-color: ${colors.primaryColor};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${colors.primaryHover};
    }
    
    svg {
      margin-right: 8px;
    }
  }

  .btn_extraproduct {
    padding: 10px 16px;
    text-transform: capitalize;
    background-color: white;
    color: ${colors.primaryColor};
    border: 1px solid ${colors.primaryColor};
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f0f0ff;
    }
    
    svg {
      margin-right: 8px;
    }
  }
  
  .permit {
    color: #47d61d;
  }
  
  .denied {
    color: #d32f2f;
  }

  .alertRequest {
    display: flex;
    align-items: center;
    width: fit-content;
    border-radius: 8px;
    padding: 3px;
    margin-left: 10px;
    font-size: 14px;

    &__title {
      font-size: 14px;
      color: #d32f2f;
      font-weight: 500;
    }
    
    &__icon {
      color: #d32f2f;
      font-size: 18px;
      margin-right: 8px;
    }
  }

  strong {
    color: red;
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* Estilos para el date picker */
  .datePickerContainer {
    position: relative;
    cursor: pointer;
    
    &:hover {
      cursor: pointer;
      
      .dateInput {
        border-color: #b1b8c0;
      }
      
      .dateIcon {
        color: ${colors.primaryColor};
      }
    }
  }

  .dateInput {
    padding-right: 40px;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .datePickerLabel {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${colors.primaryColor};
      cursor: pointer;
    }
  }

  .dateIcon {
    font-size: 20px;
  }

  input[type="date"] {
    height: 40px;
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
    
    &:hover {
      cursor: pointer;
    }

    
  }

  /* Ocultar el icono nativo del calendario en algunos navegadores */
  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    color: transparent;
    background: transparent;
  }
`;
const scroll = css`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
`;

const TableProducts = styled.div`
  width: 100%;
  overflow: auto;
  margin-bottom: 20px;
  margin-left: 8px;
  margin-right: 11px;
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  border-radius: 9px;
  max-height: 70vh;
  ${scroll};

  .totalcontainer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 0 0 9px 9px;

    &__items {
      width: 300px;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;

      .text {
        font-size: 14px;
        color: #555;
      }

      .value {
        font-size: 14px;
        text-align: right;
        min-width: 120px;
      }

      .bold {
        font-weight: 600;
        color: #333;
      }
    }
  }

  table {
    width: 100%;
    border-spacing: 0;
    table-layout: fixed;
    min-width: 1000px; /* Ancho mínimo para evitar que se comprima demasiado */

    .ctr_table {
      width: 100%;
      border-spacing: 0;

      &__head {
        position: sticky;
        top: 0;
        z-index: 50;
        background-color: #dce1f6;

        &__tr {
          height: 40px;

          .fix, .fixed, .fixedlast {
            position: sticky;
            background-color: #dce1f6;
            z-index: 10;
          }

          .fix {
            left: 0;
          }

          .fixedlast {
            right: 0;
          }

          .title {
            padding: 0 10px;
            text-align: left;
            font-size: 14px;
            font-weight: 600;
            color: #282455;

            .ctr_title {
              display: flex;
              align-items: center;
            }
          }
        }
      }

      &__body {
        .row {
          background: #fff;
          font-weight: 500;
          color: #2c2c2c;
          transition: all 0.3s ease;
          min-height: 50px;

          &:hover {
            background: #f0f2ff;
          }

          .fixed, .fixedlast {
            position: sticky;
            background: inherit;
            z-index: 5;
          }

          .fixed {
            left: 0;
          }

          .fixedlast {
            right: 0;
          }

          .data {
            padding: 8px 10px;
            font-size: 14px;
            border-bottom: 1px solid #f0f0f0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .text, .ctr_td {
              display: flex;
              align-items: center;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .inpar {
          background: #f9f9f9;
          
          &:hover {
            background: #f0f2ff;
          }
        }
      }
    }
  }

  .notFound {
    text-align: center;
    color: #8a8a8a;
    padding: 20px;
    font-size: 14px;
  }

  /* Estilos para scroll */
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
`;