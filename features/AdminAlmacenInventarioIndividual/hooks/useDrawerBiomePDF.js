import { useState, useCallback } from "react";

const useDrawerBiomePDF = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rutaPDF, setRutaPDF] = useState();

  const handleToggleDrawer = useCallback(newRutaPDF => {
    setRutaPDF(newRutaPDF);
    setDrawerOpen(prev => !prev);
  }, []);

  return { drawerOpen, rutaPDF, handleToggleDrawer };
};

export default useDrawerBiomePDF;
