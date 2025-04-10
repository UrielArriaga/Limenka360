import React, { useState } from "react";
import styled from "styled-components";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
} from "@material-ui/icons";

// Estilos con Styled Components
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 500;
  color: #333;
  position: relative;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #eee;
  }

  &.active {
    color: #1976d2;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 16px;
  color: #333;
`;

const ActionCell = styled(TableCell)`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
`;

const SearchContainer = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
`;

const SearchInput = styled.input`
  padding: 8px 16px 8px 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  padding: 8px;
  color: #777;
`;

const SortIconWrapper = styled.span`
  margin-left: 8px;
  display: inline-flex;
  flex-direction: column;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #eee;
    color: #1976d2;
  }
`;

// Componente de Tabla Dinámica
const DynamicTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onRowClick,
  pageSizeOptions = [5, 10, 25],
  defaultPageSize = 10,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para ordenar
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Función para filtrar y ordenar datos
  const getFilteredAndSortedData = () => {
    let filteredData = data;

    // Filtrar
    if (searchTerm) {
      filteredData = data.filter((item) =>
        columns.some((column) => {
          const value = item[column.key];
          return (
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }

    // Ordenar
    if (sortConfig.key) {
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  };

  const filteredData = getFilteredAndSortedData();
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const currentData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div>
      <SearchContainer>
        <div style={{ position: "relative" }}>
          <SearchIconWrapper>
            <SearchIcon fontSize="small" />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>
      </SearchContainer>

      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.key}
                  onClick={() => requestSort(column.key)}
                  className={sortConfig.key === column.key ? "active" : ""}
                >
                  {column.label}
                  <SortIconWrapper>
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUpIcon fontSize="small" />
                      ) : (
                        <ArrowDownIcon fontSize="small" />
                      )
                    ) : (
                      <FilterIcon fontSize="small" />
                    )}
                  </SortIconWrapper>
                </TableHeaderCell>
              ))}
              {(onEdit || onDelete) && (
                <TableHeaderCell>Acciones</TableHeaderCell>
              )}
            </tr>
          </TableHeader>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(item)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {column.render ? column.render(item) : item[column.key]}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete) && (
                    <ActionCell>
                      {onEdit && (
                        <ActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </ActionButton>
                      )}
                      {onDelete && (
                        <ActionButton
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </ActionButton>
                      )}
                    </ActionCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  style={{ textAlign: "center" }}
                >
                  No se encontraron datos
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

      <PaginationContainer>
        <div>
          Mostrando {currentData.length} de {filteredData.length} registros
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} por página
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "8px" }}>
            <ActionButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              <ArrowUpIcon fontSize="small" />
            </ActionButton>
            <span>
              Página {currentPage + 1} de {pageCount || 1}
            </span>
            <ActionButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
              }
              disabled={currentPage >= pageCount - 1 || pageCount === 0}
            >
              <ArrowDownIcon fontSize="small" />
            </ActionButton>
          </div>
        </div>
      </PaginationContainer>
    </div>
  );
};

// Ejemplo de uso
const App = () => {
  const [people, setPeople] = useState([
    { id: 1, name: "Juan Pérez", age: 28, email: "juan@example.com" },
    { id: 2, name: "María García", age: 34, email: "maria@example.com" },
    { id: 3, name: "Carlos López", age: 22, email: "carlos@example.com" },
    { id: 4, name: "Ana Martínez", age: 45, email: "ana@example.com" },
    { id: 5, name: "Pedro Sánchez", age: 31, email: "pedro@example.com" },
  ]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "age", label: "Edad" },
    {
      key: "email",
      label: "Correo Electrónico",
      render: (item) => <a href={`mailto:${item.email}`}>{item.email}</a>,
    },
  ];

  const handleEdit = (item) => {
    console.log("Editar:", item);
    // Aquí podrías abrir un modal o formulario de edición
  };

  const handleDelete = (item) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${item.name}?`)) {
      setPeople(people.filter((p) => p.id !== item.id));
    }
  };

  const handleRowClick = (item) => {
    console.log("Fila clickeada:", item);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Tabla Dinámica Personalizada</h1>
      <DynamicTable
        columns={columns}
        data={people}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={handleRowClick}
        pageSizeOptions={[3, 5, 10]}
        defaultPageSize={5}
      />
    </div>
  );
};

export default App;
