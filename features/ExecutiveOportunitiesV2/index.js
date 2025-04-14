import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ModalPreview from "../ExecutiveProspects/components/ModalPreview";
import FilterProspects from "./components/FilterProspects";
import Kanban from "./components/Kanban";
import LimiBotChatIA from "./components/LimiBotChatIA";
import NewOportunity from "./components/NewOportunity";
import useMain from "./hooks/useMain";
import { ExecutiveProspectsStyled } from "./styled";
import ProspectCalendar from "./components/CalendarOportunities";
import TableOportunities from "./components/TableOportunities";
import Select from "react-select";

export default function ExecutiveOportunitiesV2() {
  const [viewType, setViewType] = useState("kanban");

  const { data, oportunitiesData, onDragEnd, modalActions } = useMain({
    viewType,
  });

  const [prospectSelected, setProspectSelected] = useState(null);
  const [openPreview, setopenPreview] = useState(false);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);
  const [openNewOportunity, setOpenNewOportunity1] = useState(false);
  const [showArea, setShowArea] = useState(false);

  const onClickProspect = (item) => {
    setProspectSelected(item);
    modalActions.handleToggleModal("preview");
  };

  const toogleModalPreview = () => {
    setopenPreview(!openPreview);
  };

  const toogleLimiBotChat = (item) => {
    setProspectSelected(item);
    setOpenLimiBotChat(!openLimiBotChat);
  };

  return (
    <ExecutiveProspectsStyled>
      <FilterProspects viewType={viewType} setViewType={setViewType} />
      <AdvancedFilter />
      {viewType === "calendar" && (
        <ProspectCalendar
          actions={{
            onClickProspect,
            toogleLimiBotChat,
          }}
        />
      )}

      {viewType === "table" && (
        <TableOportunities
          onRowClick={(e) => {
            setProspectSelected(e);
            modalActions.handleToggleModal("preview");
          }}
          heads={[
            {
              headText: "Folio",
              headNormalize: "folio",
              orderby: null,
              customclass: "bold",
            },
            {
              headText: "Correo",
              headNormalize: "email",
              orderby: null,
            },

            {
              headText: "Monto",
              headNormalize: "monto",
              orderby: null,
            },
            {
              headText: "Nombre",
              headNormalize: "fullname",
              orderby: null,
            },
            {
              headText: "Fecha de vencimiento",
              headNormalize: "vencimiento",
              orderby: "asc",
            },

            {
              headText: "Siguiente contacto",
              headNormalize: "vencimiento",
              orderby: "asc",
            },
          ]}
          data={oportunitiesData.results}
        />
      )}

      {viewType === "kanban" && (
        <DragDropContext onDragEnd={onDragEnd}>
          <DropContextStyled>
            <Kanban
              data={data}
              actions={{
                onClickProspect,
                toogleLimiBotChat,
              }}
            />

            {/* <ConvertArea /> */}
          </DropContextStyled>
        </DragDropContext>
      )}

      <ModalPreview
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={modalActions.modalViews.preview}
        toggleModal={() => modalActions.handleToggleModal("preview")}
      />

      <LimiBotChatIA
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={openLimiBotChat}
        toggleModal={toogleLimiBotChat}
      />

      <NewOportunity
        open={openNewOportunity}
        toggleModal={() => {
          setOpenNewOportunity1(!openNewOportunity);
        }}
      />
    </ExecutiveProspectsStyled>
  );
}

function ConvertArea() {
  return (
    <Droppable droppableId="convert-zone" type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            width: 150,
            height: "100vh",
            padding: 16,
            borderRadius: 8,
            background: snapshot.isDraggingOver ? "#d1e7dd" : "#f8f9fa",
            border: "2px dashed #6c757d",
            transition: "0.3s",
          }}
        >
          <p style={{ textAlign: "center", fontWeight: 600 }}>
            Convertir a oportunidad
          </p>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

import { motion } from "framer-motion";

