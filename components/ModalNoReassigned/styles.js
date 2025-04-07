import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const DialogContainer = styled(Dialog)`
  #alert-dialog-title {
    align-items: center;
    padding: 1em;
    background-color: #C74D4D;
    align-content: center;
    color: black;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    
    #title{
      display: flex;
      padding: .2em;
    }
    .icon {
      margin-right: 1em;
    }
    p {
      font-size: .8rem;
      color: black ;
    }
  }

  #containerBody {
    padding: 20px 20px 0px 20px;
    margin-top: 20px;
    height: 262px;
    min-width: 443px;
    .user {
      padding: .5em 0;
    }

  }

  .acept {
    margin-left: 5px;
    color: #fff;
    padding: 5px;
    background-color: #0c203b;
    border-radius: 4px;
    transition: 0.3s;
    &:hover {
      background-color: #fff;
      color: #0c203b;
      cursor: pointer;
    }
  }
`;
