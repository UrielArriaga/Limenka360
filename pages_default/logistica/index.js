import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Head from "next/head";
import SideBar from "../../components/SideBar";
import NavBarDashboard from "../../components/NavBarDashboard";
import useModal from "../../hooks/useModal";
import { LogisticLayout } from "../../styles/Logistica/Layout.styles";
import MainLayout from "../../components/MainLayout";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Pedidos = () => {
  const { open, setOpen } = useModal();

  return (
    <MainLayout>
      <LogisticLayout>
        <Head></Head>
        {/* <SideBar open={open} setOpen={setOpen} />
        <NavBarDashboard sideBar={true} /> */}
        <main>hola</main>
      </LogisticLayout>
    </MainLayout>
  );
};

Pedidos.propTypes = propTypes;
Pedidos.defaultProps = defaultProps;
// #endregion

export default Pedidos;