import { Add } from "@material-ui/icons";
import AdvancedFilter from "./components/FilterProspects/AdvancedFilter";

// Opciones simuladas
// const fieldOptions = [
//   { label: "Is Client", value: "isclient", type: "boolean" },
//   { label: "Is Opportunity", value: "isoportunity", type: "boolean" },
//   { label: "Viewed", value: "viewed", type: "boolean" },
//   { label: "Ejecutive", value: "ejecutiveId", type: "select" },
//   { label: "Entity", value: "entityId", type: "select" },
//   { label: "Category", value: "categoryId", type: "select" },
//   { label: "Origin", value: "originId", type: "select" },
//   { label: "Phase", value: "phaseId", type: "select" },
//   { label: "Created At", value: "createdAt", type: "date-range" },
// ];

// // Condiciones
// const conditionOptions = ["is", "is any of", "between"];

// const AdvancedFilter = () => {
//   const [filters, setFilters] = useState([
//     { field: "isclient", operator: "is", value: false, id: 1 },
//   ]);

//   const handleChange = (id, key, value) => {
//     setFilters((prev) =>
//       prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
//     );
//   };

//   const addFilter = () => {
//     setFilters((prev) => [
//       ...prev,
//       {
//         field: "",
//         operator: "is",
//         value: "",
//         id: Date.now(),
//       },
//     ]);
//   };

//   const removeFilter = (id) => {
//     setFilters((prev) => prev.filter((f) => f.id !== id));
//   };

//   const renderValueInput = (filter) => {
//     const field = fieldOptions.find((f) => f.value === filter.field);
//     if (!field) return null;

//     if (field.type === "boolean") {
//       return (
//         <select
//           value={filter.value}
//           onChange={(e) =>
//             handleChange(filter.id, "value", e.target.value === "true")
//           }
//         >
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       );
//     }

//     if (field.type === "date-range") {
//       return (
//         <>
//           <input
//             type="date"
//             onChange={(e) =>
//               handleChange(filter.id, "value", [
//                 e.target.value,
//                 filter.value?.[1] || "",
//               ])
//             }
//           />
//           <span>to</span>
//           <input
//             type="date"
//             onChange={(e) =>
//               handleChange(filter.id, "value", [
//                 filter.value?.[0] || "",
//                 e.target.value,
//               ])
//             }
//           />
//         </>
//       );
//     }

//     return (
//       <input
//         type="text"
//         value={filter.value}
//         onChange={(e) => handleChange(filter.id, "value", e.target.value)}
//         placeholder="Enter value"
//       />
//     );
//   };

//   return (
//     <FilterContainer>
//       {filters.map((filter) => (
//         <FilterRow
//           as={motion.div}
//           key={filter.id}
//           layout
//           initial={{ opacity: 0, y: 5 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -5 }}
//         >
//           <select
//             value={filter.field}
//             onChange={(e) => handleChange(filter.id, "field", e.target.value)}
//           >
//             <option value="">Select field</option>
//             {fieldOptions.map((f) => (
//               <option key={f.value} value={f.value}>
//                 {f.label}
//               </option>
//             ))}
//           </select>

//           <select
//             value={filter.operator}
//             onChange={(e) =>
//               handleChange(filter.id, "operator", e.target.value)
//             }
//           >
//             {conditionOptions.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           {renderValueInput(filter)}

//           <DeleteButton onClick={() => removeFilter(filter.id)}>
//             <Add size={16} />
//           </DeleteButton>
//         </FilterRow>
//       ))}

//       <AddCondition onClick={addFilter}>+ Add condition</AddCondition>
//     </FilterContainer>
//   );
// };

