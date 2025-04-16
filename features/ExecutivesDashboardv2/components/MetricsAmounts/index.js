import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function MetricsAmounts() {
  const data = [
    { title: "Monto Cotizado", value: 5000, color: "#8884d8", percent: 80 },
    { title: "Monto Vendido", value: 4000, color: "#82ca9d", percent: 65 },
    { title: "Monto a Cobrar", value: 3000, color: "#ffc658", percent: 50 },
    { title: "Monto Pagado", value: 2500, color: "#ff8042", percent: 40 },
  ];

  return (
    <MetricsStyled>
      <h4>Resumen de Montos</h4>

      <Cards>
        {data.map((item, index) => (
          <Card key={index} style={{ backgroundColor: item.color }}>
            <Title>{item.title}</Title>
            <Amount>${item.value.toLocaleString()}</Amount>
            <ProgressWrapper>
              <ProgressBar
                as={motion.div}
                initial={{ width: 0 }}
                animate={{ width: `${item.percent}%` }}
                transition={{ duration: 1 }}
                style={{ backgroundColor: "#fff" }}
              />
            </ProgressWrapper>
            <Percent>{item.percent}%</Percent>
          </Card>
        ))}
      </Cards>
    </MetricsStyled>
  );
}

const MetricsStyled = styled.div`
  padding: 2rem;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1 1 calc(50% - 20px);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  min-width: 250px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h5`
  margin: 0;
  font-size: 18px;
`;

const Amount = styled.p`
  font-size: 26px;
  font-weight: bold;
  margin: 10px 0;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  border-radius: 10px;
`;

const Percent = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: bold;
  font-size: 16px;
`;
