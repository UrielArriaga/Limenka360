import React, { useState } from "react";
import { ModalPreviewStyled } from "./styles";
import {
  AttachFile,
  CalendarToday,
  Close,
  ContactMail,
  Help,
  WhatsApp,
  PanTool,
} from "@material-ui/icons";
import AddTracking from "./AddTracking";
import {
  Grid,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
} from "@material-ui/core";
import InfoProspect from "./InfoProspect";
import LineTime from "./LineTime";
import AddPending from "./AddPending";
import LineTimePendings from "./LineTimePendings";
import ArrowStepsComponent from "../ArrowPhases";
import SendWhatsapp from "./SendWhatsapp";
import ProductsOportunities from "./ProductsOportunities";
import ProductsOportunitiesTable from "./ProductsOportunitiesTable";
import useTrackings from "../../../ExecutiveProspectsV2/hooks/useTrackings";
import usePending from "../../../ExecutiveProspectsV2/hooks/usePending";
import EditProspectDrawer from "../DrawerEditProspect";
import useOpportunityProducts from "../../hooks/useOpportunityProducts";
import useQuotePDF from "../../hooks/useQuotePDF";
import useFiles from "../../hooks/useFiles";
import PreviewCuote from "../../../../components/DrawerPreview";
import Files from "./FilesUploader";
import ModalForecast from "./ModalForecast";
import useForecast from "../../hooks/useForecast";
import LimiBot from "./LimiBot";

