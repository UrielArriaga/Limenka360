import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { Popover, Switch, withStyles } from "@material-ui/core";
export const DataOrderStyled = styled.div`
  display: flex;
  align-items: center;
  .container_order {
    display: flex;
    flex-direction: row-reverse;
  }
  .filtercomponent {
    margin-right: 9px;

    margin-bottom: 6px;
    .orderBy {
      margin-right: 5px;
      font-size: 12px;
      color: #616161;
      font-weight: 500;
      margin-bottom: 1px;
    }
    .order-select {
      margin-right: 5px;
      align-items: center;
      background-color: hsl(0, 0%, 100%);
      border-color: hsl(0, 0%, 80%);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      color: #0c203b;
      font-weight: 500;
      cursor: default;
    }
    .select_icon {
      color: #616161;
      font-weight: 500;
      font-size: 11px;
    }
    .icon {
      color: #0c203b;
      font-weight: 500;
      font-size: 11px;
    }
  }
  .content-select {
    max-width: 250px;
    position: relative;
    margin-bottom: 2px;
  }

  .content-select select {
    display: inline-block;
    width: 100%;
    cursor: pointer;
    padding: 7px 1px;
    outline: 0;
    border: 0;
    border-radius: 0;
    font-size: 12px;
    color: #0d47a1;
    font-weight: 600;
    border: 1px solid #776ceb33;
    border-radius: 7px;
    position: relative;
    transition: all 0.25s ease;
  }

  .content-select select:hover {
    background: #3f51b50a;
  }
  .content-select i {
    position: absolute;
    right: 20px;
    top: calc(50% - 13px);
    width: 16px;
    height: 16px;
    display: block;
    border-left: 4px solid #2ac176;
    border-bottom: 4px solid #2ac176;
    transform: rotate(-45deg);
    transition: all 0.25s ease;
  }
  .content-select:hover i {
    margin-top: 3px;
  }
  .options {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 999;
    margin: 0 0;
    padding: 0 0;
    list-style: none;
    border: 1px solid #ccc;
    background-color: white;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .options li {
    padding: 0 6px;
    margin: 0 0;
    padding: 0 10px;
  }

  .options li:hover {
    background-color: #39f;
    color: white;
  }
`;

export const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: "#0d47a1",
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#0d47a1",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid #dce1f6`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#dce1f6",
  },
  checked: {},
}))(Switch);
export const SelectOptions = styled(Popover)`
  .container_options {
    display: flex;
    flex-direction: column;
    .option {
      padding: 8px;
      transition: 0.1s;
      font-size: 13px;
      &:hover {
        background-color: #f0f0f0;
        color: black;
        cursor: default;
      }
    }
    .selected {
      border: 1px solid #1b69b6;
      color: #1b69b6;
    }
  }
`;
