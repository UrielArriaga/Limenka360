import { ContentItem, List, SortableItemStyled } from "./styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled, { css } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Checkbox, Dialog, Divider, Fade, FormControlLabel, Menu, Popover, Tooltip } from "@material-ui/core";

import {
  AddAlert,
  AttachMoney,
  CalendarToday,
  CalendarTodayOutlined,
  CloseOutlined,
  Delete,
  Edit,
  MoreVert,
  NavigateNext,
  NewReleases,
  OpenInNew,
  Settings,
  SettingsOutlined,
  TableChartOutlined,
  Visibility,
  VisibilityOff,
  WhatsApp,
} from "@material-ui/icons";

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { colors } from "../../../../styles/global.styles";
import { formatDate, toUpperCaseChart } from "../../../../utils";

const SortableItem = SortableElement(({ value, position }) => (
  <ContentItem index={position}>
    <div className="content">
      <p>{value}</p>
    </div>
  </ContentItem>
));

export default SortableItem;
