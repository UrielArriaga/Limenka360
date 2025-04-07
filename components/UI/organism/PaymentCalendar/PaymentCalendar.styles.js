import styled from "styled-components";

export const ContainerStyle = styled.div`
  padding-bottom: 4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);

  table {
    padding-bottom: 10px;
  }

  .tabla-responsive {
    overflow-x: auto;
    padding-bottom: 10px;
    margin-bottom: 20px;
    padding: 10px;
    :hover {
      cursor: grab;
    }
  }

  .tabla-responsive table {
    width: 100%;
    border-collapse: collapse;
  }

  .tabla-responsive th,
  .tabla-responsive td {
    padding: 1px;
    text-align: left;
    white-space: nowrap;
    min-width: 100px;
  }

  .tabla-responsive::-webkit-scrollbar {
    height: 3px;
  }

  .tabla-responsive::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color del fondo de la barra de desplazamiento */
  }

  .tabla-responsive::-webkit-scrollbar-thumb {
    background-color: #888; /* Color del "pulgar" de la barra de desplazamiento */
    border-radius: 1px; /* Radio de borde del "pulgar" */
  }

  .tabla-responsive::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color del "pulgar" de la barra de desplazamiento en estado hover */
  }

  @media (max-width: 600px) {
    .tabla-responsive th,
    .tabla-responsive td {
      display: block;
      width: 100%;
    }
  }

  select {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 23px 9px 11px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .head {
    min-width: 200px;
    text-align: left;
    padding-left: 10px;
    text-transform: capitalize;
    background-color: #dce1f6;
  }
  .extra {
    display: grid;
    grid-template-columns: auto;
  }
  .data {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 23px 9px 11px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .modified {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-clip: padding-box;
    background-color: #90caf9;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 23px 9px 11px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .total {
    font-weight: bold;
    margin-top: 10px;
  }
  .icon {
    padding-left: 15px;
    padding-top: 10px;
    color: #405189;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    grid-gap: 10px;
    margin-right: 5px;
    .save {
      background-color: #405189;
      color: #fff;
    }
  }

  .button_reset {
    width: 100%;
    height: 42px;
    text-transform: capitalize;
    color: #6b34bc;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #9c72db;
    }
  }
  .button_add {
    width: 100%;
    height: 42px;
    text-transform: capitalize;
    color: green;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #88c82d;
    }
  }
  .button_edit {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    text-transform: capitalize;
    color: #407aff;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #7ca6ff;
    }
  }
  .button_delete {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    text-transform: capitalize;
    color: #f00c0c;
    background-color: #fff;
    transition: background-color 0.3s ease-in-out;
    margin-left: 5px;
    border-radius: 8px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #f65f55;
    }
  }
  .green {
    color: green;
    background-color: #aed581;
  }
  .red {
    color: red;
    background-color: #ffcdd2;
  }
  .alert {
    margin-bottom: 10px;
  }

  button {
    width: 100px;
    height: 42px;
    text-transform: capitalize;
    color: #424242;
    background-color: #cfd8dc;
    -webkit-transition: background-color 0.3s ease-in-out;
    transition: background-color 0.3s ease-in-out;
    border-radius: 4px;
    padding: 6px 8px;
    border: 0px;
    cursor: pointer;
    :hover {
      background-color: #90a4ae;
    }
  }
`;