import { useRouter } from "next/router";
import useFetchData from "../../hooks/useFetchData";
import DrawerSelectTemplate from "./components/DrawerSelectTemplate/index.js";
import useTemplate from "./hooks/useTemplate.js";
import { preOptions, testProducts } from "./constants.js";
import useTemplateDrawer from "./hooks/useTemplateDrawer.js";
import NewRouteForm from "./components/NewRouteForm/index.js";
import {
  normalizeDataDrivers,
  normalizeDataTrasportunits,
  orderParams,
  processResponseArray,
  processResponseResult,
} from "./utils";

const FloorManagerNewRoute = () => {
  const router = useRouter();
  const { nuevaruta } = router.query;

  const { data: order } = useFetchData("orders", processResponseResult, orderParams(nuevaruta));
  const { data: drivers } = useFetchData("drivers", processResponseArray, {}, normalizeDataDrivers);
  const { data: trasportunits } = useFetchData("trasportunits", processResponseArray, {}, normalizeDataTrasportunits);

  const { readTemplate, updateTemplates } = useTemplate();
  const {
    open,
    handleOpenDrawer,
    handleCloseDrawer,
    preview,
    zoomCount,
    emailUpdate,
    setEmailUpdate,
    handleTemplateDrawer,
    RenderSelectTemplate,
    templateData,
  } = useTemplateDrawer(updateTemplates, order);

  return (
    <div>
      <NewRouteForm
        order={order}
        drivers={drivers}
        preOptions={preOptions}
        trasportunits={trasportunits}
        testProducts={testProducts}
        handleOpenDrawer={handleOpenDrawer}
        readTemplate={readTemplate}
      />

      <DrawerSelectTemplate
        open={open}
        closeDrawer={handleCloseDrawer}
        preview={preview}
        zoomCount={zoomCount}
        emailUpdate={emailUpdate}
        setEmailUpdate={setEmailUpdate}
        handleTemplateDrawer={handleTemplateDrawer}
        RenderSelectTemplate={RenderSelectTemplate}
        templateData={templateData}
      />
    </div>
  );
};

export default FloorManagerNewRoute;
