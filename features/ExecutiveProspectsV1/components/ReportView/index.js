import { IconButton } from "@material-ui/core";
import {
  Add,
  ArrowDropDown,
  Assessment,
  CalendarToday,
  ViewCarousel,
  ViewList,
  Visibility,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { AnimatePresence, motion } from "framer-motion";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import useReports from "../../hooks/useReports";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const ChartDisplayWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 100%;
`;

const ChartDisplay = ({ chartType = "bar", chartData }) => {
  const chartProps = {
    data: chartData,
    options: { responsive: true, maintainAspectRatio: false },
  };

  if (chartType === "line") return <Line {...chartProps} />;
  if (chartType === "pie") return <Pie {...chartProps} />;
  if (chartType === "bar") return <Bar {...chartProps} />;
  return (
    <ChartDisplayWrapper>
      <Bar {...chartProps} />
    </ChartDisplayWrapper>
  );
};

const viewTypes = [
  { key: "line", icon: <ViewCarousel titleAccess="Tabla" /> },
  { key: "bar", icon: <ViewCarousel titleAccess="Tabla" /> },
  { key: "pie", icon: <ViewCarousel titleAccess="Tabla" /> },
];

const viewTypesPage = [
  { key: "table", icon: <ViewList titleAccess="Kanban" /> },
  { key: "kanban", icon: <ViewCarousel titleAccess="Tabla" /> },
  { key: "calendar", icon: <CalendarToday titleAccess="Calendario" /> },
  { key: "report", icon: <Assessment titleAccess="Informe" /> },
  { key: "view", icon: <Visibility titleAccess="Vista" /> },
];

const reportTypes = [
  {
    label: "Prospectos por entidad",
    value: "prospectsentities",
  },
  {
    label: "Pendientes Completos",
    value: "pendingsversus",
  },
  {
    label: "Prospectos por tipo de cliente",
    value: "prospectsclienttype",
  },
];

export default function ReportView({ setViewTypePage, viewTypePage }) {
  const { dataChart, viewType, setViewType, setReportType, reportType } =
    useReports();

  const [selectedDataset, setSelectedDataset] = useState(
    "Todos los prospectos"
  );

  return (
    <ReportViewStyled>
      <div className="reportview-header">
        <div className="left-controls">
          <ListDropdown
            options={reportTypes}
            setValue={setReportType}
            value={reportType}
          />
          <div className="viewtype">
            {viewTypes.map(({ key, icon }) => (
              <ViewButton
                key={key}
                isActive={viewType === key}
                onClick={() => setViewType(key)}
              >
                {icon}
              </ViewButton>
            ))}
          </div>
        </div>

        <div className="right-button">
          <div className="viewtype">
            {viewTypesPage.map(({ key, icon }) => (
              <ViewButton
                key={key}
                isActive={viewTypePage === key}
                onClick={() => setViewTypePage(key)}
              >
                {icon}
              </ViewButton>
            ))}
          </div>
        </div>
      </div>

      <div className="contentchart">
        <ChartDisplay chartType={viewType} chartData={dataChart} />
      </div>
    </ReportViewStyled>
  );
}

const ReportViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);

  .reportview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .left-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .viewtype {
    display: flex;
    gap: 0.5rem;
  }

  .right-button {
    /* Opcional para estilo */
  }

  .contentchart {
    flex: 1;
    display: flex;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;

    overflow: auto;
    flex: 1;
    height: 100%;
    min-height: 400px;
  }
`;

const ViewButton = styled(IconButton)`
  border-radius: 0;

  background: ${({ isActive }) =>
    isActive ? "rgba(14, 122, 238, 0.4) !important" : "#E5EAED !important"};
  border-radius: 4px !important;
  margin-right: 4px !important;
  padding: 4px !important;

  transition: background 0.2s, color 0.2s;

  &:hover {
    background: rgba(0, 123, 255, 0.08);
  }
`;

function ListDropdown({ setValue, value, options = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Todos los prospectos");
  const dropdownRef = useRef();

  const filteredLists = options.filter((item) =>
    item?.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={() => setOpen(!open)}>
        {selected?.label ? selected?.label : "Selecciona un acceso rapido"}
        <ArrowDropDown />
      </DropdownHeader>

      <AnimatePresence>
        {open && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="dropdown-top">
              <h4>Selecciona una opcion</h4>
              <button className="add-btn">
                <Add />
              </button>
            </div>

            <div className="searchbar">
              <Add size={16} />
              <input
                type="text"
                placeholder="Buscar accesso rapido"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* <div className="section">
              {defaultLists.map((item, i) => (
                <div
                  key={i}
                  className="item"
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div> */}

            <h5>Accesos rapidos</h5>
            <div className="section scroll">
              {filteredLists.map((item, i) => (
                <div
                  key={i}
                  className="item"
                  onClick={() => {
                    setValue(item?.value);
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  {item?.label}
                </div>
              ))}
            </div>
          </DropdownMenu>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 260px;
  font-family: "Inter", sans-serif;
  margin-right: 20px;
`;

const DropdownHeader = styled.button`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border: none;
  background: rgb(136, 171, 204);

  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  height: 40px;

  &:hover {
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 1000;
  padding: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);

  .dropdown-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      font-size: 14px;
      margin: 0;
    }

    .add-btn {
      background: #eef2f7;
      border: none;
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
    }
  }

  .searchbar {
    margin: 10px 0;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 6px 10px;
    input {
      border: none;
      background: transparent;
      outline: none;
      margin-left: 8px;
      width: 100%;
      font-size: 14px;
    }
  }

  h5 {
    font-size: 13px;
    margin: 8px 0 4px;
    color: #666;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 150px;
    overflow-y: auto;

    .item {
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
`;
