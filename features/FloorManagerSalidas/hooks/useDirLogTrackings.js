import React from "react";
import useModal from "../../../hooks/useModal";

export default function useDirLogTrackings(orderSelected) {
  // * Dialog Trackings
  const { open: openTrackings, toggleModal: toggleTrackingsModal } = useModal();

  return {
    openTrackings,
    toggleTrackingsModal,
  };
}
