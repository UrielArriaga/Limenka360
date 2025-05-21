import { useState, useCallback } from "react";

function usePopover(setSharedValue) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = useCallback((event, newValue) => {
    setAnchorEl(event.currentTarget);
    setSharedValue(newValue);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setSharedValue(null);
  }, []);

  return {
    open,
    anchorEl,
    handleOpen,
    handleClose,
  };
}

export default function useItemActions() {
  const [itemValue, setItemValue] = useState(null);

  const whatsapp = usePopover(setItemValue);
  const schedule = usePopover(setItemValue);
  const email = usePopover(setItemValue);
  const tracking = usePopover(setItemValue);

  return {
    whatsapp,
    schedule,
    email,
    tracking,
    itemValue,
  };
}
