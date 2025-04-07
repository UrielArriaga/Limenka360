import styled from "styled-components";
import { motion } from "framer-motion";

export const ModalStock = styled(motion.div)`
  background: #fff;
  min-width: 400px;
  max-width: 500px;
  padding: 15px;

  .title {
    color: #103c82;
    font-weight: bold;
  }
  .input {
    width: 100%;
    margin-top: 10px;
    border: 1.5px solid rgb(204, 204, 204);
    transition: all 0.3s ease 0s;
    font-size: 16px;
    min-height: 36px;
    resize: none;
    padding: 0px 5px;
  }
  .btn-save {
    background: #103c82;
    color: white;
    width: 100%;
    margin-top: 9px;
    padding: 5px;
    border: none;
    font-size: 15px;
    font-weight: bold;
  }
`;