import { Drawer } from "@material-ui/core";
import styled from "styled-components";

export const NewOportunityStyled = styled(Drawer)`
  p {
    margin: 0;
  }

  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 70%;
    padding: 0;
    background-color: #eef2f4;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 10px;
    
    @media (max-width: 900px) {
      width: 85%;
    }
    
    @media (max-width: 600px) {
      width: 100%;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(166, 164, 164, 0.1);
      border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: rgba(88, 88, 88, 0.4);
      border-radius: 3px;
      &:hover {
        background-color: rgba(88, 88, 88, 0.6);
      }
    }

    overflow: auto;
  }

  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.2);
  }

  .row {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .modalcontainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .headerPreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 1;

    .headerPreview__title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #282455;
      margin: 0;
      
      .MuiSvgIcon-root {
        font-size: 28px;
        margin-right: 12px;
        color: #4CAF50;
        background-color: #e8f5e9;
        padding: 4px;
        border-radius: 50%;
      }
    }
  }

  .actionmodal {
    display: flex;
    gap: 10px;
    
    button {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }

    .btn {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      
      .MuiSvgIcon-root {
        margin-right: 8px;
        font-size: 18px;
      }
    }
    
    .btn--primary {
      background-color: #407aff;
      color: white;
      border: none;
      
      &:hover {
        background-color: #3069e6;
      }
    }
    
    .btn--outlined {
      background-color: transparent;
      color: #407aff;
      border: 1px solid #407aff;
      
      &:hover {
        background-color: rgba(64, 122, 255, 0.08);
      }
    }
  }

  .closeButton {
    position: absolute;
    right: 16px;
    top: 16px;
    color: #757575;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      color: #333;
    }
    
    .MuiSvgIcon-root {
      font-size: 24px;
    }
  }

  .actionsbar {
    position: absolute;
    left: -50px;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;

    .actionsbar__item {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #407aff;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #3069e6;
        transform: translateY(-2px);
      }
    }

    .actionsbar__icon {
      font-size: 20px;
    }
  }

  /* Content area styles */
  .contentArea {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    background-color: #f9f9f9;
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  }

  /* Form container styles */
  .formContainer {
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  }

  /* Table container styles */
  .tableContainer {
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    
    @media (max-width: 600px) {
      padding: 16px;
    }
  }
`;