// Opciones simuladas
const fieldOptions = [
  { label: "Is Client", value: "isclient", type: "boolean" },
  { label: "Is Opportunity", value: "isoportunity", type: "boolean" },
  { label: "Viewed", value: "viewed", type: "boolean" },
  {
    label: "Ejecutive",
    value: "ejecutiveId",
    type: "select",
    options: [
      { label: "Juan", value: "juan" },
      { label: "María", value: "maria" },
    ],
  },
  {
    label: "Entity",
    value: "entityId",
    type: "select",
    options: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
    ],
  },
  {
    label: "Category",
    value: "categoryId",
    type: "select",
    options: [{ label: "Cat 1", value: "c1" }],
  },
  {
    label: "Origin",
    value: "originId",
    type: "select",
    options: [{ label: "Web", value: "web" }],
  },
  {
    label: "Phase",
    value: "phaseId",
    type: "select",
    options: [{ label: "Initial", value: "init" }],
  },
  { label: "Created At", value: "createdAt", type: "date-range" },
];

const conditionOptions = [
  { label: "is", value: "is" },
  { label: "is any of", value: "is_any" },
  { label: "between", value: "between" },
];

// const AdvancedFilter = () => {
//   const [filters, setFilters] = useState([
//     { id: 1, field: "isclient", operator: "is", value: false },
//   ]);

//   const handleChange = (id, key, val) => {
//     setFilters((prev) =>
//       prev.map((f) => (f.id === id ? { ...f, [key]: val } : f))
//     );
//   };

//   const addFilter = () => {
//     setFilters((prev) => [
//       ...prev,
//       { id: Date.now(), field: "", operator: "is", value: "" },
//     ]);
//   };

//   const removeFilter = (id) => {
//     setFilters((prev) => prev.filter((f) => f.id !== id));
//   };

//   const renderValueInput = (filter) => {
//     const field = fieldOptions.find((f) => f.value === filter.field);
//     if (!field) return null;

//     if (field.type === "boolean") {
//       return (
//         <StyledSelect
//           value={{ label: String(filter.value), value: filter.value }}
//           onChange={(val) => handleChange(filter.id, "value", val.value)}
//           options={[
//             { label: "true", value: true },
//             { label: "false", value: false },
//           ]}
//         />
//       );
//     }

//     if (field.type === "date-range") {
//       return (
//         <RangeWrapper>
//           <input
//             type="date"
//             value={filter.value?.[0] || ""}
//             onChange={(e) =>
//               handleChange(filter.id, "value", [
//                 e.target.value,
//                 filter.value?.[1] || "",
//               ])
//             }
//           />
//           <span>to</span>
//           <input
//             type="date"
//             value={filter.value?.[1] || ""}
//             onChange={(e) =>
//               handleChange(filter.id, "value", [
//                 filter.value?.[0] || "",
//                 e.target.value,
//               ])
//             }
//           />
//         </RangeWrapper>
//       );
//     }

//     if (field.type === "select") {
//       return (
//         <StyledSelect
//           value={field.options.find((o) => o.value === filter.value) || null}
//           onChange={(val) => handleChange(filter.id, "value", val?.value)}
//           options={field.options}
//           isClearable
//         />
//       );
//     }

//     return (
//       <input
//         type="text"
//         placeholder="Enter value"
//         value={filter.value}
//         onChange={(e) => handleChange(filter.id, "value", e.target.value)}
//       />
//     );
//   };

//   return (
//     <Container>
//       {filters.map((filter) => (
//         <motion.div
//           layout
//           key={filter.id}
//           initial={{ opacity: 0, y: 5 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -5 }}
//         >
//           <FilterRow>
//             <StyledSelect
//               value={fieldOptions.find((f) => f.value === filter.field) || null}
//               onChange={(val) => handleChange(filter.id, "field", val.value)}
//               options={fieldOptions}
//               placeholder="Field"
//             />

//             <StyledSelect
//               value={conditionOptions.find((c) => c.value === filter.operator)}
//               onChange={(val) => handleChange(filter.id, "operator", val.value)}
//               options={conditionOptions}
//               placeholder="Condition"
//             />

//             {renderValueInput(filter)}

//             <Add
//               style={{ cursor: "pointer", color: "#888" }}
//               onClick={() => removeFilter(filter.id)}
//             />
//           </FilterRow>
//         </motion.div>
//       ))}

