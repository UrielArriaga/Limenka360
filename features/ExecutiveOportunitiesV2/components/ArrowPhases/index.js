import React from "react";
import styled from "styled-components";

const steps = [
  { id: 1, name: "Nuevo Prospecto", active: true },
  { id: 2, name: "Contactado", active: true },
  { id: 3, name: "Negociación", active: false },
  { id: 4, name: "Cerrado", active: false },
];

const ArrowStepsComponent = ({
  steps = [
    { id: 1, name: "Prospecto Nuevo", active: true },
    { id: 2, name: "No contactado", active: false },
    { id: 2, name: "Contactado", active: false },
    // { id: 3, name: "Negociación", active: false },
    { id: 4, name: "Cotizado", active: false },
  ],
}) => {
  return (
    <ArrowContainer>
      {steps.map(step => (
        <Arrow key={step.id} active={step.active} isFirt={step.id === 1}>
          {step.name}
        </Arrow>
      ))}
    </ArrowContainer>
  );
};

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* justify-content: center; */
  /* margin: 40px 0; */
`;

const Arrow = styled.div`
  position: relative;
  background-color: ${({ active }) => (active ? "#4CAF50" : "#ccc")};
  color: white;
  padding: 10px 40px;
  margin-right: -20px; /* Superponer las flechas */
  font-weight: bold;
  text-align: center;
  min-width: 150px;

  // condiioona el clip-path si es el primero

  clip-path: ${({ isFirt }) =>
    isFirt
      ? "polygon(10% 10%, 70% 10%, 85% 50%, 70% 90%, 10% 90%)"
      : "polygon(0 0, 75% 0, 90% 50%, 75% 100%, 0 100%, 10% 50%)"};
  /* clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%); */

  /* clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%); */

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -20px;
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    border-right: 20px solid ${({ active }) => (active ? "#4CAF50" : "#ccc")};
  }

  &:first-child {
    margin-left: 0;
    &:before {
      content: none;
    }
  }
`;

export default ArrowStepsComponent;