export default function ModalPreview({
  open,
  toggleModal,
  prospectSelected,
  setProspectSelected,
  // trackings,
  // pendingsData,
}) {
  const [showAction, setShowAction] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleOnCancel = () => {
    setShowAction(null);
  };

  const { trackingData, refetchTrackings, setTrackingData } =
    useTrackings(prospectSelected);

  const { pendingsData } = usePending(prospectSelected?.id);

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
    count: countProducts,
    paginationData: paginationDataProducts,
  } = useOpportunityProducts(prospectSelected?.id);

  const { opportunities } = useQuotePDF(prospectSelected?.id);

  const {
    files,
    setFile,
    filesCount,
    isLoader,
    isLoaderUpload,
    refetch,
    pageFiles,
    file,
    fileSelected,
    setFileSelected,
    setPageFiles,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDownloadFile,
    setRefetch,
    string_to_slug,
    returnStyleTypeFile,
    searchColorStyle,
    limitFiles,
    filesLenght,
  } = useFiles(prospectSelected);

  const {
    reasons,
    loadingReasons,
    errorReasons,
    updateForecast,
    isForecastModalOpen,
    handleOpenForecastModal,
    handleCloseForecastModal,
  } = useForecast(prospectSelected);
  let trackings = trackingData.results || [];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  const toggleEditDrawer = (open) => () => {
    setEditDrawerOpen(open);
  };

  return (
    <ModalPreviewStyled
      anchor={"right"}
      open={open}
      onClose={() => toggleModal()}
    >
      <div className="row">
        <div className="modalcontainer">
          <div className="headerPreview">
            <h1>{prospectSelected?.email}</h1>
            {/* <ArrowStepsComponent /> */}

            <div className="actionmodal">
              <button className="btn btn--primary">
                Convertir en Oportunidad
              </button>
              <button
                className="btn btn--secondary"
                onClick={toggleEditDrawer(true)}
              >
                Editar
              </button>
              <button className="btn btn--secondary">Eliminar</button>
            </div>
          </div>

          <div className="headertabs">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Resumen" />

              <Tab label="Productos" />
              <Tab label="Cotizacion PDF" />
              <Tab label="Documentos" />
              <Tab label="LimiBOT" />
            </Tabs>
          </div>

          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <InfoProspect
                  prospectSelected={prospectSelected}
                  setProspectSelected={setProspectSelected}
                  onTrackingCreated={refetchTrackings}
                  setTrackingData={setTrackingData}
                />
                <AddPending
                  pendingsData={pendingsData}
                  prospectSelected={prospectSelected}
                />
                <LineTimePendings pendingsData={pendingsData} />
              </Grid>

              <Grid item md={6} xs={12}>
                {showAction === "whatsapp" && (
                  <>
                    <SendWhatsapp onCancel={() => handleOnCancel()} />
                    <LineTime trackings={trackings} />
                  </>
                )}
                {showAction === null && (
                  <>
                    <AddTracking />
                    <LineTime
                      trackings={trackings}
                      fetching={trackingData.isFetching}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <>
              {loadingProducts ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : errorProducts ? (
                <div style={{ padding: "20px", color: "red" }}>
                  Error al cargar los productos.
                </div>
              ) : (
                <ProductsOportunitiesTable
                  products={products}
                  countProducts={countProducts}
                  paginationDataProducts={{
                    ...paginationDataProducts,
                    total: countProducts,
                  }}
                />
              )}
            </>
          )}

          {tabValue === 2 && (
            <PreviewCuote
              open={tabValue === 2}
              setOpen={() => setTabValue(0)}
              oportunitySelect={opportunities}
            />
          )}

          {tabValue === 3 && (
            <Files
              files={files}
              setFile={setFile}
              filesCount={filesCount}
              isLoader={isLoader}
              isLoaderUpload={isLoaderUpload}
              refetch={refetch}
              pageFiles={pageFiles}
              file={file}
              fileSelected={fileSelected}
              setFileSelected={setFileSelected}
              setPageFiles={setPageFiles}
              handleFileSelect={handleFileSelect}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleDownloadFile={handleDownloadFile}
              setRefetch={setRefetch}
              string_to_slug={string_to_slug}
              returnStyleTypeFile={returnStyleTypeFile}
              searchColorStyle={searchColorStyle}
              limitFiles={limitFiles}
              filesLenght={filesLenght}
            />
          )}

          {tabValue === 4 && (
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <InfoProspect
                  prospectSelected={prospectSelected}
                  setProspectSelected={setProspectSelected}
                  onTrackingCreated={refetchTrackings}
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <LimiBot
                  prospectSelected={prospectSelected}
                  setProspectSelected={setProspectSelected}
                  onTrackingCreated={refetchTrackings}
                />
              </Grid>
            </Grid>
          )}
          <div className="close" onClick={() => toggleModal()}>
            <Close />
          </div>
        </div>
        <div className="actionsbar">
          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <Help />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <CalendarToday />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton
              className="actionsbar__icon"
              onClick={() => setShowAction("whatsapp")}
            >
              <WhatsApp />
            </IconButton>
          </div>

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <AttachFile />
            </IconButton>
          </div>
          <EditProspectDrawer
            open={editDrawerOpen}
            onClose={toggleEditDrawer(false)}
            prospect={prospectSelected}
          />

          <div className="actionsbar__item">
            <IconButton className="actionsbar__icon">
              <ContactMail />
            </IconButton>
          </div>
          <div className="actionsbar__item">
            <IconButton
              className="actionsbar__icon"
              onClick={handleOpenForecastModal}
            >
              <PanTool />
            </IconButton>
          </div>
        </div>
      </div>
      <ModalForecast
        isOpen={isForecastModalOpen}
        onClose={handleCloseForecastModal}
        reasons={reasons}
        loadingReasons={loadingReasons}
        errorReasons={errorReasons}
        updateForecast={updateForecast}
      />
    </ModalPreviewStyled>
  );
}

{
  /* <Grid item md={12} xs={12}>
<Tabs
  value={tabValue}
  onChange={handleTabChange}
  aria-label="simple tabs example"
>
  <Tab label="Resumen" />
  <Tab label="Productos" />
</Tabs>

{tabValue === 0 && (
  <div>
    {/* Aquí puedes poner el contenido del resumen */
}
//     <p>Contenido del Resumen.</p>
//   </div>
// )}

// {tabValue === 1 && (
//   <div>
//     <ProductsOportunitiesTable />
//   </div>
// )}
// </Grid> */}
