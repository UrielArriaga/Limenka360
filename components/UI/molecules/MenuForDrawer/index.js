import React, { useEffect, useState } from "react";
import TimeLinePrewiew from "../TimeLinePrewiew";
import PreviewPendings from "../../../PreviewPendings";
import ProductsOportunity from "../../../ProductsByOportunity";
import Files from "../../../Files";
import PaymentCard from "../PaymentCard";
import usePagination from "../../../../hooks/usePagination";
import { api } from "../../../../services/api";

export default function MenuForDrawers({ oportunity, setOptionSelected, optionSelected, dataProspect, isSale }) {
  const prospectId = dataProspect?.id;
  const oportunityId = oportunity?.id;

  const [products, setProducts] = useState([]);
  const [trackings, setTrackings] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [files, setFiles] = useState([]);
  const [payments, setPayments] = useState([]);

  const [isFetching, setIsFetching] = useState({
    trackings: false,
    pendings: false,
    products: false,
    files: false,
  });

  const {
    page: pagePend,
    setPage: setPagePend,
    limit: limitPend,
    handlePage: handlePagePend,
  } = usePagination({ defaultLimit: 10, defaultPage: 1 });

  useEffect(() => {
    setPagePend(1);
  }, [oportunity]);

  useEffect(() => {
    if (oportunity && dataProspect) {
      fetchData();
    }
  }, [oportunity, pagePend]); //pagePend revisar en paginacion pendientes

  const fetchData = async () => {
    setIsFetching({
      trackings: true,
      pendings: true,
      products: true,
      files: true,
      payments: true,
    });
    try {
      const [productsRes, trackingsRes, pendingsRes, filesRes, paymentsRes] = await Promise.all([
        api.get("productsoportunities", {
          params: {
            count: "1",
            where: { oportunityId: oportunityId },
            include: "product",
            all: 1,
          },
        }),
        api.get(`trackings`, {
          params: {
            where: { prospectId: prospectId },
            order: "createdAt",
            include: "phase",
            all: 1,
          },
        }),
        api.get(`pendings`, {
          params: {
            where: {
              prospectId: prospectId,
              isdone: false,
            },
            order: "createdAt",
            include: "pendingstype,prospect,prospect.phase",
            count: 1,
            limit: limitPend,
            skip: pagePend,
          },
        }),
        api.get(`documents/prospect/${prospectId}`, {
          params: {
            include: "filestype",
          },
        }),
        api.get("salespayments", {
          params: {
            where: { oportunityId: oportunityId },
            order: "date",
          },
        }),
      ]);

      setProducts(productsRes.data.results);
      setTrackings(trackingsRes.data.results);
      setPendings({ pendings: pendingsRes.data.results, count: pendingsRes.data.count });
      setFiles(filesRes.data.results);
      setPayments(paymentsRes.data.results);
      setIsFetching({
        trackings: false,
        pendings: false,
        products: false,
        files: false,
        payments: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    switch (optionSelected) {
      case "tracking":
        return <TimeLinePrewiew trackings={trackings} fetching={isFetching.trackings} />;
      case "pending":
        return (
          <PreviewPendings
            pendings={pendings}
            fetching={isFetching.pendings}
            page={pagePend}
            limit={limitPend}
            handlePage={handlePagePend}
          />
        );
      case "products":
        return <ProductsOportunity products={products} fetching={isFetching.products} />;
      case "files":
        return <Files filesFrom="prospect" data={dataProspect} />;
      // return <ProspectFiles files={files} fetching={isFetching.files} />;
      case "payments":
        return <div>{isSale && <PaymentCard payment={payments} fetching={isFetching.payments} />}</div>;
      default:
        break;
    }
  };

  const handleTabs = option => setOptionSelected(option);

  const countData = number => {
    const count = number > 99 ? "99+" : number;
    return <p className="count">({count})</p>;
  };

  return (
    <div>
      <div className="tabs">
        {isSale && (
          <div
            className={`title ${optionSelected === "payments" && "selected"}`}
            onClick={() => handleTabs("payments")}
          >
            Pagos {countData(payments.length)}
          </div>
        )}
        <div className={`title ${optionSelected === "tracking" && "selected"}`} onClick={() => handleTabs("tracking")}>
          Seguimientos {countData(trackings.length)}
        </div>
        <div className={`title ${optionSelected === "pending" && "selected"}`} onClick={() => handleTabs("pending")}>
          Pendientes {countData(pendings.count)}
        </div>
        <div className={`title ${optionSelected === "products" && "selected"}`} onClick={() => handleTabs("products")}>
          Productos de la Cotización {countData(products.length)}
        </div>
        <div className={`title ${optionSelected === "files" && "selected"}`} onClick={() => handleTabs("files")}>
          Archivos {countData(files.length)}
        </div>
      </div>
      <div className="render_container">{renderContent()}</div>
    </div>
  );
}
