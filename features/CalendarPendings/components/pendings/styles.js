import styled from "styled-components";

export const ActivitiesSyled = styled.aside`
  background-color: rgb(255, 255, 255);
  padding: 24px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: #000;

  .filters {
    /* margin-top: 1rem; */
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .filter-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
      }

      select,
      input[type="time"] {
        width: 100%;
        padding: 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-top: 4px;
      }

      .checkboxes {
        display: flex;
        flex-direction: column;
        gap: 4px;

        label {
          font-weight: normal;
          display: flex;
          align-items: center;
          gap: 6px;
        }
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: -20px;
  position: relative;
`;

export const ButtonsPoint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: none;
`;

export const BtnFilter = styled.button`
  border: none;
  background-color: rgb(39, 106, 174);
  color: #fff;
  padding: 2px 7px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  & svg {
    font-size: 16px;
    color: #fff;
  }
`;

export const ButtonPoint = styled.button`
  width: 10px;
  height: 10px;
  border: none;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

export const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ScheduleTitle = styled.h3`
  text-transform: uppercase;
  color: ${(props) => (props.color ? props.color : "#228be6")};
`;

export const Category = styled.div`
  background-color: #cc5de8;
  color: #fff;
  padding: 1px 4px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 200;
  letter-spacing: 2px;
  align-self: start;
`;

export const Events = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Event = styled.li`
  display: flex;
  align-items: start;
  gap: 5px;

  position: relative;

  /* cursor: pointer; */
  /* 
  &:hover {
    background-color: #343a40;
    border-radius: 11px;
  } */
`;

export const Color = styled.div`
  margin-top: 3px;
  width: 9px;
  height: 9px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

export const Time = styled.span`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #868e96;
  margin-bottom: -4px;
`;

export const Description = styled.span`
  margin-top: 20px;
  text-transform: uppercase;
`;

export const EventDetails = styled.div``;

export const BtnEddit = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  position: absolute;
  right: 0;
  top: 20%;

  svg {
    color: #fff;
  }
`;
