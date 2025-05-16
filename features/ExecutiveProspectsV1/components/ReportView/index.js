import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Add,
  ArrowDropDown,
  Cached,
  ViewCarousel,
  ViewList,
  Assessment, // Informe
  CalendarToday, // Calendario
  Visibility, // Vista
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import { AnimatePresence, motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
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

export default function ReportView() {
  const { dataChart, viewType, setViewType, setReportType, reportType } =
    useReports();

  const [selectedDataset, setSelectedDataset] = useState(
    "Todos los prospectos"
  );

  return (
    <ReportViewStyled>
      <div className="reportview-header">
        <ListDropdown setValue={setReportType} value={reportType} />
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

      <div className="contentchart">
        <ChartDisplay chartType={viewType} chartData={dataChart} />
      </div>
    </ReportViewStyled>
  );
}

const ReportViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px); /* Fijo en pantalla completa */

  .reportview-header {
    display: flex;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .contentchart {
    flex: 1;
    display: flex;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    /* box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08); */
    overflow: auto;
    flex: 1;
    height: 100%;
    min-height: 400px;
  }
`;

const ViewButton = styled(IconButton)`
  border-radius: 0;
  /* background: ${({ isActive }) =>
    isActive ? "rgba(7, 123, 248, 1)" : "none"}; */
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

function ListDropdown({ setValue, value }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Todos los prospectos");
  const dropdownRef = useRef();

  const defaultLists = ["Solution Open Deals", "My All Deals"];
  const myLists = ["prospectsentities", "pendingsversus"];

  const filteredLists = myLists.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
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
        <span>{selected}</span>
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
                    setValue(item);
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  {item}
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
    /* background: #f5f5f5; */
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
