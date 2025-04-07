import { motion } from "framer-motion";
import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import styled from "styled-components";
export default function Congratulations() {
  const { width, height } = useWindowSize();
  return (
    <Body h={height} w={width}>
      <Container>
        <Title>«Nunca veo el fracaso como un fracaso, sino solo como el juego que debo jugar y ganar.»</Title>
      </Container>
      <ReactConfetti width={width} height={height} />
    </Body>
  );
}

const Body = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100000000 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.w}px;
  height: ${props => props.h}px;
  top: 0;
  left: 0;
`;
const Container = styled(motion.div)`
  width: 90%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100000000 !important;
`;
const Title = styled(motion.h3)`
  font-size: 60px;
  text-align: center;
  color: #ffff;
`;
