import React, { useState } from "react";

export default function useTrackings() {
  const [showAddTracking, setShowAddTracking] = useState(false);
  const handleOpenTracking = () => setShowAddTracking(true);
  const handleCloseTracking = () => setShowAddTracking(false);
  return {
    showAddTracking,
    handleCloseTracking,
    handleOpenTracking,
  };
}