//       <AddConditionButton onClick={addFilter}>
//         <Add fontSize="small" />
//         Add condition
//       </AddConditionButton>
//     </Container>
//   );
// };

const FilterContainer = styled.div`
  background: #f7f9fc;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterRow = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  gap: 8px;
  align-items: center;

  select,
  input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: #666;
  }
`;

const DeleteButton = styled.div`
  margin-left: auto;
  cursor: pointer;
  color: #888;

  &:hover {
    color: #f44336;
  }
`;

const AddCondition = styled.div`
  padding: 8px;
  color: #5c6ac4;
  cursor: pointer;
  font-weight: 500;
  border-radius: 6px;
  width: fit-content;

  &:hover {
    background: #e0e7ff;
  }
`;

const DropContextStyled = styled.div`
  display: flex;

  justify-content: space-between;
`;

const Container = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const StyledSelect = styled(Select)`
  min-width: 160px;
  font-size: 14px;

  .react-select__control {
    border-radius: 6px;
  }
`;

const AddConditionButton = styled.button`
  background: transparent;
  color: #5c6ac4;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;

  &:hover {
    color: #3f51b5;
  }
`;

const RangeWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  input {
    border: 1px solid #ccc;
    padding: 5px 6px;
    border-radius: 6px;
    font-size: 14px;
  }

  span {
    font-size: 12px;
    color: #777;
  }
`;

// const Tooltip = ({ title, children, className }) => (
//   <TooltipWrapper className={className}>
//     {children}
//     <TooltipText className="tooltip-text">{title}</TooltipText>
//   </TooltipWrapper>
// );

// const TooltipWrapper = styled.div`
//   position: relative;
//   display: inline-block;

//   &:hover .tooltip-text {
//     visibility: visible;
//     opacity: 1;
//   }
// `;

// const TooltipText = styled.span`
//   visibility: hidden;
//   width: max-content;
//   background-color: #2a2f3a;
//   color: #fff;
//   text-align: center;
//   border-radius: 4px;
//   padding: 4px 8px;
//   position: absolute;
//   z-index: 1;
//   bottom: 125%;
//   left: 50%;
//   transform: translateX(-50%);
//   opacity: 0;
//   transition: opacity 0.3s;
//   font-size: 12px;
//   font-weight: normal;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 100%;
//     left: 50%;
//     margin-left: -5px;
//     border-width: 5px;
//     border-style: solid;
//     border-color: #2a2f3a transparent transparent transparent;
//   }
// `;

// * DragDropContext
/* 
DragDropContext es el componente fundamental y obligatorio de 
la biblioteca react-beautiful-dnd que proporciona el contexto necesario para que funcione 
todo el sistema de arrastrar y soltar (drag and drop) en tu aplicación React.

Características principales:
Componente contenedor: Envuelve toda la parte de tu interfaz donde quieres habilitar el drag and drop.
Administrador de eventos: Maneja todos los eventos relacionados con el arrastre.
Proveedor de contexto: Proporciona el contexto necesario para que los componentes Droppable y Draggable funcionen.

*/

// * Droppable
/* 
¿Qué es Droppable en React Beautiful DnD?
Droppable es un componente de react-beautiful-dnd que define un área donde se 
pueden soltar elementos arrastrables (Draggable). Es esencial para crear 
interfaces donde los elementos pueden ser reordenados o movidos entre diferentes zonas.

Características principales:
Define zonas de destino: Áreas donde los elementos arrastrados pueden ser soltados.

Proporciona contexto: Da información visual durante el arrastre (placeholder, estilo al pasar sobre él).

Puede contener múltiples Draggables: Una lista de elementos que pueden ser reordenados.
 */

/* 🧩 DragDropContext    => Es el cerebro del drag and drop.
🧩 Droppable          => Es el "contenedor" donde puedes soltar cosas.
🧩 Draggable          => Es lo que puedes mover (arrastrar).

 */
