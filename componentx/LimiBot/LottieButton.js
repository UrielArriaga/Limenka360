import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LottieButton = ({
  toggleChat,
  animationData,
  lottieVariants,
  showPopup,
  popupText,
}) => (
  <LottiContainer
    key="lottie-button"
    variants={lottieVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    whileHover="hover"
    onClick={toggleChat}
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1000,
      cursor: "pointer",
    }}
  >
    {showPopup && (
      <PopupCloud
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", damping: 10, stiffness: 100 },
          },
          exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
        }}
      >
        <p>{popupText}</p>
      </PopupCloud>
    )}
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ width: 200, height: 200 }}
    />
  </LottiContainer>
);

const LottiContainer = styled(motion.div)``;

const PopupCloud = styled(motion.div)`
  position: absolute;
  top: -80px;
  left: -30px;
  width: 150px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;
  font-weight: bold;
  padding: 10px;
`;

export default LottieButton;
