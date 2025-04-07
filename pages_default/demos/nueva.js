import React, { useEffect } from "react";
import { NuevoStyled } from "../../styles/Demos/nueva.styled";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useState } from "react";
import TableLimenka from "../../components/UI/organism/TableLimenka";

const useAddDemo = () => {
  const router = useRouter();
  const { o: oportunityId, p: prospectId } = router.query;

  const [products, setProducts] = useState([]);
  const [oportunityData, setOportunityData] = useState({});
  const [prospectData, setProspectData] = useState({});

  // * Calls

  useEffect(() => {
    fetchOportunity();
  }, []);

  // *  Request

  const fetchOportunity = async () => {
    try {
      let resp = await api.get(`oportunities/${oportunityId}`, {
        params: {
          include: "prospect",
        },
      });

      let respProducts = await api.get("productsoportunities", {
        params: {
          where: JSON.stringify({
            oportunityId: oportunityId,
          }),
          include: "product",
        },
      });

      console.log(respProducts.data?.results);
      setProducts(respProducts?.data?.results);
      setProspectData(resp?.data?.prospect);
      //   console.log(resp);
    } catch (error) {}
  };

  // * Events
  const handleCreateDemo = () => {};

  return {
    handleCreateDemo,
    prospectData,
    products,
  };
};

export default function Nueva() {
  const { prospectData, products = [] } = useAddDemo();
  return (
    <MainLayout>
      <NuevoStyled>
        <h1 className="titlePage">Nueva Demo</h1>
        <div className="form_container">
          <div className="inputs_row">
            <div className="input_container">
              <p className="label">Nombre del Cliente</p>
              <input
                value={prospectData?.fullname}
                onChange={() => {}}
                type="text"
                className="input_text"
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="input_container">
              <p className="label">Telefono</p>
              <input type="text" className="input_text" placeholder="Nombre del cliente" />
            </div>
            <div className="input_container">
              <p className="label">Fecha de Demostración</p>
              <input type="text" className="input_text" placeholder="Nombre del cliente" />
            </div>

            <div className="input_container">
              <p className="label">Fecha y hora de Demostración</p>
              <input
                className="input_text"
                // {...register("estimatedclosing", { required: true })}
                name="estimatedclosing"
                id="estimatedclosing"
                type="datetime-local"
                onChange={e => console.log(e.target.value)}
              />
            </div>
          </div>

          <div className="products_section">
            {products.map((item, index) => {
              return (
                <div>
                  {item?.product?.code}
                  {item?.product?.name}
                  {item?.quantity}
                </div>
              );
            })}
          </div>
        </div>

        <TableLimenka isFetching={false} heads={[]} data={[]} />
      </NuevoStyled>
    </MainLayout>
  );
}
