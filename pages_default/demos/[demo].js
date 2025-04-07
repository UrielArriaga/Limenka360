import MainLayout from "../../components/MainLayout";
import ReturnButton from "../../components/ReturnButton";
import { LinearProgress } from "@material-ui/core";
import LoaderPage from "../../components/LoaderPage";
import {TableChart } from "@material-ui/icons";
import ProductTable from "../../components/TableComponentDemoId";
import DataViewDemo from "../../components/DataViewDemo";
import useViewDemo from "../../hooks/useViewDemo";
import { useState } from "react";
import { DemoMainStyled } from "../../styles/Demos/demosMain.styled";

export default function Demo(){

  const {demo, demos, isLoadingPage, userData, products, oportunityId } = useViewDemo(oportunityId) ; 
  const [loader ] = useState(false);

  if (isLoadingPage) return <LoaderPage />;
  return (
    <MainLayout>
      <DemoMainStyled>
        <div className="main">
          <div className="ctr_prospecto"> 
            <ReturnButton text={"Demos"} />
            {!demo?.isFeching && (
              <DataViewDemo 
                demos={demos}
                userData={userData}
              />
            )}

            {demo?.isFeching && (
              <div className="ctr_load">
                <div className="ctr_load__img">
                  <img src="/load.png" />
                </div>
                <div className="ctr_load__load">
                  <p>Cargando</p>
                  <LinearProgress color="primary" />
                </div>
              </div>
            )}

            <div className="ctr_prospecto__table">
              <div className="ctr_prospecto__table__title_table">
                <TableChart />
                <p>Tabla </p>
              </div> 

              <div className="ctr_prospecto__table__info">
                {!loader? (<ProductTable dataProductsDemo={products} />) : ("No hay Productos seleccionados para la demo")}
              </div>
            </div>
          </div>
        </div>
      </DemoMainStyled>
    </MainLayout>
  );
}



